/**
 * What the story page says about reasoning effort comes from the run manifest,
 * so the sentence must distinguish "not recorded" from "recorded as high" —
 * silently defaulting a pre-v1.6 manifest to `high` would publish a claim about
 * a run that nobody made.
 */
import { describe, expect, it } from 'vitest';
import { effortSentence } from '../src/lib/runs.ts';

const run = (provider: string, seat: string, reasoning_effort?: string, round = 1) => ({
  provider,
  seat,
  round,
  ...(reasoning_effort === undefined ? {} : { reasoning_effort }),
});

describe('effortSentence', () => {
  it('says nothing is recorded when there are no runs', () => {
    expect(effortSentence([])).toMatch(/not recorded in this run’s manifest/);
  });

  it('says nothing is recorded when any run lacks an effort', () => {
    const sentence = effortSentence([
      run('anthropic', 'Claude Fable 5.1', 'high'),
      run('openai', 'GPT-5.6 Sol'),
    ]);
    expect(sentence).toMatch(/not recorded in this run’s manifest/);
  });

  it('reports the shared setting when every run pinned high', () => {
    const sentence = effortSentence([
      run('anthropic', 'Claude Fable 5.1', 'high', 1),
      run('openai', 'GPT-5.6 Sol', 'high', 1),
      run('google', 'Gemini 3.1 Pro', 'high', 2),
    ]);
    expect(sentence).toBe(
      'All three seats ran at each vendor’s high reasoning setting, the highest level the three CLIs share; the manifest records it per run.',
    );
  });

  it('lists effort per seat when the seats differ', () => {
    const sentence = effortSentence([
      run('anthropic', 'Claude Fable 5.1', 'high'),
      run('openai', 'GPT-5.6 Sol', 'medium'),
    ]);
    expect(sentence).toBe('Reasoning effort per seat: Claude Fable 5.1 high, GPT-5.6 Sol medium.');
  });

  it('names each seat once across both rounds', () => {
    const sentence = effortSentence([
      run('anthropic', 'Claude Fable 5.1', 'high', 1),
      run('anthropic', 'Claude Fable 5.1', 'high', 2),
      run('openai', 'GPT-5.6 Sol', 'medium', 1),
      run('openai', 'GPT-5.6 Sol', 'medium', 2),
    ]);
    expect(sentence).toBe('Reasoning effort per seat: Claude Fable 5.1 high, GPT-5.6 Sol medium.');
  });

  it('falls back to the provider when a manifest entry has no seat name', () => {
    expect(effortSentence([{ provider: 'openai', reasoning_effort: 'medium' }])).toBe(
      'Reasoning effort per seat: openai medium.',
    );
  });
});
