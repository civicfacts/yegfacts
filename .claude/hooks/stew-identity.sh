#!/bin/sh
# SessionStart hook: every Claude session in this repo works as Stew.
# Commits are authored by the stew-yegfacts machine account and pushes
# use its token, so the founder's own account is not the one doing
# Stew's work. The founder's own terminal is unaffected: this only runs
# inside Claude Code sessions.
#
# The token lives in a standalone gh config dir, $HOME/.config/gh-stew,
# which Codex sessions in this repo use too (machine-local
# .codex/config.toml). One place to rotate. Falls back to a
# stew-yegfacts account in gh's default keyring if the dir is absent.
[ -n "$CLAUDE_ENV_FILE" ] || exit 0
stew_dir="$HOME/.config/gh-stew"
if [ -f "$stew_dir/hosts.yml" ]; then
  echo "export GH_CONFIG_DIR='$stew_dir'" >> "$CLAUDE_ENV_FILE"
else
  tok=$(gh auth token --user stew-yegfacts 2>/dev/null)
  if [ -z "$tok" ]; then
    echo "Stew identity NOT set: no $stew_dir and no stew-yegfacts account in gh. Commits and pushes would run as the founder; stop and ask before committing."
    exit 0
  fi
  echo "export GH_TOKEN='$tok'" >> "$CLAUDE_ENV_FILE"
fi
{
  echo "export GIT_AUTHOR_NAME='Stew'"
  echo "export GIT_AUTHOR_EMAIL='324978795+stew-yegfacts@users.noreply.github.com'"
  echo "export GIT_COMMITTER_NAME='Stew'"
  echo "export GIT_COMMITTER_EMAIL='324978795+stew-yegfacts@users.noreply.github.com'"
} >> "$CLAUDE_ENV_FILE"
echo "Stew identity set: commits and gh calls in this session run as stew-yegfacts."
