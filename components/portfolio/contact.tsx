import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/portfolio/profile";

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <p className="eyebrow" data-reveal>06 / START A CONVERSATION</p>
        <div className="contact-layout">
          <div data-reveal>
            <h2 id="contact-title">
              Good software.
              <br />
              <span>Starts with a conversation.</span>
            </h2>
            <p>
              Let’s talk about requirements, development, quality,
              <br className="desktop-break" /> or the research behind this work.
            </p>
            <div className="social-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub / Source <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {profile.linkedIn && (
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {profile.cv && (
                <a href={profile.cv} download>
                  Download CV <Download size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <div className="contact-links" data-reveal data-reveal-delay="1">
            {profile.emails.map((email) => (
              <a href={`mailto:${email.address}`} key={email.address}>
                <span>{email.label}</span>
                <strong>{email.address}</strong>
                <ArrowUpRight size={23} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="container site-footer">
      <Link className="wordmark" href="/" aria-label="Fulvian home">
        fulvian<span>.</span>
      </Link>
      <p>{profile.name}</p>
      <a href="#main">Back to top ↑</a>
    </footer>
  );
}
