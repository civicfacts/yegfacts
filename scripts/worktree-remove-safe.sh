#!/usr/bin/env bash
# Remove a git worktree without losing its private evidence archive.
#
#   scripts/worktree-remove-safe.sh <worktree path>
#
# evidence/private/ is gitignored, so bytes archived in a worktree exist
# nowhere else until they are copied to the main checkout. Before removing the
# worktree, this compares its evidence/private/ with the main checkout's by
# relative path and sha256, counting regular files and symlinks:
#   - a file the main checkout lacks is copied there (a symlink's target bytes,
#     not the link) and printed;
#   - a file whose bytes differ between the two is listed, and nothing is removed;
#   - a dangling symlink, a symlink to a directory, an unreadable file, a hash
#     that fails or comes back empty, or a failed directory scan stops the
#     script without removing anything.
# The removal is a plain `git worktree remove`, which itself refuses a
# worktree with uncommitted changes. Exits non-zero on any refusal.
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

# Prints the sha256 of a file's bytes (following a symlink), or fails.
sha() {
  local out
  if ! out=$(shasum -a 256 -- "$1" 2>/dev/null); then
    echo "refusing: could not hash $1" >&2
    return 1
  fi
  out=${out%% *}
  if [[ ! $out =~ ^[0-9a-f]{64}$ ]]; then
    echo "refusing: hashing $1 returned no digest" >&2
    return 1
  fi
  printf '%s' "$out"
}

copied=0
differs=""
if [ -d "$src" ]; then
  list=$(mktemp)
  trap 'rm -f "$list"' EXIT
  if ! find "$src" \( -type f -o -type l \) -print0 >"$list"; then
    echo "refusing: could not list every file under $src" >&2
    exit 1
  fi
  while IFS= read -r -d '' file; do
    rel="${file#"$src"/}"
    if [ -L "$file" ] && [ ! -e "$file" ]; then
      echo "refusing: evidence/private/$rel is a dangling symlink" >&2
      exit 1
    fi
    if [ ! -f "$file" ]; then
      echo "refusing: evidence/private/$rel is a symlink to something other than a file" >&2
      exit 1
    fi
    if ! here=$(sha "$file"); then exit 1; fi
    if [ -e "$dst/$rel" ]; then
      if ! there=$(sha "$dst/$rel"); then exit 1; fi
      if [ "$here" != "$there" ]; then
        differs="$differs  $rel"$'\n'
      fi
    else
      mkdir -p "$(dirname "$dst/$rel")"
      cp -pL "$file" "$dst/$rel"
      if ! there=$(sha "$dst/$rel"); then exit 1; fi
      if [ "$here" != "$there" ]; then
        echo "refusing: the copy of $rel does not match its source" >&2
        exit 1
      fi
      echo "copied evidence/private/$rel"
      copied=$((copied + 1))
    fi
  done <"$list"
fi
echo "$copied file(s) copied to $dst"

if [ -n "$differs" ]; then
  echo "refusing to remove $wt: these files differ from the main checkout's copy:" >&2
  printf '%s' "$differs" >&2
  exit 1
fi

git -C "$main" worktree remove "$wt"
echo "removed $wt"
