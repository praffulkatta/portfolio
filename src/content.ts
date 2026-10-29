export type SystemNode = {
  id: string;
  name: string;
  role: string;
  technologies: string[];
  communication: string;
  implementation: string;
};

export type TraceableProject = {
  id: "medistock" | "browser-ide";
  title: string;
  note: string;
  nodes: SystemNode[];
  connectionNote: string;
};

export const traceableProjects: TraceableProject[] = [
  {
    id: "medistock",
    title: "MediStock",
    note: "The brief describes a containerized frontend, API, and PostgreSQL database. The source repository is not available here, so their exact connections and boundaries remain unverified.",
    nodes: [
      {
        id: "interface",
        name: "Interface",
        role: "The user-facing application layer named in the project brief.",
        technologies: ["React", "Vite"],
        communication: "Frontend-to-API methods and routes have not been verified.",
        implementation: "Routes, inventory workflows, forms, and API calls need source-level verification.",
      },
      {
        id: "service",
        name: "API service",
        role: "A backend service is part of the described multi-container application.",
        technologies: ["FastAPI", "SQLAlchemy", "Alembic"],
        communication: "Database driver, session handling, and transaction flow are not verified.",
        implementation: "Endpoints, validation, authorization, transactions, and migration history are not available to inspect.",
      },
      {
        id: "database",
        name: "Database",
        role: "A PostgreSQL database is part of the described application.",
        technologies: ["PostgreSQL"],
        communication: "Schema and the service's exact database access path are not verified.",
        implementation: "Tables, relationships, constraints, indexes, and backup strategy have not been verified.",
      },
    ],
    connectionNote: "Three components are reported in the brief. The connecting paths are conceptual; protocols, endpoints, and runtime configuration are not verified.",
  },
  {
    id: "browser-ide",
    title: "Browser-based IDE",
    note: "The brief lists an editor, FastAPI service, WebSockets, and Python execution work. Exact ownership, message flow, and execution isolation require the missing source and deployment configuration.",
    nodes: [
      {
        id: "editor",
        name: "Browser editor",
        role: "A browser-based editor and terminal experience are described in the project brief.",
        technologies: ["React", "TypeScript", "Monaco Editor", "xterm.js", "Zustand"],
        communication: "WebSockets are listed; their use for editor or terminal traffic is not verified.",
        implementation: "Tabs and file-explorer work are mentioned; workspace persistence and editor-state behavior need verification.",
      },
      {
        id: "service",
        name: "Backend service",
        role: "A FastAPI backend and WebSocket integration are listed.",
        technologies: ["FastAPI", "WebSockets", "PostgreSQL"],
        communication: "Socket endpoints, messages, authentication, and lifecycle are not verified.",
        implementation: "Socket endpoints, authentication boundaries, event lifecycle, and workspace model are not verifiable here.",
      },
      {
        id: "runtime",
        name: "Execution runtime",
        role: "Python code execution work is mentioned in the brief.",
        technologies: ["Python", "Docker"],
        communication: "The service-to-runtime invocation path and trust boundary are not verified.",
        implementation: "Isolation is not verified. Arbitrary subprocess execution is not a secure sandbox.",
      },
    ],
    connectionNote: "The named components reflect reported project work. The arrows do not assert a verified transport or trust boundary.",
  },
];

export type ProjectRecord = {
  id: string;
  number: string;
  title: string;
  summary: string;
  status: string;
  technologies: string[];
  problem: string;
  approach: string;
  decisions: string[];
  limitations: string[];
  evidence: string;
  traceId?: TraceableProject["id"];
};

export const projects: ProjectRecord[] = [
  {
    id: "medistock",
    number: "01",
    title: "MediStock",
    summary: "Pharmaceutical inventory management",
    status: "SOURCE REVIEW NEEDED",
    technologies: ["React", "Vite", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Docker", "Compose"],
    problem: "The brief identifies pharmaceutical inventory management as the project domain. The specific user workflow, constraints, and impact are not documented in this workspace.",
    approach: "A frontend, backend, and PostgreSQL database are described as containerized services. The concrete service boundaries and request flow need verification against the project source.",
    decisions: [
      "React, Vite, FastAPI, PostgreSQL, SQLAlchemy, Alembic, and Docker Compose are named in the supplied brief.",
      "The brief describes a containerized frontend, backend, and PostgreSQL database.",
    ],
    limitations: [
      "API endpoints, database schema, authentication, deployment topology, and operational behavior have not been inspected.",
      "No source repository, screenshots, live demo, or metrics were included.",
    ],
    evidence: "Technology and deployment notes from the supplied project brief; implementation details are not independently verified.",
    traceId: "medistock",
  },
  {
    id: "browser-ide",
    number: "02",
    title: "Browser-based IDE",
    summary: "A browser code editor and execution environment",
    status: "SOURCE REVIEW NEEDED",
    technologies: ["React", "TypeScript", "Monaco", "FastAPI", "WebSockets", "xterm.js", "Docker"],
    problem: "The brief describes a browser-based coding environment. Its user requirements, current feature readiness, and execution threat model are not verifiable from the available files.",
    approach: "Editor tabs, a file explorer, authentication, terminal integration, and Python execution are described as implementation work, not as verified production-ready capabilities.",
    decisions: [
      "The stated technology list includes React, TypeScript, Monaco Editor, FastAPI, WebSockets, xterm.js, and Docker.",
      "Editor UX, workspace state, terminal transport, authentication, and untrusted execution need separate evidence and failure models.",
    ],
    limitations: [
      "Execution isolation and the terminal trust boundary are unverified. Arbitrary subprocess execution is not secure isolation.",
      "No source repository, running demo, or screenshots were included.",
    ],
    evidence: "Technology and work areas from the supplied project brief; implementation source is not available in this workspace.",
    traceId: "browser-ide",
  },
  {
    id: "cloud-devops",
    number: "03",
    title: "Cloud & DevOps",
    summary: "A learning direction, not a finished project",
    status: "PLANNED / LEARNING",
    technologies: ["Linux", "WSL", "Docker", "AWS", "Terraform", "CI/CD", "Monitoring"],
    problem: "No specific completed cloud or DevOps experiment was supplied for this portfolio.",
    approach: "Linux, containers, cloud infrastructure, deployment, and monitoring are areas to explore and document through future, reproducible experiments.",
    decisions: [],
    limitations: [
      "These topics are not presented as completed projects, deployments, certifications, or professional experience.",
      "No repository, experiment record, screenshot, or infrastructure diagram was provided.",
    ],
    evidence: "Learning areas named in the supplied project brief. No completed experiment is verified.",
  },
];

export const interests = [
  "Backend systems",
  "Cloud infrastructure",
  "DevOps",
  "AI systems",
  "Computer architecture",
];

export const statedTechnologies = [
  "React",
  "TypeScript",
  "Vite",
  "FastAPI",
  "PostgreSQL",
  "SQLAlchemy",
  "Alembic",
  "Docker",
  "Monaco Editor",
  "WebSockets",
  "xterm.js",
];
