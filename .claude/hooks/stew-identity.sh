#!/bin/sh
# SessionStart hook: every Claude session in this repo works as Stew.
# Commits are authored by the stew-yegfacts machine account and pushes
# use its token (from the gh keyring), so the founder's own account is
# not the one doing Stew's work. The founder's own terminal is
# unaffected: this only runs inside Claude Code sessions.
[ -n "$CLAUDE_ENV_FILE" ] || exit 0
tok=$(gh auth token --user stew-yegfacts 2>/dev/null)
if [ -z "$tok" ]; then
  echo "Stew identity NOT set: gh has no stew-yegfacts account on this machine. Commits and pushes would run as the founder; stop and ask before committing."
  exit 0
fi
{
  echo "export GH_TOKEN='$tok'"
  echo "export GIT_AUTHOR_NAME='Stew'"
  echo "export GIT_AUTHOR_EMAIL='324978795+stew-yegfacts@users.noreply.github.com'"
  echo "export GIT_COMMITTER_NAME='Stew'"
  echo "export GIT_COMMITTER_EMAIL='324978795+stew-yegfacts@users.noreply.github.com'"
} >> "$CLAUDE_ENV_FILE"
echo "Stew identity set: commits and gh calls in this session run as stew-yegfacts."
