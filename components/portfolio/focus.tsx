import { Braces, Layers3, ShieldCheck, Waypoints } from "lucide-react";
import { focusAreas } from "@/lib/portfolio/profile";
import { SectionHeading } from "./section-heading";

const icons = [Layers3, Braces, ShieldCheck, Waypoints];
export function Focus() {
  return (
    <section
      id="focus"
      className="section focus-section container"
      aria-labelledby="focus-title"
    >
      <SectionHeading
        number="01"
        label="PROFESSIONAL FOCUS"
        id="focus-title"
        description="A technical foundation that connects the problem, the people, and the implementation."
      >
        The whole process.
        <br />
        <span>Thoughtfully connected.</span>
      </SectionHeading>
      <div className="focus-grid">
        {focusAreas.map((area, i) => {
          const Icon = icons[i];
          return (
            <article key={area.title} data-reveal data-reveal-delay={i}>
              <div className="focus-card-top">
                <Icon size={23} aria-hidden="true" />
                <span className="eyebrow">0{i + 1}</span>
              </div>
              <h3>{area.title}</h3>
              <p className="focus-short">{area.short}</p>
              <p>{area.description}</p>
            </article>
          );
        })}
      </div>
      <p className="principles" data-reveal>
        <span>Clarity before complexity.</span>
        <span>Evidence over claims.</span>
        <span>Progress through iteration.</span>
      </p>
    </section>
  );
}
