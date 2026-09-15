#!/usr/bin/env bash
#
# Send one prepared package to one reviewer seat and write down what came back.
#
#   scripts/panel/audit-package.sh --package <file> --report <file> \
#     [--provider anthropic|openai|google] [--label <text>]
#
# For framing checks and source audits, which until now each rolled their own
# invocation. That is how one of them ended up reading the founder's private
# memory: there was no single place that owned the flags. There is now, and this
# is a thin caller of it.
#
# Package in, report out, one invocation. It does not assemble a brief, does not
# retry, does not touch the panel's two-attempt schema cap, and does not decide
# anything about framing. Whatever the seat returned is what lands in the report;
# reading it and drawing a conclusion is a person's job.
#
# Whether it runs at all is the launcher's decision, not this script's. From
# methodology v1.29 the launcher captures the CLI's outgoing request and checks
# it against a pinned profile, so an anthropic audit can complete; openai and
# google have no capture-backed profile and are still refused, which is why the
# consultation's commissioned Google audit remains blocked. The whole reason a
# framing check once read the founder's private memory is that it had its own
# invocation and its own idea of what was safe.
#
# --provider exists because an audit commissioned from one vendor must be
# RECORDED against that vendor even when it is refused. The consultation's
# commissioned audit is a Google one; running it without a way to say so would
# file a Google request under an Anthropic refusal, with Anthropic's reason
# attached, which is a false provenance record rather than a cautious one.
#
# There is deliberately no --model or --effort. Both are pinned per vendor in
# invoke-reviewer.sh, because a helper that runs whatever model it is handed is
# a way to publish a run nobody chose.
#
# An existing report is never overwritten, and the final copy is exclusive, so a
# report that appears while the invocation is running is not written through.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
INVOKE="$REPO_ROOT/scripts/panel/invoke-reviewer.sh"

usage() {
  cat >&2 <<'USAGE'
usage: scripts/panel/audit-package.sh --package <file> --report <file> [options]
  --package <file>    the prepared package, sent verbatim as the prompt
  --report <file>     where to write the complete response; must not exist

options:
  --provider <name>   anthropic (default) | openai | google. The vendor the
                      audit is commissioned from, recorded even when refused.
  --label <text>      what to call this audit in the log

The model and reasoning effort are pinned per vendor in invoke-reviewer.sh and
cannot be chosen here.
USAGE
  exit 2
}

PACKAGE=""; REPORT=""; PROVIDER="anthropic"; LABEL="audit"
while [ "$#" -gt 0 ]; do
  case "$1" in
    --package) PACKAGE="${2:-}"; shift 2 ;;
    --report) REPORT="${2:-}"; shift 2 ;;
    --provider) PROVIDER="${2:-}"; shift 2 ;;
    --label) LABEL="${2:-}"; shift 2 ;;
    *) echo "unknown option: $1" >&2; usage ;;
  esac
done

[ -n "$PACKAGE" ] || usage
[ -n "$REPORT" ] || usage
[ -f "$PACKAGE" ] || { echo "package not found: $PACKAGE" >&2; exit 1; }

# The vendor names the launcher knows. Checked here so a typo is a usage error
# rather than a retained attempt filed against a provider that does not exist.
case "$PROVIDER" in
  anthropic|openai|google) ;;
  *) echo "unknown provider: $PROVIDER (expected anthropic, openai or google)" >&2; usage ;;
esac

# -L as well as -e: a dangling symlink at the destination is still something a
# person put there.
if [ -e "$REPORT" ] || [ -L "$REPORT" ]; then
  echo "report already exists: $REPORT — name a new destination rather than overwriting an audit" >&2
  exit 1
fi

ARCHIVE_ROOT="$("$INVOKE" --archive-root)"
SLUG="$(printf '%s' "$LABEL" | tr -cs 'A-Za-z0-9._-' '-' | sed 's/^-*//;s/-*$//')"
ATTEMPT_DIR="$ARCHIVE_ROOT/audits/${SLUG:-audit}/$PROVIDER/$(date -u +%Y%m%dT%H%M%SZ)/attempt-1"

# No --model and no --effort: the launcher's pin for this vendor is the answer.
"$INVOKE" --purpose research --provider "$PROVIDER" --package "$PACKAGE" \
  --attempt-dir "$ATTEMPT_DIR" --label "$LABEL"

# The complete final message, footer and all. No extraction, no schema: an audit
# is prose to be read, not a document to be parsed. Installed exclusively, so a
# destination that appeared during the invocation is refused rather than
# clobbered.
mkdir -p "$(dirname "$REPORT")"
npx tsx "$REPO_ROOT/scripts/panel/install-output.ts" "$ATTEMPT_DIR/final-message.txt" "$REPORT"

echo "[$LABEL] wrote $REPORT (attempt $(cat "$ATTEMPT_DIR/attempt-id.txt"), profile $(cat "$ATTEMPT_DIR/profile.txt"))"
