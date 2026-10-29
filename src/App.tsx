import { useState } from "react";
import { interests, projects, statedTechnologies, traceableProjects } from "./content";
import TraceSystem from "./TraceSystem";

const navigation = [
  { id: "work", label: "Work" },
  { id: "experiments", label: "Experiments" },
  { id: "about", label: "About" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [traceProjectId, setTraceProjectId] = useState<(typeof traceableProjects)[number]["id"]>("medistock");
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  function openProject(projectId: string) {
    const project = document.getElementById(projectId);
    if (!project) return;
    setOpenProjectId(projectId);
    project.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Prafful Katta, top">
          <span className="wordmark-mark" aria-hidden="true">PK</span>
          <span>Prafful Katta</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>{item.label}</a>
          ))}
        </nav>
      </header>

      <main id="main-content">
        <section className="hero page-width" id="top" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span>ENGINEERING / BUILD NOTES</span>
            <span className="hero-kicker-line" />
            <span>AN OPEN COLLECTION</span>
          </div>
          <div className="hero-layout">
            <div className="hero-primary">
              <h1 id="hero-title">I build.<br />I investigate.<br /><span>I improve.</span></h1>
              <p className="hero-description">
                An evolving collection of engineering projects, experiments, and things
                I’ve learned by building them.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#work">Explore the work <span aria-hidden="true">↘</span></a>
                <a className="secondary-link" href="#about">About me <span aria-hidden="true">↘</span></a>
              </div>
            </div>
            <aside className="hero-index" aria-label="About this collection">
              <p className="index-label">A NOTE ON THIS COLLECTION</p>
              <p>Projects are shown through the decisions and evidence available—not a list of claims.</p>
              <div className="index-entries">
                <a href="#work"><span>01</span> Systems <span aria-hidden="true">↗</span></a>
                <a href="#experiments"><span>02</span> Experiments <span aria-hidden="true">↗</span></a>
                <a href="#about"><span>03</span> Current interests <span aria-hidden="true">↗</span></a>
              </div>
            </aside>
          </div>
          <div className="hero-bottomline"><span>FIELD NOTES / 2026</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="page-width trace-section" id="trace" aria-labelledby="trace-title">
          <div className="section-lead">
            <p className="section-number">01 / TRACE A SYSTEM</p>
            <div>
              <h2 id="trace-title">Choose a component.<br /><span>Follow what is known.</span></h2>
              <p className="section-intro">
                Explore the reported structure of two projects. Select a component to see
                its stated role and technologies. Unverified paths stay marked as unknown.
              </p>
            </div>
          </div>
          <TraceSystem
            projectId={traceProjectId}
            onProjectChange={setTraceProjectId}
            onOpenProject={openProject}
          />
        </section>

        <section className="page-width work-section" id="work" aria-labelledby="work-title">
          <div className="section-lead">
            <p className="section-number">02 / SELECTED WORK</p>
            <div>
              <h2 id="work-title">Projects in progress,<br /><span>notes in context.</span></h2>
              <p className="section-intro">
                A small index of the work described so far. Open an entry for its approach,
                decisions, and the details that still need source review.
              </p>
            </div>
          </div>
          <div className="project-index">
            {projects.map((project) => (
              <article className={openProjectId === project.id ? "project-row is-expanded" : "project-row"} id={project.id} key={project.id}>
                <span className="project-number">{project.number}</span>
                <div className="project-main">
                  <p className="project-status">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="project-tech" aria-label={`${project.title} technologies from the supplied brief`}>
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
                <div className="project-actions">
                  {project.traceId && (
                    <button className="inline-link trace-link" type="button" onClick={() => {
                      if (project.traceId) setTraceProjectId(project.traceId);
                      document.getElementById("trace")?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                        block: "start",
                      });
                    }}>
                      Trace system <span aria-hidden="true">↗</span>
                    </button>
                  )}
                  <details
                    open={openProjectId === project.id}
                    onToggle={(event) => {
                      setOpenProjectId(event.currentTarget.open ? project.id : null);
                    }}
                  >
                    <summary>Open project notes <span aria-hidden="true">＋</span></summary>
                    <div className="project-detail">
                      <p className="evidence-line"><span>Evidence</span>{project.evidence}</p>
                      <div className="project-detail-grid">
                        <div>
                          <h4>The problem</h4>
                          <p>{project.problem}</p>
                          <h4>The approach</h4>
                          <p>{project.approach}</p>
                        </div>
                        <div>
                          <h4>Decisions in the brief</h4>
                          {project.decisions.length > 0
                            ? <ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
                            : <p>No implementation decisions have been verified yet.</p>}
                          <h4>Still to verify</h4>
                          <ul>{project.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
                        </div>
                      </div>
                      <p className="project-links-note">Source code, screenshots, and a live demo were not supplied.</p>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-width experiments-section" id="experiments" aria-labelledby="experiments-title">
          <div className="section-lead">
            <p className="section-number">03 / EXPERIMENT LOG</p>
            <div>
              <h2 id="experiments-title">A record of what changed.</h2>
              <p className="section-intro">
                Short notes on what was tried, what happened, and what the result changed.
              </p>
            </div>
          </div>
          <div className="empty-log">
            <span className="empty-log-index">LOG / 000</span>
            <div>
              <h3>No verified experiments recorded yet.</h3>
              <p>
                No dated debugging or experiment history was included with the available
                project notes. This log will grow from real work, not invented case studies.
              </p>
            </div>
          </div>
        </section>

        <section className="page-width about-section" id="about" aria-labelledby="about-title">
          <div className="section-lead">
            <p className="section-number">04 / ABOUT</p>
            <div>
              <h2 id="about-title">Building is a way<br /><span>to find the next question.</span></h2>
            </div>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I’m interested in the boundary between an idea and the systems that make it
                usable—especially backend behavior, infrastructure, and AI. I like building
                something small enough to inspect, then learning from what it actually does.
              </p>
              <p className="about-caveat">These notes describe interests and project-brief details, not a claim of professional experience.</p>
            </div>
            <div className="about-index">
              <div>
                <h3>Currently exploring</h3>
                <ul className="interest-list">{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
              </div>
              <div>
                <h3>Technologies named in project notes</h3>
                <ul className="tech-list">{statedTechnologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              </div>
              <p className="contact-note">Résumé, GitHub, and direct contact details were not available in the supplied files.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <a className="wordmark" href="#top"><span className="wordmark-mark">PK</span><span>Prafful Katta</span></a>
        <span>BUILD NOTES / 2026</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}

export default App;
