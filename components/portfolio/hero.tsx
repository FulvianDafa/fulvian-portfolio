"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { focusAreas, profile } from "@/lib/portfolio/profile";
import { TypedDescriptor } from "./typed-descriptor";

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait-stage" data-reveal data-reveal-delay="2">
      <div className="portrait-plane" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {profile.portrait.src && !failed && (
        // Plain img preserves transparent cutouts without an image service.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="profile-portrait"
          src={profile.portrait.src}
          alt={profile.portrait.alt}
          width={720}
          height={960}
          fetchPriority="high"
          onError={() => setFailed(true)}
          style={{
            objectPosition: profile.portrait.objectPosition,
            transform: `scale(${profile.portrait.scale})`,
          }}
        />
      )}
      <div className="portrait-caption">
        <span className="eyebrow">FULVIAN / SOFTWARE ENGINEERING</span>
        <span className="portrait-cross" aria-hidden="true">
          +
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-kicker" data-reveal>
          <p className="eyebrow">
            <span className="status-dot" /> SOFTWARE ENGINEERING, ANALYSIS &
            QUALITY
          </p>
          <span className="eyebrow hero-edition">
            PERSONAL PORTFOLIO / V.02
          </span>
        </div>
        <div className="hero">
          <div className="hero-main">
            <p className="hero-greeting" data-reveal>Hi, I’m Fulvian.</p>
            <h1 id="hero-title">
              I build.
              <br />
              <span>I test.</span>
            </h1>
            <TypedDescriptor />
            <p className="hero-description" data-reveal data-reveal-delay="1">
              From understanding requirements to delivering software. I connect
              analysis, coordination, development, and quality throughout the
              process.
            </p>
            <div className="hero-actions" data-reveal data-reveal-delay="2">
              <a href="#projects" className="button primary">
                Explore My Work <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <a href="#contact" className="text-link">
                Let’s Connect <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            {profile.cv && (
              <a className="cv-link text-link" href={profile.cv} download>
                Download CV <Download size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          <Portrait />
          <aside className="hero-focus" aria-label="Professional focus" data-reveal data-reveal-delay="3">
            <span className="focus-mark" aria-hidden="true">
              ↗
            </span>
            <p className="eyebrow">A CONNECTED APPROACH</p>
            <p className="focus-intro">
              Good software starts with understanding.
              <br />
              And gets better with iteration.
            </p>
            <ol>
              {focusAreas.map((area, i) => (
                <li key={area.title}>
                  <span className="eyebrow">0{i + 1}</span>
                  <span>{area.title}</span>
                </li>
              ))}
            </ol>
            <a href="#focus" className="text-link">
              How I work <ArrowDown size={15} aria-hidden="true" />
            </a>
          </aside>
        </div>
        <div className="hero-footnote" data-reveal>
          <p>
            {profile.name}
            <span>{profile.university}</span>
          </p>
          <a href="#projects" className="eyebrow">
            SCROLL TO EXPLORE <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
