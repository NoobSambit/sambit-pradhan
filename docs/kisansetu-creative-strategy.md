# KisanSetu — Product Creative Blueprint

## Source basis and creative premise

This strategy uses the original KisanSetu application, services, API routes, current PRD tracker, scope baseline, market-ingestion artifacts, satellite modules, and active Day 4–6 work. In-progress features are intentionally included; their maturity is stated so the visuals can show the real roadmap without pretending unfinished work is production-complete.

**Product thesis:** KisanSetu turns scattered farming inputs—farm profile, land boundary, crop stage, schemes, satellite condition, market data, weather, and language—into one farm-specific decision context.

**Poster count:** 6. The product contains multiple connected intelligence tracks, including active predictive-market and unified-dashboard work, so each poster must carry one farm decision rather than a generic “AI farming dashboard.”

## Complete capability inventory

| Capability | Purpose | Inputs | Outputs | Connected systems | User / agent value | Maturity |
| --- | --- | --- | --- | --- | --- | --- |
| Authentication and protected workflows | Keep farm data and actions tied to a user | Firebase credentials/session | Protected dashboard, profile, assistant, and action paths | Firebase Auth, protected routes | Establishes private farm context | Implemented |
| Farm profile and memory | Capture the farm once and reuse it in advice | Crop, stage, soil, irrigation, water, location, parcel boundary, budget, risk preference, notes | Saved profile, memory context, personalized prompt packet | Farm-profile API, Firestore, assistant service | Makes later advice specific rather than generic | Implemented |
| Location and boundary capture | Associate advice with an actual farm area | GPS, manual coordinates, land geometry/bbox | Farm location, boundary preview, AOI inputs | LocationBoundaryStep, map preview, satellite resolver | Enables farm-targeted satellite and weather context | Implemented; precision evolution active |
| Personalized assistant | Answer farmer questions with conversation and farm context | Typed question, profile, conversation history | Context-aware agricultural response and saved advice | AI query route, Groq/Ollama runtime, chat log | Central entry point for farm-specific guidance | Implemented |
| Multilingual voice assistant | Let farmers speak, review text, and hear answers | Audio, language, transcript edits, query | STT transcript, response, TTS playback, fallback metadata | STT/TTS/roundtrip routes, voice service | Makes the assistant accessible in regional-language workflows | Implemented / actively hardened |
| AI runtime health and fallback | Make local/provider behavior observable and resilient | Provider choice, health check, failed request | Health signals, fallback/error metadata, provider response | AI health route, Groq/Ollama services | Keeps live demos and advice transparent under failure | Implemented |
| Scheme eligibility matcher | Prioritize government schemes based on farmer context | Profile, state, land/crop/income/other eligibility data | Explainable scored recommendations, missing data, readiness score | Scheme matcher, rule engine, Firestore | Turns scheme search into an action list | Implemented |
| Scheme saving and document checklist | Help a farmer follow through on a scheme | Selected scheme and profile completeness | Saved scheme, required document checklist, official source links | Scheme APIs, checklist route | Reduces application friction | Implemented |
| Full agriculture scheme library | Browse the large scraped agriculture corpus | Search, state, category, ministry, status/source filters | Paginated cards, details, benefits, documents, process, FAQ, official application links | 825-scheme catalog, library route/UI | Supports self-directed discovery beyond recommendations | Implemented |
| Satellite acquisition and AOI handling | Retrieve relevant Sentinel-2 observations for farm land | Farm user, boundary/bbox, cloud limits, refresh intent | Scene metadata, AOI source, cached/live status | CDSE client, resolver, ingest service | Makes space-based evidence farm-specific | Implemented |
| Satellite health interpretation | Translate NDVI/scene information into a usable crop-health signal | Current/baseline satellite data, farm AOI | Health score, confidence, stress classification, recommendations, zones | NDVI process, health service, cache | Makes remote sensing actionable to non-specialists | Implemented / actively refined |
| Satellite map experience | Reveal boundary, zones, freshness, and limitations | Health payload, map interaction, refresh action | Interactive overlay, zone popup, legend, explicit fallback state | SatelliteClient, map visualizer, dashboard link | Builds trust through visible location and confidence context | Implemented |
| Weather intelligence | Show weather conditions and crop-stage risk | Farm location, crop/stage, weather provider data | Forecast, risk/advisory signal, source/fallback metadata | Weather service, weather risk/fusion services | Supports day-to-day farm decisions | Implemented; predictive advisory expansion is planned |
| Market-price intelligence foundation | Explore historical mandi data with filters and freshness | Commodity, state, district, metric, granularity | Card grid, series, table, freshness information | Agmarknet ingestion, Firestore market series, API cards/series | Grounds sale decisions in local market evidence | Implemented / Day 4 active |
| Market ingestion and data quality | Build a resilient market corpus for analysis | Taxonomy, exhaustive combinations, checkpoints, run state | Market taxonomy, time series, run metadata | Ingestion scripts, market services, Firestore | Makes forecasting possible and inspectable | Implemented / actively expanded |
| Forecast and sell-window engine | Project 7/30/90-day market direction and timing | Historical market series, forecast model, confidence logic | Forecast bands, trend rationale, profit delta, best-sell window | Forecast, confidence, anomaly, spike, profit services | Helps timing decisions rather than just reporting prices | In progress — source and services present; PRD acceptance remains open |
| Festival, season, demand and anomaly intelligence | Add contextual market drivers around price signals | Festival calendar/map, seasonality, demand history | Demand/festival signals, anomalies, confidence modifiers | Festival/season/anomaly/spike services | Makes market interpretation more explainable | Active implementation track |
| Crop planning | Generate crop-plan advice from farm inputs | Crop/season/profile inputs | Planning recommendation | Crop planning route and service | Helps prepare a farm decision | Implemented with optional AI provider |
| Disease detection | Offer a guarded disease/pest guidance route | Image/request and crop context | Prediction/guidance with validations | Disease service/route/page | Provides a future-facing diagnosis entry point | Present, mock-heavy path |
| Community | Host posts, comments, and likes for peer exchange | Post/comment/like actions | Community feed and interactions | Community APIs/service | Establishes a peer knowledge substrate | Present; intelligence extraction is in progress |
| Community insight extraction | Mine recurring practices by crop, issue, and region | Community content, confidence/moderation rules | Tagged insights and regional recommendations | Day 4 PRD, community service | Converts anecdote into qualified signal | In progress |
| Unified action dashboard | Bring priority advice into a single weekly view | Farm memory, market, schemes, weather, satellite, notifications | Action cards, freshness, satellite shortcut, alerts | Dashboard routes/components, notification API | Lets a farmer scan what matters next | Day 6 Phase 1 active / partially implemented |
| Offline and field reliability | Keep essential context usable when network drops | Cached assets/context, queued actions, connection state | Offline read access, sync state, recovery behavior | Day 6 PRD | Important for field use | Planned |
| WhatsApp assistant channel | Extend the personalized assistant beyond the web app | WhatsApp text/media webhook, user mapping | Concise profile-aware replies | Day 5 PRD, assistant core | Expands reach to familiar messaging | Planned |
| Document assistant | Extract form fields and guide scheme-document completion | Image/PDF, OCR confidence, farm profile | Completeness checklist, structured summary, prefill hints | Day 5 PRD | Reduces paperwork friction | Planned |
| Bidding ground | Prototype a market/bid interaction experience | Bid/session data | Bid list, statistics, interaction states | Bidding page/components | Explores later commerce/market participation | Prototype present |
| Administration and operational observability | Provide product-side control and status surfaces | Admin request, runtime metrics | Admin view, notifications, ingestion health | Admin route/service, dashboards | Helps manage a multi-service prototype | Implemented foundation |

## Capability clusters

| Cluster | One thing it must communicate | Recommended treatment | Why |
| --- | --- | --- | --- |
| Farm-specific context | The system knows this particular farm before it advises | Full poster | This is the product’s core differentiator |
| Voice-accessible advice | A farmer can ask in a natural language/voice workflow and retain control of the transcript | Full poster | Accessibility is a visible human benefit |
| Scheme actionability | Government support becomes a ranked, explainable, document-ready pathway | Workflow poster | The conversion from eligibility to action is the story |
| Satellite evidence | Land condition can be read from space with confidence and fallback explained | Full poster | Most visually distinctive technical capability |
| Market decision intelligence | Price history, demand context, and forecasts help decide when to sell | Full poster | Includes active Day 4 work and should be shown as forecast maturity evolves |
| One weekly action view | Multiple signals resolve into the next best farm actions | Full poster | Best final proof of connected intelligence; captures active Day 6 integration |

## Poster roadmap

### 1. My farm remembers me

- **Subtitle:** Crop stage, soil, irrigation, location, land boundary, budget, and risk preference become a reusable decision context.
- **Core emotion:** Being understood.
- **Visual metaphor / hero object:** A single farm profile at the centre, with physical and operating details resolving into one farm identity.
- **Supporting UI:** Crop/stage, soil, irrigation, land geometry, map boundary, annual budget, risk preference, memory-ready confirmation.
- **Primary focus:** Farm profile and memory.
- **Secondary focus:** Auth and AOI readiness.
- **Callout labels:** Crop Stage, Soil, Irrigation, Farm Boundary, Budget, Risk Preference, Farm Memory.
- **Animation opportunities:** Profile fields become contextual chips around the farm boundary.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 9/10.

### 2. Ask in your language. Act on your farm.

- **Subtitle:** Speak a farming question, review the transcript, and receive advice shaped by your own crop and context.
- **Core emotion:** Confidence.
- **Visual metaphor / hero object:** One voice waveform transforms into an editable transcript and a farm-aware action card.
- **Supporting UI:** Record state, language control, transcript review/edit, assistant answer, audio playback, quick prompts for weather/market/disease/fertilizer, fallback state.
- **Primary focus:** Multilingual voice and personalized assistant.
- **Secondary focus:** AI health/fallback transparency and saved advice.
- **Callout labels:** Speak, Review Transcript, Farm Context Applied, Listen to Answer, Provider Status.
- **Animation opportunities:** Recording → transcribing → review → answer → playback.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.

### 3. Find the support you can actually use

- **Subtitle:** KisanSetu explains eligibility, missing details, documents, official sources, and the next application step.
- **Core emotion:** Opportunity.
- **Visual metaphor / hero object:** A ranked scheme recommendation becoming a ready-to-complete checklist.
- **Supporting UI:** Eligibility score, profile completeness, missing-input notice, benefit summary, document checklist, save action, official apply link; library filters as secondary UI.
- **Primary focus:** Explainable scheme matching.
- **Secondary focus:** Full agriculture scheme library with benefits/process/FAQ.
- **Callout labels:** Eligible, Why This Matches, Missing Details, Documents Needed, Save Scheme, Official Source.
- **Animation opportunities:** Profile context raises a scheme’s score; checklist fills as documents are prepared.
- **Complexity:** Medium. **Marketing value:** 9/10. **Technical depth:** 10/10.

### 4. See your farm from space—honestly

- **Subtitle:** A farm boundary, current satellite scan, stress zones, confidence, and refresh state make crop health visible without hiding uncertainty.
- **Core emotion:** Reassurance.
- **Visual metaphor / hero object:** One dark satellite map framed by the exact farm boundary and a color-coded health overlay.
- **Supporting UI:** AOI-source label, scan timestamp, health score, confidence, stress trend, zone legend, zone popup, Refresh Scan, estimated-zone/fallback disclosure.
- **Primary focus:** Satellite health interpretation and map.
- **Secondary focus:** Sentinel acquisition, cached/live status, AOI resolution.
- **Callout labels:** Farm Boundary, Health Score, Confidence, Stress Zone, Live Scan, Cached Result, Refresh Scan.
- **Animation opportunities:** Scan line reveals zones; refresh transitions from cached to new timestamp.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.

### 5. Know the market. Choose the moment.

- **Subtitle:** Explore mandi history, demand context, freshness, and the emerging 7/30/90-day forecast layer before deciding when to sell.
- **Core emotion:** Agency.
- **Visual metaphor / hero object:** One market time series moving from recorded history into a clearly separated forecast window.
- **Supporting UI:** Commodity/state/district filters, metric/granularity toggle, price card, series, data freshness, festival/demand markers, forecast confidence, sell-window recommendation, caution state.
- **Primary focus:** Market intelligence and forecast work.
- **Secondary focus:** Agmarknet ingestion, anomalies, seasonality, festival/demand signals.
- **Callout labels:** Market History, Data Freshness, Demand Signal, 7 Days, 30 Days, 90 Days, Confidence, Best Sell Window.
- **Animation opportunities:** Filters recast the line; historical boundary gives way to dashed forecast region.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.
- **Maturity note:** The historical-market foundation is implemented; forecast quality and recommendation acceptance are active Day 4 work. Poster copy must visibly distinguish forecast from guarantee.

### 6. What needs attention this week

- **Subtitle:** A single farm briefing brings together schemes, weather risk, satellite status, market movement, and the next action—without forcing a farmer to hunt across modules.
- **Core emotion:** Calm control.
- **Visual metaphor / hero object:** A short prioritized action stack over one farm-at-a-glance summary, not a dense dashboard grid.
- **Supporting UI:** Action This Week, satellite status, scheme readiness, weather advisory, market card, freshness timestamp, assistant/voice entry, notification state.
- **Primary focus:** Unified dashboard integration.
- **Secondary focus:** Weather, community insight, crop planning, notifications.
- **Callout labels:** Action This Week, Weather Risk, Satellite Status, Scheme Ready, Market Watch, Updated Now, Ask Assistant.
- **Animation opportunities:** Cards sort by urgency; each action opens a focused source module.
- **Complexity:** Medium. **Marketing value:** 9/10. **Technical depth:** 9/10.
- **Maturity note:** Day 6 integration is active; use honest modular states rather than claiming a fully finished offline unified system.

## Landing sequence and coverage

1. My farm remembers me
2. Ask in your language. Act on your farm.
3. Find the support you can actually use
4. See your farm from space—honestly
5. Know the market. Choose the moment.
6. What needs attention this week

| Capability area | Poster coverage |
| --- | --- |
| Auth, farm profile, location/boundary, memory | 1 |
| Assistant, multilingual voice, transcript, TTS, runtime health/fallback, saved advice | 2 |
| Scheme matching, saving, checklist, full 825-scheme library | 3 |
| CDSE acquisition, AOI, NDVI, confidence, health zones, cache and refresh | 4 |
| Market corpus, ingestion, filters, history, demand/festival/anomaly, forecasting and sell windows | 5 |
| Dashboard, weather, crop planning, community insights, alerts, notifications | 6 |
| Disease path, bidding prototype, WhatsApp, documents, offline support | Supporting roadmap / future detail visuals; do not imply production completion |

## Creative guardrails

- In-progress features belong in the story, but their maturity must be visible. Do not erase them and do not market them as finished guarantees.
- Satellite fallback, data freshness, forecast confidence, and provider fallback are trust features—show them rather than hiding them.
- Do not present the disease route as production-grade diagnosis; the current path is mock-heavy.
- Do not promise real-time bidding, production WhatsApp, document OCR, or offline sync before those PRD tracks are complete.
- Keep every poster anchored to a farm decision. Avoid stock farming imagery or a generic green analytics collage.
