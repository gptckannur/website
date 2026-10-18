# Cloudflare Worker GitHub OAuth Broker for Decap CMS

This worker handles authentication between GitHub and Decap CMS so non-technical staff can log in to the admin panel with GitHub without needing command-line Git tools or personal access tokens.

---

## 3-Step Setup Guide

### Step 1: Create a GitHub OAuth Application
1. On GitHub, go to **Settings** → **Developer Settings** → **OAuth Apps** → **New OAuth App** (or visit: `https://github.com/settings/applications/new`).
2. Fill in:
   - **Application name**: `GPTC Kannur CMS`
   - **Homepage URL**: `https://your-site.github.io` (or your custom domain)
   - **Authorization callback URL**: `https://gptc-cms-auth.<your-cf-subdomain>.workers.dev/callback`
3. Click **Register application**.
4. Copy your **Client ID** and generate a **Client Secret**.

---

### Step 2: Set Secrets in Cloudflare
Inside this `oauth-worker` folder, run:
```bash
npx wrangler secret put GITHUB_CLIENT_ID
# Paste your Client ID when prompted

npx wrangler secret put GITHUB_CLIENT_SECRET
# Paste your Client Secret when prompted
```

---

### Step 3: Deploy to Cloudflare Workers
Run:
```bash
npx wrangler deploy
```
Once deployed, copy your worker's live URL (e.g., `https://gptc-cms-auth.your-username.workers.dev`) and update the `base_url` in `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: vinayakkakkan/GPTC-kannur
  branch: main
  base_url: https://gptc-cms-auth.your-username.workers.dev
  auth_endpoint: auth
```
Then commit and push!
