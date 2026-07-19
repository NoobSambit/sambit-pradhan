import type { InsightQuillFeature } from "./types";

export const insightQuillFeatures: InsightQuillFeature[] = [
  {
    id: "college-operations",
    title: "Multi-role college operations",
    category: "Administration",
    summary:
      "College, department, faculty, course, and student operations with role-scoped workspaces.",
    description:
      "InsightQuill models academic operations around four roles: student, faculty, Head of Department, and super administrator. College, department, programme, course, faculty, student, timetable, and enrollment records define what each role can see and act on, while HOD workflows add department-scoped faculty and course oversight.",
    capabilities: [
      "Super-admin college status, HOD onboarding, and user approval controls",
      "Department, programme, course, faculty, and roster management",
      "Course-to-faculty assignment and enrollment repair utilities",
      "Faculty and HOD dashboard data shaped around owned academic scope",
      "Supabase RLS policies for college-scoped reads and writes",
    ],
    workflow: {
      title: "Academic scope to role workspace",
      nodes: [
        "Set college and department structure",
        "Assign faculty and course ownership",
        "Enroll students and link timetable data",
        "Resolve authenticated user role",
        "Load only the permitted workspace data",
        "Record administrative changes in audit history",
      ],
    },
    engineeringNotes: [
      "The product uses academic ownership as an authorization boundary rather than depending on a single broad administrator role.",
      "HOD endpoints deliberately resolve department scope before faculty or course mutations are made.",
      "Supabase row-level policies are complemented by server-side role and ownership guards for privileged workflows.",
    ],
  },
  {
    id: "identity-access",
    title: "Identity, approval & biometric access",
    category: "Identity",
    summary:
      "Password, OTP, approval, reset, and biometric sign-in paths for academic roles.",
    description:
      "Authentication is designed as a controlled set of role-aware journeys rather than one login screen. InsightQuill supports account creation with signup OTP verification, password login challenges, approved-login completion, password reset challenges, and a biometric path for students and faculty after credential verification. Each successful flow writes an audit event and rejects inactive accounts or mismatched role/college context.",
    capabilities: [
      "Role-aware password verification for student, faculty, HOD, and super-admin access",
      "Signup, login, and password-reset OTP challenge flows",
      "Approved-login requests with status and expiry handling",
      "Biometric completion path for student and faculty accounts",
      "Android developer-mode guard and notification-token registration",
    ],
    workflow: {
      title: "Role-aware access challenge",
      nodes: [
        "Submit identifier, password, and role",
        "Verify Supabase identity and college status",
        "Check role and selected-college match",
        "Create OTP, approval, or biometric challenge",
        "Complete the verified challenge",
        "Issue session context and write audit event",
      ],
    },
    engineeringNotes: [
      "Biometric login follows credential validation; it is not treated as a replacement for the underlying account verification path.",
      "Challenge endpoints reject role mismatches and inactive-college access before a session can be completed.",
      "Developer mode can be blocked at Android launch for release-style builds through a compile-time feature flag.",
    ],
  },
  {
    id: "attendance-roster",
    title: "Attendance, timetables & eligibility",
    category: "Administration",
    summary:
      "Course rosters and timetable-linked attendance that feed assessment and feedback eligibility.",
    description:
      "Faculty can work from course rosters and scheduled timetable slots rather than disconnected lists. Attendance records are tied to course, student, date, marker, and college context; that context is reused by quiz and class-feedback workflows to determine the intended recipient and available academic action.",
    capabilities: [
      "Course roster upload and enrollment synchronization",
      "Timetable-aware class selection and date parsing",
      "Attendance records with present/absent state and audit context",
      "Eligibility links for quiz and feedback workflows",
      "College-scoped course and timetable data access",
    ],
    workflow: {
      title: "Scheduled class to eligible student set",
      nodes: [
        "Select course and timetable slot",
        "Load enrolled student roster",
        "Record or import attendance",
        "Persist college-scoped attendance rows",
        "Resolve eligible students for a quiz or feedback session",
        "Expose the correct pending task to the student dashboard",
      ],
    },
    engineeringNotes: [
      "Academic dates are normalized at the domain boundary to avoid timetable day and timezone drift across web and mobile clients.",
      "Attendance data is not merely a reporting record: it is an input to downstream eligibility and recipient calculation.",
      "Enrollment helpers and repair scripts cover the practical case of incomplete or changed course rosters.",
    ],
  },
  {
    id: "quiz-authoring",
    title: "Quiz authoring & scheduled delivery",
    category: "Assessment",
    summary:
      "Faculty-owned quizzes with image questions, timetable windows, and live session configuration.",
    description:
      "The quiz authoring flow supports course-owned MCQ assessments, optional question images, duration controls, scheduled date and time windows, selected timetable references, and live-session behavior. Faculty can prepare questions manually or create an AI-assisted draft, then review the configuration before making the assessment available to the eligible cohort.",
    capabilities: [
      "Course-scoped quiz creation with question, option, and answer contracts",
      "Optional quiz-question image references and storage migration support",
      "Duration, active/cancelled state, schedule, and timetable-slot controls",
      "Faculty-owned authoring configuration with review steps",
      "Gemini and Groq question-generation endpoints",
    ],
    workflow: {
      title: "Author, schedule, and open an assessment",
      nodes: [
        "Choose owned course and timetable context",
        "Draft questions manually or with AI assistance",
        "Attach optional question imagery",
        "Review duration, schedule, and audience",
        "Persist quiz and live-session configuration",
        "Make the timed attempt visible to eligible students",
      ],
    },
    engineeringNotes: [
      "Authoring guards resolve faculty ownership of the course before configuration or AI generation can proceed.",
      "Question image references are represented in the quiz contract rather than embedded as ephemeral UI-only assets.",
      "Scheduling data includes selected timetable linkage so quiz availability can be interpreted in an academic context.",
    ],
  },
  {
    id: "quiz-integrity",
    title: "Secure quiz attempts & integrity controls",
    category: "Assessment",
    summary:
      "Timed assessment sessions with app-switch monitoring, termination reasons, and trust signals.",
    description:
      "During an active quiz, InsightQuill tracks the attempt as a live, timed session rather than only collecting a final answer sheet. The client enforces fullscreen behavior, monitors app or tab switches, can auto-submit on the configured integrity threshold, and records the resulting termination reason, switch count, flag state, and outcome alongside the student result.",
    capabilities: [
      "Timed quiz sessions with persisted start, end, remaining-time, and pause fields",
      "Fullscreen and app/tab-switch detection during an active attempt",
      "Automatic submission when integrity rules are breached",
      "Developer-mode and USB-debugging safeguards on Android",
      "Flagged attempts and termination reasons available to analytics and reporting",
    ],
    workflow: {
      title: "Live attempt with integrity evidence",
      nodes: [
        "Validate scheduled quiz access",
        "Create or resume timed live session",
        "Render questions in protected attempt state",
        "Track app-switch and integrity events",
        "Submit normally or terminate automatically",
        "Persist score, flags, reason, and trust context",
      ],
    },
    engineeringNotes: [
      "Integrity signals are stored beside the result so faculty reporting can distinguish completion outcomes from raw score alone.",
      "The Android developer-mode guard is evaluated before the primary application surface is loaded.",
      "Session contract changes are carried through Supabase migrations, Flutter models, and quiz-policy tests.",
    ],
  },
  {
    id: "quiz-feedback",
    title: "Quiz feedback lifecycle",
    category: "Feedback",
    summary:
      "Post-assessment feedback sessions with versioned questions, recipient state, and completion safeguards.",
    description:
      "Quiz feedback is a distinct domain from both quiz scoring and lecture feedback. A session attaches the active feedback configuration to the completed assessment, resolves the student recipient, serves selected questions and option signals, validates the written response, and persists the result with configuration provenance for later analytics.",
    capabilities: [
      "Quiz feedback contexts, targets, submissions, and completion state",
      "Course-level configuration precedence and immutable version references",
      "Question-bank selection with multi-select and yes/no contracts",
      "Submitted response validation, flagged state, and analytics-ready option signals",
      "Session ID compatibility handling across evolving schemas",
    ],
    workflow: {
      title: "Completed quiz to verified feedback record",
      nodes: [
        "Resolve the completed quiz and student",
        "Select the effective course feedback configuration",
        "Create feedback context and recipient target",
        "Serve questions and guided response inputs",
        "Validate selections and written feedback",
        "Persist versioned submission for faculty analytics",
      ],
    },
    engineeringNotes: [
      "Configuration version IDs are stored with the submission so later edits cannot rewrite the provenance of past feedback.",
      "Compatibility helpers keep session identifiers stable while deployments move between schema versions.",
      "Course configuration selection is server-owned, preventing clients from choosing an unapproved question set.",
    ],
  },
  {
    id: "class-feedback",
    title: "Timetable-aware class feedback",
    category: "Feedback",
    summary:
      "Post-lecture feedback windows, recipient targeting, deadlines, and submission repair paths.",
    description:
      "Class feedback is an independent feedback runtime for a lecture or timetable slot. Server-side preparation creates the applicable session and target set, while students see pending feedback only when the configured class window is open. Submission handling records lateness, response quality, and runtime context; repair paths address stale or partially created sessions without making the student client guess state.",
    capabilities: [
      "Class-feedback sessions, targets, and recipient calculation",
      "Timetable-aware opening, closing, and timezone handling",
      "Pending-feedback dashboard reads and deadline state",
      "Late-submission and non-submission indicators",
      "Self-heal and repair utilities for incomplete runtime state",
    ],
    workflow: {
      title: "Lecture window to actionable feedback",
      nodes: [
        "Read timetable and course context",
        "Prepare class-feedback session and targets",
        "Open student feedback window in local time",
        "Serve the course-selected question bank",
        "Validate and submit the feedback response",
        "Persist submission or repair stale runtime state",
      ],
    },
    engineeringNotes: [
      "Timezone and timing helpers centralize runtime eligibility so the client does not independently reimplement deadline logic.",
      "The session/target split keeps recipient generation explicit and supports non-submission or late-submission analytics.",
      "Runtime repair is an intentional server-side capability for real operational drift, not a hidden client retry loop.",
    ],
  },
  {
    id: "feedback-quality",
    title: "Micro-prompts & feedback quality validation",
    category: "Feedback",
    summary:
      "Guided student reflection backed by contextual quality checks instead of an unstructured survey textbox.",
    description:
      "InsightQuill’s feedback engine asks students for structured reflection rather than collecting low-effort free text. Static positive and improvement prompts are paired with a dynamic follow-up derived from the student’s selected option signals. The submitted text is evaluated for length, sentence quality, vocabulary diversity, repetition, profanity, URLs, low-effort phrases, and context relevance before it is accepted.",
    capabilities: [
      "Three-part micro-prompt flow: positive, improvement, and contextual follow-up",
      "Option-level, category-level, and generic fallback follow-up selection",
      "Quiz, class, and micro-prompt validation profiles",
      "Minimum length, sentence, diversity, repetition, profanity, URL, and context checks",
      "Machine-readable rejection codes, quality score, and flagged-submission state",
    ],
    workflow: {
      title: "Signals to a validated reflective response",
      nodes: [
        "Student selects option-based feedback signals",
        "Resolve positive, improvement, and follow-up prompts",
        "Collect contextual written reflections",
        "Build validation context from course and selections",
        "Run quality and safety rules",
        "Persist accepted result or return actionable rejection hints",
      ],
    },
    engineeringNotes: [
      "Validation is shared between Flutter utilities and server handlers so quality expectations remain aligned across client feedback and persistence.",
      "Context matching uses selected options, question text, categories, and session tokens instead of a generic keyword-only score.",
      "The rules intentionally distinguish a low-effort response from a valid critical response; profanity and repeated-token checks are separate signals.",
    ],
  },
  {
    id: "feedback-configuration-ai",
    title: "Versioned feedback configuration & AI drafting",
    category: "Intelligence",
    summary:
      "Faculty-owned course configuration with version history, restoration, quota control, and provider fallback.",
    description:
      "Faculty can configure quiz and class feedback independently for each owned course, choosing question categories, question type, and response rules. Each configuration is versioned and can be restored or deleted safely. AI draft endpoints for Gemini/Groq-style providers validate course ownership and requested question shape, reserve a rolling quota, validate provider output, log latency and fallback use, and leave the final authoring decision with the faculty member.",
    capabilities: [
      "Separate class and quiz feedback configuration domains",
      "Course-level configuration precedence with version and restore endpoints",
      "AI drafting for multi-select and yes/no questions",
      "Provider fallback, output validation, feature flags, and rolling request quotas",
      "Generation logs with provider, latency, status, and safe error codes",
    ],
    workflow: {
      title: "Owned course configuration to safe AI draft",
      nodes: [
        "Faculty selects an owned course and feedback domain",
        "Validate category, question type, and option count",
        "Resolve active configuration and version context",
        "Reserve faculty-course generation quota",
        "Generate with primary provider or fallback",
        "Validate, log, and return an editable draft",
      ],
    },
    engineeringNotes: [
      "AI output is a draft with a validated contract, not a direct unreviewed change to the published question bank.",
      "Quota reservation happens before the provider call, allowing the API to return a deterministic 429 boundary instead of an uncontrolled burst.",
      "Generation logs record provider and fallback details without exposing raw secret configuration to the Flutter client.",
    ],
  },
  {
    id: "analytics-reporting",
    title: "Faculty analytics, exports & scorecards",
    category: "Reporting",
    summary:
      "Course-level assessment and feedback signals with Excel exports, PDF reports, and flagged-attempt context.",
    description:
      "The reporting layer combines faculty-owned quiz performance with both class and quiz feedback. It builds course bundles, date-filtered sentiment signals, question-level performance, ranked score views, feedback detail sheets, compliance indicators, and exportable artifacts. Excel score exports and PDF reports separate useful student ranking from flagged attempt details rather than presenting a single opaque total.",
    capabilities: [
      "Course and date-filtered faculty analytics workspaces",
      "Quiz performance, question difficulty, score distribution, and ranked results",
      "Separate quiz and class feedback sentiment and option-signal aggregation",
      "Flagged, late, and validation-passed indicators in feedback analysis",
      "Excel score export and Syncfusion PDF scorecard/report generation",
    ],
    workflow: {
      title: "Persisted academic events to an exportable decision view",
      nodes: [
        "Read course-scoped quizzes, results, and feedback",
        "Normalize student identity and source context",
        "Aggregate score, sentiment, and option signals",
        "Separate class and quiz feedback domains",
        "Render ranked analytics and detail sheets",
        "Generate Excel or PDF reporting artifact",
      ],
    },
    engineeringNotes: [
      "Analytics normalize student-facing identifiers so faculty views do not depend on raw UUIDs for operational decisions.",
      "The reporting services intentionally keep ranking and flagged-detail rendering separate to make integrity context visible without corrupting the score order.",
      "Feedback analytics preserve source domain, lateness, validation, and selected-option context alongside the derived sentiment score.",
    ],
  },
];
