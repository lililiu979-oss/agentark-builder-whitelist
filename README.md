# AgentArk builder whitelist

Landing page that embeds a **Google Form** so every signup lands in a **Google Sheet** you control. No backend required for the recommended setup.

## Recommended: Google 表单 + 表格

1. 打开 [Google 表单](https://forms.google.com)，新建表单（至少加一个「邮箱」或「邮箱 + 简短介绍」等题目）。
2. 打开顶部 **回复** 标签 → 点击绿色表格图标，把回复保存到 **电子表格**（新建或选择已有表格）。
3. 点右上角 **发送**，复制表单链接（形如 `https://docs.google.com/forms/d/e/.../viewform`）。
4. 在本仓库 `index.html` 里找到 `GOOGLE_FORM_URL`，把占位符 `REPLACE_WITH_YOUR_GOOGLE_FORM_URL` 换成你的链接，保存。

页面会内嵌该表单；报名者提交后，数据会进你绑定的 **Google 表格**。

**说明：** 用浏览器直接打开本地 `file:///.../index.html` 时，Google 有时不允许在 iframe 里加载表单。请把页面放到 **HTTPS** 的静态托管上预览（例如 GitHub Pages、Cloudflare Pages）。

## Host the static page (HTTPS)

Any static host works: upload `index.html` or connect this repo to **GitHub Pages** / **Cloudflare Pages** (publish the repo root or only this folder).

## Optional: self-hosted signup API

`server.mjs` still exposes `POST /signup` and appends JSON lines to `data/builder-whitelist.jsonl` if you prefer to run your own collector (see `Dockerfile` / `render.yaml`). For “表格就行”, you normally **do not** need this.

## Local preview (optional server)

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`. The embedded Google Form may still require HTTPS in some browsers; use a static host if the iframe is blank.

## Deploy (Render) — only if you use `server.mjs`

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lililiu979-oss/agentark-builder-whitelist)

Repo: https://github.com/lililiu979-oss/agentark-builder-whitelist

Free-tier disks are often ephemeral; prefer Google Sheets for durable whitelist storage.
