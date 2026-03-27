# GHVC

## Deploy as separate Amplify apps

Use **three different apps** in the Amplify console (or any host), all pointed at **this repo**, with different **app root / monorepo path**:

| Amplify app | App root (monorepo path) | Output |
|-------------|---------------------------|--------|
| Legacy static | **`.`** (repo root) | Upload `index.html`, `css/`, `images/`, `js/`, etc., or a build that only copies those files |
| Next **b** | **`b`** | Standard Next.js: `npm ci` → `npm run build`, artifact **`.next`** (SSR/SSG as Amplify expects) |
| Next **c** | **`c`** | Same as **b** |

### Important

- **Do not** add a repo-root `amplify.yml` unless it matches how *every* connected Amplify app should build. A single root `amplify.yml` overrides console settings for the whole repository.
- For **b** and **c**, set **`AMPLIFY_MONOREPO_APP_ROOT`** to **`b`** or **`c`** (Amplify usually sets this when you pick the monorepo path).
- Recommended **Node 20** for Next 16.

### Local dev

```bash
cd b && npm install && npm run dev
cd c && npm install && npm run dev
```

---

Legacy README note: `stake`
