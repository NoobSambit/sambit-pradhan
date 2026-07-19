import type { DocBuilderNavItem } from "./types";

export const docBuilderProject = {
  name: "DocBuilder",
  mark: "DB",
  tagline:
    "AI document and presentation authoring with research-grounded generation",
  repository: "NoobSambit/docbuilder",
  repositoryUrl: "https://github.com/NoobSambit/docbuilder",
  updated: "Latest local commit: Apr 2026",
  overview: [
    "DocBuilder is a full-stack authoring environment for structured documents and presentations. A project owns an ordered outline of sections, their generated content, refinement history, comments, versions, and export intent—so the work remains editable after generation rather than becoming a disposable AI response.",
    "The Next.js client pairs TipTap editing and dnd-kit outline control with a FastAPI application layer. LangChain coordinates structured LLM requests; optional RAG fetches current web sources through Google Custom Search, ranks chunks with FAISS and HuggingFace embeddings, then returns content with traceable source URLs. Firebase provides identity and Firestore project persistence.",
  ],
  evidence: [
    ["Backend API", "18 authenticated project endpoints"],
    ["Authoring model", "Projects · sections · refinements · comments"],
    ["AI pipeline", "LangChain · Groq / Gemini · Pydantic"],
    ["Outputs", "DOCX + PPTX · 4 presentation themes"],
  ],
  stack: [
    "Next.js 13",
    "React 18",
    "TypeScript",
    "FastAPI",
    "Python",
    "LangChain",
    "Firebase Auth",
    "Firestore",
    "Groq",
    "Gemini",
    "FAISS",
    "TipTap",
    "dnd-kit",
  ],
  timeline: [
    [
      "Authoring foundation",
      "2025",
      "Established Next.js project workspaces, Firebase identity, Firestore projects, and ordered editable sections.",
    ],
    [
      "Structured generation",
      "2025",
      "Added LangChain adapters, outline generation, typed section output, and document-type-aware prompting.",
    ],
    [
      "Research grounding",
      "2025",
      "Introduced Google Custom Search, FAISS retrieval, HuggingFace embeddings, and cited RAG content paths.",
    ],
    [
      "Refinement depth",
      "2025",
      "Added adjacent-section context, word-count intelligence, refinement history, and feedback reactions.",
    ],
    [
      "Output polish",
      "2026",
      "Refined DOCX and themed PPTX export formatting alongside current dark-mode UI work.",
    ],
  ],
} as const;

export const docBuilderNavigation: DocBuilderNavItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];
