# AgentArk builder whitelist

Small static landing page plus a tiny Node server that accepts `POST /signup` and appends JSON lines to `data/builder-whitelist.jsonl`.

## Local

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`.

## Deploy (Render)

This repo includes a `Dockerfile` and `render.yaml` so you can run it as a **Web Service** on [Render](https://render.com).

1. Open GitHub repo: https://github.com/lililiu979-oss/agentark-builder-whitelist
2. Either click **Deploy to Render** below, or in Render: **New +** → **Blueprint** / **Web Service** → connect the repo → pick **Docker**.
3. Deploy. Render sets `PORT` automatically; the server listens on `0.0.0.0`.
4. Your public URL will look like `https://agentark-builder-whitelist.onrender.com` (exact subdomain depends on the service name you choose in Render).

**Note:** On free tiers the filesystem is usually **ephemeral**. Treat stored emails as best-effort unless you attach a disk or move storage to a database.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lililiu979-oss/agentark-builder-whitelist)

### 中文简要说明

代码已在 GitHub。要得到可分享的 `https://...` 线上地址，请在 Render 用本仓库创建 **Web Service（Docker）** 并部署。部署完成后把 Render 提供的公网 URL 发给报名者即可；表单会请求同源的 `POST /signup`，因此必须用带 Node 服务的部署方式，而不是纯静态 Pages。
