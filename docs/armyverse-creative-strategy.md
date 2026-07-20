# ARMYVERSE — Product Creative Blueprint

## Source basis and creative premise

This strategy is grounded in the ARMYVERSE application, its 70+ route surface, feature documentation, API routes, game services, and active catalog/quest scripts. It deliberately includes implemented product depth that the portfolio card cannot show: playlist evolution, streaming verification, collection crafting, analytics history, writer tooling, profile privacy, and scheduled data pipelines.

**Product thesis:** ARMYVERSE turns BTS fandom from passive listening into an intelligent, personal loop: discover a mix, understand the fandom signal, play and progress, then publish what it means to you.

**Poster count:** 6. This is a large product; fewer posters would hide its three distinct systems—music intelligence, fandom progression, and creator community.

## Complete capability inventory

| Capability | Purpose | Inputs | Outputs | Connected systems | User / agent value | Maturity |
| --- | --- | --- | --- | --- | --- | --- |
| AI Playlist Architect | Build a BTS playlist from detailed taste and situation controls | Prompt, playlist type and length, moods, member bias, era, seed tracks, audio sliders, genre mix, flow pattern, scenario | Ordered BTS playlist plus generation metadata | Groq, BTS catalog, Spotify matching | Makes a personal listening intent concrete | Implemented |
| Guided playlist starts | Reduce blank-page choice with templates and a personality quiz | Template or quiz answers | Reusable playlist configuration | AI playlist configurations | Faster route to a relevant mix | Implemented |
| Playlist evolution and comparison | Refine an existing result and compare alternatives before committing | Existing playlist and refinement intent | Evolved playlist and comparison view | Generation history, configs | Lets the user iterate rather than regenerate blindly | Implemented |
| Manual playlist creation | Let fans hand-pick and sequence tracks | Search, selected tracks, drag ordering | Custom playlist and previews | Track catalog, audio previews | Retains direct creative control | Implemented |
| Spotify connection and export | Move a finished playlist into a real listening account | OAuth/BYO credentials and track mappings | Spotify playlist, integration status | PKCE/OAuth, encrypted tokens, Spotify API | Converts discovery into actual listening | Implemented |
| Personal listening analytics | Explain an individual’s BTS listening footprint | Last.fm / Stats.fm username and listening events | Member split, charts, timeline, top artists/tracks, recent activity | Last.fm, Stats.fm, cached dashboards | Gives a fan a measurable listening identity | Implemented |
| Global Spotify intelligence | Track BTS and solo-member streaming momentum over time | Daily Kworb scrape, Spotify metadata | Songs, albums, ranks, listeners, historical comparisons | Scheduled cron, Kworb snapshots, MongoDB | Makes global fan momentum legible | Implemented |
| YouTube intelligence | Surface BTS video performance and member-filtered momentum | Daily video snapshot and keyword matching | Top videos, gains, history, detail views | Kworb snapshots, YouTube data | Complements audio data with video fandom signal | Implemented |
| Quiz sessions | Turn BTS knowledge into a scored, timed experience | Category/difficulty question pool and answers | XP, completion status, reward eligibility | Question bank, quiz sessions, quests | Makes knowledge participatory | Implemented |
| Photocard collection | Give every performance loop a visible collectible outcome | Quiz/quest/event/mastery rewards, catalog | Owned cards, missing-card states, category progress | Gallery ingestion, inventory, share links | Creates collecting momentum | Implemented |
| Crafting and duplicate conversion | Let users transform duplicate value into a target collection outcome | Duplicate cards and dust | Specific card or random roll | Inventory, drop pool, audit ledger | Gives collection agency instead of pure chance | Implemented |
| Mastery | Track depth across members, OT7, and eras | Correct quiz answers and XP | Levels, milestones, dust, cards, special badges | Mastery ledger, reward claims | Makes learning and listening feel cumulative | Implemented |
| Daily / weekly quests | Create recurring goals around streaming and quizzes | Date-seeded quest definitions, listening and quiz activity | Progress, XP, dust, cards, streaks, badges | Cron generation, Last.fm cache, quest verification | Creates an ongoing reason to return | Implemented |
| Streaming verification | Validate song and album quest activity against listening history | Last.fm username, baseline time, track/album requirements | Verified quest progress | Fuzzy matching, rate limit, cache | Grounds game rewards in real activity | Implemented |
| BoraRush and fan-game hub | Provide fast repeatable game modes, handoffs, limits, and rewards | Run/session state and answers | Run result, rewards, daily-limit state | BoraRush models, game handoff, inventory | Adds a compact arcade-style loop | Implemented |
| Leaderboards and badges | Show achievement across daily, weekly, and all-time periods | XP, profile data, period rules | Rankings, podium, rank changes, badge cabinet | Leaderboard entries, profiles, cron refresh | Makes progress social and visible | Implemented |
| Long-form fan publishing | Give fans a rich editor to publish BTS perspectives | Rich text, images, embeds, tags, mood, visibility | Drafts and published posts | Tiptap, Cloudinary, blog model | Turns fandom insight into durable work | Implemented |
| Collections, discovery, and engagement | Organize and circulate community writing | Collections, search/filter criteria, reactions, comments, saves | Browseable feeds, threaded conversation, author stats | Text index, blog stats, user profiles | Makes publishing discoverable and communal | Implemented |
| SEO and creator intelligence | Help writers understand and improve post reach | Content, metadata, reader interactions | SEO score, read time, meta/OG output, writer stats | Sitemap, analytics, blog APIs | Supports intentional publishing | Implemented |
| Identity, personalization, and privacy | Let each fan control their public self and connected services | Profile fields, visual settings, connections, privacy rules | Live profile, integrations, notifications, exports/deletion | JWT/Firebase, Cloudinary, Spotify/Last.fm | Makes a fan platform feel personal and controlled | Implemented |
| Catalog and scheduled data operations | Keep music, trends, quests, cards, and rewards fresh | External data, daily/weekly schedules, seed/import scripts | Current catalog/snapshots/quest definitions | Cron routes, scripts, MongoDB | Keeps intelligence and progression from going stale | Implemented / actively maintained |

## Capability clusters

| Cluster | One thing it must communicate | Recommended treatment | Why |
| --- | --- | --- | --- |
| Intent-to-playlist intelligence | A fan can express a mood and receive a deliberate BTS mix | Full cinematic poster | It is the clearest activation moment and strongest entry point |
| Listening intelligence | The fandom’s and listener’s musical momentum can be understood, not merely streamed | Editorial data poster | Charts, member distribution, and time are the story—not a dense dashboard |
| Progression economy | Knowing, streaming, and returning visibly build a collection and mastery | Full cinematic poster | The photocard-to-mastery loop is distinctive and memorable |
| Verified ritual | Daily listening becomes a real, verifiable fandom practice | Workflow illustration | The important idea is the chain: activity → verification → quest → reward |
| Fan publishing | A fan is also a writer and curator | Editorial poster | It broadens the product beyond music and games |
| Real-world handoff | A mix leaves the product and becomes a Spotify playlist | Supporting product poster | Important proof of utility, but not enough for an entire visual universe |

## Poster roadmap

### 1. Build the BTS mix for this moment

- **Subtitle:** Mood, era, member bias, seed tracks, genre balance, and energy flow become one playlist with intent.
- **Core emotion:** Recognition.
- **Visual metaphor / hero object:** One large playlist-building surface where a selected mood becomes a visible track journey.
- **Supporting UI:** Mood pills, era selection, member selector, seed-track row, energy curve, generated track list, Generate control.
- **Primary focus:** AI Playlist Architect.
- **Secondary focus:** Templates, personality quiz, compare, evolve, and Spotify export labels.
- **Callout labels:** Mood, Era, Seed Tracks, Energy Flow, Compare, Evolve, Export to Spotify.
- **Animation opportunities:** Controls resolve into a single playlist arc; before/after comparison crossfades.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 9/10.

### 2. Hear the whole fandom move

- **Subtitle:** Follow BTS and every member across global streams, listener growth, video momentum, and time.
- **Core emotion:** Belonging to something vast.
- **Visual metaphor / hero object:** A clean constellation of member signals feeding one historical trend line.
- **Supporting UI:** Artist selector, stream delta, album art, daily gains, global rank, YouTube/Spotify source toggle, time comparison.
- **Primary focus:** Global Spotify and YouTube analytics.
- **Secondary focus:** Personal listening dashboard and member breakdown.
- **Callout labels:** Daily Gains, Global Rank, Monthly Listeners, Video Momentum, Compare Dates.
- **Animation opportunities:** Date scrubber changes gains; member nodes brighten as filters change.
- **Complexity:** Medium. **Marketing value:** 8/10. **Technical depth:** 9/10.

### 3. Every fan action becomes progress

- **Subtitle:** Play a quiz, unlock XP, collect a photocard, convert duplicates, and master the eras you love.
- **Core emotion:** Delightful momentum.
- **Visual metaphor / hero object:** A photocard ascending through a mastery path toward a special badge.
- **Supporting UI:** One quiz result, XP meter, collection completion ring, dust balance, craft action, member/era mastery panel.
- **Primary focus:** Quiz → XP → photocard → mastery loop.
- **Secondary focus:** Crafting and duplicate conversion.
- **Callout labels:** Quiz XP, Card Drop, Collection, Craft with Dust, Member Mastery, Era Mastery.
- **Animation opportunities:** Correct answer emits XP; card lands in collection; duplicate becomes dust.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 9/10.

### 4. Make listening count

- **Subtitle:** Daily and weekly quests verify real streams, then turn consistency into streaks, badges, and rewards.
- **Core emotion:** Commitment.
- **Visual metaphor / hero object:** A single quest path connecting a listening history waveform to a completed badge.
- **Supporting UI:** Daily/weekly toggle, target tracks/albums, verified stream check, quest progress, streak counter, reward modal.
- **Primary focus:** Last.fm-verified quest system.
- **Secondary focus:** Cron-generated quests and leaderboard periods.
- **Callout labels:** Verified Streams, Album Complete, Daily Quest, Weekly Quest, Streak, Claim Reward.
- **Animation opportunities:** Progress fills only when verification succeeds; midnight reset / new quest reveal.
- **Complexity:** Medium. **Marketing value:** 9/10. **Technical depth:** 10/10.

### 5. Fandom has an editorial voice

- **Subtitle:** Write, collect, react, and discover thoughtful BTS stories in a real creator space.
- **Core emotion:** Expression.
- **Visual metaphor / hero object:** A single elegant article canvas emerging into a collection of reader reactions and saved posts.
- **Supporting UI:** Rich editor block, cover image, visibility setting, tag/mood chips, collection card, reaction/comment/save row, author stats.
- **Primary focus:** Creator publishing.
- **Secondary focus:** Collections, search, reader engagement, SEO score.
- **Callout labels:** Draft, Publish, Collection, Reactions, Comments, Saves, SEO Score.
- **Animation opportunities:** Draft transforms into post card; community reactions collect underneath.
- **Complexity:** Medium. **Marketing value:** 8/10. **Technical depth:** 8/10.

### 6. From idea to your actual library

- **Subtitle:** Connect Spotify securely, resolve tracks, and send the finished playlist where listening happens.
- **Core emotion:** Completion.
- **Visual metaphor / hero object:** One playlist crossing a clear bridge from ARMYVERSE to Spotify.
- **Supporting UI:** Connection status, selected tracks, match status, export confirmation, library destination.
- **Primary focus:** Spotify OAuth/BYO connection and export.
- **Secondary focus:** Encrypted user connections and manual playlist handoff.
- **Callout labels:** Connect Spotify, Match Tracks, Export Playlist, In Your Library.
- **Animation opportunities:** Track matches snap into place then transfer as one group.
- **Complexity:** Low. **Marketing value:** 7/10. **Technical depth:** 8/10.

## Landing sequence and coverage

1. Build the BTS mix for this moment
2. Hear the whole fandom move
3. Every fan action becomes progress
4. Make listening count
5. Fandom has an editorial voice
6. From idea to your actual library

| Capability area | Poster coverage |
| --- | --- |
| AI generation, templates, quiz, configs, evolution, comparison | 1 |
| Manual playlist, track matching, Spotify handoff | 1, 6 |
| Personal and global analytics, Spotify and YouTube history | 2 |
| Quiz, BoraRush, cards, crafting, mastery, badges, leaderboards | 3, 4 |
| Streaming verification, scheduled quests, streaks | 4 |
| Blog editor, media, collections, comments, saves, SEO, author stats | 5 |
| Authentication, profile controls, privacy, notifications, data controls | Supporting UI / documentation, not a hero poster |
| Catalog imports, scrapers, cron, caching | Supporting technical callouts, not a hero poster |

## Creative guardrails

- Do not reduce ARMYVERSE to a generic purple music player or a collage of BTS symbols.
- Do not make game rewards look like a generic crypto economy; show quizzes, verified activity, cards, and mastery as the actual value loop.
- Do not hide the creator platform: blogs and collections are a separate audience promise, not a footer feature.
- Keep dense API, authentication, privacy, scraper, cache, and rate-limit detail out of hero visuals; use them as technical proof beside the poster.
