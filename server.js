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

// Health Check for UptimeRobot
app.get('/ping', (req, res) => res.send('pong'));

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

// Publish Endpoint - Updated to use username folders
app.post('/api/publish', async (req, res) => {
    const { username, content } = req.body;

    if (!username || !content) {
        return res.status(400).json({ error: 'Dados incompletos.' });
    }

    const safeUsername = username.replace(/[^a-z0-9_]/gi, '').toLowerCase();

    // 1. Save Locally (Backup/Dev)
    const userDir = path.join(sitesDir, safeUsername);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
    fs.writeFileSync(path.join(userDir, 'index.html'), content);

    // 2. Push to GitHub (Production Persistence)
    if (octokit && GITHUB_OWNER && GITHUB_REPO) {
        try {
            console.log(`Publishing ${safeUsername}/index.html to GitHub...`);

            // Check if file exists to get SHA
            let sha = null;
            try {
                const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                    owner: GITHUB_OWNER,
                    repo: GITHUB_REPO,
                    path: `${safeUsername}/index.html`,
                });
                sha = data.sha;
            } catch (e) { /* File doesn't exist yet */ }

            const contentBase64 = Buffer.from(content).toString('base64');

            await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                path: `${safeUsername}/index.html`,
                message: `Publish bio: @${safeUsername}`,
                content: contentBase64,
                sha: sha
            });

            // 3. Ensure GitHub Pages is Enabled
            try {
                await octokit.request('GET /repos/{owner}/{repo}/pages', {
                    owner: GITHUB_OWNER,
                    repo: GITHUB_REPO
                });
                console.log("✅ GitHub Pages já ativo.");
            } catch (e) {
                if (e.status === 404) {
                    console.log("⚙️ Ativando GitHub Pages...");
                    try {
                        await octokit.request('POST /repos/{owner}/{repo}/pages', {
                            owner: GITHUB_OWNER,
                            repo: GITHUB_REPO,
                            source: {
                                branch: 'main',
                                path: '/'
                            }
                        });
                        console.log("✅ GitHub Pages ativado com sucesso!");
                    } catch (err) {
                        console.error("⚠️ Falha ao ativar Pages automaticamente:", err.message);
                    }
                }
            }

            const ghUrl = `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}/${safeUsername}/?v=${Date.now()}`;
            return res.json({ success: true, url: ghUrl, mode: 'github' });

        } catch (error) {
            console.error("GitHub upload failed:", error);
            const localUrl = `http://localhost:${PORT}/sites/${safeUsername}/index.html`;
            return res.json({ success: true, url: localUrl, warning: 'GitHub push failed', mode: 'local' });
        }
    }

    const localUrl = `http://localhost:${PORT}/sites/${safeUsername}/index.html`;
    res.json({ success: true, url: localUrl, mode: 'local' });
});

// Check Username Availability
app.get('/api/check-username/:username', async (req, res) => {
    const username = req.params.username.toLowerCase().replace(/[^a-z0-9_]/g, '');

    if (!username || username.length < 3) {
        return res.json({ available: false, reason: 'Mínimo 3 caracteres' });
    }

    // Reserved usernames
    const reserved = ['admin', 'api', 'www', 'app', 'null', 'undefined', 'system'];
    if (reserved.includes(username)) {
        return res.json({ available: false, reason: 'Username reservado' });
    }

    // Check if exists on GitHub
    if (octokit && GITHUB_OWNER && GITHUB_REPO) {
        try {
            await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                path: `${username}/index.html`,
            });
            // If we get here, file exists = username taken
            return res.json({ available: false, reason: 'Já está em uso' });
        } catch (e) {
            if (e.status === 404) {
                return res.json({ available: true });
            }
            console.error("GitHub check error:", e);
        }
    }

    // Local check fallback
    const localPath = path.join(sitesDir, username, 'index.html');
    if (fs.existsSync(localPath)) {
        return res.json({ available: false, reason: 'Já está em uso' });
    }

    return res.json({ available: true });
});

app.listen(PORT, () => {
    console.log(`\n🚀 SERVIDOR ONLINE [Porta ${PORT}]`);
    if (!GITHUB_TOKEN) console.log("👉 DICA: Crie um arquivo .env com GITHUB_TOKEN para ativar publicação online real.");
});
