# DocBuilder — Product Creative Blueprint

## Source basis and creative premise

This strategy uses the original DocBuilder frontend, FastAPI application, RAG module, export service, tests, and product documentation. It covers the full authoring loop rather than presenting the app as a generic AI text box.

**Product thesis:** DocBuilder is a persistent AI authoring workspace that turns a topic into structured, research-aware content and delivers it as a real document or presentation.

**Poster count:** 4. The product has one coherent workflow, so the visuals should unfold that workflow instead of multiplying similar AI-generation posters.

## Complete capability inventory

| Capability | Purpose | Inputs | Outputs | Connected systems | User / agent value | Maturity |
| --- | --- | --- | --- | --- | --- | --- |
| Authentication and project workspace | Keep each creator’s projects private and persistent | Firebase session, project metadata | User-scoped project list and working document | Firebase Auth, JWT, Firestore | A document is a durable workspace, not a one-shot prompt | Implemented |
| Project setup | Establish what is being made before generation begins | Topic, document type, title | DOCX or PPTX project with working state | Project model, dashboard | Gives AI an explicit output target | Implemented |
| AI outline generation | Produce a usable document structure | Topic and output type | Suggested 5–8 section outline and word-count guidance | LangChain, Groq Llama | Replaces the blank-page problem | Implemented |
| Section management | Let the user own document structure | Sections, names, order, delete/add actions | Ordered section plan | Drag-and-drop UI, Firestore | Maintains editorial control | Implemented |
| Standard section generation | Draft a section with document-level context | Section identity, document title/type, full outline | Formatted HTML content and bullets | LLM adapter, prompt/parser | Speeds substantive drafting | Implemented |
| Per-section RAG research | Ground selected sections in live web material | Section context and RAG toggle | Research-aware draft, source URLs, query, retrieved chunks | Google Custom Search, scraping, HuggingFace embeddings, FAISS | Adds currency and traceability where needed | Implemented with optional mock fallback |
| Retrieval pipeline | Convert web search into relevant generation context | Generated query, top web results | Cleaned/chunked pages, vector matches, context packet | BeautifulSoup, recursive chunking, FAISS | Keeps retrieval selective instead of dumping search results | Implemented |
| Context-aware refinement | Improve a section without losing the document’s logic | Full section text, section position, adjacent summaries, user refinement intent, reaction history | Edited content with continuity and adaptive length | Refinement service, LLM | Makes revision more editorial than prompt-and-replace | Implemented |
| Rich editing and comments | Enable direct human revision and feedback | Formatted content, comments/reactions | Edited section content and refinement signals | TipTap, React UI | Keeps the user in authorship | Implemented |
| Document export | Produce a styled word-processing artifact | Complete document, metadata, HTML structure | DOCX with title page, hierarchy, lists, formatting | python-docx | Converts work into a deliverable | Implemented |
| Presentation export | Convert the same project into presentation output | Sections, chosen theme | PPTX slides with layouts and branding | python-pptx | Lets a single research effort serve a second format | Implemented |
| Export themes and layout intelligence | Match export appearance to context | Professional, Modern, Academic, or Creative theme; content length | Themed slides and content-aware sizing | Export service | Avoids raw text dumped into slides | Implemented |
| Deployment and runtime safeguards | Keep cross-service authoring workable | Environment configuration, API auth, CORS | Railway/Vercel-compatible application | FastAPI, Next.js, Firebase, Groq, Google APIs | Production path for a multi-service workflow | Implemented |

## Capability clusters

| Cluster | One thing it must communicate | Recommended treatment | Why |
| --- | --- | --- | --- |
| Structure before prose | The product begins with an editable plan, not a blank canvas | Full poster | It is the cleanest first-time value proposition |
| Research-aware generation | AI can retrieve, select, cite, and write from current material | Workflow illustration | The flow is more memorable than a fake search dashboard |
| Contextual revision | The AI understands where a section sits in the whole argument | Full poster | This is the product’s most differentiated editorial capability |
| One project, two professional outputs | A document can become an export-ready report or deck | Comparison poster | A simple two-outcome visual makes the output benefit immediate |

## Poster roadmap

### 1. Start with structure, not a blank page

- **Subtitle:** Give DocBuilder a topic and destination; it returns a working outline you can reshape before any draft exists.
- **Core emotion:** Relief.
- **Visual metaphor / hero object:** A single topic expands into a clean, editable section spine.
- **Supporting UI:** Topic field, DOCX/PPTX choice, outline sections, drag handle, add section, generation action.
- **Primary focus:** Project setup and outline generation.
- **Secondary focus:** Persistent workspace and section management.
- **Callout labels:** Topic, Document Type, Suggested Outline, Reorder, Add Section.
- **Animation opportunities:** A blank state resolves into a structured outline; a section moves cleanly in the spine.
- **Complexity:** Low. **Marketing value:** 10/10. **Technical depth:** 7/10.

### 2. Research enters exactly where it matters

- **Subtitle:** Turn on web research for one section; relevant sources are retrieved, ranked, and carried into the draft with traceable links.
- **Core emotion:** Confidence.
- **Visual metaphor / hero object:** One focused section receives a narrow stream of source cards, then becomes a cited draft.
- **Supporting UI:** RAG toggle, query, selected source cards, relevance fragments, cited draft, source URLs.
- **Primary focus:** Per-section RAG workflow.
- **Secondary focus:** Search, scraping, embeddings, FAISS similarity, optional mock fallback.
- **Callout labels:** Web Research, Search Query, Relevant Sources, Retrieved Context, Citations.
- **Animation opportunities:** Sources filter down to a few context cards before text appears.
- **Complexity:** Medium. **Marketing value:** 9/10. **Technical depth:** 10/10.

### 3. Revise without losing the thread

- **Subtitle:** Improve one section while keeping its place, neighbors, length, and prior feedback in view.
- **Core emotion:** Control.
- **Visual metaphor / hero object:** A central section held between its previous and next ideas, with a refinement instruction operating on the middle.
- **Supporting UI:** Section-position marker, adjacent summaries, full draft, Make this longer / improve transition intent, like/dislike history, before/after change.
- **Primary focus:** Context-aware refinement.
- **Secondary focus:** Rich text editing and comments.
- **Callout labels:** Previous Section, Current Section, Next Section, Full Context, Refinement History, Review Change.
- **Animation opportunities:** Surrounding context locks in; refined phrases resolve in the center.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.

### 4. One project. Two finished formats.

- **Subtitle:** Export an organized report or transform the same thinking into a themed presentation without rebuilding the work.
- **Core emotion:** Completion.
- **Visual metaphor / hero object:** One project branches into an elegant DOCX cover and a PPTX slide deck.
- **Supporting UI:** Export chooser, four theme swatches, document hierarchy preview, slide layout preview, Export DOCX, Export PPTX.
- **Primary focus:** Professional dual-format export.
- **Secondary focus:** Formatting preservation and adaptive slide layout.
- **Callout labels:** DOCX, PPTX, Professional, Modern, Academic, Creative, Export Ready.
- **Animation opportunities:** The section spine rearranges into page and slide compositions.
- **Complexity:** Low. **Marketing value:** 8/10. **Technical depth:** 8/10.

## Landing sequence and coverage

1. Start with structure, not a blank page
2. Research enters exactly where it matters
3. Revise without losing the thread
4. One project. Two finished formats

| Capability area | Poster coverage |
| --- | --- |
| Auth, project persistence, setup, outline, add/delete/reorder | 1 |
| Standard generation plus RAG query/retrieval/citations | 2 |
| Document awareness, adjacent sections, word-count adjustment, reactions, editing | 3 |
| DOCX/PPTX generation, themes, content-aware layouts | 4 |
| API auth, Firestore, deployment, CORS, tests | Technical proof near the story, not a poster |

## Creative guardrails

- Do not market it as autonomous research or autonomous publishing; the user controls project structure, RAG selection, refinement, and export.
- Do not depict web research as an undifferentiated browser collage. The important product truth is retrieval into one section with sources.
- Do not use a dashboard montage. Each poster should show one large authoring decision.
