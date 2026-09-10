# Sambit OS — Sambit Pradhan's Developer Portfolio

Live at [https://sambitpradhan.in](https://sambitpradhan.in).

A dense, terminal-inspired operating system interface presenting Sambit Pradhan's engineering work: backend-heavy products, AI-enabled systems, skills, activity streaks, profile context, and repository-grounded project documentation in one Next.js application.

## Highlights

- Desktop-first developer workspace UI with a persistent system sidebar and navigation.
- Overview, About, and Projects workspaces built from reusable OS components.
- Repository explorer with per-project documentation routes (`/projects/<slug>`).
- LeetCode and GitHub activity-streak visualizations, engineering metrics, logs, and technical stack panels.
- Responsive fallback for smaller screens while preserving the desktop composition.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- CSS Grid and modular CSS

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable live GitHub and LeetCode activity, copy `.env.example` to `.env.local` and provide a read-only GitHub token. `.env.local` is intentionally ignored by Git.

## Scripts

```bash
npm run dev       # Start the development server
npm run typecheck # Validate TypeScript
npm run build     # Create a production build
npm run start     # Run the production server
```

## Project structure

```text
app/              Next.js routes, layout, and global styling
components/os/    Reusable terminal-OS interface modules
data/             Portfolio and project documentation data
lib/              SEO config and documented-project registry
```

## Status

The visual system and core workspaces are live at [https://sambitpradhan.in](https://sambitpradhan.in). Project metrics, activity integrations, and documentation stay repository-grounded: figures shown in the UI come from the data sources wired in `data/` and the portfolio API.
