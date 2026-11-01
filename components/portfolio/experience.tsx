export function Experience() {
  return (
    <section
      id="experience"
      className="section container experience-section"
      aria-labelledby="experience-title"
    >
      <div className="experience-heading" data-reveal>
        <p className="eyebrow">04 / EXPERIENCE</p>
        <h2 id="experience-title">
          Across testing,
          <br />
          systems, <span>and teams.</span>
        </h2>
        <p>
          My work connects technical implementation with the people who rely on
          it.
        </p>
      </div>
      <div className="experience-list">
        <article data-reveal>
          <span className="experience-index">01</span>
          <div>
            <p className="eyebrow">PT RAGDALION REVOLUSI INDUSTRI</p>
            <h3>SQA Intern</h3>
            <p>
              Performed manual testing and test automation using Katalon Studio,
              prepared UAT documentation and a user manual, collaborated with
              developers on debugging, and communicated with the client during
              UAT.
            </p>
          </div>
        </article>
        <article data-reveal data-reveal-delay="1">
          <span className="experience-index">02</span>
          <div>
            <p className="eyebrow">SLOG POLRI</p>
            <h3>IT Support</h3>
            <p>
              Provided digital and operational support, processed Excel data,
              prepared documents and presentation materials, troubleshot issues,
              and coordinated with internal teams and vendors.
            </p>
          </div>
        </article>
        <article data-reveal data-reveal-delay="2">
          <span className="experience-index">03</span>
          <div>
            <p className="eyebrow">PT RAGDALION REVOLUSI INDUSTRI</p>
            <h3>Web Developer Intern</h3>
            <p>
              Worked on frontend development with React.js, including
              invoice-related UI.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
