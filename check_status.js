require('dotenv').config();
const { Octokit } = require('octokit');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;

async function check() {
    console.log(`Checking ${owner}/${repo}...`);
    try {
        // 1. Repo
        const { data: r } = await octokit.request('GET /repos/{owner}/{repo}', { owner, repo });
        console.log(`Repo exists.`);
        console.log(`- Private: ${r.private}`);
        console.log(`- Has Pages: ${r.has_pages}`);

        // 2. Pages
        try {
            const { data: p } = await octokit.request('GET /repos/{owner}/{repo}/pages', { owner, repo });
            console.log(`Pages Config:`);
            console.log(`- URL: ${p.html_url}`);
            console.log(`- Status: ${p.status}`);
            console.log(`- Source: ${p.source.branch} / ${p.source.path}`);
        } catch (e) { console.log("Pages API error (might be not enabled or building):", e.status); }

        // 3. File
        try {
            // List sites folder
            const { data: files } = await octokit.request('GET /repos/{owner}/{repo}/contents/sites', { owner, repo });
            console.log("Files found in /sites/:");
            files.forEach(f => console.log(` - ${f.name} (${f.html_url})`));
        } catch (e) { console.log("File check error (Folder 'sites' not found?):", e.status); }

    } catch (e) { console.log("Repo check error:", e.status, e.response?.data?.message); }
}
check();
