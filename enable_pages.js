require('dotenv').config();
const { Octokit } = require('octokit');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;

async function enablePages() {
    try {
        console.log(`Enabling GitHub Pages for ${owner}/${repo}...`);

        await octokit.request('POST /repos/{owner}/{repo}/pages', {
            owner: owner,
            repo: repo,
            source: {
                branch: 'main',
                path: '/'
            }
        });

        console.log("✅ GitHub Pages Enabled!");
    } catch (error) {
        if (error.status === 409) {
            console.log("⚠️ Pages already enabled (might just be building).");
        } else {
            console.error("❌ Error:", error.response ? error.response.data : error.message);
        }
    }
}

enablePages();
