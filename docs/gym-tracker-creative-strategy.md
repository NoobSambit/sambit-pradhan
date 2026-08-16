# Gym Tracker Creative Strategy Blueprint

## Product thesis

Gym Tracker is a local-first strength-training system. It makes the gym-floor loop fast and recoverable before adding optional accounts, controlled sync, private sharing, and trusted group challenges. V1 is feature-complete under PRD 08; PRD 09 manual stabilization remains open, so this blueprint must not market it as a finished release.

Source basis: the original `/home/noobsambit/Documents/gym-tracker` codebase, its application handbook, feature modules, NestJS API modules, Prisma schema, and release/stabilization documentation.

## Complete capability inventory

| Feature                  | Purpose                                           | Inputs                                                   | Outputs                                                   | Related systems                     | User value                             | Product value                            | Importance |
| ------------------------ | ------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------- | -------------------------------------- | ---------------------------------------- | ---------- |
| Guest-first onboarding   | Begin privately without an account                | Units, timezone, theme, timer choices                    | Local profile and preferences                             | Drift/SQLite, account claim         | Can train immediately                  | Keeps signup out of the critical path    | 9          |
| Workout preferences      | Adapt the gym interaction surface                 | Density, set fields, timer, sound, vibration, quiet mode | Accessible working configuration                          | Settings, notifications             | Fewer interruptions                    | Makes speed and accessibility deliberate | 8          |
| Exercise catalog         | Find a movement or create a personal one          | Search, alias, filters, metadata                         | 118 seeded entries or custom record                       | Routines, workouts                  | Fast movement selection                | Ownable, non-proprietary catalogue       | 8          |
| Exercise detail          | Preserve useful training context                  | Notes, links, equipment/muscle/metric data               | Enriched personal exercise record                         | Catalog, routines                   | Better decisions while training        | Reuses a consistent movement model       | 7          |
| Versioned routines       | Plan training without rewriting history           | Program days, order, targets, supersets                  | Immutable routine version                                 | Schedule, active workout            | Future edits stay safe                 | Historical integrity                     | 10         |
| Scheduling               | Make planned training accountable                 | Planned day actions                                      | Started, completed, skipped, moved, cancelled state       | Today, routines, audit links        | Clear plan and follow-through          | Explicit state machine                   | 8          |
| Active workout           | Log a session at gym speed                        | Routine/ad hoc start, performed sets                     | Durable active session and final summary                  | Drift, history, timer               | Fast confidence during training        | Core retention loop                      | 10         |
| Set controls             | Correct the real-world session without friction   | Load, reps, duration, RPE/RIR, notes, set action         | Completed/skipped/undone/copied/filled/swapped set data   | Active workout                      | Handles normal gym-floor variation     | Makes the model practical                | 10         |
| Rest timer               | Protect recovery timing locally                   | Start, pause, resume, add time, finish                   | Timestamped timer and notification                        | Local notification scheduler        | Keeps attention on training            | Remains reliable offline                 | 9          |
| Restart recovery         | Resume after backgrounding or interruption        | Persisted active state                                   | Restored exact workout state                              | Drift transaction layer             | Prevents lost sessions                 | Reliability differentiator               | 10         |
| Workout history          | Keep completed work authoritative                 | Completed snapshots, corrections                         | Historical session detail                                 | Progress, export                    | Trustworthy record                     | Immutable-fact foundation                | 9          |
| Progress metrics         | Turn sessions into understandable trends          | Completed workout facts                                  | Volume, e1RM, hard sets, consistency, muscle distribution | Goals, history                      | Sees real progress                     | Metrics can be recalculated              | 9          |
| Goals and achievements   | Encourage deliberate progress                     | Goal periods, reviews, completion facts                  | Goals, XP, achievements                                   | Progress, reminders                 | Motivation with context                | Extends the training loop                | 7          |
| Export and restore       | Keep training data portable                       | JSON/CSV request, backup file                            | JSON schema 1.0.0, CSV, restore result                    | History, account data rights        | Ownership and recoverability           | Builds trust                             | 8          |
| Optional account         | Add identity only when useful                     | Email/password, guest data choice                        | Authenticated session and account                         | Secure storage, API                 | Account control without forced signup  | Opens cross-device paths                 | 8          |
| Sync and conflicts       | Reconcile local work with remote state            | Local outbox, remote changes                             | Ownership-checked reconciliation or explicit conflict     | OpenAPI, NestJS, Prisma, PostgreSQL | Controlled continuity                  | Avoids direct-client database access     | 9          |
| Data rights              | Let users control account data                    | Export/deletion request                                  | Account export or deletion workflow                       | Auth, sync, API                     | Privacy control                        | Responsible lifecycle                    | 8          |
| Private social           | Share only with chosen people                     | Profile, invites, shares, access level                   | Authorized feed/history access                            | Blocks, groups, notifications       | Social support without public exposure | Privacy-first network model              | 8          |
| Groups and moderation    | Support bounded communities safely                | Invites, roles, comments, reports                        | Membership state, evidence, moderation trail              | Social API, notifications           | Safer collaboration                    | Authorization is explicit                | 7          |
| Private challenges       | Make competition fair and accountable             | Rules, participants, source workouts                     | Server-derived standings and outcomes                     | Challenge service, XP               | Motivating group goals                 | Prevents client-reported totals          | 9          |
| Correction-aware scoring | Keep results honest when training data changes    | Corrected/invalidation source                            | Recalculated score, frozen final, reversal                | History, challenges                 | Fair outcomes                          | Trusted scoring boundary                 | 8          |
| Release stabilization    | Turn feature completeness into a release decision | Automated gates, manual journeys, defects                | Fixed/deferred evidence and decision                      | API, mobile, contracts, APK         | Fewer surprise failures                | Honest release discipline                | 9          |

## Capability clusters and treatment

| Cluster                    | Core message                                                                                                                                        | Best medium           | Why                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------- |
| Local training foundation  | This image should make people immediately understand that training begins instantly and stays private by default.                                   | Workflow illustration | It explains a product decision clearly.                          |
| Active workout reliability | This image should make people immediately understand that every set, timer, and interruption is handled locally without losing the session.         | Full cinematic poster | The clearest differentiator and strongest emotional promise.     |
| Plans with memory          | This image should make people immediately understand that future routine edits never rewrite past training.                                         | Workflow illustration | Versioning needs one visible causal chain.                       |
| Progress you can trust     | This image should make people immediately understand that progress is derived from completed facts and can be rebuilt after correction.             | Full cinematic poster | Strong proof-oriented story.                                     |
| Optional connected account | This image should make people immediately understand that sync is an opt-in bridge from local truth to account-backed continuity.                   | Architecture diagram  | The security and ownership boundary matters more than spectacle. |
| Private social competition | This image should make people immediately understand that motivation can be social without becoming public, and standings are server-trusted.       | Full cinematic poster | A memorable compound idea when scoped to private competition.    |
| Release evidence           | This image should make people immediately understand that a release candidate is verified across mobile, API, data, contracts, and manual journeys. | Documentation graphic | Technical credibility, not headline marketing.                   |

## Flagship poster roadmap

### 1. Training that never waits

- **Subtitle:** Start as a guest. Train locally. Keep your workout moving when the signal disappears.
- **Core emotion:** Calm confidence
- **Visual metaphor:** A clear local training loop inside a protective ring; the cloud is outside the ring, optional rather than required.
- **Hero object:** A single active-workout session.
- **Supporting UI:** Guest mode, units, rest-timer preference, local session status.
- **Callout labels:** No account required, Local profile, Drift / SQLite, Ready offline.
- **Animation opportunities:** A network indicator drops while the set-entry loop stays alive.
- **Complexity:** Low. **Marketing:** 9. **Technical:** 8. **Priority:** 1.

### 2. Never lose the workout

- **Subtitle:** Fast set entry, rest timing, autosave, and exact restart recovery—built for the gym floor.
- **Core emotion:** Relief
- **Visual metaphor:** A completed set travels through a local transaction path and survives a simulated interruption.
- **Hero object:** One large performed-set card beside a live rest timer.
- **Supporting UI:** Previous values, complete/undo, pause/resume, recovered session, summary.
- **Callout labels:** One active workout, Transactional write, Timer state, Restart recovery, Historical snapshot.
- **Animation opportunities:** Background the app, return, and see the precise set/timer state resume.
- **Complexity:** Medium. **Marketing:** 10. **Technical:** 10. **Priority:** 1.

### 3. Plans change. History does not.

- **Subtitle:** Routine versions let the next program evolve while completed training keeps its original meaning.
- **Core emotion:** Control
- **Visual metaphor:** One routine branches into a new version while a completed workout remains fixed in an illuminated timeline.
- **Hero object:** A plan-version split.
- **Supporting UI:** Routine days, targets, superset group, schedule state, completed snapshot.
- **Callout labels:** Version 1, Future edit, Planned, Moved, Completed fact.
- **Animation opportunities:** Editing a routine creates a new branch instead of rewriting the old one.
- **Complexity:** Medium. **Marketing:** 8. **Technical:** 10. **Priority:** 3.

### 4. Progress you can rebuild

- **Subtitle:** Completed sessions become accountable metrics, goals, exports, and correction-safe history.
- **Core emotion:** Trust
- **Visual metaphor:** Raw workout facts assemble into a single clean progress signal, then recompute after a correction.
- **Hero object:** One evolving progress curve paired with its source workout.
- **Supporting UI:** Volume, estimated 1RM, hard sets, consistency, goal review, JSON/CSV export.
- **Callout labels:** Completed facts, Calculation version, Correct session, Rebuild metrics, Export your data.
- **Animation opportunities:** Correct one set and watch only the affected metrics update.
- **Complexity:** Medium. **Marketing:** 9. **Technical:** 9. **Priority:** 2.

### 5. Connect when you choose

- **Subtitle:** Claim local training data, push a controlled outbox, and reconcile through an ownership-checked API.
- **Core emotion:** Agency
- **Visual metaphor:** A bridge from a protected phone-local vault to an account vault, with an explicit consent gate in between.
- **Hero object:** The account-choice gate.
- **Supporting UI:** Guest claim, secure session, outbox, generated OpenAPI client, conflict state.
- **Callout labels:** Optional account, Secure tokens, Outbox, Ownership check, Explicit conflict.
- **Animation opportunities:** Local changes queue, cross the bridge after consent, and return reconciled.
- **Complexity:** Medium. **Marketing:** 8. **Technical:** 10. **Priority:** 4.

### 6. Compete privately. Score honestly.

- **Subtitle:** Invite-only groups, controlled sharing, and server-derived standings from trusted workout sources.
- **Core emotion:** Belonging
- **Visual metaphor:** A small protected circle of lifters feeding verified workout signals into one shared leaderboard.
- **Hero object:** A private challenge standing card.
- **Supporting UI:** Invite, group role, share scope, scoring preview, final standings.
- **Callout labels:** Private group, Block override, Authorized source, Server score, Recalculate, Frozen final.
- **Animation opportunities:** A corrected source workout visibly updates standings before finalization.
- **Complexity:** Medium. **Marketing:** 9. **Technical:** 10. **Priority:** 5.

## Landing-page sequence

1. Training that never waits — establish the local-first promise.
2. Never lose the workout — prove the critical gym-floor interaction.
3. Plans change. History does not. — show temporal integrity.
4. Progress you can rebuild — turn integrity into visible value.
5. Connect when you choose — introduce accounts without undermining local-first.
6. Compete privately. Score honestly. — end with trustworthy community motivation.
7. Release evidence — technical supporting graphic below the flagship sequence.

## Feature coverage matrix

| Capability                      | 1   | 2   | 3   | 4   | 5   | 6   | Supporting graphic |
| ------------------------------- | --- | --- | --- | --- | --- | --- | ------------------ |
| Guest and preferences           | ✓   |     |     |     |     |     |                    |
| Exercise catalog                |     | ✓   | ✓   |     |     |     |                    |
| Routines and schedule           |     | ✓   | ✓   |     |     |     |                    |
| Active workout and timer        |     | ✓   |     |     |     |     |                    |
| History, metrics, goals, export |     |     | ✓   | ✓   |     |     |                    |
| Account, sync, data rights      |     |     |     |     | ✓   |     |                    |
| Social, sharing, moderation     |     |     |     |     |     | ✓   |                    |
| Challenges and recalculation    |     |     |     |     |     | ✓   |                    |
| Stabilization and verification  |     |     |     |     |     |     | ✓                  |

## Creative guardrails

- Do not depict arbitrary bodybuilders, medical claims, or public leaderboard culture; the product is about a dependable personal training record.
- Avoid dense dashboards. Every flagship should have one readable promise, one hero object, and no more than three supporting UI elements.
- Do not imply that cloud sync is necessary for the active workout.
- Do not imply challenges trust self-reported client totals.
- Distinguish PRD 08 feature completeness from PRD 09 release completion. A dated workout audit recorded stabilization findings; their present state requires a fresh verification run.

## Master creative blueprint

The narrative starts with personal autonomy, earns trust through local reliability, proves historical integrity, reveals accountable insight, then expands into opt-in connectivity and private community. The strongest visual hierarchy is: active-workout reliability first, progress second, routine/history integrity third, and private challenge trust fourth. Account sync and release evidence should support the story rather than compete with the gym-floor promise.

No flagship concepts need merging: each answers a distinct customer question. The only split worth preserving is private social versus server-scored challenges—use the latter for the cinematic poster and keep general social/messaging as supporting UI so the image does not become a generic social network dashboard.
