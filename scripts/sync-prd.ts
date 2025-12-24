import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Basic dotenv-like functionality for standalone script
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
}

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFLUENCE_URL = process.env.CONFLUENCE_BASE_URL; // e.g. https://emeapayments.atlassian.net/wiki
const EMAIL = process.env.ATLASSIAN_EMAIL;
const API_TOKEN = process.env.ATLASSIAN_API_TOKEN;
const PAGE_ID = '24150017';
const PRD_PATH = path.resolve(__dirname, '../docs/PRD.md');

async function syncFromConfluence() {
  if (!CONFLUENCE_URL || !EMAIL || !API_TOKEN) {
    console.error('Missing required environment variables (CONFLUENCE_BASE_URL, ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN).');
    process.exit(1);
  }

  const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');
  
  // Use v2 API for cleaner Markdown support
  const url = `${CONFLUENCE_URL.replace(/\/+$/, '')}/rest/api/v2/pages/${PAGE_ID}?body-format=markdown`;

  console.log(`Fetching latest PRD from Confluence (Page ID: ${PAGE_ID})...`);

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json() as any;
    const markdown = data.body?.markdown?.value;

    if (!markdown) {
      throw new Error('No markdown content found in Confluence response.');
    }

    let localContent = '';
    if (fs.existsSync(PRD_PATH)) {
      localContent = fs.readFileSync(PRD_PATH, 'utf8');
    }

    // Normalize line endings for comparison
    const normalizedMarkdown = markdown.replace(/\r\n/g, '\n');
    const normalizedLocal = localContent.replace(/\r\n/g, '\n');

    if (normalizedLocal !== normalizedMarkdown) {
      console.log('Changes detected! Updating local docs/PRD.md...');
      fs.writeFileSync(PRD_PATH, normalizedMarkdown);
      console.log('Successfully updated local PRD.md.');
    } else {
      console.log('Local docs/PRD.md is already up to date with Confluence.');
    }
  } catch (error) {
    console.error('Error during sync:', error);
    process.exit(1);
  }
}

syncFromConfluence();

