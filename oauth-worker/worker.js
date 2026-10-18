/**
 * Cloudflare Worker OAuth Handler for Decap CMS / Static CMS
 * 
 * Routes:
 * - GET /auth     -> Redirects to GitHub OAuth Authorization
 * - GET /callback -> Exchanges GitHub temporary code for access token
 *                    and communicates token back to Decap CMS via postMessage.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const { pathname, searchParams } = url

    // Enable CORS for preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // 1. Initial Authorization Request
    if (pathname === '/auth') {
      const scope = searchParams.get('scope') || 'repo,user'
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=${encodeURIComponent(scope)}`
      return Response.redirect(githubAuthUrl, 302)
    }

    // 2. Callback from GitHub
    if (pathname === '/callback') {
      const code = searchParams.get('code')
      if (!code) {
        return new Response('Missing authorization code', { status: 400 })
      }

      try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Decap-CMS-Cloudflare-OAuth',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        })

        const tokenData = await tokenResponse.json()

        if (tokenData.error) {
          return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { status: 400 })
        }

        // Post token back to Decap CMS popup window
        const script = `
<!doctype html>
<html>
<body>
  <p style="font-family: sans-serif; text-align: center; margin-top: 50px;">Authorizing CMS... You can close this window if it doesn't close automatically.</p>
  <script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
          e.origin
        );
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script>
</body>
</html>`

        return new Response(script, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        })
      } catch (err) {
        return new Response(`Authentication failed: ${err.message}`, { status: 500 })
      }
    }

    return new Response('Decap CMS OAuth Worker is running. Visit /auth to initiate login.', { status: 200 })
  },
}
