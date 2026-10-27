#!/usr/bin/env bash
set -euo pipefail
workspace_root="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
exec code --new-window \
  --extensionDevelopmentPath="$workspace_root" \
  "$workspace_root/fredis-evaluation.code-workspace"
