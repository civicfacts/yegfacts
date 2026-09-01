#!/usr/bin/env bash
# Regenerates public/og.png — the one static brand OG card (spec §6; per-story
# Satori generation is deferred until a story needs it).
#
# Composed with ImageMagick from the site's own symbol, palette and webfont, so
# it needs no rendering dependency in package.json. Run it only when the card
# changes; the PNG it produces is committed.
#
# Requires: ImageMagick 7 (`magick`) and network access to fetch Inter.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out="$root/public/og.png"

command -v magick >/dev/null || {
  echo "ImageMagick 7 (magick) not found." >&2
  exit 1
}

work="$(mktemp -d)"
cleanup() { rm -rf "$work"; }
trap cleanup EXIT

# Inter static TTFs, resolved through the Google Fonts legacy CSS endpoint.
css="$(curl -fsS -A 'Mozilla/4.0' 'https://fonts.googleapis.com/css?family=Inter:400,600,800')"
weight_url() {
  printf '%s\n' "$css" | awk -v want="$1;" '
    /font-weight:/ { weight = $2 }
    weight == want && match($0, /https:[^)]*\.ttf/) {
      print substr($0, RSTART, RLENGTH); exit
    }'
}
curl -fsS -o "$work/inter-600.ttf" "$(weight_url 600)"
curl -fsS -o "$work/inter-800.ttf" "$(weight_url 800)"

PAPER='#FAF9F6'
FOREST='#123F35'
NAVY='#123B5D'
GOLD='#C3A35E'
MUTED='#5D6469'

# Wordmark: "YEGFacts" in forest, ".ca" in gold, sharing one baseline.
magick -background none -fill "$FOREST" -font "$work/inter-800.ttf" -pointsize 92 \
  -kerning -2 label:'YEGFacts' "$work/mark-a.png"
magick -background none -fill "$GOLD" -font "$work/inter-800.ttf" -pointsize 92 \
  -kerning -2 label:'.ca' "$work/mark-b.png"
magick "$work/mark-a.png" "$work/mark-b.png" -background none -gravity south +append \
  "$work/wordmark.png"

magick "$root/public/symbol.png" -resize x116 "$work/symbol.png"
magick "$work/symbol.png" \( -size 26x1 xc:none \) "$work/wordmark.png" \
  -background none -gravity center +append "$work/mark.png"

# Tagline breaks across two lines so it can stay large without crowding the edge.
magick -background none -fill "$NAVY" -font "$work/inter-600.ttf" -pointsize 50 \
  -kerning -1 -interline-spacing 14 \
  label:'Edmonton civic evidence,
checked against the record.' "$work/tagline.png"
magick -background none -fill "$MUTED" -font "$work/inter-600.ttf" -pointsize 25 \
  label:'Understand Edmonton. Check the claims. See the evidence.' "$work/foot.png"

magick -size 1200x630 "xc:$PAPER" \
  "$work/mark.png" -geometry +88+112 -composite \
  -fill "$GOLD" -draw 'rectangle 88,292 176,294' \
  "$work/tagline.png" -geometry +88+338 -composite \
  "$work/foot.png" -geometry +88+520 -composite \
  -strip "$out"

echo "Wrote public/og.png ($(magick identify -format '%wx%h' "$out"))"
