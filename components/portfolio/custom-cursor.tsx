"use client";

import { useEffect, useRef } from "react";

const interactiveSelector =
  'a[href], button, [role="button"], [role="link"], summary';
const nativeSelector =
  'input, textarea, select, option, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [data-cursor="native"], iframe, video, audio, canvas, [disabled], [aria-disabled="true"]';
const textSelector =
  'p, h1, h2, h3, h4, h5, h6, li, dt, dd, label, pre, code, blockquote, figcaption, span, strong, em, small, table, .tags, [data-cursor="text"]';

/** Optional enhancement: native cursor remains the default until first paint. */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = root.current;
    const point = dot.current;
    const follower = ring.current;
    if (!layer || !point || !follower) return;

    const preference = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let previousTime = 0;
    let hasPointer = false;
    let failed = false;
    let listeners: AbortController | undefined;

    const hide = () => {
      if (layer.dataset.visible !== "false") layer.dataset.visible = "false";
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };

    const stop = () => {
      hide();
      hasPointer = false;
      listeners?.abort();
    };

    const fail = () => {
      failed = true;
      layer.dataset.status = "error";
      stop();
    };

    const animate = (time: number) => {
      try {
        const delta = previousTime ? Math.min(time - previousTime, 64) : 16.67;
        previousTime = time;
        // Time-based easing keeps the same light lag at different refresh rates.
        const ease = 1 - Math.exp(-delta / 45);
        ringX += (x - ringX) * ease;
        ringY += (y - ringY) * ease;
        const settled = Math.hypot(x - ringX, y - ringY) < 0.1;
        if (settled) {
          ringX = x;
          ringY = y;
        }
        follower.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        frame = settled ? 0 : window.requestAnimationFrame(animate);
        if (settled) previousTime = 0;
      } catch {
        fail();
      }
    };

    const update = (target: Element | null) => {
      try {
        const interactive = target?.closest(interactiveSelector);
        const selection = window.getSelection();
        if (
          !hasPointer || document.hidden || !target ||
          target === document.documentElement ||
          x >= document.documentElement.clientWidth ||
          y >= document.documentElement.clientHeight ||
          target.closest(nativeSelector) ||
          (!interactive && target.closest(textSelector)) ||
          (selection && !selection.isCollapsed)
        ) {
          hide();
          return;
        }

        const mode = interactive?.matches('[data-cursor="view"]')
          ? "view"
          : interactive ? "hover" : "default";
        if (layer.dataset.mode !== mode) layer.dataset.mode = mode;
        point.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (layer.dataset.visible !== "true") {
          ringX = x;
          ringY = y;
          follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          // CSS hides the native pointer only while this rendered layer is visible.
          layer.dataset.visible = "true";
        }
        if (!frame) frame = window.requestAnimationFrame(animate);
      } catch {
        fail();
      }
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.buttons !== 0) {
        hasPointer = false;
        hide();
        return;
      }
      hasPointer = true;
      x = event.clientX;
      y = event.clientY;
      update(event.target instanceof Element ? event.target : null);
    };

    const refresh = () => {
      if (hasPointer) update(document.elementFromPoint(x, y));
    };
    const leave = () => {
      hasPointer = false;
      hide();
    };
    const pointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) leave();
    };

    const setup = () => {
      stop();
      const status = failed
        ? "error"
        : preference.matches
          ? "ready"
          : window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "reduced-motion"
            : "unsupported-pointer";
      layer.dataset.status = status;
      if (process.env.NODE_ENV === "development") {
        const reason = {
          ready: "Ready. Move the mouse over empty space, navigation, or a project link. Text keeps the native cursor.",
          "reduced-motion": "Native cursor: prefers-reduced-motion is active. The custom cursor is intentionally disabled to respect your animation preference.",
          "unsupported-pointer": "Native cursor: this device does not report hover with a fine pointer.",
          error: "Native cursor: an error disabled the custom cursor. Reload to retry.",
        }[status];
        console.info(`[CustomCursor] ${reason}`);
      }
      if (!preference.matches || failed) return;
      listeners = new AbortController();
      const options = { passive: true, signal: listeners.signal };
      document.addEventListener("pointermove", move, options);
      document.addEventListener("pointerover", move, options);
      document.addEventListener("pointerout", pointerOut, options);
      document.addEventListener("pointercancel", leave, options);
      document.addEventListener("dragstart", leave, options);
      document.addEventListener("keydown", leave, options);
      document.addEventListener("visibilitychange", leave, options);
      document.addEventListener("selectionchange", refresh, options);
      document.addEventListener("scroll", refresh, { ...options, capture: true });
      window.addEventListener("resize", leave, options);
      window.addEventListener("blur", leave, options);
      window.addEventListener("pagehide", leave, options);
      window.addEventListener("error", fail, options);
      window.addEventListener("unhandledrejection", fail, options);
    };

    setup();
    preference.addEventListener("change", setup);
    return () => {
      stop();
      layer.dataset.status = "inactive";
      preference.removeEventListener("change", setup);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={root} data-visible="false" data-status="pending" aria-hidden="true">
      <div className="custom-cursor-dot" ref={dot} />
      <div className="custom-cursor-ring" ref={ring}>
        <div className="custom-cursor-ring-visual">
          <span className="custom-cursor-label">VIEW ↗</span>
        </div>
      </div>
    </div>
  );
}
