"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { focusAreas } from "@/lib/portfolio/profile";

const descriptors = focusAreas.map((area) => area.title);
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
};

export function TypedDescriptor() {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const [paused, setPaused] = useState(false);
  const [text, setText] = useState(descriptors[0]);
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef({ index: 0, count: descriptors[0].length, deleting: true });

  useEffect(() => {
    const element = root.current;
    if (!element || reduced || paused || !("IntersectionObserver" in window)) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let inView = false;

    const tick = () => {
      const state = progress.current;
      if (state.deleting) {
        state.count--;
        if (state.count === 0) {
          state.index = (state.index + 1) % descriptors.length;
          state.deleting = false;
        }
      } else {
        state.count++;
        if (state.count === descriptors[state.index].length) state.deleting = true;
      }
      setText(descriptors[state.index].slice(0, state.count));
      timer = setTimeout(tick, state.count === descriptors[state.index].length
        ? 2400 : state.count === 0 ? 320 : state.deleting ? 32 : 65);
    };
    const update = () => {
      clearTimeout(timer);
      const running = inView && !document.hidden;
      element.dataset.running = String(running);
      if (running) {
        const state = progress.current;
        timer = setTimeout(tick, state.count === descriptors[state.index].length ? 2400 : 100);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      element.dataset.running = "false";
    };
  }, [paused, reduced]);

  return (
    <div className="hero-descriptor" ref={root} data-reveal data-reveal-delay="1">
      <span className="sr-only">Professional focus: {descriptors.join("; ")}.</span>
      <span className="descriptor-copy" aria-hidden="true">
        {descriptors.map((descriptor) => (
          <span className="descriptor-reserve" key={descriptor}>{descriptor}</span>
        ))}
        <span className="descriptor-text">{reduced ? descriptors[0] : text}<span className="typing-caret" /></span>
      </span>
      <button
        type="button"
        className="descriptor-toggle"
        aria-label={paused ? "Resume rotating specialties" : "Pause rotating specialties"}
        title={paused ? "Resume rotating specialties" : "Pause rotating specialties"}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
      </button>
    </div>
  );
}
