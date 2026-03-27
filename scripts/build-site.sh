#!/usr/bin/env bash
# Merge legacy static root + Next.js static exports for /b and /c into ./dist
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="${ROOT}/dist"

rm -rf "${DIST}"
mkdir -p "${DIST}"

# ── Legacy site at domain root (/, /index.html, /about.html, …)
cp "${ROOT}/index.html" "${ROOT}/about.html" "${ROOT}/contact.html" "${ROOT}/privacy.html" "${ROOT}/tracking.js" "${DIST}/"
cp -R "${ROOT}/css" "${ROOT}/fonts" "${ROOT}/images" "${ROOT}/js" "${DIST}/"

# ── Next app b → https://example.com/b/
(cd "${ROOT}/b" && npm run build)
mkdir -p "${DIST}/b"
cp -R "${ROOT}/b/out/." "${DIST}/b/"

# ── Next app c → https://example.com/c/
(cd "${ROOT}/c" && npm run build)
mkdir -p "${DIST}/c"
cp -R "${ROOT}/c/out/." "${DIST}/c/"

echo "Built to ${DIST} (root legacy + /b + /c)"
