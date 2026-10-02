#!/usr/bin/env bash
# Remove a git worktree without losing its private evidence archive.
#
#   scripts/worktree-remove-safe.sh <worktree path>
#
# evidence/private/ is gitignored, so bytes archived in a worktree exist
# nowhere else until they are copied to the main checkout. Before removing the
# worktree, this compares its evidence/private/ with the main checkout's by
# relative path and sha256: it copies every file the main checkout lacks and
# prints each one, and it refuses to remove the worktree, listing the files,
# when any file differs between the two. The removal is a plain
# `git worktree remove`, which itself refuses a worktree with uncommitted
# changes. Exits non-zero without removing anything on any refusal.
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "usage: scripts/worktree-remove-safe.sh <worktree path>" >&2
  exit 2
fi

wt=$(cd "$1" && pwd -P)
common=$(git -C "$wt" rev-parse --path-format=absolute --git-common-dir)
main=$(cd "$(dirname "$common")" && pwd -P)
if [ "$wt" = "$main" ]; then
  echo "refusing: $wt is the main checkout" >&2
  exit 1
fi

src="$wt/evidence/private"
dst="$main/evidence/private"
sha() { shasum -a 256 "$1" | cut -d' ' -f1; }

copied=0
differs=""
if [ -d "$src" ]; then
  while IFS= read -r -d '' file; do
    rel="${file#"$src"/}"
    if [ -e "$dst/$rel" ]; then
      if [ "$(sha "$file")" != "$(sha "$dst/$rel")" ]; then
        differs="$differs  $rel"$'\n'
      fi
    else
      mkdir -p "$(dirname "$dst/$rel")"
      cp -p "$file" "$dst/$rel"
      if [ "$(sha "$file")" != "$(sha "$dst/$rel")" ]; then
        echo "copy of $rel does not match its source; stopping" >&2
        exit 1
      fi
      echo "copied evidence/private/$rel"
      copied=$((copied + 1))
    fi
  done < <(find "$src" -type f -print0)
fi
echo "$copied file(s) copied to $dst"

if [ -n "$differs" ]; then
  echo "refusing to remove $wt: these files differ from the main checkout's copy:" >&2
  printf '%s' "$differs" >&2
  exit 1
fi

git -C "$main" worktree remove "$wt"
echo "removed $wt"
