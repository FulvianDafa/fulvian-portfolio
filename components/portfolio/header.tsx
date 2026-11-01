"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const nav = [
  { id: "projects", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

export function Header({ home = false }: { home?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const destination = useRef<string | null>(null);
  const href = (id: string) => `${home ? "" : "/"}#${id}`;
  useEffect(() => {
    if (!home) return;
    const nodes = [...nav, { id: "contact" }]
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.35, 260);
      const current = nodes
        .filter((node) => node.getBoundingClientRect().top <= marker)
        .at(-1);
      const atBottom = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? "contact" : current?.id ?? "");
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    // Filtering work or switching research tabs changes section positions.
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.getElementById("main");
    if (main) observer.observe(main);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [home]);

  const selectMobileSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (home) {
      event.preventDefault();
      destination.current = id;
    }
    setMenuOpen(false);
  };
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="wordmark"
            href={home ? "#main" : "/"}
            aria-label="Fulvian home"
          >
            fulvian<span>.</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((item) => (
              <a
                key={item.id}
                href={href(item.id)}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="header-contact"
            href={href("contact")}
            aria-current={active === "contact" ? "location" : undefined}
          >
            Let’s Connect <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger asChild>
              <button className="mobile-menu" aria-label="Open navigation">
                <Menu size={23} aria-hidden="true" />
              </button>
            </DialogTrigger>
            <DialogContent
              className="nav-dialog"
              onCloseAutoFocus={(event) => {
                const id = destination.current;
                if (!id) return;
                event.preventDefault();
                destination.current = null;
                // Wait until the dialog releases its scroll lock and focus trap.
                window.requestAnimationFrame(() => {
                  const target = document.getElementById(id);
                  if (!target) return;
                  if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
                  target.tabIndex = -1;
                  target.focus({ preventScroll: true });
                  target.scrollIntoView({ block: "start" });
                });
              }}
            >
              <DialogTitle>Explore the portfolio</DialogTitle>
              <DialogDescription>
                Work, research, and the thinking behind it.
              </DialogDescription>
              <nav aria-label="Mobile navigation">
                {[...nav, { id: "contact", label: "Contact" }].map((item) => (
                  <a
                    key={item.id}
                    onClick={(event) => selectMobileSection(event, item.id)}
                    href={href(item.id)}
                    aria-current={active === item.id ? "location" : undefined}
                  >
                    {item.label}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  );
}
