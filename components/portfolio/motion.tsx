"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: the server-rendered page is always readable. */
export function PortfolioMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const setup = () => {
      stop();
      if (preference.matches) return;

      const reveal = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = "visible";
          reveal.unobserve(entry.target);
        }
      }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

      const register = (node: HTMLElement) => {
        const items = node.matches("[data-reveal]") ? [node] : [];
        items.push(...node.querySelectorAll<HTMLElement>("[data-reveal]"));
        for (const item of items) {
          if (item.dataset.revealState) continue;
          const bounds = item.getBoundingClientRect();
          if (bounds.bottom <= 0) {
            item.dataset.revealState = "static";
            continue;
          }
          // Only conceal elements below the viewport; never hide hydrated text.
          item.dataset.revealState = bounds.top >= window.innerHeight ? "pending" : "ready";
          reveal.observe(item);
        }
      };

      register(scope);
      // Filtered project cards can mount after the initial registration.
      const changes = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.removedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            reveal.unobserve(node);
            node.querySelectorAll("[data-reveal]").forEach((item) => reveal.unobserve(item));
          }
          for (const node of record.addedNodes) {
            if (node instanceof HTMLElement) register(node);
          }
        }
      });
      changes.observe(scope, { childList: true, subtree: true });

      const showFocused = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement)) return;
        const item = event.target.closest<HTMLElement>("[data-reveal]");
        if (item) {
          item.dataset.revealState = "static";
          reveal.unobserve(item);
        }
      };
      scope.addEventListener("focusin", showFocused);

      stop = () => {
        reveal.disconnect();
        changes.disconnect();
        scope.removeEventListener("focusin", showFocused);
        scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
          // Preserve once-only behavior if the motion preference changes live.
          if (item.dataset.revealState === "visible" || item.dataset.revealState === "static") {
            item.dataset.revealState = "static";
          } else {
            delete item.dataset.revealState;
          }
        });
      };
    };

    setup();
    preference.addEventListener("change", setup);
    return () => {
      stop();
      preference.removeEventListener("change", setup);
    };
  }, []);

  return <main id="main" tabIndex={-1} ref={root}>{children}</main>;
}
