import { createServer } from "node:http";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4173);
const pagePath = path.join(__dirname, "index.html");
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "builder-whitelist.jsonl");

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function servePage(res) {
  const html = await readFile(pagePath, "utf8");
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

async function handleSignup(req, res) {
  let raw = "";

  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10_000) {
      sendJson(res, 413, { error: "Request too large." });
      return;
    }
  }

  let payload;
  try {
    payload = JSON.parse(raw || "{}");
  } catch {
    sendJson(res, 400, { error: "Invalid request body." });
    return;
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email || !isValidEmail(email)) {
    sendJson(res, 400, { error: "Please enter a valid email address." });
    return;
  }

  await mkdir(dataDir, { recursive: true });
  await appendFile(
    dataFile,
    JSON.stringify({
      email,
      source: "builder-whitelist-page",
      created_at: new Date().toISOString(),
    }) + "\n",
    "utf8",
  );

  sendJson(res, 200, { ok: true });
}

const server = createServer(async (req, res) => {
  try {
    if (!req.url) {
      sendJson(res, 400, { error: "Missing request URL." });
      return;
    }

    const url = new URL(req.url, `http://localhost:${port}`);

    if (req.method === "GET" && url.pathname === "/") {
      await servePage(res);
      return;
    }

    if (req.method === "POST" && url.pathname === "/signup") {
      await handleSignup(req, res);
      return;
    }

    sendJson(res, 404, { error: "Not found." });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Internal server error." });
  }
});

server.listen(port, host, () => {
  console.log(`Builder whitelist page running at http://${host}:${port}`);
});
