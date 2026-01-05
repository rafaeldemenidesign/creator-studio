const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const { Octokit } = require('octokit');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parsing (with large limit for base64 strings if needed, though we send text)
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve the frontend files statically
app.use(express.static('.'));

// Local fallback directory
const sitesDir = path.join(__dirname, 'sites');
if (!fs.existsSync(sitesDir)) fs.mkdirSync(sitesDir);

// GitHub Config (from .env)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

// Initialize Octokit if token is present
let octokit = null;
if (GITHUB_TOKEN) {
    octokit = new Octokit({ auth: GITHUB_TOKEN });
    console.log("✅ GitHub Integration Enabled");
} else {
    console.log("⚠️ GitHub Token missing. Saving locally only.");
}

// Publish Endpoint
app.post('/api/publish', async (req, res) => {
    const { slug, content } = req.body;

    if (!slug || !content) {
        return res.status(400).json({ error: 'Dados incompletos.' });
    }

    const safeSlug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const fileName = `${safeSlug}.html`;

    // 1. Save Locally (Backup/Dev)
    const filePath = path.join(sitesDir, fileName);
    fs.writeFileSync(filePath, content);

    // 2. Push to GitHub (Production Persistence)
    if (octokit && GITHUB_OWNER && GITHUB_REPO) {
        try {
            console.log(`Pushing ${fileName} to GitHub...`);

            // Check if repo exists, create if not
            try {
                await octokit.request('GET /repos/{owner}/{repo}', {
                    owner: GITHUB_OWNER,
                    repo: GITHUB_REPO
                });
            } catch (e) {
                if (e.status === 404) {
                    console.log(`Repo ${GITHUB_REPO} not found. Creating...`);
                    await octokit.request('POST /user/repos', {
                        name: GITHUB_REPO,
                        description: 'Sites do Bio Link Creator',
                        auto_init: true,
                        private: false
                    });
                    // Wait for init
                    await new Promise(r => setTimeout(r, 3000));
                } else { throw e; }
            }

            // Check if file exists to get SHA
            let sha = null;
            try {
                const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                    owner: GITHUB_OWNER,
                    repo: GITHUB_REPO,
                    path: `sites/${fileName}`,
                });
                sha = data.sha;
            } catch (e) { /* File doesn't exist yet, ignore */ }

            const contentBase64 = Buffer.from(content).toString('base64');

            await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                path: `sites/${fileName}`,
                message: `Update site: ${safeSlug}`,
                content: contentBase64,
                sha: sha
            });

            // Return GitHub Pages URL
            // Ensure Pages is enabled? (Hard to do via API perfectly, assuming user enables or default public)
            // Actually, we can assume user.github.io/repo/sites/file.html works if Docs/Main is source.
            // For now, return the raw file link or pages link.
            const ghUrl = `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}/sites/${fileName}?v=${Date.now()}`;
            return res.json({ success: true, url: ghUrl, mode: 'github' });

        } catch (error) {
            console.error("GitHub upload failed:", error);
            // Fallback to local URL on error, allowing user to see it works at least locally
            const localUrl = `http://localhost:${PORT}/sites/${fileName}`;
            return res.json({ success: true, url: localUrl, warning: 'GitHub push failed', mode: 'local' });
        }
    }

    // Local Only Response
    const localUrl = `http://localhost:${PORT}/sites/${fileName}`;
    res.json({ success: true, url: localUrl, mode: 'local' });
});

app.listen(PORT, () => {
    console.log(`\n🚀 SERVIDOR ONLINE [Porta ${PORT}]`);
    if (!GITHUB_TOKEN) console.log("👉 DICA: Crie um arquivo .env com GITHUB_TOKEN para ativar publicação online real.");
});
