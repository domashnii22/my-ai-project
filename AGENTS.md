# AGENTS.md

## Project state

Bare repo — no code, no build system, no dependencies yet. Single initial commit on `main`.

## Git

- Remote: `origin` → `https://github.com/domashnii22/my-ai-project.git`
- Default branch: `main`

## `.gitignore` conventions

| Pattern | Reason |
|---|---|
| `node_modules/` | npm dependencies |
| `.env` | secrets / env vars |
| `.opencode/` | OpenCode local state |

## Conventions

- Do not commit `.env` files or secrets.
- Do not commit `.opencode/` — it is local-only.
