/**
 * One sentence disclosing the reasoning effort a panel run used (methodology
 * v1.6). Effort is read from the run manifest and never assumed: a manifest
 * written before v1.6 records none, and the sentence says so rather than
 * implying a default.
 */
export function effortSentence(
  runs: Array<{ provider: string; seat?: string; reasoning_effort?: string }>,
): string {
  const seats = runs.map((run) => ({
    label: run.seat ?? run.provider,
    effort: (run.reasoning_effort ?? '').trim(),
  }));

  if (seats.length === 0 || seats.some((seat) => seat.effort === '')) {
    return 'Reasoning effort is not recorded in this run’s manifest. Before methodology v1.6 only the GPT and Gemini commands pinned it; the Claude seat used an unpublished local default.';
  }

  if (seats.every((seat) => seat.effort === 'high')) {
    return 'All three seats ran at each vendor’s high reasoning setting, the highest level the three CLIs share; the manifest records it per run.';
  }

  const pairs = [...new Set(seats.map((seat) => `${seat.label} ${seat.effort}`))];
  return `Reasoning effort per seat: ${pairs.join(', ')}.`;
}
