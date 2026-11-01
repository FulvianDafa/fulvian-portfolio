import { skillGroups } from "@/lib/portfolio/profile";
import { SectionHeading } from "./section-heading";

export function Skills() {
  return (
    <section
      id="skills"
      className="section skills-section container"
      aria-labelledby="skills-title"
    >
      <SectionHeading
        number="05"
        label="SKILLS & TOOLS"
        id="skills-title"
        description="Grounded in project work, research, and hands-on experience. Each case study explains my scope."
      >
        A practical toolkit.
        <br />
        <span>An iterative mindset.</span>
      </SectionHeading>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <article className="skill-column" key={group.title} data-reveal data-reveal-delay={i}>
            <span className="eyebrow accent">0{i + 1}</span>
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
