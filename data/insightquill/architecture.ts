import type { ArmyverseArchitectureMap } from "@/data/armyverse/architecture";

export const insightQuillArchitectureMaps: ArmyverseArchitectureMap[] = [
  {
    id: "role-tenancy-boundaries",
    group: "Administration",
    title: "Role, college & tenant boundaries",
    summary:
      "Flutter workspaces, Vercel function guards, Supabase identity, and PostgreSQL policies cooperate to keep academic actions inside the user’s college, department, and course scope.",
    source:
      "Flutter AppProvider, role services, API role guards, Supabase RLS policies, and college/department migrations",
    engineeringNotes: [
      "Role checks are reinforced at both the Flutter/service layer and server endpoint boundary; RLS adds the database-level tenant control.",
      "HOD operations are bounded by department scope, while faculty actions resolve course ownership before mutations.",
    ],
    support: {
      requestPath: [
        [
          "Launch role workspace",
          "The Flutter client initializes Supabase, loads the selected college, and resolves the signed-in user through AppProvider.",
        ],
        [
          "Request an academic action",
          "A student, faculty member, HOD, or super admin selects an operation from the role-specific workspace.",
        ],
        [
          "Verify role and ownership",
          "The server function validates the user role, college status, department scope, and course ownership where relevant.",
        ],
        [
          "Apply tenant policy",
          "Supabase Auth and RLS constrain database reads and writes to the academic scope of the operation.",
        ],
        [
          "Write durable audit context",
          "Privileged actions record actor, role, college, target, and details for later administrative review.",
        ],
      ],
      modules: [
        [
          "Flutter workspaces",
          "student, faculty, HOD, and super-admin surfaces",
          "purple",
        ],
        ["Role guards", "API authorization and ownership checks", "cyan"],
        ["Academic scope", "college, department, course, roster", "green"],
        ["Supabase policies", "Auth, PostgreSQL, and RLS enforcement", "amber"],
      ],
      decisions: [
        [
          "Academic scope first",
          "Authorization is expressed through college, department, and course relationships instead of one undifferentiated administrator permission.",
        ],
        [
          "Defense in depth",
          "Server checks and PostgreSQL RLS are both used for protected academic writes.",
        ],
        [
          "Action evidence",
          "Audit records carry the role and target context needed to investigate administrative changes.",
        ],
      ],
      safeguards: [
        "Role validation",
        "College active-status checks",
        "Department ownership scope",
        "Course ownership checks",
        "Supabase RLS",
        "Audit logs",
      ],
      operationalPath: [
        "Flutter role workspace",
        "Server guard",
        "Academic scope",
        "RLS policy",
        "Audited result",
      ],
    },
    nodes: [
      {
        id: "roles",
        label: "Role workspace",
        detail: "student · faculty · HOD · admin",
        tone: "purple",
        x: 105,
        y: 115,
      },
      {
        id: "provider",
        label: "AppProvider",
        detail: "session · selected college",
        tone: "cyan",
        x: 295,
        y: 115,
      },
      {
        id: "guard",
        label: "API role guard",
        detail: "role · status · ownership",
        tone: "amber",
        x: 515,
        y: 195,
      },
      {
        id: "scope",
        label: "Academic scope",
        detail: "college · department · course",
        tone: "green",
        x: 350,
        y: 360,
      },
      {
        id: "supabase",
        label: "Supabase Auth",
        detail: "identity · access token",
        tone: "purple",
        x: 715,
        y: 105,
      },
      {
        id: "rls",
        label: "PostgreSQL + RLS",
        detail: "tenant-scoped records",
        tone: "green",
        x: 720,
        y: 360,
      },
      {
        id: "audit",
        label: "Audit log",
        detail: "actor · role · target",
        tone: "cyan",
        x: 900,
        y: 450,
      },
    ],
    edges: [
      { from: "roles", to: "provider" },
      { from: "provider", to: "guard" },
      { from: "provider", to: "supabase" },
      { from: "guard", to: "scope" },
      { from: "guard", to: "rls" },
      { from: "scope", to: "rls", label: "allowed scope" },
      { from: "supabase", to: "rls" },
      { from: "rls", to: "audit", label: "privileged write" },
    ],
  },
  {
    id: "access-challenge",
    group: "Identity",
    title: "Identity, approval & biometric access",
    summary:
      "Password verification is followed by a role-aware OTP, approval, or biometric completion boundary before InsightQuill establishes an audited academic session.",
    source:
      "Signup/login/password-reset challenge endpoints, approved login, biometric completion, Supabase Auth, and audit logging",
    engineeringNotes: [
      "The biometric route first verifies the user’s password and role context; device biometrics do not bypass account verification.",
      "Login challenges reject inactive users, inactive colleges, and selected-college or role mismatches before challenge completion.",
    ],
    support: {
      requestPath: [
        [
          "Present credentials",
          "The user provides registration number, password, requested role, and selected college context.",
        ],
        [
          "Verify account state",
          "The function validates Supabase credentials, user status, college status, and role alignment.",
        ],
        [
          "Select challenge",
          "The flow starts an OTP challenge, waits for approved-login status, or permits the student/faculty biometric completion route.",
        ],
        [
          "Complete challenge",
          "A verified OTP, approved request, or biometric path creates the authenticated role context.",
        ],
        [
          "Audit session entry",
          "The completed flow records authentication mode, provider, role, college, and session target in audit history.",
        ],
      ],
      modules: [
        [
          "Credential entry",
          "registration number, password, role, college",
          "purple",
        ],
        ["Supabase Auth", "password verification and identity lookup", "cyan"],
        ["Challenge service", "OTP, approved login, reset, biometric", "amber"],
        ["Session audit", "successful role-bound session evidence", "green"],
      ],
      decisions: [
        [
          "Role-aware credentials",
          "Requested role and selected college are validated against the stored user rather than trusted as UI-only routing state.",
        ],
        [
          "Challenge completion",
          "Challenge endpoints preserve expiry and status rather than issuing a session immediately after password verification.",
        ],
        [
          "Audited authentication",
          "Successful entry records the specific authentication flow for operational traceability.",
        ],
      ],
      safeguards: [
        "Account active-status check",
        "College active-status check",
        "Role/college match",
        "OTP expiry",
        "Approved-login status",
        "Biometric role limit",
      ],
      operationalPath: [
        "Credentials",
        "Account checks",
        "Challenge",
        "Verified completion",
        "Audited session",
      ],
    },
    nodes: [
      {
        id: "credentials",
        label: "Role-aware credentials",
        detail: "registration · password · college",
        tone: "purple",
        x: 120,
        y: 120,
      },
      {
        id: "verify",
        label: "Supabase verifier",
        detail: "account and password",
        tone: "cyan",
        x: 335,
        y: 120,
      },
      {
        id: "guard",
        label: "Account guard",
        detail: "role · status · college",
        tone: "green",
        x: 555,
        y: 120,
      },
      {
        id: "otp",
        label: "OTP challenge",
        detail: "signup · login · reset",
        tone: "amber",
        x: 365,
        y: 330,
      },
      {
        id: "approval",
        label: "Approved login",
        detail: "pending · approved · expired",
        tone: "purple",
        x: 595,
        y: 330,
      },
      {
        id: "bio",
        label: "Biometric completion",
        detail: "student or faculty",
        tone: "cyan",
        x: 815,
        y: 330,
      },
      {
        id: "session",
        label: "Audited session",
        detail: "role · college · flow",
        tone: "green",
        x: 770,
        y: 470,
      },
    ],
    edges: [
      { from: "credentials", to: "verify" },
      { from: "verify", to: "guard" },
      { from: "guard", to: "otp" },
      { from: "guard", to: "approval" },
      { from: "guard", to: "bio" },
      { from: "otp", to: "session" },
      { from: "approval", to: "session" },
      { from: "bio", to: "session" },
    ],
  },
  {
    id: "secure-quiz-runtime",
    group: "Assessment",
    title: "Scheduled quiz & integrity runtime",
    summary:
      "A course-owned scheduled quiz becomes a timed live session with client integrity monitoring and a durable result that preserves termination and trust context.",
    source:
      "Quiz authoring models, quiz-session migrations, quiz-taking page, attempt policy, Android developer-mode guard, and results contracts",
    engineeringNotes: [
      "Quiz live/session data carries start, end, remaining-time, pause, and termination context through database migrations and Flutter contracts.",
      "Integrity events are persisted alongside the submission instead of disappearing after a client-side warning.",
    ],
    support: {
      requestPath: [
        [
          "Author and schedule",
          "A faculty owner configures course questions, duration, timetable linkage, timing window, and eligible student context.",
        ],
        [
          "Validate student entry",
          "The dashboard resolves attendance and schedule eligibility before the student starts or resumes an attempt.",
        ],
        [
          "Create live attempt",
          "The runtime creates or resumes a session with server-persisted timing state.",
        ],
        [
          "Monitor integrity",
          "Fullscreen, app/tab switching, and Android developer-mode safeguards track whether the attempt remains compliant.",
        ],
        [
          "Submit a complete result",
          "Normal submission or auto-termination records score, switch count, flag state, and a concrete termination reason.",
        ],
      ],
      modules: [
        [
          "Quiz authoring",
          "course, questions, schedule, and live config",
          "purple",
        ],
        [
          "Eligibility resolver",
          "timetable and attendance-aware audience",
          "cyan",
        ],
        ["Live session", "timed state and answer collection", "green"],
        ["Integrity guard", "fullscreen, app switch, developer mode", "amber"],
      ],
      decisions: [
        [
          "Persisted timing",
          "The source of truth for a live attempt includes remaining time and pause timestamps rather than only a front-end countdown.",
        ],
        [
          "Explicit termination",
          "Automatic and student-driven completion are distinguished by a persisted reason field.",
        ],
        [
          "Evidence beside score",
          "Switch counts and flags accompany student results so later reporting can contextualize performance.",
        ],
      ],
      safeguards: [
        "Timetable window checks",
        "Attendance-aware eligibility",
        "Fullscreen monitoring",
        "App/tab-switch count",
        "Developer-mode guard",
        "Termination reason",
      ],
      operationalPath: [
        "Faculty schedule",
        "Eligible student",
        "Live session",
        "Integrity events",
        "Result + context",
      ],
    },
    nodes: [
      {
        id: "faculty",
        label: "Faculty authoring",
        detail: "course · questions · schedule",
        tone: "purple",
        x: 115,
        y: 105,
      },
      {
        id: "eligibility",
        label: "Eligibility check",
        detail: "attendance · timetable",
        tone: "cyan",
        x: 340,
        y: 105,
      },
      {
        id: "session",
        label: "Live quiz session",
        detail: "start · end · remaining time",
        tone: "green",
        x: 545,
        y: 185,
      },
      {
        id: "integrity",
        label: "Integrity monitor",
        detail: "fullscreen · switches · device",
        tone: "amber",
        x: 760,
        y: 105,
      },
      {
        id: "answers",
        label: "Student answers",
        detail: "timed response state",
        tone: "purple",
        x: 330,
        y: 375,
      },
      {
        id: "submit",
        label: "Submission resolver",
        detail: "normal or auto-terminate",
        tone: "cyan",
        x: 630,
        y: 365,
      },
      {
        id: "result",
        label: "Student result",
        detail: "score · flag · reason",
        tone: "green",
        x: 855,
        y: 435,
      },
    ],
    edges: [
      { from: "faculty", to: "eligibility" },
      { from: "eligibility", to: "session" },
      { from: "session", to: "integrity" },
      { from: "session", to: "answers" },
      { from: "integrity", to: "submit", label: "threshold" },
      { from: "answers", to: "submit" },
      { from: "submit", to: "result" },
    ],
  },
  {
    id: "feedback-runtime",
    group: "Feedback",
    title: "Quiz & class feedback runtime",
    summary:
      "Quiz completion and timetable events open separate feedback domains that share configuration provenance, guided response validation, and analytics-ready submission records.",
    source:
      "Feedback session/target runtime endpoints, quiz and class feedback configurations, timing helpers, submit handlers, and analytics models",
    engineeringNotes: [
      "Quiz and class feedback are parallel domains with different runtime triggers; their records are intentionally not flattened into one anonymous survey table.",
      "Class runtime includes timezone-aware session preparation and repair paths for operationally incomplete state.",
    ],
    support: {
      requestPath: [
        [
          "Trigger the correct domain",
          "Quiz completion starts a post-assessment context; timetable-aware class preparation creates lecture feedback targets.",
        ],
        [
          "Resolve effective configuration",
          "The server selects the versioned course configuration and question bank permitted for that specific domain.",
        ],
        [
          "Create recipients",
          "Feedback context and target records make the intended student and completion state explicit.",
        ],
        [
          "Guide and validate reflection",
          "Option selections feed micro-prompts; quality rules evaluate the written response against domain-specific requirements.",
        ],
        [
          "Persist for analysis",
          "The saved submission retains configuration version, selected signals, validation state, timing information, and source domain.",
        ],
      ],
      modules: [
        [
          "Quiz feedback runtime",
          "post-quiz contexts and submissions",
          "purple",
        ],
        ["Class feedback runtime", "timetable sessions and recipients", "cyan"],
        [
          "Prompt + validation",
          "guided reflection and quality profile",
          "amber",
        ],
        [
          "Feedback persistence",
          "context, targets, submissions, provenance",
          "green",
        ],
      ],
      decisions: [
        [
          "Two explicit domains",
          "Class and quiz feedback use their own configuration and runtime paths while remaining comparable in analytics.",
        ],
        [
          "Versioned provenance",
          "Each submission keeps the configuration version that produced its questions, preventing historical feedback from being reinterpreted after edits.",
        ],
        [
          "Server-owned targeting",
          "Recipient and timing state are created server-side instead of trusting a client-selected course or session.",
        ],
      ],
      safeguards: [
        "Course ownership guards",
        "Configuration precedence",
        "Timezone-aware deadlines",
        "Recipient target state",
        "Quality validation",
        "Runtime self-heal",
      ],
      operationalPath: [
        "Quiz or lecture",
        "Config selection",
        "Feedback target",
        "Guided response",
        "Versioned submission",
      ],
    },
    nodes: [
      {
        id: "quiz",
        label: "Completed quiz",
        detail: "post-assessment trigger",
        tone: "purple",
        x: 125,
        y: 110,
      },
      {
        id: "lecture",
        label: "Timetable lecture",
        detail: "class-window trigger",
        tone: "cyan",
        x: 125,
        y: 330,
      },
      {
        id: "config",
        label: "Course configuration",
        detail: "domain · version · question bank",
        tone: "amber",
        x: 365,
        y: 210,
      },
      {
        id: "targets",
        label: "Context & targets",
        detail: "recipient · deadline · status",
        tone: "green",
        x: 565,
        y: 210,
      },
      {
        id: "prompt",
        label: "Guided reflection",
        detail: "signals · micro-prompts",
        tone: "purple",
        x: 770,
        y: 115,
      },
      {
        id: "validate",
        label: "Quality validator",
        detail: "context · safety · score",
        tone: "cyan",
        x: 770,
        y: 310,
      },
      {
        id: "submission",
        label: "Feedback submission",
        detail: "version · signals · analytics",
        tone: "green",
        x: 920,
        y: 435,
      },
    ],
    edges: [
      { from: "quiz", to: "config" },
      { from: "lecture", to: "config" },
      { from: "config", to: "targets" },
      { from: "targets", to: "prompt" },
      { from: "targets", to: "validate" },
      { from: "prompt", to: "validate", label: "reflection" },
      { from: "validate", to: "submission" },
    ],
  },
  {
    id: "feedback-configuration-ai",
    group: "Intelligence",
    title: "Feedback configuration & AI draft gate",
    summary:
      "Faculty-owned course configuration is versioned before an AI draft path validates input, reserves quota, selects a provider or fallback, validates output, and writes a safe generation record.",
    source:
      "Quiz/class feedback configuration, AI generation, quota, provider fallback, and generation-log endpoints",
    engineeringNotes: [
      "The endpoint validates a faculty-owned course, allowed category, question type, and option count before a model request can be made.",
      "Provider output is treated as an editable draft and logged with status, latency, provider, and fallback metadata.",
    ],
    support: {
      requestPath: [
        [
          "Choose a feedback domain",
          "Faculty selects quiz or class feedback for one of their owned courses.",
        ],
        [
          "Validate authoring intent",
          "The API checks ownership, category, question type, option count, and feature-flag state.",
        ],
        [
          "Reserve quota",
          "A faculty-course rolling window prevents unrestricted model requests before the provider call begins.",
        ],
        [
          "Generate with fallback",
          "The configured provider drafts a question; a fallback path is used only when the primary provider cannot complete the request.",
        ],
        [
          "Validate and log",
          "Output shape is validated, the request is logged with safe failure metadata, and an editable draft returns to the faculty UI.",
        ],
      ],
      modules: [
        ["Course config", "domain settings and version history", "purple"],
        ["Authoring gate", "faculty ownership and input validation", "cyan"],
        ["Quota ledger", "rolling faculty-course limit", "amber"],
        [
          "AI draft service",
          "provider fallback, output validation, logs",
          "green",
        ],
      ],
      decisions: [
        [
          "Faculty ownership",
          "AI assistance is limited to the course owner rather than becoming a cross-tenant free-form generator.",
        ],
        [
          "Quota before inference",
          "Capacity is reserved before a provider request, yielding a deterministic rate-limit boundary.",
        ],
        [
          "Draft, not publish",
          "The model produces a validated editable draft; faculty review remains the publishing decision.",
        ],
      ],
      safeguards: [
        "Feature flags",
        "Course ownership",
        "Category/type validation",
        "Option-count bounds",
        "Rolling quota",
        "Provider-safe error codes",
      ],
      operationalPath: [
        "Faculty intent",
        "Authoring gate",
        "Quota",
        "AI + fallback",
        "Validated draft",
      ],
    },
    nodes: [
      {
        id: "faculty",
        label: "Faculty author",
        detail: "owned course + domain",
        tone: "purple",
        x: 110,
        y: 115,
      },
      {
        id: "config",
        label: "Versioned config",
        detail: "quiz or class feedback",
        tone: "green",
        x: 310,
        y: 115,
      },
      {
        id: "gate",
        label: "Generation gate",
        detail: "ownership · type · category",
        tone: "cyan",
        x: 525,
        y: 195,
      },
      {
        id: "quota",
        label: "Quota reservation",
        detail: "rolling faculty-course limit",
        tone: "amber",
        x: 350,
        y: 375,
      },
      {
        id: "primary",
        label: "Primary provider",
        detail: "Gemini or Groq draft",
        tone: "purple",
        x: 740,
        y: 105,
      },
      {
        id: "fallback",
        label: "Fallback provider",
        detail: "controlled retry path",
        tone: "amber",
        x: 740,
        y: 285,
      },
      {
        id: "draft",
        label: "Validated draft + log",
        detail: "editable result · latency · status",
        tone: "green",
        x: 880,
        y: 435,
      },
    ],
    edges: [
      { from: "faculty", to: "config" },
      { from: "config", to: "gate" },
      { from: "gate", to: "quota" },
      { from: "gate", to: "primary" },
      { from: "quota", to: "primary", label: "reserved" },
      { from: "primary", to: "fallback", label: "failure" },
      { from: "primary", to: "draft", label: "validated" },
      { from: "fallback", to: "draft", label: "validated" },
    ],
  },
  {
    id: "analytics-reporting",
    group: "Reporting",
    title: "Academic analytics & report generation",
    summary:
      "Course-scoped quiz results and two feedback domains are normalized into faculty decision views, then exported as ranked Excel and PDF artifacts with integrity context preserved.",
    source:
      "Faculty analytics utilities, feedback signal aggregation, Excel export, PDF reports, and quiz result services",
    engineeringNotes: [
      "Feedback aggregation keeps class and quiz domains separate before building combined course-level analytics summaries.",
      "Reporting separates score ranking from flagged-attempt details, so integrity evidence remains visible without changing the grade order.",
    ],
    support: {
      requestPath: [
        [
          "Load permitted academic records",
          "Faculty analytics resolves owned courses, quizzes, student results, class feedback, and quiz feedback within the active filter.",
        ],
        [
          "Normalize source context",
          "Student identity, course context, source domain, validation status, lateness, and integrity fields are shaped for analysis.",
        ],
        [
          "Aggregate decision signals",
          "Score distributions, question performance, feedback sentiment, and option selections are grouped by course and date range.",
        ],
        [
          "Render operational views",
          "Scrollable ranked lists, feedback detail sheets, course cards, and compliance sections expose the relevant evidence.",
        ],
        [
          "Export artifact",
          "Excel and PDF services create a shareable report while preserving separate score and flagged-detail sections.",
        ],
      ],
      modules: [
        ["Academic records", "quizzes, results, courses, students", "purple"],
        ["Feedback bundles", "class and quiz sentiment signals", "cyan"],
        ["Analytics engine", "filters, aggregation, rankings", "green"],
        ["Report services", "Excel export and Syncfusion PDF", "amber"],
      ],
      decisions: [
        [
          "Source-aware analytics",
          "Class and quiz feedback retain their domain identity, avoiding misleading blended sentiment totals.",
        ],
        [
          "Human-readable operations",
          "Faculty analytics resolves student registration numbers and course names rather than exposing UUID-only rows.",
        ],
        [
          "Integrity-preserving reports",
          "Flagged attempts are reported alongside, not silently mixed into, ranking data.",
        ],
      ],
      safeguards: [
        "Course-scoped reads",
        "Date-range filtering",
        "Feedback validation state",
        "Late-submission state",
        "Flagged-attempt context",
        "Memory-conscious ranked lists",
      ],
      operationalPath: [
        "Course records",
        "Normalize",
        "Aggregate",
        "Faculty view",
        "Excel / PDF",
      ],
    },
    nodes: [
      {
        id: "records",
        label: "Academic records",
        detail: "courses · quizzes · results",
        tone: "purple",
        x: 115,
        y: 120,
      },
      {
        id: "feedback",
        label: "Feedback domains",
        detail: "quiz + class submissions",
        tone: "cyan",
        x: 115,
        y: 340,
      },
      {
        id: "bundle",
        label: "Course analytics bundle",
        detail: "identity · source · integrity",
        tone: "green",
        x: 370,
        y: 225,
      },
      {
        id: "signals",
        label: "Signal aggregation",
        detail: "scores · sentiment · options",
        tone: "purple",
        x: 595,
        y: 125,
      },
      {
        id: "views",
        label: "Faculty decision view",
        detail: "rankings · details · compliance",
        tone: "cyan",
        x: 600,
        y: 355,
      },
      {
        id: "excel",
        label: "Excel export",
        detail: "score data and sheets",
        tone: "amber",
        x: 835,
        y: 135,
      },
      {
        id: "pdf",
        label: "PDF scorecard",
        detail: "ranking + flagged detail",
        tone: "green",
        x: 840,
        y: 365,
      },
    ],
    edges: [
      { from: "records", to: "bundle" },
      { from: "feedback", to: "bundle" },
      { from: "bundle", to: "signals" },
      { from: "bundle", to: "views" },
      { from: "signals", to: "views" },
      { from: "views", to: "excel" },
      { from: "views", to: "pdf" },
    ],
  },
];
