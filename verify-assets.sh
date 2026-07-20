#!/usr/bin/env bash
# Quick check that every image referenced in index.html exists before deploy.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

missing=0
while IFS= read -r path; do
  if [[ ! -f "$path" ]]; then
    echo "MISSING: $path"
    missing=$((missing + 1))
  fi
done < <(grep -oE '(src|srcset|href)="[^"]+\.(png|webp|jpg|ico|pdf)"' index.html \
  | sed -E 's/^(src|srcset|href)="([^"]+)".*/\2/' \
  | tr ' ' '\n' \
  | grep -E '\.(png|webp|jpg|ico|pdf)$' \
  | sort -u)

if [[ "$missing" -gt 0 ]]; then
  echo ""
  echo "Fix missing files before deploying ($missing missing)."
  exit 1
fi

echo "All referenced assets found."
echo "Work folder size: $(du -sh assets/work | cut -f1)"
echo ""
echo "Deploy the ENTIRE brandon-fonville-studio folder (including assets/work/)."
echo "Netlify Drop: https://app.netlify.com/drop"
