"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { filters, projects } from "@/lib/portfolio/projects";
import { ProjectVisual } from "./project-visual";
import { SectionHeading } from "./section-heading";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const visible = projects.filter(
    (project) => filter === "All" || project.disciplines.includes(filter),
  );
  return (
    <section
      id="projects"
      className="section projects-section container"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        number="02"
        label="SELECTED WORK"
        id="projects-title"
        description="A closer look at the context, my contributions, and the outcome of each project."
      >
        Built with purpose.
        <br />
        <span>Tested with care.</span>
      </SectionHeading>
      <div className="filter-bar" data-reveal>
        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="filters"
        >
          {filters.map((discipline) => (
            <button
              key={discipline}
              className={filter === discipline ? "selected" : ""}
              aria-pressed={filter === discipline}
              onClick={() => setFilter(discipline)}
            >
              {discipline}
              <span>
                {discipline === "All"
                  ? projects.length
                  : projects.filter((project) =>
                      project.disciplines.includes(discipline),
                    ).length}
              </span>
            </button>
          ))}
        </div>
        <p className="result-count" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <article key={project.id} className="project-card" data-reveal data-reveal-delay={index % 2}>
            <ProjectVisual project={project} />
            <div className="project-content">
              <p className="category-label">
                {project.category}
                <span>{project.id}</span>
              </p>
              <h3>
                <Link href={`/projects/${project.slug}`} data-cursor="view">{project.title}</Link>
              </h3>
              <p className="project-role">{project.role}</p>
              <p className="project-summary">{project.summary}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link
                className="case-link"
                data-cursor="view"
                href={`/projects/${project.slug}`}
                aria-label={`Explore Project: ${project.title}`}
              >
                Explore Project <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
