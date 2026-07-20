# InsightQuill — Product Creative Blueprint

## Source basis and creative premise

This strategy is derived from the original Flutter application, Supabase migrations/RLS tests, role-specific screens, API handlers, feedback/quiz models, report generators, authentication services, and active dashboard modules. It includes the operational surface that is invisible in a generic education-app summary.

**Product thesis:** InsightQuill turns academic operations into one governed evidence loop: the right person acts, attendance unlocks eligibility, assessments run with integrity, feedback is structured, and leadership sees proof rather than anecdotes.

**Poster count:** 5. The product has multiple roles and several complete closed loops; compressing them into fewer posters would make it look like a generic LMS.

## Complete capability inventory

| Capability | Purpose | Inputs | Outputs | Connected systems | User / agent value | Maturity |
| --- | --- | --- | --- | --- | --- | --- |
| Multi-college and role identity | Establish scoped access for super admin, HOD, faculty, and students | College, department, role, account state | Role-aware routes and permissions | User/college/department models, Supabase RLS | Each person sees only the work they own | Implemented |
| Account onboarding and lifecycle | Create, verify, approve, invite, deactivate, archive, and recover accounts | Credentials, OTPs, invite data, status actions | Activated or governed user account | Auth service, API handlers, audit log | Makes academic access manageable and accountable | Implemented |
| Multi-step login security | Add challenge, approval, biometric completion, OTP, password reset, and session health | Login credential / device / verification code | Approved authenticated session | Login requests, biometric service, OTP API, notifications | Protects sensitive academic workflows | Implemented |
| Super-admin control center | Govern colleges, HODs, status, and institutional overview | College/HOD records and admin actions | College status, HOD invitations, org metrics | Super-admin APIs, migrations | Scales beyond one department | Implemented |
| HOD department command center | Manage faculty membership and department-level performance | Department/faculty data and status actions | Faculty directory, updates, archival, scoped overview | HOD APIs, faculty analytics | Gives departmental leadership a real operating view | Implemented |
| Course, roster, and timetable operations | Define who teaches, who attends, and when work happens | Courses, faculty, student enrollment, schedule data | Course workspaces, roster binding, timetable checks | Database service, enrollment APIs | Provides the data spine for attendance and quizzes | Implemented |
| Attendance management | Record and correct classroom attendance | Course, roster, date, per-student/bulk state | Attendance records, course-day status, eligibility data | Attendance model, student dashboard | Makes participation operational | Implemented |
| Eligibility and collision checks | Prevent invalid quiz conditions | Attendance, timetable, active quiz/session state | Eligibility decision and overlap prevention | Quiz attempt policy, schedule utils | Reduces accidental or unfair assessment access | Implemented |
| Quiz authoring | Create structured assessments with question types and configuration | Details, questions, question images, rules, feedback selection | Scheduled quiz definition | Quiz model, image storage, AI question endpoints | Gives faculty control over delivery design | Implemented |
| AI question drafting | Assist faculty with question generation through provider fallback | Topic/configuration and provider availability | Draft questions with safe fallback metadata | Groq/Gemini API handlers, quota/config logic | Speeds authoring without hiding the review step | Implemented |
| Live quiz delivery | Run timed student sessions with attempts and live status | Quiz/session, answers, timing, presence | Submission, score, termination reason, live counts | Quiz sessions, realtime reads | Creates a controlled assessment moment | Implemented |
| Quiz integrity and reporting | Make assessment outcomes inspectable | Submissions, eligibility, timing, question data | Analytics, scorecards, PDF/Excel reports | Report services, exports, analytics pages | Moves beyond a raw score list | Implemented |
| Class feedback configuration | Build course-level feedback instruments with rules and version history | Question bank, timing, config options, AI draft request | Active/past configuration versions | Class feedback APIs, version models | Makes feedback deliberate and repeatable | Implemented |
| Quiz feedback configuration | Attach governed feedback prompts to assessments | Quiz context, questions, version actions | Quiz-specific feedback sessions and versions | Quiz feedback APIs, config models | Captures assessment-specific signal | Implemented |
| AI feedback-question drafting | Propose feedback questions with provider fallback and quota controls | Course/quiz context and draft instruction | Reviewable question options plus AI metadata | Groq/Gemini feedback handlers | Reduces configuration effort while preserving review | Implemented |
| Guided feedback collection | Let students submit structured class and quiz feedback | Session, prompts, choices, comments, validation rules | Validated response and session completion | Feedback validators, runtime/session bridge | Produces comparable signal rather than free-text noise | Implemented |
| Feedback quality and domain guards | Reject invalid or off-domain feedback and expose helpful guidance | Response, rules, target context | Validation hints, accepted/rejected response | Quality/domain utilities, server guards | Protects the quality of downstream analytics | Implemented |
| Feedback analytics and sentiment | Convert submissions into trends, responses, signals, and compliance state | Class/quiz feedback, filters, sentiment | Overview, response drilldown, signal distribution, flagged conditions | Analytics utils, realtime reads | Makes feedback actionable | Implemented |
| Faculty analytics workspace | Bring quizzes, feedback, performance, compliance, filters, and drilldowns together for the teaching role | Course/date filters, live and historical data | Faculty-level operational analytics | Faculty dashboard modules | Shows what needs action without cross-role leakage | Implemented |
| Student command surface | Present attendance, timetable, quiz, class-feedback state, and pending actions | Student enrollment and current sessions | Personal academic action list | Student dashboard state, notification token | Makes each student’s next action clear | Implemented |
| Notifications and audit trail | Keep device state and critical actions traceable | Device token and client/server events | Notification registration and audit records | Notification service, audit-log API | Supports accountability and response | Implemented |
| Realtime + data governance foundation | Keep operational views current under scoped database rules | Supabase tables, RLS policies, runtime state | Realtime dashboards and guarded writes | Supabase migrations/RLS, Firestore compatibility | Makes multi-role operations safe and current | Implemented |

## Capability clusters

| Cluster | One thing it must communicate | Recommended treatment | Why |
| --- | --- | --- | --- |
| Governed academic identity | The correct person can act at the correct institutional scope | Architecture poster | Scope and approval are the story, not a login screen |
| Attendance-to-eligibility chain | Participation becomes a fair, visible gate for assessment | Workflow illustration | The causal sequence is simple and distinctive |
| Assessment lifecycle | Faculty can author, schedule, run, and inspect a live quiz | Full poster | This is a complete high-value loop with strong visual moments |
| Feedback as trustworthy signal | Feedback is configured, validated, versioned, and analyzed—not merely collected | Full poster | It is the deepest differentiated subsystem |
| Leadership evidence | Admins and HODs see institutional and departmental conditions with receipts | Editorial dashboard poster | Strong closing proof without becoming a dense app screenshot |

## Poster roadmap

### 1. Every academic action has a rightful owner

- **Subtitle:** Super admin, HOD, faculty, and student work inside one system—each at the correct college and department scope.
- **Core emotion:** Trust.
- **Visual metaphor / hero object:** A clear institutional hierarchy with four role workspaces connected to one governed data core.
- **Supporting UI:** College status, HOD invite, faculty directory, approval state, role badge, audit event.
- **Primary focus:** Multi-role, multi-college governance.
- **Secondary focus:** OTP, approval, biometric completion, account status, RLS.
- **Callout labels:** College, Department, HOD, Faculty, Student, Approved Access, Audit Trail.
- **Animation opportunities:** An invitation resolves into a scoped workspace; access boundaries illuminate by role.
- **Complexity:** Medium. **Marketing value:** 8/10. **Technical depth:** 10/10.

### 2. Attendance is not a spreadsheet. It is eligibility.

- **Subtitle:** Roster, timetable, and attendance state make assessment access explicit before a quiz begins.
- **Core emotion:** Fairness.
- **Visual metaphor / hero object:** One student journey from scheduled class to attendance confirmation to an unlocked quiz.
- **Supporting UI:** Timetable slot, course roster, present/absent controls, eligibility chip, collision warning, quiz entry state.
- **Primary focus:** Attendance-to-quiz eligibility workflow.
- **Secondary focus:** Course binding and timetable overlap checks.
- **Callout labels:** Scheduled Class, Attendance Recorded, Eligible, Quiz Opens, Conflict Prevented.
- **Animation opportunities:** A checked attendance state unlocks the quiz gate.
- **Complexity:** Low. **Marketing value:** 9/10. **Technical depth:** 9/10.

### 3. From question to live evidence

- **Subtitle:** Author a quiz, use AI for drafts when useful, schedule it, run it live, and leave with an inspectable result.
- **Core emotion:** Command.
- **Visual metaphor / hero object:** A central quiz lifecycle strip rather than a dashboard: build → schedule → live → submit → report.
- **Supporting UI:** Question builder, image-question tile, AI draft review, timer, live presence, submission status, scorecard export.
- **Primary focus:** Assessment lifecycle.
- **Secondary focus:** Provider fallback, attempt policy, live state, PDF/Excel reporting.
- **Callout labels:** Draft Questions, Review AI Draft, Schedule, Live Session, Timer, Submission, Export Report.
- **Animation opportunities:** Questions lock at launch; timer and presence indicators activate; result becomes report.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.

### 4. Feedback becomes a signal you can trust

- **Subtitle:** Build the right questions, version the configuration, guard response quality, and turn submissions into patterns faculty can act on.
- **Core emotion:** Clarity.
- **Visual metaphor / hero object:** One validated response stream becoming a clean signal distribution, with configuration versions visible behind it.
- **Supporting UI:** Question bank, AI draft suggestion, config version, session timing, validation hint, sentiment/signal chart, response drilldown, compliance flag.
- **Primary focus:** Feedback intelligence lifecycle.
- **Secondary focus:** Class feedback and quiz feedback parity, provider fallback, restore/delete versions.
- **Callout labels:** Question Bank, AI Draft, Version History, Quality Check, Session Open, Signals, Drilldown.
- **Animation opportunities:** Low-quality response is filtered; validated responses aggregate into a clear trend.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.

### 5. Leadership sees the condition, not just the count

- **Subtitle:** Department and institution views connect faculty activity, assessment performance, feedback health, and compliance into evidence for action.
- **Core emotion:** Assurance.
- **Visual metaphor / hero object:** A leadership briefing page with one large department signal and a few defensible evidence cards.
- **Supporting UI:** Faculty overview, course filter, quiz performance, feedback health, compliance card, college status, action prompt.
- **Primary focus:** HOD and super-admin command views.
- **Secondary focus:** Faculty analytics and student pending-action state.
- **Callout labels:** Faculty Overview, Assessment Health, Feedback Signals, Compliance, College Status, Needs Attention.
- **Animation opportunities:** Filter by department or course; evidence cards update as one coherent briefing.
- **Complexity:** Medium. **Marketing value:** 8/10. **Technical depth:** 9/10.

## Landing sequence and coverage

1. Every academic action has a rightful owner
2. Attendance is not a spreadsheet. It is eligibility.
3. From question to live evidence
4. Feedback becomes a signal you can trust
5. Leadership sees the condition, not just the count

| Capability area | Poster coverage |
| --- | --- |
| Roles, college/department scope, account lifecycle, login security, audit | 1 |
| Courses, rosters, timetable, attendance, eligibility, collisions | 2 |
| Quiz authoring, AI drafts, image questions, sessions, timing, presence, reports | 3 |
| Class/quiz feedback configs, AI drafts, versions, validation, analytics, compliance | 4 |
| Faculty/HOD/admin analytics, student action state, notifications, realtime governance | 5 |

## Creative guardrails

- Do not present InsightQuill as an AI chatbot or generic LMS. Its differentiation is governed academic workflow and evidence quality.
- AI drafts are assistive, reviewable steps—not autonomous assessment or evaluation.
- Keep all roles readable; do not create a giant all-role dashboard.
- Do not show raw personal/student data in poster content. Use representative, anonymized learning signals.
