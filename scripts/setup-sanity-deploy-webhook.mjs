// Creates or updates the Sanity webhook that triggers GitHub Pages deploys on publish.
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || 'bswul3nm';
const DATASET = process.env.PUBLIC_SANITY_DATASET || 'production';
const GITHUB_REPO = process.env.GITHUB_REPOSITORY || 'TASNADI-Dev/Paprika';
const WEBHOOK_NAME = 'Trigger GitHub Pages deploy';

const CONTENT_FILTER =
  '_type in ["homePage", "aboutPage", "productsPage", "privacyPage", "footer"]';

const PROJECTION = `{
  "event_type": "sanity_publish",
  "client_payload": {
    "documentId": _id,
    "documentType": _type
  }
}`;

function getSanityAuthToken() {
  if (process.env.SANITY_AUTH_TOKEN) {
    return process.env.SANITY_AUTH_TOKEN;
  }

  const configPath = join(homedir(), '.config', 'sanity', 'config.json');

  try {
    const config = JSON.parse(readFileSync(configPath, 'utf8'));
    const token = config?.authToken;

    if (typeof token === 'string' && token.length > 0) {
      return token;
    }
  } catch {
    // Fall through to the error below.
  }

  throw new Error(
    'Missing Sanity auth. Run `npx sanity login` or set SANITY_AUTH_TOKEN.',
  );
}

function getGitHubDeployToken() {
  if (process.env.GITHUB_DEPLOY_TOKEN) {
    return process.env.GITHUB_DEPLOY_TOKEN;
  }

  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch {
    throw new Error(
      'Missing GitHub token. Run `gh auth login` or set GITHUB_DEPLOY_TOKEN to a PAT with repo/actions access.',
    );
  }
}

async function sanityRequest(path, { method = 'GET', body } = {}) {
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-03-25${path}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${getSanityAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      `Sanity API ${method} ${path} failed (${response.status}): ${text}`,
    );
  }

  return payload;
}

function buildWebhookPayload(githubToken) {
  return {
    type: 'document',
    name: WEBHOOK_NAME,
    description:
      'Rebuild GitHub Pages when published site content changes in Sanity.',
    url: `https://api.github.com/repos/${GITHUB_REPO}/dispatches`,
    dataset: DATASET,
    apiVersion: 'v2026-03-01',
    httpMethod: 'POST',
    rule: {
      on: ['create', 'update', 'delete'],
      filter: CONTENT_FILTER,
      projection: PROJECTION,
    },
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };
}

async function main() {
  const githubToken = getGitHubDeployToken();
  const webhookPayload = buildWebhookPayload(githubToken);
  const existing = await sanityRequest(`/hooks/projects/${PROJECT_ID}`);
  const current = existing.find((hook) => hook.name === WEBHOOK_NAME);

  if (current) {
    await sanityRequest(`/hooks/projects/${PROJECT_ID}/${current.id}`, {
      method: 'PATCH',
      body: webhookPayload,
    });
    console.log(`Updated webhook "${WEBHOOK_NAME}" (${current.id}).`);
    return;
  }

  const created = await sanityRequest(`/hooks/projects/${PROJECT_ID}`, {
    method: 'POST',
    body: webhookPayload,
  });

  console.log(`Created webhook "${WEBHOOK_NAME}" (${created.id}).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
