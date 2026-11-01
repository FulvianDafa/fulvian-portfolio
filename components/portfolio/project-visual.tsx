/* Abstract CSS diagrams, not product screenshots. */
import type { Project } from "@/lib/portfolio/types";

export function ProjectVisual({ project }: { project: Project }) {
  if (project.preview)
    return (
      <figure className="project-preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.preview.src}
          alt={project.preview.alt}
          width={1200}
          height={750}
          loading="lazy"
        />
        <figcaption>{project.preview.caption}</figcaption>
      </figure>
    );
  return (
    <div className={`project-visual visual-${project.id}`} aria-hidden="true">
      <div className="visual-meta">
        <span>STUDY / {project.id}</span>
        <span>CONCEPT DIAGRAM</span>
      </div>
      {project.id === "01" && (
        <div className="lims-graphic">
          <span className="diagram-node">REQUIREMENTS</span>
          <span className="diagram-connector" />
          <span className="diagram-center">
            LIMS<span>DOCUMENT WORKFLOW</span>
          </span>
          <span className="diagram-connector" />
          <div className="diagram-pair">
            <span className="diagram-node">TRACK</span>
            <span className="diagram-node">VALIDATE</span>
          </div>
        </div>
      )}
      {project.id === "02" && (
        <div className="sapi-graphic">
          <span className="sapi-monogram">
            sba<span>↗</span>
          </span>
          <div className="sapi-flow">
            <span>CATALOG</span>
            <i />
            <span>CONVERSATION</span>
          </div>
          <span className="sapi-caption">SAPI BERKAH AMANAH</span>
        </div>
      )}
      {project.id === "03" && (
        <div className="archive-graphic">
          <span className="archive-sheet sheet-back" />
          <span className="archive-sheet sheet-middle" />
          <span className="archive-sheet sheet-front">
            <span className="archive-label">DOCUMENT / ARCHIVE</span>
            <span className="archive-lines" />
            <span className="archive-plus">+</span>
          </span>
          <span className="archive-caption">ORGANIZE. RETRIEVE.</span>
        </div>
      )}
      {project.id === "04" && (
        <div className="healing-graphic">
          <span className="healing-source">
            locator<span className="broken-path">×</span>
          </span>
          <div className="healing-matcher">
            <span>SIMILARITY MATCHING</span>
            <div>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>filter → score → recover</strong>
          </div>
          <span className="healing-caption">RECOVERY ≠ CORRECTNESS</span>
        </div>
      )}
    </div>
  );
}
