import { LINKS, type Content, type Lang } from './content'
import { useLang } from './useLang'
import { GoldenRecord } from './components/GoldenRecord'
import { DataPath } from './components/DataPath'

const SECTION_IDS = {
  projects: 'projets',
  caseStudy: 'onbor',
  experience: 'experience',
  skills: 'competences',
  contact: 'contact',
} as const

const PROJECT_ANCHOR = 'projet-counterparty'

export default function App() {
  const { content, setLang } = useLang()

  return (
    <>
      <a href="#contenu" className="skip-link">
        {content.nav.skip}
      </a>
      <Header nav={content.nav} onSwitch={setLang} />
      <main id="contenu" tabIndex={-1}>
        <Hero content={content} />
        <Projects projects={content.projects} />
        <CaseStudySection study={content.caseStudy} />
        <Experience experience={content.experience} caseStudyLink={content.caseStudy.readLink} />
        <Skills skills={content.skills} education={content.education} />
        <Contact contact={content.contact} cvHref={content.hero.cvHref} />
      </main>
      <footer className="shell py-10 text-sm text-muted">
        <p>{content.footer}</p>
      </footer>
    </>
  )
}

function Header({ nav, onSwitch }: { nav: Content['nav']; onSwitch: (lang: Lang) => void }) {
  return (
    <header className="shell flex items-center justify-between gap-6 py-5">
      <a href="#contenu" className="font-bold tracking-tight no-underline">
        Omar Ouchchen
      </a>
      <nav aria-label="Sections" className="flex items-center gap-6">
        <ul className="hidden items-center gap-6 md:flex">
          <li><a className="nav-link" href={`#${SECTION_IDS.projects}`}>{nav.projects}</a></li>
          <li><a className="nav-link" href={`#${SECTION_IDS.experience}`}>{nav.experience}</a></li>
          <li><a className="nav-link" href={`#${SECTION_IDS.skills}`}>{nav.skills}</a></li>
          <li><a className="nav-link" href={`#${SECTION_IDS.contact}`}>{nav.contact}</a></li>
        </ul>
        <button
          type="button"
          className="lang-switch"
          lang={nav.switchTo}
          aria-label={nav.switchLabel}
          onClick={() => onSwitch(nav.switchTo)}
        >
          {nav.switchText}
        </button>
      </nav>
    </header>
  )
}

function Hero({ content }: { content: Content }) {
  const { hero } = content
  return (
    <section className="shell hero" aria-labelledby="hero-title">
      <div className="hero-text">
        <h1 id="hero-title" className="hero-name" translate="no">
          Omar Ouchchen
        </h1>
        <p className="hero-role">{hero.role}</p>
        <p className="hero-pitch">{hero.pitch}</p>
        <p className="hero-status">{hero.status}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button button-primary" href={`#${SECTION_IDS.projects}`}>
            {hero.ctaProjects}
          </a>
          <a className="button button-secondary" href={hero.cvHref} download>
            {hero.ctaCv}
          </a>
        </div>
      </div>
      <GoldenRecord record={content.record} projectHref={`#${PROJECT_ANCHOR}`} />
    </section>
  )
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="section-title">
      {children}
    </h2>
  )
}

function Projects({ projects }: { projects: Content['projects'] }) {
  return (
    <section className="shell section" aria-labelledby={SECTION_IDS.projects}>
      <SectionTitle id={SECTION_IDS.projects}>{projects.title}</SectionTitle>
      <p className="section-intro">{projects.intro}</p>
      <div className="mt-10">
        {projects.items.map((project, i) => (
          <article key={project.url} id={i === 0 ? PROJECT_ANCHOR : undefined} className="ledger-row project">
            <h3 className="project-name">{project.name}</h3>
            <p className="project-summary">{project.summary}</p>
            <DataPath label={`${projects.flowLabel}, ${project.name}`} steps={project.flow} />
            <div className="project-foot">
              <p className="text-muted">{project.stack}</p>
              <a className="text-link" href={project.url} rel="noopener">
                {projects.codeLink}
                <span className="sr-only">, {project.name}</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Onbor has no public code, so instead of a project row it gets a full case study:
// the problem, the multi-actor workflow, the architecture and the governance layer.
function CaseStudySection({ study }: { study: Content['caseStudy'] }) {
  return (
    <section className="shell section" aria-labelledby={SECTION_IDS.caseStudy}>
      <SectionTitle id={SECTION_IDS.caseStudy}>{study.title}</SectionTitle>
      <p className="case-meta">{study.meta}</p>
      <p className="case-tagline">{study.tagline}</p>
      <p className="section-intro">{study.lead}</p>

      <dl className="case-brief">
        {study.brief.map((item) => (
          <div key={item.term}>
            <dt className="font-bold">{item.term}</dt>
            <dd className="case-brief-text">{item.text}</dd>
          </div>
        ))}
      </dl>

      <ul className="case-figures">
        {study.figures.map((figure) => (
          <li key={figure.label} className="case-figure">
            <span className="case-figure-value">{figure.value}</span>{' '}
            <span className="case-figure-label">{figure.label}</span>
          </li>
        ))}
      </ul>

      <h3 className="case-subtitle">{study.stepsTitle}</h3>
      <ol className="case-steps">
        {study.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="case-note">{study.stepsNote}</p>

      <div className="case-columns">
        <div>
          <h3 className="case-subtitle mt-0">{study.architectureTitle}</h3>
          <dl className="mt-5">
            {study.architecture.map((row) => (
              <div key={row.layer} className="ledger-row facts-row">
                <dt className="font-semibold">{row.layer}</dt>
                <dd>{row.tech}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="case-subtitle mt-0">{study.governanceTitle}</h3>
          <ul className="mt-5">
            {study.governance.map((item) => (
              <li key={item.name} className="ledger-row case-gov">
                <p className="font-semibold">{item.name}</p>
                <p className="case-gov-text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="case-role">
        <h3 className="case-subtitle mt-0">{study.roleTitle}</h3>
        <p className="case-role-text">{study.role}</p>
        <p className="case-role-foot">
          <a className="text-link" href={`#${SECTION_IDS.experience}`}>
            {study.roleLink}
          </a>
          <span className="text-muted">{study.privacy}</span>
        </p>
      </div>
    </section>
  )
}

function Experience({ experience, caseStudyLink }: { experience: Content['experience']; caseStudyLink: string }) {
  return (
    <section className="shell section" aria-labelledby={SECTION_IDS.experience}>
      <SectionTitle id={SECTION_IDS.experience}>{experience.title}</SectionTitle>
      <ol className="mt-10">
        {experience.items.map((job) => (
          <li key={job.org} className="ledger-row job">
            <p className="job-dates">
              <time dateTime={job.start}>{job.dates}</time>
            </p>
            <div>
              <h3 className="job-org">{job.org}</h3>
              <p className="job-role">
                {job.role}, {job.place}
              </p>
              {job.intro ? <p className="job-intro">{job.intro}</p> : null}
              {job.caseStudy ? (
                <p className="mt-3">
                  <a className="text-link" href={`#${SECTION_IDS.caseStudy}`}>
                    {caseStudyLink}
                  </a>
                </p>
              ) : null}
              <ul className="job-points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{job.stack}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Skills({ skills, education }: { skills: Content['skills']; education: Content['education'] }) {
  return (
    <section className="shell section skills" aria-labelledby={SECTION_IDS.skills}>
      <div>
        <SectionTitle id={SECTION_IDS.skills}>{skills.title}</SectionTitle>
        <dl className="mt-8">
          {skills.groups.map((group) => (
            <div key={group.name} className="ledger-row facts-row">
              <dt className="font-semibold">{group.name}</dt>
              <dd>{group.items}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h2 className="section-title">{education.title}</h2>
        <ul className="mt-8">
          {education.items.map((item) => (
            <li key={item.title} className="ledger-row">
              <p className="font-semibold">{item.title}</p>
              <p className="text-muted">
                {item.school}, {item.dates}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-lg font-bold">{education.languagesTitle}</h3>
        <p className="mt-2">{education.languages}</p>
      </div>
    </section>
  )
}

function Contact({ contact, cvHref }: { contact: Content['contact']; cvHref: string }) {
  return (
    <section className="shell section" aria-labelledby={SECTION_IDS.contact}>
      <SectionTitle id={SECTION_IDS.contact}>{contact.title}</SectionTitle>
      <p className="section-intro">{contact.text}</p>
      <p className="mt-8">
        <span className="sr-only">{contact.emailLabel} </span>
        <a className="contact-email" href={LINKS.email} translate="no">
          {contact.email}
        </a>
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        <li><a className="text-link" href={LINKS.linkedin} rel="noopener">{contact.linkedin}</a></li>
        <li><a className="text-link" href={LINKS.github} rel="noopener">{contact.github}</a></li>
        <li><a className="text-link" href={cvHref} download>{contact.cv}</a></li>
      </ul>
    </section>
  )
}
