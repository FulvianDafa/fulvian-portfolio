"use client";

import { useEffect, useState } from "react";
import { Braces, Check, FlaskConical, Layers3, Mail, Menu, ShieldCheck, Terminal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Project = {
  id: string;
  title: string;
  category: string;
  disciplines: string[];
  context: string;
  role?: string;
  team?: string;
  website?: string;
  roadmap?: string;
  summary: string;
  tags: string[];
  problem: string;
  contribution: string[];
  outcome: string;
  note?: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "Laboratory Information Management System (LIMS)",
    category: "Delivery & quality",
    disciplines: ["Delivery", "Quality"],
    context: "Laboratory system",
    role: "Project Manager & QA",
    summary: "A system for laboratory document tracking and management, shaped through stakeholder requirements, team coordination, and testing.",
    tags: ["Requirement analysis", "System analysis", "Manual testing", "Playwright"],
    problem: "The laboratory needed a system to track and manage documents.",
    contribution: [
      "Discussed and gathered requirements with stakeholders, then performed system analysis.",
      "Coordinated frontend and backend development, project progress, and direct stakeholder communication; occasionally contributed to technical work.",
      "Performed manual testing and built test automation using Playwright.",
      "Presented project progress in Jakarta to 11 stakeholders, including division leadership, and coordinated revisions based on their feedback.",
    ],
    outcome: "Project progress was presented to stakeholders, and revisions were coordinated from their feedback.",
  },
  {
    id: "02",
    title: "Sapi Berkah Amanah",
    category: "Client project",
    disciplines: ["Delivery", "Development"],
    context: "Client project",
    role: "Project Manager & Frontend Developer",
    team: "2 people",
    website: "https://sapiberkahamanah.com",
    roadmap: "A savings/payment-plan style feature for future sacrificial animal purchases is planned.",
    summary: "A client-facing cattle and sacrificial animal catalog, with orders continued through WhatsApp.",
    tags: ["Vue.js", "Laravel backend/admin", "Project coordination"],
    problem: "The client needed a website where customers could browse animals and continue an order conversation.",
    contribution: [
      "Discussed the client's business needs and requirements.",
      "Planned features and coordinated development as Project Manager in a two-person team.",
      "Developed the client-facing frontend using Vue.js; the backend/admin uses Laravel.",
    ],
    outcome: "Customers can browse the animal catalog and continue the ordering process through WhatsApp.",
  },
  {
    id: "03",
    title: "Digital Archive System",
    category: "Full-stack development",
    disciplines: ["Development", "Delivery"],
    context: "Internal system",
    role: "Full-Stack Developer",
    summary: "An independently developed Laravel system for internal document management and archival needs.",
    tags: ["Laravel", "UI/design", "Full-stack development", "Deployment"],
    problem: "An internal team needed a way to manage and archive documents.",
    contribution: [
      "Independently handled requirement understanding and UI/design.",
      "Built the frontend and backend using Laravel, then handled deployment.",
    ],
    outcome: "After implementation, personnel from another section expressed interest in a similar system for their area.",
  },
  {
    id: "04",
    title: "Self-healing Selenium",
    category: "Research",
    disciplines: ["Research", "Quality"],
    context: "Implemented & evaluated",
    summary: "Recovering broken DOM locators with similarity matching, inside the Selenium workflow.",
    tags: ["Java 21", "Selenium", "Maven", "Similarity matching"],
    problem: "A changed element ID or DOM structure can break an automated test even when the application's behavior stays the same.",
    contribution: [
      "Built a WebDriver wrapper with candidate filtering and weighted text, locator, and position similarity.",
      "Implemented element profiles, DOM mutation scenarios, and CSV logging for recovery outcomes.",
      "Evaluated 104 healing attempts across 23 systems under test and collected feedback from two QA practitioners.",
    ],
    outcome: "96 of 104 attempts recovered (92.31% HSR). The 96 accepted recoveries included 11 false positives, giving an FPR of 11.46%.",
    note: "Academic research. Results describe the evaluated dataset, not guaranteed performance on every website.",
  },
];

const filters = ["All", "Delivery", "Development", "Quality", "Research"];
const nav = [{ id: "projects", label: "Projects" }, { id: "research", label: "Research" }, { id: "skills", label: "Skills" }, { id: "experience", label: "Experience" }];

function ProjectDetail({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="case-button" aria-label={"Explore " + project.title}>Explore project <span aria-hidden="true">+</span></button>
      </DialogTrigger>
      <DialogContent className="project-dialog">
        <p className="eyebrow accent">PROJECT {project.id} / {project.category}</p>
        <DialogTitle className="dialog-title">{project.title}</DialogTitle>
        <DialogDescription className="dialog-description">{project.summary}</DialogDescription>
        {(project.role || project.team || project.website) && (
          <div className="project-meta">
            {project.role && <p><span>Role</span><strong>{project.role}</strong></p>}
            {project.team && <p><span>Team</span><strong>{project.team}</strong></p>}
            {project.website && <p><span>Website</span><a href={project.website} target="_blank" rel="noopener noreferrer">sapiberkahamanah.com</a></p>}
          </div>
        )}
        <div className="dialog-body">
          <div><h3>The problem</h3><p>{project.problem}</p></div>
          <div><h3>My work</h3><ul>{project.contribution.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="outcome"><h3>Outcome & scope</h3><p>{project.outcome}</p></div>
          {project.roadmap && <div><h3>Roadmap</h3><p>{project.roadmap}</p></div>}
          {project.note && <p className="scope-note">{project.note}</p>}
          <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-15% 0px -65% 0px" });
    nav.forEach(item => {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const visible = projects.filter(project => filter === "All" || project.disciplines.includes(filter));

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <a className="wordmark" href="#main" aria-label="Fulvian home">fulvian<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <a key={item.id} href={"#" + item.id} aria-current={active === item.id ? "location" : undefined}>{item.label}</a>)}</nav>
      <a className="header-contact" href="#contact">Let’s connect <Mail size={15}/></a>
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogTrigger asChild><button className="mobile-menu" aria-label="Open navigation"><Menu size={23}/></button></DialogTrigger><DialogContent className="nav-dialog"><DialogTitle>Explore the portfolio</DialogTitle><DialogDescription className="sr-only">Navigate to a portfolio section.</DialogDescription><nav aria-label="Mobile navigation">{[...nav, { id: "contact", label: "Contact" }].map(item => <a key={item.id} onClick={() => setMenuOpen(false)} href={"#" + item.id}>{item.label}</a>)}</nav></DialogContent></Dialog>
    </div></header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-title"><div className="hero-main">
        <p className="eyebrow"><span className="tiny-cross" aria-hidden="true">+</span> SOFTWARE ENGINEERING · QUALITY · DELIVERY</p>
        <h1 id="hero-title">Hi, I’m <span>Fulvian.</span><br/>I build.<br/><span className="outline-text">I test.</span></h1>
        <p className="hero-description">A fresh Software Engineering graduate working from requirements and analysis through coordination, development, quality, and delivery.</p>
        <div className="hero-actions"><a href="#projects" className="button primary">Explore my work</a><a href="#contact" className="text-link">Get in touch</a></div>
        <p className="hero-caption">Mochammad Fulvian Dafa Pranaja <span> / </span> Universitas Pendidikan Indonesia</p>
      </div><div className="hero-aside"><div className="evidence-card"><div className="terminal-head"><span><Terminal size={15}/> research / self-healing</span><span className="terminal-label">JAVA + SELENIUM</span></div><div className="code-content" aria-label="Self-healing research approach"><p><span className="code-comment">{"// when the locator changes"}</span></p><p><span className="code-purple">if</span> (locator.isBroken()) {"{"}</p><p className="indent">candidates = <span className="code-lime">filter</span>(dom);</p><p className="indent">target = <span className="code-lime">rank</span>(candidates);</p><p className="indent"><span className="code-purple">return</span> recover(target);</p><p>{"}"}</p></div><div className="evidence-result"><span className="result-icon"><ShieldCheck size={22}/></span><div><span className="result-label">HEALING SUCCESS RATE</span><strong>92.31<span>%</span></strong></div><span className="result-fraction">96 / 104<br/>attempts recovered</span></div><p className="evidence-note">Accepted recoveries include 11 false positives.</p></div><div className="hero-facts"><div><strong>23</strong><span>systems under test</span></div><div><strong>2</strong><span>QA practitioner validators</span></div></div><a href="#research" className="research-caption">A closer look at the research <span aria-hidden="true">+</span></a></div></section>

      <div className="focus-strip"><div className="container"><span><Layers3 size={18}/> Requirements & analysis</span><span><Terminal size={18}/> Project coordination</span><span><Braces size={18}/> Web development</span><span><ShieldCheck size={18}/> Quality assurance</span></div></div>

      <section id="projects" className="section container" aria-labelledby="projects-title"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="projects-title">Built with purpose.<br/><span>Tested with care.</span></h2></div><p>From stakeholder requirements to delivered systems and applied research.<br/>Explore the work and the thinking behind it.</p></div><div className="filter-bar"><div role="group" aria-label="Filter projects by discipline" className="filters">{filters.map(discipline => <button key={discipline} className={filter === discipline ? "selected" : ""} aria-pressed={filter === discipline} onClick={() => setFilter(discipline)}>{discipline}<span>{discipline === "All" ? projects.length : projects.filter(project => project.disciplines.includes(discipline)).length}</span></button>)}</div><p className="result-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"}</p></div><div className="project-grid">{visible.map(project => <article key={project.id} className={"project-card project-" + project.id}><div className="project-top"><span className="project-number">{project.id}</span><span className="project-status">{project.context}</span></div><div className="project-symbol" aria-hidden="true">{project.id === "01" ? <Layers3/> : project.id === "04" ? <ShieldCheck/> : <Braces/>}</div><p className="category-label">{project.category}</p><h3>{project.title}</h3>{project.role && <p className="project-role">{project.role}</p>}<p className="project-summary">{project.summary}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><ProjectDetail project={project}/></article>)}</div></section>

      <section id="research" className="research-section" aria-labelledby="research-title"><div className="container research-layout"><div className="research-intro"><p className="eyebrow accent">02 / RESEARCH SPOTLIGHT</p><h2 id="research-title">When the DOM changes,<br/><span>the test can adapt.</span></h2><p>Implementing self-healing testing in Selenium WebDriver using similarity matching to recover broken DOM locators.</p><div className="research-identity"><FlaskConical size={20}/><div><strong>Undergraduate research · UPI</strong><span>Design Research Methodology (DRM)</span></div></div><div className="research-sut"><p className="eyebrow">PRIMARY SYSTEM UNDER TEST</p><h3>Anugrah Jaya inventory & POS</h3><p>An inventory and cashier application for a building-materials business, used to test real UI changes.</p><p>Developed the web application used as the primary system under test in the self-healing research. Tested interactions across product modals, search fields, transaction controls, and payment inputs. Used 13 DOM-mutation scenarios to evaluate locator recovery on the application.</p><p>All 13 healing scenarios recovered, with 0% false positives and a mean healing time of 2,644.8 ms on this SUT.</p><p className="scope-note">These results apply to Anugrah Jaya&apos;s evaluated scenarios. They are a subset of the broader 23-SUT experiment.</p></div></div><Tabs defaultValue="method" className="research-tabs"><TabsList variant="line" className="research-tab-list"><TabsTrigger value="method">Method</TabsTrigger><TabsTrigger value="results">Results</TabsTrigger><TabsTrigger value="limits">Limits</TabsTrigger></TabsList><TabsContent value="method" className="research-panel"><h3>A small layer. A more adaptive test.</h3><p>A WebDriver wrapper detects a failed lookup, filters compatible candidates, and chooses a replacement using a combined similarity score.</p><div className="weight-chart" aria-label="Similarity weights: text 50 percent, locator 30 percent, position 20 percent"><div style={{width:"50%"}}>Text <strong>50%</strong></div><div style={{width:"30%"}}>Locator <strong>30%</strong></div><div style={{width:"20%"}}>Position <strong>20%</strong></div></div><div className="method-meta"><span>Acceptance threshold <strong>0.50</strong></span><span>Training data required <strong>None</strong></span></div><p className="panel-note">Text scoring combines Levenshtein similarity, token coverage, and substring matching. Available weights are normalized when historical information is missing.</p></TabsContent><TabsContent value="results" className="research-panel"><h3>Measured across 23 systems.</h3><div className="research-stats"><div><strong>92.31%</strong><span>Healing success rate</span></div><div><strong>11.46%</strong><span>False positive rate</span></div><div><strong>11.77 s</strong><span>Mean healing time</span></div><div><strong>5.80 s</strong><span>Median healing time</span></div></div><p className="panel-note">104 attempts; 96 accepted recoveries, including 11 false positives. HSR measures recovery, while FPR separately captures incorrect element selection. Results are from the research dataset.</p><p className="validation-note"><Check size={18}/> Practitioner validation: 92.50% from two QA reviewers.</p></TabsContent><TabsContent value="limits" className="research-panel"><h3>Recovery needs the right context.</h3><ul className="limits-list"><li>Stable labels and compatible elements help the matcher find the intended target.</li><li>Similar attributes, text-free elements, hidden controls, and overlays can lead to incorrect selection.</li><li>Anti-bot protections can prevent execution before healing begins.</li><li>Healing time depends on the DOM, page loading, and network conditions; the experiment does not represent all websites.</li></ul></TabsContent></Tabs></div></section>

      <section id="skills" className="section container" aria-labelledby="skills-title"><div className="section-heading"><div><p className="eyebrow">03 / TOOLKIT</p><h2 id="skills-title">From requirements to release.<br/><span>These are my tools.</span></h2></div><p>Skills grounded in project work,<br/>research, and hands-on experience.</p></div><div className="skills-grid"><div className="skill-column"><ShieldCheck/><h3>Quality Engineering</h3><ul>{["Manual Testing", "Test Automation", "Playwright", "Katalon Studio", "Selenium WebDriver", "UAT", "QA documentation"].map(skill => <li key={skill}>{skill}</li>)}</ul></div><div className="skill-column"><Layers3/><h3>Analysis & Delivery</h3><ul>{["Requirement Analysis", "System Analysis", "Project Coordination", "Stakeholder Communication", "Client Communication"].map(skill => <li key={skill}>{skill}</li>)}</ul></div><div className="skill-column"><Braces/><h3>Web Development</h3><ul>{["Laravel", "Vue.js", "React.js", "Frontend Development", "Full-Stack Development", "Deployment"].map(skill => <li key={skill}>{skill}</li>)}</ul></div></div><p className="skills-research-note">Research practice: Java 21, Apache Maven, locator recovery, experiment logging and CSV analysis, and Design Research Methodology.</p></section>

      <section id="experience" className="section container experience-section" aria-labelledby="experience-title"><div className="experience-heading"><p className="eyebrow">04 / EXPERIENCE</p><h2 id="experience-title">Across testing,<br/>systems, <span>and teams.</span></h2><p>My work connects technical implementation with the people who rely on it.</p></div><div className="experience-list"><article><span className="experience-index">01</span><div><p className="eyebrow">PT RAGDALION REVOLUSI INDUSTRI</p><h3>SQA Intern</h3><p>Performed manual testing and test automation using Katalon Studio, prepared UAT documentation and a user manual, collaborated with developers on debugging, and communicated with the client during UAT.</p></div></article><article><span className="experience-index">02</span><div><p className="eyebrow">SLOG POLRI</p><h3>IT Support</h3><p>Provided digital and operational support, processed Excel data, prepared documents and presentation materials, troubleshot issues, and coordinated with internal teams and vendors.</p></div></article><article><span className="experience-index">03</span><div><p className="eyebrow">PT RAGDALION REVOLUSI INDUSTRI</p><h3>Web Developer Intern</h3><p>Worked on frontend development with React.js, including invoice-related UI.</p></div></article></div></section>

      <section id="contact" className="contact-section"><div className="container"><p className="eyebrow accent">05 / CONTACT</p><div className="contact-layout"><div><h2>Let’s talk<br/>about <span>good software.</span></h2><p>For conversations about software projects, quality,<br/>development, or the research behind this portfolio.</p></div><div className="contact-links"><a href="mailto:fulviandafa23@gmail.com"><span>Personal email</span><strong>fulviandafa23@gmail.com</strong><Mail size={21}/></a><a href="mailto:fulvian.dafa23@upi.edu"><span>Academic email</span><strong>fulvian.dafa23@upi.edu</strong><Mail size={21}/></a></div></div></div></section>
    </main>
    <footer className="container site-footer"><a className="wordmark" href="#main">fulvian<span>.</span></a><p>Mochammad Fulvian Dafa Pranaja</p><span>Software engineering. Quality. Delivery.</span></footer>
  </>;
}
