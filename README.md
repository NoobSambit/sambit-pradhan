# Sambit OS Portfolio

An evolving developer portfolio built as a dense, terminal-inspired operating system interface. It presents engineering work, skills, activity streaks, profile context, and project case-study placeholders in one scalable Next.js application.

## Highlights

- Desktop-first developer workspace UI with a persistent system sidebar and navigation.
- Overview, About, and Projects workspaces built from reusable OS components.
- Interactive project selector that updates the project brief and inspector panel with placeholder data.
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
data/             Portfolio and placeholder project data
```

## Status

The visual system and core workspaces are in active development. Project-specific metrics, external activity integrations, case studies, and final copy are intentionally represented by placeholders until their data sources are connected.
