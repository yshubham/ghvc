# GHVC

## Live URL layout (one domain)

| URL | What it serves |
|-----|----------------|
| **`/`** | Legacy static site (`index.html`, `css/`, `images/`, …) |
| **`/b/`** | Next.js app in **`b/`** (static export, `basePath: /b`) |
| **`/c/`** | Next.js app in **`c/`** (static export, `basePath: /c`) |

Pushing to the connected branch runs **`scripts/build-site.sh`**, which writes everything into **`dist/`** for Amplify.

### AWS Amplify

- **`amplify.yml`** installs deps in **`b/`** and **`c/`**, runs the build script, publishes **`dist/`**.
- This is **static hosting**: Next **`output: 'export'`** in both apps (no server-side Next on Amplify for `/b` and `/c`). Features like ISR/API routes won’t run in the cloud; your marketing sites are fully static.

### Local full build

```bash
chmod +x scripts/build-site.sh
./scripts/build-site.sh
```

Open `dist/index.html` via a static server; visit `/b/` and `/c/` on the same host.

### Redirects (optional, Amplify console)

If `/b` or `/c` without a trailing slash misbehave, add console redirects, for example:

- `/b` → `/b/` (301)  
- `/c` → `/c/` (301)

### Legacy vs Next privacy

- Root: **`/privacy.html`** (legacy)  
- Modern: **`/b/privacy`**, **`/c/privacy`**

---

Legacy README note: `stake`
