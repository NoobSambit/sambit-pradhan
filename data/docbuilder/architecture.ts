import type { DocBuilderArchitectureMap } from "./types";

const support = (
  requestPath: [string, string][],
  modules: DocBuilderArchitectureMap["support"]["modules"],
  decisions: [string, string][],
  safeguards: string[],
  operationalPath: string[],
) => ({ requestPath, modules, decisions, safeguards, operationalPath });

export const docBuilderArchitectureMaps: DocBuilderArchitectureMap[] = [
  {
    id: "platform-runtime",
    group: "Platform",
    title: "Authoring platform runtime",
    summary:
      "A Next.js authoring client calls authenticated FastAPI routes; services coordinate LangChain, Firestore, optional retrieval, and export without making the browser a trusted orchestration layer.",
    source:
      "Next.js 13 · Firebase SDK · FastAPI · Firebase Admin · LangChain · Firestore · export service",
    engineeringNotes: [
      "The client holds UI and Firebase session state; the FastAPI layer owns JWT verification, authorization, provider calls, and persistence mutations.",
      "Firestore is the durable project store while Google Search and model providers are external intelligence dependencies.",
    ],
    support: support(
      [
        [
          "Client action",
          "A page, editor, or dialog sends an authenticated request.",
        ],
        [
          "JWT boundary",
          "FastAPI verifies Firebase identity before loading a project.",
        ],
        [
          "Route orchestration",
          "The endpoint validates input, checks ownership, and chooses the adapter/service.",
        ],
        [
          "Durable change",
          "Firestore receives an owner-scoped project or outline update.",
        ],
        ["Typed response", "The UI receives a Project or Section schema."],
      ],
      [
        ["Next.js client", "pages, TipTap, dnd-kit, auth context", "purple"],
        ["FastAPI routes", "validation and ownership", "cyan"],
        ["LLM / RAG", "LangChain and retrieval boundaries", "green"],
        ["Firestore", "durable project state", "amber"],
      ],
      [
        [
          "Server-side trust",
          "The client does not choose authorization outcomes.",
        ],
        [
          "Typed contracts",
          "Pydantic models define stable authoring payloads.",
        ],
        [
          "Optional research",
          "RAG is a generation mode, not a separate project store.",
        ],
      ],
      [
        "Firebase JWT",
        "Owner UID check",
        "Pydantic validation",
        "CORS policy",
        "Bounded web fetch",
        "Sanitized downloads",
      ],
      [
        "Client",
        "FastAPI",
        "Service / adapter",
        "Firestore or provider",
        "Typed response",
      ],
    ),
    nodes: [
      {
        id: "client",
        label: "Next.js authoring client",
        detail: "editor · outline · auth context",
        tone: "purple",
        x: 110,
        y: 90,
      },
      {
        id: "auth",
        label: "Firebase session",
        detail: "bearer token",
        tone: "cyan",
        x: 315,
        y: 90,
      },
      {
        id: "api",
        label: "FastAPI routes",
        detail: "validation · ownership",
        tone: "green",
        x: 520,
        y: 200,
      },
      {
        id: "project",
        label: "Project orchestration",
        detail: "outline · generation · export",
        tone: "purple",
        x: 520,
        y: 350,
      },
      {
        id: "firestore",
        label: "Firestore",
        detail: "projects and user records",
        tone: "amber",
        x: 255,
        y: 460,
      },
      {
        id: "ai",
        label: "AI services",
        detail: "LangChain · providers · RAG",
        tone: "cyan",
        x: 780,
        y: 350,
      },
      {
        id: "export",
        label: "Export service",
        detail: "DOCX · PPTX streams",
        tone: "green",
        x: 780,
        y: 120,
      },
    ],
    edges: [
      { from: "client", to: "auth" },
      { from: "auth", to: "api" },
      { from: "api", to: "project" },
      { from: "project", to: "firestore" },
      { from: "project", to: "ai" },
      { from: "project", to: "export" },
    ],
  },
  {
    id: "outline-planning",
    group: "Authoring",
    title: "Outline planning & deduplication",
    summary:
      "A topic becomes a DOCX- or PPTX-aware structured outline only after existing project titles have been loaded and compared, keeping AI suggestions from duplicating a living document plan.",
    source:
      "POST /projects/{id}/suggest-outline · LLMAdapter.generate_outline · OutlineSchema · Firestore outline",
    engineeringNotes: [
      "New headings are compared case-insensitively against existing section titles before they are appended.",
      "Outline generation writes queued section records; content generation remains a separate, explicit next step.",
    ],
    support: support(
      [
        [
          "Submit topic",
          "The author requests an outline for the current project.",
        ],
        [
          "Load project",
          "The route verifies owner and reads document type plus existing titles.",
        ],
        [
          "Generate plan",
          "The adapter builds a type-aware prompt and parses OutlineSchema.",
        ],
        ["Deduplicate", "Existing case-insensitive titles are excluded."],
        [
          "Persist queue",
          "Only new queued sections are appended to Firestore.",
        ],
      ],
      [
        ["Project intent", "topic and DOCX/PPTX type", "purple"],
        ["Existing outline", "current ordered titles", "cyan"],
        ["LLM adapter", "structured planning response", "green"],
        ["Queued sections", "new durable authoring units", "amber"],
      ],
      [
        [
          "No duplicate headings",
          "Existing content is part of the planning context.",
        ],
        ["Structured parsing", "Pydantic rejects loose outline prose."],
        [
          "Plan before generation",
          "Outline creation does not silently write section content.",
        ],
      ],
      [
        "JWT owner check",
        "DOCX/PPTX awareness",
        "Pydantic schema",
        "Case-insensitive comparison",
        "Queued state",
        "Firestore timestamp",
      ],
      [
        "Topic",
        "Existing titles",
        "Typed outline",
        "Deduplicate",
        "Queued sections",
      ],
    ),
    nodes: [
      {
        id: "topic",
        label: "Topic",
        detail: "author intent",
        tone: "purple",
        x: 120,
        y: 100,
      },
      {
        id: "project",
        label: "Current project",
        detail: "type and existing outline",
        tone: "cyan",
        x: 360,
        y: 100,
      },
      {
        id: "prompt",
        label: "Planning prompt",
        detail: "document-type-aware",
        tone: "green",
        x: 600,
        y: 100,
      },
      {
        id: "schema",
        label: "OutlineSchema",
        detail: "typed section plan",
        tone: "amber",
        x: 610,
        y: 290,
      },
      {
        id: "dedupe",
        label: "Title deduplication",
        detail: "case-insensitive compare",
        tone: "purple",
        x: 355,
        y: 390,
      },
      {
        id: "queue",
        label: "Queued sections",
        detail: "persisted ordered additions",
        tone: "cyan",
        x: 680,
        y: 430,
      },
    ],
    edges: [
      { from: "topic", to: "project" },
      { from: "project", to: "prompt" },
      { from: "prompt", to: "schema" },
      { from: "project", to: "dedupe" },
      { from: "schema", to: "dedupe" },
      { from: "dedupe", to: "queue" },
    ],
  },
  {
    id: "section-generation",
    group: "Intelligence",
    title: "Section generation with context",
    summary:
      "The generation route marks a target section in progress, passes title, target length, full outline, document type, and position into the adapter, then persists typed content, bullets, status, and history.",
    source:
      "POST /projects/{id}/generate · GenerateContentRequest · LLMAdapter.generate_section · SectionContentSchema",
    engineeringNotes: [
      "The generating status is written before provider work; errors transition the section to failed rather than falsely presenting success.",
      "Each successful run appends provider metadata, response data, prompt summary, and a SHA-256 hash to project generation history.",
    ],
    support: support(
      [
        [
          "Validate target",
          "Load owner project and find the requested section.",
        ],
        ["Mark generating", "Persist state before external model work."],
        [
          "Build context",
          "Use full outline, section order, type, title, and target length.",
        ],
        [
          "Optional RAG",
          "Retrieve grounded context when the request enables it.",
        ],
        [
          "Persist result",
          "Write text, bullets, word count, done status, and history.",
        ],
      ],
      [
        ["Section state", "queued · generating · done · failed", "purple"],
        ["Outline context", "titles and current position", "cyan"],
        ["LLM adapter", "typed section response", "green"],
        ["Generation history", "prompt, response, metadata, hash", "amber"],
      ],
      [
        [
          "State before work",
          "Interrupted calls remain visible as incomplete.",
        ],
        [
          "Full-outline context",
          "Generation sees how the section fits the document.",
        ],
        [
          "Traceable history",
          "Every completed result carries reproducible metadata.",
        ],
      ],
      [
        "Owner authorization",
        "Section existence",
        "Generating status",
        "Optional RAG",
        "Failure state",
        "Content hash",
      ],
      [
        "Target section",
        "Outline context",
        "RAG option",
        "Typed generation",
        "Persist history",
      ],
    ),
    nodes: [
      {
        id: "request",
        label: "Generate request",
        detail: "section ID and RAG option",
        tone: "purple",
        x: 110,
        y: 100,
      },
      {
        id: "section",
        label: "Section state",
        detail: "mark generating",
        tone: "cyan",
        x: 330,
        y: 100,
      },
      {
        id: "context",
        label: "Outline context",
        detail: "position · type · titles",
        tone: "green",
        x: 550,
        y: 100,
      },
      {
        id: "rag",
        label: "Optional RAG",
        detail: "grounded source context",
        tone: "amber",
        x: 790,
        y: 100,
      },
      {
        id: "model",
        label: "LLM adapter",
        detail: "typed content response",
        tone: "purple",
        x: 550,
        y: 300,
      },
      {
        id: "history",
        label: "Section & history",
        detail: "content · bullets · hash",
        tone: "cyan",
        x: 760,
        y: 420,
      },
    ],
    edges: [
      { from: "request", to: "section" },
      { from: "section", to: "context" },
      { from: "context", to: "rag", label: "if enabled" },
      { from: "context", to: "model" },
      { from: "rag", to: "model" },
      { from: "model", to: "history" },
    ],
  },
  {
    id: "rag-retrieval",
    group: "Intelligence",
    title: "Web RAG retrieval & citations",
    summary:
      "DocBuilder transforms the active section and document topic into a bounded Google query, fetches and cleans result pages, chunks content, ranks it with FAISS embeddings, and supplies selected evidence plus source metadata to the generator.",
    source:
      "WebSearchRetriever · Google Custom Search · BeautifulSoup · RecursiveCharacterTextSplitter · FAISS · all-MiniLM-L6-v2",
    engineeringNotes: [
      "Search credentials are optional; an explicit mock path supports local development without pretending to fetch live research.",
      "Requests use a five-second web fetch timeout and content is capped before chunking and embedding.",
    ],
    support: support(
      [
        [
          "Form query",
          "Extract meaningful terms from section title and topic.",
        ],
        [
          "Search web",
          "Request a bounded set of Google Custom Search results.",
        ],
        [
          "Fetch pages",
          "Clean HTML and retain meaningful text with a timeout.",
        ],
        [
          "Index chunks",
          "Split 800-character chunks with overlap and embed them.",
        ],
        [
          "Rank evidence",
          "FAISS similarity returns context with source title and URL.",
        ],
      ],
      [
        ["Query builder", "section title plus topic", "purple"],
        ["Google results", "title, link, snippet", "cyan"],
        ["Page cleaner", "bounded extracted text", "green"],
        ["FAISS index", "semantic chunk ranking", "amber"],
      ],
      [
        [
          "Research is optional",
          "Generation still works with RAG disabled or local mock results.",
        ],
        [
          "Bounded network",
          "Timeouts and content caps protect the request path.",
        ],
        [
          "Source metadata",
          "Retrieved chunks retain URL and title for citation visibility.",
        ],
      ],
      [
        "Credential detection",
        "5-second fetch timeout",
        "5000-character cap",
        "Chunk overlap",
        "Mock development mode",
        "Source metadata",
      ],
      [
        "Section topic",
        "Google search",
        "Clean pages",
        "Embed / rank",
        "Grounded context",
      ],
    ),
    nodes: [
      {
        id: "input",
        label: "Section + topic",
        detail: "retrieval intent",
        tone: "purple",
        x: 110,
        y: 100,
      },
      {
        id: "query",
        label: "Search query",
        detail: "normalized key terms",
        tone: "cyan",
        x: 330,
        y: 100,
      },
      {
        id: "google",
        label: "Google results",
        detail: "bounded result list",
        tone: "green",
        x: 560,
        y: 100,
      },
      {
        id: "pages",
        label: "Cleaned pages",
        detail: "timeout and text cap",
        tone: "amber",
        x: 780,
        y: 220,
      },
      {
        id: "chunks",
        label: "Embedded chunks",
        detail: "split and indexed",
        tone: "purple",
        x: 430,
        y: 370,
      },
      {
        id: "context",
        label: "Ranked evidence",
        detail: "source URL and title",
        tone: "cyan",
        x: 720,
        y: 420,
      },
    ],
    edges: [
      { from: "input", to: "query" },
      { from: "query", to: "google" },
      { from: "google", to: "pages" },
      { from: "pages", to: "chunks" },
      { from: "chunks", to: "context" },
    ],
  },
  {
    id: "refinement-context",
    group: "Intelligence",
    title: "Context-aware refinement",
    summary:
      "A refinement request loads the current unit, full outline, neighboring section summaries, prior refinement history, optional target length, and document type before returning rewritten text, bullets, and a diff summary.",
    source:
      "POST /projects/{id}/units/{unitId}/refine · RefineRequest · LLMAdapter.refine_section · RefinementOutputSchema",
    engineeringNotes: [
      "Previous and next sections are supplied as compact contextual signals so revisions can improve transitions without sending an unbounded document body.",
      "A refinement creates a durable history item and increments the section version rather than overwriting the edit invisibly.",
    ],
    support: support(
      [
        [
          "Load unit",
          "Verify owner and find the target section inside the project outline.",
        ],
        [
          "Collect context",
          "Read outline, bullets, history, document type, and adjacent sections.",
        ],
        [
          "Set target",
          "Apply author instruction and optional word-count objective.",
        ],
        [
          "Refine typed output",
          "The adapter returns replacement text, bullets, and a diff summary.",
        ],
        [
          "Version record",
          "Append refinement history, update section content, and increment version.",
        ],
      ],
      [
        ["Current unit", "content, bullets, version", "purple"],
        ["Adjacent context", "previous and next section signals", "cyan"],
        ["Refinement history", "prior prompts and reactions", "green"],
        ["Diff output", "replacement text and summary", "amber"],
      ],
      [
        [
          "Context over blind rewrite",
          "Document structure informs every refinement.",
        ],
        ["Versioned edits", "History explains why content changed."],
        [
          "Target length",
          "Length requests become explicit prompt constraints.",
        ],
      ],
      [
        "Owner UID",
        "Unit existence",
        "Adjacent-section bounds",
        "Typed schema",
        "Version increment",
        "History persistence",
      ],
      [
        "Unit",
        "Context packet",
        "Refinement request",
        "Typed result",
        "Versioned save",
      ],
    ),
    nodes: [
      {
        id: "unit",
        label: "Current section",
        detail: "content and bullets",
        tone: "purple",
        x: 110,
        y: 100,
      },
      {
        id: "outline",
        label: "Outline + neighbors",
        detail: "position and transition context",
        tone: "cyan",
        x: 350,
        y: 100,
      },
      {
        id: "history",
        label: "Refinement history",
        detail: "prior prompts and reactions",
        tone: "green",
        x: 610,
        y: 100,
      },
      {
        id: "instruction",
        label: "Author instruction",
        detail: "intent and target length",
        tone: "amber",
        x: 350,
        y: 300,
      },
      {
        id: "adapter",
        label: "Refinement adapter",
        detail: "typed replacement output",
        tone: "purple",
        x: 630,
        y: 300,
      },
      {
        id: "version",
        label: "Versioned section",
        detail: "text · bullets · diff summary",
        tone: "cyan",
        x: 780,
        y: 440,
      },
    ],
    edges: [
      { from: "unit", to: "outline" },
      { from: "outline", to: "instruction" },
      { from: "history", to: "adapter" },
      { from: "instruction", to: "adapter" },
      { from: "adapter", to: "version" },
      { from: "unit", to: "version", label: "increment" },
    ],
  },
  {
    id: "feedback-history",
    group: "Authoring",
    title: "Section feedback & revision history",
    summary:
      "Comments and refinement reactions operate on the durable section record. A reaction toggles the caller between like and dislike, preserves the original refinement, and increments the section version alongside direct authoring feedback.",
    source:
      "comments endpoint · refinement like/dislike endpoints · Section.refinement_history · Section.comments",
    engineeringNotes: [
      "One user cannot both like and dislike the same refinement; toggling one removes the opposite reaction.",
      "Comments and reactions change authoring state but do not trigger a new LLM run by themselves.",
    ],
    support: support(
      [
        [
          "Open section",
          "Load the project and identify the section or refinement.",
        ],
        ["Authorize action", "Confirm caller owns the surrounding project."],
        [
          "Write feedback",
          "Append a timestamped comment or toggle a reaction.",
        ],
        [
          "Keep history",
          "Retain the original refinement and all existing feedback.",
        ],
        [
          "Advance version",
          "Increment section version and persist the outline.",
        ],
      ],
      [
        ["Section record", "comments and history arrays", "purple"],
        ["Comment", "timestamped editorial note", "cyan"],
        ["Reaction", "like or dislike toggle", "green"],
        ["Version", "visible authoring revision", "amber"],
      ],
      [
        [
          "Preserve refinement",
          "Feedback never deletes the generated revision.",
        ],
        [
          "Exclusive reaction",
          "Per-user signal cannot be both positive and negative.",
        ],
        [
          "No implicit generation",
          "Feedback stays an authoring concern until explicitly refined.",
        ],
      ],
      [
        "Owner authorization",
        "Refinement existence",
        "Mutual exclusion",
        "Timestamp",
        "Version increment",
        "Outline persistence",
      ],
      [
        "Section",
        "Comment / reaction",
        "Validate target",
        "Increment version",
        "Persist",
      ],
    ),
    nodes: [
      {
        id: "section",
        label: "Section",
        detail: "comments and refinements",
        tone: "purple",
        x: 120,
        y: 100,
      },
      {
        id: "comment",
        label: "Comment action",
        detail: "timestamped note",
        tone: "cyan",
        x: 340,
        y: 100,
      },
      {
        id: "reaction",
        label: "Reaction action",
        detail: "like or dislike",
        tone: "green",
        x: 600,
        y: 100,
      },
      {
        id: "history",
        label: "Refinement history",
        detail: "preserved original output",
        tone: "amber",
        x: 390,
        y: 300,
      },
      {
        id: "version",
        label: "Section version",
        detail: "incremented change",
        tone: "purple",
        x: 680,
        y: 390,
      },
    ],
    edges: [
      { from: "section", to: "comment" },
      { from: "section", to: "reaction" },
      { from: "comment", to: "history" },
      { from: "reaction", to: "history" },
      { from: "history", to: "version" },
    ],
  },
  {
    id: "docx-output",
    group: "Output",
    title: "DOCX export pipeline",
    summary:
      "The export route validates owner and requested format, then parses persisted section HTML into a python-docx document with title page, hierarchical headings, lists, inline styling, paragraph spacing, and a safe download filename.",
    source:
      "GET /projects/{id}/export?format=docx · ExportService.generate_docx · python-docx · BeautifulSoup",
    engineeringNotes: [
      "HTML processing operates from top-level elements to avoid duplicate nested document output.",
      "The response uses a sanitized project title and RFC 6266-compatible Content-Disposition header.",
    ],
    support: support(
      [
        [
          "Authorize export",
          "Load project and verify the authenticated owner.",
        ],
        ["Validate format", "Accept DOCX only for this branch."],
        [
          "Parse content",
          "Walk persisted HTML headings, paragraphs, lists, and inline formatting.",
        ],
        [
          "Build document",
          "Apply title page, Calibri body decisions, spacing, and hierarchy.",
        ],
        ["Stream file", "Return a named Office document download."],
      ],
      [
        ["Project outline", "current persisted sections", "purple"],
        ["HTML parser", "headings, lists, inline styles", "cyan"],
        ["python-docx", "Word document builder", "green"],
        ["Download stream", "sanitized filename", "amber"],
      ],
      [
        ["Persisted source", "Exports reflect current saved project state."],
        ["Top-level processing", "Avoids nested duplicate output."],
        [
          "Safe filename",
          "Download headers cannot use unsafe title characters.",
        ],
      ],
      [
        "Owner check",
        "Format validation",
        "HTML handling",
        "Heading cap",
        "Filename sanitization",
        "Stream response",
      ],
      ["Project", "Parse HTML", "Build DOCX", "Sanitize name", "Download"],
    ),
    nodes: [
      {
        id: "project",
        label: "Saved project",
        detail: "current outline",
        tone: "purple",
        x: 120,
        y: 100,
      },
      {
        id: "auth",
        label: "Owner validation",
        detail: "authenticated export",
        tone: "cyan",
        x: 360,
        y: 100,
      },
      {
        id: "html",
        label: "HTML formatter",
        detail: "headings · lists · inline",
        tone: "green",
        x: 600,
        y: 100,
      },
      {
        id: "docx",
        label: "python-docx",
        detail: "Word document composition",
        tone: "amber",
        x: 430,
        y: 310,
      },
      {
        id: "stream",
        label: "Download stream",
        detail: "sanitized .docx filename",
        tone: "purple",
        x: 710,
        y: 410,
      },
    ],
    edges: [
      { from: "project", to: "auth" },
      { from: "auth", to: "html" },
      { from: "html", to: "docx" },
      { from: "docx", to: "stream" },
    ],
  },
  {
    id: "pptx-output",
    group: "Output",
    title: "PPTX themes & slide composition",
    summary:
      "The same saved outline can become a presentation by selecting one of four export themes. ExportService maps section content to slides while applying centralized color, font, accent, sizing, numbering, and branding rules.",
    source:
      "ExportService.generate_pptx · python-pptx · ExportService.THEMES · professional / modern / academic / creative",
    engineeringNotes: [
      "Theme configuration lives in one service map so palette and typography changes do not fork slide-generation behavior.",
      "Dynamic font sizing is a deliberate response to content density rather than a fixed presentation template.",
    ],
    support: support(
      [
        ["Load outline", "Use the current persisted project sections."],
        ["Select theme", "Professional, Modern, Academic, or Creative tokens."],
        ["Compose slides", "Map title and body content into deck structures."],
        [
          "Fit content",
          "Apply sizing, colors, accent elements, and formatting.",
        ],
        ["Stream deck", "Return an Office-compatible PPTX file."],
      ],
      [
        ["Theme tokens", "color and font definitions", "purple"],
        ["Slide builder", "layout and accent shapes", "cyan"],
        ["Content fitting", "dynamic text sizing", "green"],
        ["PPTX stream", "presentation download", "amber"],
      ],
      [
        [
          "Centralized themes",
          "Visual rules are not scattered through export branches.",
        ],
        ["Current outline", "Slides derive from saved authoring state."],
        [
          "Density-aware formatting",
          "Font size adjusts to content rather than overflowing a fixed slide.",
        ],
      ],
      [
        "Owner check",
        "Theme validation",
        "Content sizing",
        "Office media type",
        "Filename sanitization",
        "Stream response",
      ],
      [
        "Project outline",
        "Theme selection",
        "Slide composition",
        "Format content",
        "PPTX download",
      ],
    ),
    nodes: [
      {
        id: "outline",
        label: "Saved outline",
        detail: "sections to slides",
        tone: "purple",
        x: 120,
        y: 100,
      },
      {
        id: "theme",
        label: "Theme tokens",
        detail: "4 named visual systems",
        tone: "cyan",
        x: 360,
        y: 100,
      },
      {
        id: "builder",
        label: "Slide builder",
        detail: "title · body · accents",
        tone: "green",
        x: 600,
        y: 210,
      },
      {
        id: "fit",
        label: "Dynamic fitting",
        detail: "content-aware sizing",
        tone: "amber",
        x: 400,
        y: 380,
      },
      {
        id: "deck",
        label: "PPTX deck",
        detail: "numbered formatted slides",
        tone: "purple",
        x: 720,
        y: 420,
      },
    ],
    edges: [
      { from: "outline", to: "builder" },
      { from: "theme", to: "builder" },
      { from: "builder", to: "fit" },
      { from: "fit", to: "deck" },
    ],
  },
  {
    id: "firebase-ownership",
    group: "Platform",
    title: "Firebase identity & project ownership",
    summary:
      "Firebase SDK sessions become bearer tokens; FastAPI verifies the JWT, then every project, generation, export, comment, and mutation route compares the project owner_uid with the authenticated UID before proceeding.",
    source:
      "AuthContext · Firebase SDK · Firebase Admin auth · get_current_user dependency · project owner_uid checks",
    engineeringNotes: [
      "A project ID alone does not grant access: every protected workflow resolves the current user before reading or changing state.",
      "Authorization sits at the route boundary, so downstream LLM and export services receive an already-approved project context.",
    ],
    support: support(
      [
        ["Sign in", "The client obtains Firebase session state."],
        [
          "Send bearer",
          "Authenticated API requests include the identity token.",
        ],
        ["Verify JWT", "FastAPI dependency resolves the trusted UID."],
        ["Load project", "The route reads the Firestore project document."],
        ["Check owner", "owner_uid must match before any action executes."],
      ],
      [
        ["Auth context", "client session state", "purple"],
        ["Bearer token", "request identity", "cyan"],
        ["Firebase Admin", "JWT verification", "green"],
        ["Owner UID", "project authorization", "amber"],
      ],
      [
        ["No implicit access", "Project IDs are not authorization tokens."],
        ["Route boundary", "Services do not decide the caller’s access level."],
        [
          "Consistent policy",
          "Export and AI calls follow the same owner guard.",
        ],
      ],
      [
        "JWT verification",
        "Owner UID match",
        "401 / 403 responses",
        "No client trust",
        "Protected routes",
        "Scoped project loads",
      ],
      [
        "Client session",
        "Bearer token",
        "JWT verification",
        "Owner check",
        "Authorized route",
      ],
    ),
    nodes: [
      {
        id: "client",
        label: "Firebase client",
        detail: "auth context",
        tone: "purple",
        x: 130,
        y: 100,
      },
      {
        id: "token",
        label: "Bearer token",
        detail: "authenticated request",
        tone: "cyan",
        x: 360,
        y: 100,
      },
      {
        id: "admin",
        label: "Firebase Admin",
        detail: "JWT verification",
        tone: "green",
        x: 600,
        y: 100,
      },
      {
        id: "route",
        label: "Protected route",
        detail: "load project",
        tone: "amber",
        x: 390,
        y: 310,
      },
      {
        id: "owner",
        label: "owner_uid check",
        detail: "allow or reject",
        tone: "purple",
        x: 690,
        y: 390,
      },
    ],
    edges: [
      { from: "client", to: "token" },
      { from: "token", to: "admin" },
      { from: "admin", to: "route" },
      { from: "route", to: "owner" },
    ],
  },
];
