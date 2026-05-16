# AgentArk builder whitelist

Small static landing page plus a tiny Node server that accepts `POST /signup` and appends JSON lines to `data/builder-whitelist.jsonl`.

## Local

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`.

## Deploy (Render)

This repo includes a `Dockerfile` so you can run it as a **Web Service** on [Render](https://render.com).

1. Push this repository to GitHub.
2. In Render: **New +** → **Web Service** → connect the repo.
3. Choose **Docker** as the environment (Render will detect the Dockerfile).
4. Deploy. Render sets `PORT` automatically; the server listens on `0.0.0.0`.

**Note:** On free tiers the filesystem is usually **ephemeral**. Treat stored emails as best-effort unless you attach a disk or move storage to a database.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lililiu979-oss/agentark-builder-whitelist)

(After the repo exists under that name, this button should pre-fill the blueprint flow.)
