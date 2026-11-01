import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio/projects";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/contact";
import { ProjectVisual } from "@/components/portfolio/project-visual";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project
      ? `${project.title} — Fulvian`
      : "Project not found — Fulvian",
    description: project?.summary,
    robots: { index: false, follow: false },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <Header />
      <main id="main" className="case-study container" tabIndex={-1}>
        <Link href="/#projects" className="back-link">
          <ArrowLeft size={17} aria-hidden="true" /> Back to selected work
        </Link>
        <header className="case-header">
          <p className="eyebrow accent">
            CASE STUDY / {project.id} / {project.category}
          </p>
          <h1>{project.title}</h1>
          <p className="case-summary">{project.summary}</p>
          <dl className="case-meta">
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{project.context}</dd>
            </div>
            {project.team && (
              <div>
                <dt>Team</dt>
                <dd>{project.team}</dd>
              </div>
            )}
            {project.website && (
              <div>
                <dt>Project website</dt>
                <dd>
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>
        <ProjectVisual project={project} />
        <div className="case-layout">
          <nav className="case-toc" aria-label="Case study contents">
            <p className="eyebrow">IN THIS STUDY</p>
            {[
              "Overview",
              "Problem",
              "My Role",
              "Approach",
              "My Contributions",
              "Outcome",
              "Technology",
              "Limitations & Current Status",
            ].map((title, i) => (
              <a key={title} href={`#study-${i}`}>
                {title}
              </a>
            ))}
          </nav>
          <div className="case-body">
            <section id="study-0">
              <p className="eyebrow">01 / OVERVIEW</p>
              <h2>The context.</h2>
              <p>{project.summary}</p>
            </section>
            <section id="study-1">
              <p className="eyebrow">02 / PROBLEM</p>
              <h2>What needed to change.</h2>
              <p>{project.problem}</p>
            </section>
            <section id="study-2">
              <p className="eyebrow">03 / MY ROLE</p>
              <h2>{project.role}</h2>
              <p>{project.roleDescription}</p>
            </section>
            <section id="study-3">
              <p className="eyebrow">04 / APPROACH</p>
              <h2>From understanding to validation.</h2>
              <p>{project.approach}</p>
              {project.id === "04" && (
                <p>
                  Similarity weights: text 50%, locator 30%, position 20%.
                  Acceptance threshold: 0.50. Text scoring combines Levenshtein
                  similarity, token coverage, and substring matching. Available
                  weights are normalized when historical information is missing.
                </p>
              )}
            </section>
            <section id="study-4">
              <p className="eyebrow">05 / MY CONTRIBUTIONS</p>
              <h2>The work I carried out.</h2>
              <ul>
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section id="study-5" className="case-outcome">
              <p className="eyebrow">06 / OUTCOME</p>
              <h2>What the evidence shows.</h2>
              <p>{project.outcome}</p>
              {project.id === "04" && (
                <>
                  <p>
                    HSR = accepted recoveries / healing attempts (96 / 104). FPR
                    = false positives / accepted recoveries (11 / 96). An
                    accepted recovery can still select the wrong element.
                  </p>
                  <p>
                    Mean healing time: 11.77 s; median: 5.80 s. Practitioner
                    validation: 92.50% from two QA reviewers.
                  </p>
                  <Link href="/#research" className="text-link">
                    Read the research spotlight{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </>
              )}
            </section>
            <section id="study-6">
              <p className="eyebrow">07 / TECHNOLOGY</p>
              <h2>Tools in context.</h2>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="scope-note">
                Project technologies are listed for context. My personal
                contribution is described in the role and contributions above.
              </p>
            </section>
            <section id="study-7">
              <p className="eyebrow">08 / LIMITATIONS & CURRENT STATUS</p>
              <h2>The scope of this work.</h2>
              <p>{project.status}</p>
              {project.note && <p>{project.note}</p>}
              {project.roadmap && (
                <p>
                  <strong>Roadmap:</strong> {project.roadmap}
                </p>
              )}
              {project.id === "04" && (
                <p>
                  Similar attributes, text-free elements, hidden controls, and
                  overlays can cause incorrect selection. Anti-bot protections
                  can block execution before healing. DOM complexity, page
                  loading, and network conditions affect healing time.
                </p>
              )}
            </section>
          </div>
        </div>
        <nav className="case-pagination" aria-label="More projects">
          <Link href="/#projects">
            <ArrowLeft size={18} aria-hidden="true" /> All selected work
          </Link>
          <Link href={`/projects/${next.slug}`}>
            <span>
              <small>Next study</small>
              {next.title}
            </span>
            <ArrowRight size={22} aria-hidden="true" />
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
