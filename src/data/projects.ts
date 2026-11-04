export type DetailRow = { label: string; value: string };
export type Decision = {
  topic: string;
  title: string;
  rule: string;
  rows?: DetailRow[];
  diagramId?: string;
};
export type Diagram = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  hidden?: boolean;
};
export type Chip = { strong: string; text: string };
export type ScreenTab = { id: string; label: string; src: string; alt: string };
export type BugFix = {
  title: string;
  rows: DetailRow[];
  diagramId?: string;
};
export type Tool = { name: string; icon: string; use: string };

export const site = {
  name: "Salah Joja",
  email: "salahjoja1@gmail.com",
  stack: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Prisma"],
};

export const ghayaHome = {
  sheet: "SHEET 01",
  title: "Ghaya Go",
  meta: "Software Engineer · Feb – Aug 2026 · pre-launch, private repo",
  lede:
    "An education and curriculum management platform with a mobile app and a CMS. I was the main backend engineer and built its NestJS API from an empty repository. The product has not launched yet.",
  whatIDid: [
    "NestJS API from scratch: learner progress, gamification, lesson sessions, and the CMS write API.",
    "Curriculum domain (Course → Module → Lesson/Quiz → Task) with transactional publish and delete.",
    "Redis cache-aside with typed keys, TTLs, and prefix invalidation on the same write path.",
    "Dual auth: Clerk JWT for learners; signed CMS endpoints with an audit log.",
    "Shared Zod validation, CI, Docker images, and health probes. About 204 automated tests on 54 REST routes.",
  ],
  problems: [
    {
      kind: "Fix",
      title: "Learn screen over-fetched on every cold start",
      detail:
        "The app fired four or five requests before it could draw one screen. I shipped GET /users/me/learn plus a 30-second Redis snapshot so that path is about two calls.",
    },
    {
      kind: "Bug",
      title: "A race in gamification",
      detail:
        "Completing the same task twice at nearly the same moment could record it twice. I removed the duplicate rows, added UNIQUE (user_id, task_id), and put the writes in a transaction so the database refuses the second insert.",
    },
  ],
  chips: [
    { strong: "54 REST routes", text: "PostgreSQL and Redis for Expo and Next.js CMS." },
    { strong: "One learn endpoint", text: "GET /users/me/learn plus Redis cache replaced a cold-start fan-out." },
    { strong: "~204 automated tests", text: "Docker images and health probes in CI." },
  ] as Chip[],
  screens: [
    { src: "/ghaya/home-learn.webp", alt: "Ghaya Go learn home: course path, streak, and hearts.", label: "Learn" },
    { src: "/ghaya/lesson.webp", alt: "Ghaya Go lesson screen with Arabic prompt and answer choices.", label: "Lesson" },
    { src: "/ghaya/leaderboard.webp", alt: "Ghaya Go leaderboard with XP ranks.", label: "Leaderboard" },
    { src: "/ghaya/quests.webp", alt: "Ghaya Go quests list with progress targets.", label: "Quests" },
  ],
  technicalSubline: "Architecture, diagrams, decisions — 3 diagrams, 4 decisions",
  diagrams: [
    { id: "ghaya-system-context", src: "/ghaya/diagrams/ghaya-system-context.svg", alt: "Ghaya system context", caption: "System context — clients, API, data." },
    { id: "ghaya-learn-sequence", src: "/ghaya/diagrams/ghaya-learn-sequence.svg", alt: "Ghaya learn aggregation", caption: "Learn screen — about five calls down to about two." },
    { id: "ghaya-gamification-race", src: "/ghaya/diagrams/ghaya-gamification-race.svg", alt: "Gamification race fix", caption: "Gamification race — UNIQUE constraint on the second request." },
  ] as Diagram[],
  decisions: [
    { topic: "API", title: "Aggregated endpoint instead of GraphQL", rule: "Ship GET /users/me/learn for the one mobile screen shape I already knew.", rows: [{ label: "Why", value: "Two clients and one engineer on the API." }, { label: "Cost", value: "Less flexibility than GraphQL for editors." }], diagramId: "ghaya-learn-sequence" },
    { topic: "Data", title: "Cache invalidation beside the write", rule: "Every write path clears its own Redis prefix in the same function.", rows: [{ label: "Why", value: "Hidden framework caching is how you get a stale screen." }, { label: "Cost", value: "More boilerplate on each write path." }] },
    { topic: "Data", title: "Publishing is all or nothing", rule: "Course publish or delete runs in one transaction.", rows: [{ label: "Why", value: "Half-written content must never go live." }, { label: "Cost", value: "Longer locks on big courses." }] },
    { topic: "Auth", title: "CMS never writes tables directly", rule: "Signed API endpoints keep every business rule in one place.", rows: [{ label: "Why", value: "Editorial writes land in an audit log." }, { label: "Cost", value: "CMS cannot bypass API validation." }], diagramId: "ghaya-system-context" },
  ] as Decision[],
  writeUpHref: "/ghaya/",
};

export const ribatHome = {
  sheet: "SHEET 02",
  title: "Ribat",
  titleAr: "رباط",
  meta: "Open source · public beta · not deployed yet",
  lede:
    "Most mosque study circles still run on paper. Ribat is the software I am building for that: one place for every class a mosque teaches, in Arabic and English.",
  chips: [
    { strong: "Offline class mode", text: "Taps wait on the phone and sync once, without double-counting." },
    { strong: "Many mosques, one database", text: "One mosque can never read another's records." },
    { strong: "Family portal", text: "Homework, excuses, and notifications in the reader's language." },
  ] as Chip[],
  tabs: [
    { id: "class", label: "Class mode", src: "/ribat/class-mode-desktop.webp", alt: "Class attendance on desktop." },
    { id: "student", label: "Student", src: "/ribat/student-attendance-desktop.webp", alt: "Student profile on desktop." },
    { id: "guardian", label: "Family portal", src: "/ribat/guardian-portal-desktop.webp", alt: "Family portal on desktop." },
    { id: "reports", label: "Staff reports", src: "/ribat/sheikh-reports-desktop.webp", alt: "Staff reports dashboard." },
  ] as ScreenTab[],
  statusNote: "NestJS, Prisma, PostgreSQL, Redis, React PWA. AGPL-licensed. CI runs tests on every push.",
  technicalSubline: "Architecture, diagrams, decisions — 4 diagrams, 6 decisions",
  diagrams: [
    { id: "ribat-api-request-pipeline", src: "/ribat/diagrams/ribat-api-request-pipeline.webp", alt: "Ribat API request pipeline", caption: "Every HTTP request through guards, tenant scope, audit." },
    { id: "ribat-offline-sync", src: "/ribat/diagrams/ribat-offline-sync.webp", alt: "Ribat offline sync sequence", caption: "Offline class kit, mutation queue, replay." },
    { id: "wf-06-sync-conflicts", src: "/ribat/diagrams/wf-06-sync-conflicts.webp", alt: "Sync conflict workflow", caption: "How duplicate keys and entity types resolve on replay." },
    { id: "ribat-domain-event-outbox", src: "/ribat/diagrams/ribat-domain-event-outbox.webp", alt: "Domain event outbox", caption: "Transactional outbox into BullMQ workers." },
    { id: "ribat-login-session-csrf", src: "/ribat/diagrams/ribat-login-session-csrf.webp", alt: "Login session and CSRF", caption: "Login session and CSRF", hidden: true },
  ] as Diagram[],
  phoneShot: { src: "/ribat/teacher-hifz-phone.webp", alt: "Teacher hifz screen.", caption: "Teacher memorization session (offline-capable)." },
  decisions: [
    { topic: "Security", title: "Tenant scoping in one place", rule: "A Prisma extension adds the mosque ID to every tenant query and throws if it is missing.", rows: [{ label: "Why", value: "A forgotten where fails a test instead of leaking data." }, { label: "Proof", value: "E2E runs two mosques; the other's records return 404." }], diagramId: "ribat-api-request-pipeline" },
    { topic: "Sync", title: "Offline writes carry no authority", rule: "Each tap gets an idempotency key; replay checks permissions as they are now.", rows: [{ label: "Why", value: "Resent batches come back as duplicates, not double rows." }, { label: "Cost", value: "Replay must refuse a teacher removed mid-class." }], diagramId: "ribat-offline-sync" },
    { topic: "Data", title: "Memorization as a ledger", rule: "Recitation logs are append-only; mistakes are voided with a reason, never edited.", rows: [{ label: "Why", value: "Summaries rebuild from the ledger in the same transaction." }, { label: "Cost", value: "More rows than updating a single progress field." }] },
    { topic: "Auth", title: "Cookie sessions instead of JWTs", rule: "Sessions live in the database so sign-out and password change end access immediately.", rows: [{ label: "Why", value: "No long-lived token to revoke across devices." }, { label: "Cost", value: "CSRF token on every write." }], diagramId: "ribat-login-session-csrf" },
    {
      topic: "Auth",
      title: "No self-signup",
      rule: "Staff hand out a one-time setup code; passwords hashed with Argon2id.",
      rows: [
        {
          label: "Why",
          value:
            "No email or phone OTP at signup — mosques avoid paid SMS/email verification services. Users still get in without an inbox. Ribat is open source (AGPL); anyone who wants self-signup can add OTP on top.",
        },
        { label: "Cost", value: "Staff must create every account." },
      ],
    },
    { topic: "Events", title: "Outbox once a second consumer existed", rule: "Events write with the change, idempotent per handler, dead-lettered after five failures.", rows: [{ label: "Why", value: "Notifications and nightly jobs must not fire if the row rollbacks." }, { label: "Cost", value: "Dispatcher and worker to operate." }], diagramId: "ribat-domain-event-outbox" },
  ] as Decision[],
  links: [
    { href: "https://github.com/Salad-man3/ribat", label: "Code on GitHub" },
    { href: "/ribat/", label: "Full write-up: tenancy, sync, routes" },
  ],
};

export const toolbox: Tool[] = [
  { name: "TypeScript", icon: "/assets/icons/typescript.svg", use: "Ghaya API, Ribat monorepo, shared validation types." },
  { name: "JavaScript", icon: "/assets/icons/javascript.svg", use: "Node platform APIs and tooling around both backends." },
  { name: "Node.js", icon: "/assets/icons/nodedotjs.svg", use: "Runtime for NestJS services and workers." },
  { name: "NestJS", icon: "/assets/icons/nestjs.svg", use: "Ghaya Go API from scratch; Ribat API and modules." },
  { name: "PostgreSQL", icon: "/assets/icons/postgresql.svg", use: "Primary store for Ghaya and Ribat; migrations and transactions." },
  { name: "Sequelize", icon: "/assets/icons/sequelize.svg", use: "Ghaya ORM with versioned SQL migrations." },
  { name: "Prisma", icon: "/assets/icons/prisma.svg", use: "Ribat schema plus tenant-scoping extension." },
  { name: "Redis", icon: "/assets/icons/redis.svg", use: "Cache-aside on Ghaya learn screen; BullMQ on Ribat." },
  { name: "Laravel", icon: "/assets/icons/laravel.svg", use: "T-_Project REST API with Sanctum auth." },
  { name: "PHP", icon: "/assets/icons/php.svg", use: "Laravel backends and course project work." },
  { name: "MySQL", icon: "/assets/icons/mysql.svg", use: "Laravel projects and local dev stacks." },
  { name: "SQL", icon: "/assets/icons/sql.svg", use: "Constraints, indexes, and transactional writes in both ORMs." },
  { name: "Docker", icon: "/assets/icons/docker.svg", use: "Local stacks, health probes, Ribat Docker compose." },
];

export const ghayaDeep = {
  decisions: [
    { topic: "API", title: "One deployable, not services", rule: "Cross-module transactions mattered more than service boundaries at this team size.", rows: [{ label: "Why", value: "Module split is real; extract a service later." }, { label: "Cost", value: "One blast radius if the API process dies." }] },
    { topic: "API", title: "Aggregated endpoint instead of GraphQL", rule: "Ship GET /users/me/learn and cache it.", rows: [{ label: "Why", value: "Two clients, one engineer, known screen shape." }, { label: "Cost", value: "Less flexibility than GraphQL for editors." }], diagramId: "ghaya-learn-sequence" },
    { topic: "Data", title: "Cache invalidation beside the write", rule: "Every write clears its own Redis prefix in the same function.", rows: [{ label: "Why", value: "Hidden framework caching is how you get a stale screen." }, { label: "Cost", value: "More boilerplate on each write path." }] },
    { topic: "Data", title: "Publishing is all or nothing", rule: "Publish or delete a course in one transaction.", rows: [{ label: "Why", value: "Half-written content must never go live." }, { label: "Cost", value: "Longer locks on big courses." }] },
  ] as Decision[],
  diagrams: ghayaHome.diagrams,
  bugs: [
    { title: "The learn screen over-fetched on every cold start", rows: [{ label: "Symptom", value: "The mobile app fired four or five requests before it could draw the learn screen." }, { label: "Cause", value: "Progress, modules, course progress and lesson percentage each had their own route, and the client needed all of them for one screen." }, { label: "Fix", value: "One GET /users/me/learn endpoint that reads all four, read indexes in migration 009, and a 30-second Redis snapshot. About two calls now." }] },
    { title: "A race in gamification", rows: [{ label: "Symptom", value: "Completing the same task twice at nearly the same moment could record it twice." }, { label: "Cause", value: "The check for an existing completion and the insert were separate steps, so two requests could both pass the check." }, { label: "Fix", value: "Removed the duplicate rows, added a UNIQUE (user_id, task_id) constraint, and moved the writes into a transaction. The database now refuses the second row." }], diagramId: "ghaya-gamification-race" },
  ] as BugFix[],
};
