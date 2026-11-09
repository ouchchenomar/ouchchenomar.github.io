// Every fact on this site comes from Omar's CV (FR and EN, November 2026), his GitHub
// profile README, or the Onbor case study he wrote for his previous site (checked
// against the CV; internal bank acronyms and the MLOps layer left out). Nothing here
// is invented: edit this file to change the site.

export type Lang = 'fr' | 'en'

export interface Cell {
  value: string | null
  /** Highlighted in red before the quality rules run. */
  defect?: boolean
}

export interface SourceRow {
  label: string
  cells: [Cell, Cell, Cell]
}

export interface Project {
  name: string
  url: string
  summary: string
  flow: string[]
  stack: string
}

export interface Job {
  org: string
  place: string
  role: string
  dates: string
  start: string
  intro?: string
  /** Links to the Onbor case study section. */
  caseStudy?: boolean
  points: string[]
  stack: string
}

export interface CaseStudy {
  title: string
  meta: string
  tagline: string
  lead: string
  brief: { term: string; text: string }[]
  figures: { value: string; label: string }[]
  stepsTitle: string
  steps: string[]
  stepsNote: string
  architectureTitle: string
  architecture: { layer: string; tech: string }[]
  governanceTitle: string
  governance: { name: string; text: string }[]
  roleTitle: string
  role: string
  roleLink: string
  privacy: string
  readLink: string
}

export interface Content {
  meta: { title: string; description: string }
  nav: {
    skip: string
    projects: string
    experience: string
    skills: string
    contact: string
    switchTo: Lang
    switchLabel: string
    switchText: string
  }
  hero: {
    role: string
    pitch: string
    status: string
    ctaProjects: string
    ctaCv: string
    cvHref: string
  }
  record: {
    caption: string
    fields: [string, string, string]
    sourceHeader: string
    sources: SourceRow[]
    empty: string
    rules: { name: string; note: string }[]
    goldenLabel: string
    golden: { name: string; role: string; city: string; status: string }
    replay: string
    note: string
    noteLink: string
  }
  projects: { title: string; intro: string; flowLabel: string; codeLink: string; items: Project[] }
  caseStudy: CaseStudy
  experience: { title: string; items: Job[] }
  skills: { title: string; groups: { name: string; items: string }[] }
  education: {
    title: string
    items: { title: string; school: string; dates: string }[]
    languagesTitle: string
    languages: string
  }
  contact: { title: string; text: string; emailLabel: string; email: string; linkedin: string; github: string; cv: string }
  footer: string
}

const EMAIL = 'ouchcheno@gmail.com'

/** Files in public/, resolved against the deploy base (GitHub Pages may serve the site under a sub-path). */
export const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`

export const LINKS = {
  email: `mailto:${EMAIL}`,
  linkedin: 'https://www.linkedin.com/in/omar-ouchchen-11b579221',
  github: 'https://github.com/ouchchenomar',
}

const fr: Content = {
  meta: {
    title: 'Omar Ouchchen, Data Engineer junior',
    description:
      "Data Engineer junior à Casablanca : pipelines Python/SQL, Airflow, dbt, PostgreSQL, qualité et gouvernance des données pour la finance.",
  },
  nav: {
    skip: 'Aller au contenu',
    projects: 'Projets',
    experience: 'Expérience',
    skills: 'Compétences',
    contact: 'Contact',
    switchTo: 'en',
    switchLabel: 'Read this site in English',
    switchText: 'English',
  },
  hero: {
    role: 'Data Engineer junior',
    pitch:
      "Je construis des pipelines de données fiables, de l’ingestion au reporting, avec une attention particulière à la qualité et à la gouvernance des données, en particulier dans la finance.",
    status:
      "Ingénieur d’État de l’ESI Rabat (2026), stage de fin d’études chez Attijariwafa Bank, CIB. Je cherche un CDI en Data Engineering.",
    ctaProjects: 'Voir mes projets',
    ctaCv: 'Télécharger mon CV (PDF)',
    cvHref: asset('CV-Omar-Ouchchen-FR.pdf'),
  },
  record: {
    caption: 'Trois sources décrivent la même personne. Quatre règles qualité les fusionnent en un enregistrement de référence.',
    fields: ['Nom', 'Poste', 'Ville'],
    sourceHeader: 'Source',
    sources: [
      {
        label: 'CV',
        cells: [{ value: 'OUCHCHEN Omar', defect: true }, { value: 'Data Engineer junior' }, { value: 'Casablanca, Maroc' }],
      },
      {
        label: 'LinkedIn',
        cells: [{ value: 'Omar Ouchchen' }, { value: 'data engineer', defect: true }, { value: 'casablanca', defect: true }],
      },
      {
        label: 'GitHub',
        cells: [{ value: 'ouchchenomar', defect: true }, { value: null }, { value: null }],
      },
    ],
    empty: 'vide',
    rules: [
      { name: 'Complétude', note: 'champs vides repris de la meilleure source' },
      { name: 'Cohérence', note: 'casse et formats harmonisés' },
      { name: 'Validité', note: 'poste et ville reconnus' },
      { name: 'Unicité', note: '3 lignes, 1 seule personne' },
    ],
    goldenLabel: 'Enregistrement de référence',
    golden: {
      name: 'Omar Ouchchen',
      role: 'Data Engineer junior',
      city: 'Casablanca, Maroc',
      status: 'Ouvert à un CDI',
    },
    replay: 'Rejouer la fusion',
    note: "C’est le principe de mon projet Counterparty Data Platform, appliqué aux contreparties bancaires.",
    noteLink: 'Voir le projet',
  },
  projects: {
    title: 'Projets',
    intro: 'Chaque projet suit la donnée de sa source jusqu’à son usage. Le code est sur GitHub.',
    flowLabel: 'Chemin de la donnée',
    codeLink: 'Voir le code sur GitHub',
    items: [
      {
        name: 'Counterparty Data Platform',
        url: 'https://github.com/ouchchenomar/counterparty-data-platform',
        summary:
          'Référentiel contrepartie : ingestion incrémentale GLEIF, 7 règles qualité testées sur une vérité terrain, golden record et quarantaine.',
        flow: ['API GLEIF', 'Ingestion incrémentale', '7 règles qualité', 'Golden record', 'Quarantaine'],
        stack: 'Python, dbt, DuckDB, Airflow, GitHub Actions',
      },
      {
        name: 'Credit Risk Scoring & Portfolio Monitoring',
        url: 'https://github.com/ouchchenomar/Credit-Risk-Scoring-Portfolio-Monitoring',
        summary:
          'Chaîne de scoring crédit : contrôles qualité, 19 variables, API de scoring, dashboard, 38 tests.',
        flow: ['Contrôles qualité', '19 variables', 'Modèle de scoring', 'API FastAPI', 'Dashboard'],
        stack: 'Python, scikit-learn, FastAPI, Streamlit, Docker',
      },
      {
        name: 'Power BI, suivi des ventes',
        url: 'https://github.com/ouchchenomar/PowerBI_Suivi_Ventes',
        summary:
          'Préparation avec Power Query, modèle en étoile et indicateurs DAX par période, produit, région et statut.',
        flow: ['Power Query', 'Modèle en étoile', 'Mesures DAX', 'Rapport'],
        stack: 'Power BI, Power Query, DAX',
      },
    ],
  },
  caseStudy: {
    title: 'Étude de cas : Onbor',
    meta: 'Attijariwafa Bank, CIB, Salle des Marchés · stage de fin d’études, févr. – juin 2026',
    tagline: 'Des flux manuels dispersés à une plateforme métier pilotée par la donnée.',
    lead:
      'Onbor est un prototype de plateforme interne qui digitalise l’onboarding client en Salle des Marchés : création des dossiers, validations entre plusieurs acteurs, vérification documentaire, contractualisation, signature électronique, suivi des indicateurs et gouvernance des données.',
    brief: [
      {
        term: 'Le problème de départ',
        text: 'Le traitement reposait sur des échanges d’e-mails, de fichiers Excel et de PDF, avec peu de visibilité sur l’état réel des dossiers et une forte charge opérationnelle.',
      },
      {
        term: 'L’objectif',
        text: 'Centraliser le parcours, fiabiliser les contrôles, réduire le travail manuel et donner à chaque rôle des indicateurs utiles.',
      },
    ],
    figures: [
      { value: '5', label: 'tableaux de bord Power BI' },
      { value: '10', label: 'DAGs Airflow' },
      { value: 'RBAC', label: 'droits par rôle et piste d’audit' },
      { value: 'MDM', label: 'référentiel et contrôles qualité' },
    ],
    stepsTitle: 'Le parcours d’un dossier',
    steps: [
      'Brouillon',
      'Revue Front Office',
      'Validation manager',
      'Revue risque',
      'Vérification documentaire et visas',
      'Contractualisation',
      'Signatures client et mandataire',
      'Mise en place Back Office',
    ],
    stepsNote: 'Chaque transition sensible est réservée à un rôle et enregistrée, avec ses commentaires, dans la piste d’audit.',
    architectureTitle: 'Architecture',
    architecture: [
      { layer: 'Backend', tech: 'FastAPI, SQLAlchemy async, Pydantic, migrations Alembic' },
      { layer: 'Interfaces', tech: 'React 19, TypeScript, Vite, Tailwind, Chart.js' },
      { layer: 'Documents', tech: 'MinIO pour les pièces et les documents signés' },
      { layer: 'Signature électronique', tech: 'DocuSeal, avec ses demandes et webhooks de signature' },
      { layer: 'Traitements', tech: 'Airflow et dbt pour les indicateurs, les contrôles et le suivi' },
      { layer: 'Base de données', tech: 'PostgreSQL, organisé en schémas métier, gouvernance et pilotage' },
    ],
    governanceTitle: 'Données et gouvernance',
    governance: [
      {
        name: 'Qualité et conformité',
        text: 'Règles de complétude, cohérence, validité et unicité, vérification documentaire et dédoublonnage, appliquées pendant l’utilisation.',
      },
      {
        name: 'Référentiel et source de vérité',
        text: 'Référentiel contrepartie historisé, catalogue et dictionnaire de données, paramètres gouvernés rechargés à l’exécution.',
      },
      {
        name: 'Indicateurs par rôle',
        text: 'Chaque profil ne voit que les écrans et les indicateurs utiles à son métier, dans l’interface comme dans l’API.',
      },
    ],
    roleTitle: 'Mon rôle',
    role: 'Ma contribution principale porte sur le backend et la donnée : traitements Airflow et dbt, référentiel PostgreSQL en architecture Bronze/Silver/Gold, contrôles qualité, catalogue de données et API FastAPI.',
    roleLink: 'Le détail est dans mon expérience chez Attijariwafa Bank',
    privacy: 'Projet interne à la banque : le code n’est pas public.',
    readLink: 'Lire l’étude de cas Onbor',
  },
  experience: {
    title: 'Expérience',
    items: [
      {
        org: 'Attijariwafa Bank, CIB, Salle des Marchés',
        place: 'Casablanca',
        role: 'Stage de fin d’études : Data Engineering, Data Governance et BI',
        dates: 'févr. – juin 2026',
        start: '2026-02',
        caseStudy: true,
        intro:
          "Projet Onbor : prototype de plateforme interne qui digitalise l’onboarding client en Salle des Marchés, de la saisie aux validations métier. Ma contribution principale porte sur le backend et la donnée.",
        points: [
          'Conçu des traitements Python/SQL orchestrés avec Airflow et transformés avec dbt pour automatiser la préparation des données.',
          'Structuré les dossiers et le référentiel contrepartie sous PostgreSQL, avec une architecture analytique Bronze/Silver/Gold.',
          'Mis en place des contrôles de complétude, cohérence, validité et unicité pour repérer les données manquantes, incohérentes ou dupliquées.',
          'Contribué au catalogue de données intégré à Onbor : types, définitions métier, champs obligatoires, règles qualité, responsables métier et IT.',
          'Développé les API FastAPI reliées aux interfaces React pour la saisie, les tâches et les validations, avec des transitions contrôlées par rôle et une piste d’audit.',
        ],
        stack: 'Python, SQL, FastAPI, PostgreSQL, Airflow, dbt, Docker, React, TypeScript, MinIO, DocuSeal',
      },
      {
        org: 'TAMWILCOM',
        place: 'Rabat',
        role: 'Stage PFA : assistant IA documentaire et API Data',
        dates: 'juil. – août 2025',
        start: '2025-07',
        points: [
          'Développé une chaîne d’ingestion documentaire (extraction PDF, nettoyage, découpage, embeddings, index FAISS) pour recommander des produits financiers.',
          'Exposé les services avec FastAPI, créé une interface Streamlit et conservé les échanges sous MySQL, avec affichage des sources et évaluation des réponses.',
        ],
        stack: 'Python, FastAPI, Streamlit, FAISS, LangChain, Ollama/Mistral, SentenceTransformers, MySQL',
      },
      {
        org: 'Doosys',
        place: 'Rabat',
        role: 'Stage d’initiation : développement Odoo et GED',
        dates: 'juil. – août 2024',
        start: '2024-07',
        points: [
          'Participé à l’analyse des besoins et à la personnalisation d’Odoo pour la gestion documentaire, contribué à l’intégration OCR, aux tests et aux guides utilisateurs.',
        ],
        stack: 'Python, Odoo, PostgreSQL, OCR',
      },
    ],
  },
  skills: {
    title: 'Compétences',
    groups: [
      { name: 'Data Engineering', items: 'Python, SQL, ETL/ELT, Airflow, dbt, DuckDB, FastAPI, Docker, Git, GitHub Actions' },
      { name: 'Modélisation et BI', items: 'PostgreSQL, MySQL, SQL Server, modèle en étoile, Power BI, Power Query, DAX' },
      { name: 'Qualité et gouvernance', items: 'Contrôles qualité, catalogue et dictionnaire de données, golden record, RBAC, piste d’audit' },
      { name: 'IA appliquée', items: 'RAG, FAISS, LangChain, scikit-learn' },
      { name: 'En cours d’apprentissage', items: 'PySpark, Databricks' },
    ],
  },
  education: {
    title: 'Formation',
    items: [
      {
        title: 'Diplôme d’Ingénieur d’État, Ingénierie des Connaissances et Science des Données',
        school: 'École des Sciences de l’Information (ESI), Rabat',
        dates: '2023 – 2026',
      },
      {
        title: 'Classes préparatoires, Mathématiques et Physique',
        school: 'Lycée Prince Moulay Abdellah',
        dates: '2021 – 2023',
      },
    ],
    languagesTitle: 'Langues',
    languages: 'Français courant, anglais professionnel, arabe, amazigh',
  },
  contact: {
    title: 'Contact',
    text: 'Vous recrutez en Data Engineering, en qualité des données ou en conseil data ? Écrivez-moi.',
    emailLabel: 'Écrire à',
    email: EMAIL,
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'CV en PDF',
  },
  footer: 'Omar Ouchchen, 2026',
}

const en: Content = {
  meta: {
    title: 'Omar Ouchchen, Junior Data Engineer',
    description:
      'Junior Data Engineer in Casablanca: Python/SQL pipelines, Airflow, dbt, PostgreSQL, data quality and governance for financial services.',
  },
  nav: {
    skip: 'Skip to content',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
    switchTo: 'fr',
    switchLabel: 'Lire ce site en français',
    switchText: 'Français',
  },
  hero: {
    role: 'Junior Data Engineer',
    pitch:
      'I build reliable data pipelines, from ingestion to reporting, with a focus on data quality and governance, especially in financial services.',
    status:
      'Engineering graduate from ESI Rabat (2026), final-year internship at Attijariwafa Bank, CIB. Looking for a full-time Data Engineering role.',
    ctaProjects: 'See my projects',
    ctaCv: 'Download my CV (PDF)',
    cvHref: asset('CV-Omar-Ouchchen-EN.pdf'),
  },
  record: {
    caption: 'Three sources describe the same person. Four quality rules merge them into one golden record.',
    fields: ['Name', 'Role', 'City'],
    sourceHeader: 'Source',
    sources: [
      {
        label: 'CV',
        cells: [{ value: 'OUCHCHEN Omar', defect: true }, { value: 'Data Engineer junior' }, { value: 'Casablanca, Maroc' }],
      },
      {
        label: 'LinkedIn',
        cells: [{ value: 'Omar Ouchchen' }, { value: 'data engineer', defect: true }, { value: 'casablanca', defect: true }],
      },
      {
        label: 'GitHub',
        cells: [{ value: 'ouchchenomar', defect: true }, { value: null }, { value: null }],
      },
    ],
    empty: 'empty',
    rules: [
      { name: 'Completeness', note: 'empty fields taken from the best source' },
      { name: 'Consistency', note: 'case and formats aligned' },
      { name: 'Validity', note: 'role and city recognised' },
      { name: 'Uniqueness', note: '3 rows, 1 person' },
    ],
    goldenLabel: 'Golden record',
    golden: {
      name: 'Omar Ouchchen',
      role: 'Junior Data Engineer',
      city: 'Casablanca, Morocco',
      status: 'Open to a full-time role',
    },
    replay: 'Replay the merge',
    note: 'That is the idea behind my Counterparty Data Platform project, applied to banking counterparties.',
    noteLink: 'See the project',
  },
  projects: {
    title: 'Projects',
    intro: 'Each project follows the data from its source to where it is used. The code is on GitHub.',
    flowLabel: 'Data path',
    codeLink: 'See the code on GitHub',
    items: [
      {
        name: 'Counterparty Data Platform',
        url: 'https://github.com/ouchchenomar/counterparty-data-platform',
        summary:
          'Counterparty reference data: incremental GLEIF ingestion, 7 quality rules tested against ground truth, golden record and quarantine.',
        flow: ['GLEIF API', 'Incremental ingestion', '7 quality rules', 'Golden record', 'Quarantine'],
        stack: 'Python, dbt, DuckDB, Airflow, GitHub Actions',
      },
      {
        name: 'Credit Risk Scoring & Portfolio Monitoring',
        url: 'https://github.com/ouchchenomar/Credit-Risk-Scoring-Portfolio-Monitoring',
        summary: 'Credit scoring chain: quality checks, 19 features, scoring API, dashboard, 38 tests.',
        flow: ['Quality checks', '19 features', 'Scoring model', 'FastAPI service', 'Dashboard'],
        stack: 'Python, scikit-learn, FastAPI, Streamlit, Docker',
      },
      {
        name: 'Power BI sales tracking',
        url: 'https://github.com/ouchchenomar/PowerBI_Suivi_Ventes',
        summary: 'Data preparation with Power Query, star schema and DAX measures by period, product, region and status.',
        flow: ['Power Query', 'Star schema', 'DAX measures', 'Report'],
        stack: 'Power BI, Power Query, DAX',
      },
    ],
  },
  caseStudy: {
    title: 'Case study: Onbor',
    meta: 'Attijariwafa Bank, CIB, Trading Room · final-year internship, Feb – Jun 2026',
    tagline: 'From scattered manual work to a business platform driven by data.',
    lead:
      'Onbor is an internal platform prototype that digitises client onboarding in the Trading Room: case creation, multi-actor approvals, document checks, contracting, e-signatures, KPI tracking and data governance.',
    brief: [
      {
        term: 'The starting point',
        text: 'The process relied on emails, Excel files and PDFs, with little visibility on the real status of each case and a heavy operational load.',
      },
      {
        term: 'The goal',
        text: 'Centralise the workflow, make the checks more reliable, reduce manual work and give each role the indicators it needs.',
      },
    ],
    figures: [
      { value: '5', label: 'Power BI dashboards' },
      { value: '10', label: 'Airflow DAGs' },
      { value: 'RBAC', label: 'role-based access and audit trail' },
      { value: 'MDM', label: 'master data and quality checks' },
    ],
    stepsTitle: 'How a case moves',
    steps: [
      'Draft',
      'Front Office review',
      'Manager approval',
      'Risk review',
      'Document checks and approvals',
      'Contracting',
      'Client and authorised signatory signatures',
      'Back-office setup',
    ],
    stepsNote: 'Each sensitive transition is restricted to a role and logged, with its comments, in the audit trail.',
    architectureTitle: 'Architecture',
    architecture: [
      { layer: 'Backend', tech: 'FastAPI, async SQLAlchemy, Pydantic, Alembic migrations' },
      { layer: 'Interfaces', tech: 'React 19, TypeScript, Vite, Tailwind, Chart.js' },
      { layer: 'Documents', tech: 'MinIO for supporting documents and signed files' },
      { layer: 'E-signature', tech: 'DocuSeal, with signature requests and webhooks' },
      { layer: 'Processing', tech: 'Airflow and dbt for KPIs, checks and monitoring' },
      { layer: 'Database', tech: 'PostgreSQL, organised into business, governance and reporting schemas' },
    ],
    governanceTitle: 'Data and governance',
    governance: [
      {
        name: 'Quality and compliance',
        text: 'Completeness, consistency, validity and uniqueness rules, document checks and deduplication, applied while the platform is in use.',
      },
      {
        name: 'Reference data and source of truth',
        text: 'Historised counterparty reference data, a data catalog and dictionary, and governed parameters reloaded at runtime.',
      },
      {
        name: 'Role-based indicators',
        text: 'Each profile only sees the screens and indicators relevant to its work, in the interface and in the API.',
      },
    ],
    roleTitle: 'My role',
    role: 'My main contribution was the backend and the data: Airflow and dbt jobs, PostgreSQL reference data in a Bronze/Silver/Gold architecture, quality checks, the data catalog and FastAPI APIs.',
    roleLink: 'Details are in my Attijariwafa Bank experience',
    privacy: 'Internal bank project: the code is not public.',
    readLink: 'Read the Onbor case study',
  },
  experience: {
    title: 'Experience',
    items: [
      {
        org: 'Attijariwafa Bank, CIB, Trading Room',
        place: 'Casablanca',
        role: 'Final-year internship: Data Engineering, Data Governance and BI',
        dates: 'Feb – Jun 2026',
        start: '2026-02',
        intro:
          'Onbor project: an internal platform prototype that digitises client onboarding in the Trading Room, from data entry to business approvals. My main contribution was the backend and the data.',
        caseStudy: true,
        points: [
          'Designed Python/SQL processing jobs, orchestrated with Airflow and transformed with dbt, to automate data preparation.',
          'Structured onboarding records and counterparty reference data in PostgreSQL, with a Bronze/Silver/Gold analytics architecture.',
          'Implemented completeness, consistency, validity and uniqueness checks to find missing, inconsistent or duplicate data.',
          'Contributed to the data catalog built into Onbor: data types, business definitions, required fields, quality rules, business and IT owners.',
          'Developed FastAPI APIs connected to React interfaces for data entry, tasks and approvals, with role-based transitions and an audit trail.',
        ],
        stack: 'Python, SQL, FastAPI, PostgreSQL, Airflow, dbt, Docker, React, TypeScript, MinIO, DocuSeal',
      },
      {
        org: 'TAMWILCOM',
        place: 'Rabat',
        role: 'Pre-final-year internship: document AI assistant and data APIs',
        dates: 'Jul – Aug 2025',
        start: '2025-07',
        points: [
          'Developed a document ingestion pipeline (PDF extraction, cleaning, chunking, embeddings, FAISS index) to recommend financial products.',
          'Exposed the services through FastAPI, built a Streamlit interface and stored conversations in MySQL, with source display and answer evaluation.',
        ],
        stack: 'Python, FastAPI, Streamlit, FAISS, LangChain, Ollama/Mistral, SentenceTransformers, MySQL',
      },
      {
        org: 'Doosys',
        place: 'Rabat',
        role: 'Introductory internship: Odoo development and document management',
        dates: 'Jul – Aug 2024',
        start: '2024-07',
        points: [
          'Took part in requirements analysis and Odoo customisation for document management; contributed to OCR integration, testing and user guides.',
        ],
        stack: 'Python, Odoo, PostgreSQL, OCR',
      },
    ],
  },
  skills: {
    title: 'Skills',
    groups: [
      { name: 'Data engineering', items: 'Python, SQL, ETL/ELT, Airflow, dbt, DuckDB, FastAPI, Docker, Git, GitHub Actions' },
      { name: 'Modelling and BI', items: 'PostgreSQL, MySQL, SQL Server, star schema, Power BI, Power Query, DAX' },
      { name: 'Quality and governance', items: 'Data quality checks, data catalog and dictionary, golden record, RBAC, audit trail' },
      { name: 'Applied AI', items: 'RAG, FAISS, LangChain, scikit-learn' },
      { name: 'Currently learning', items: 'PySpark, Databricks' },
    ],
  },
  education: {
    title: 'Education',
    items: [
      {
        title: 'Engineering Degree, Knowledge Engineering and Data Science',
        school: 'École des Sciences de l’Information (ESI), Rabat',
        dates: '2023 – 2026',
      },
      {
        title: 'Preparatory classes, Mathematics and Physics',
        school: 'Lycée Prince Moulay Abdellah',
        dates: '2021 – 2023',
      },
    ],
    languagesTitle: 'Languages',
    languages: 'French (fluent), English (professional), Arabic, Amazigh',
  },
  contact: {
    title: 'Contact',
    text: 'Hiring for data engineering, data quality or data consulting? Email me.',
    emailLabel: 'Email',
    email: EMAIL,
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'CV as PDF',
  },
  footer: 'Omar Ouchchen, 2026',
}

export const CONTENT: Record<Lang, Content> = { fr, en }
