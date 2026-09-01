/**
 * Site glossary. Terms render via <Term> with a dotted underline and a
 * tooltip; definitions stay in one place so wording is consistent.
 */
export const glossary: Record<string, string> = {
  Proterra:
    'Proterra Inc. — the U.S. manufacturer that built Edmonton’s 60 battery-electric buses. It filed for bankruptcy in August 2023.',
  'Chapter 11':
    'A U.S. bankruptcy process in which a company reorganizes under court supervision while continuing to operate.',
  'proof of claim':
    'A formal document a creditor files in a bankruptcy stating how much it believes it is owed. It is an assertion, not a court ruling or an audited amount.',
  'general unsecured':
    'A bankruptcy claim with no collateral behind it. General unsecured creditors are paid after secured creditors, often only partially.',
  'battery blankets':
    'Insulating covers added to bus batteries to reduce cold-weather performance loss.',
  'mean distance between failures':
    'A reliability measure: the average distance a vehicle travels before something breaks. Higher is better.',
};

export function define(term: string): string | undefined {
  return glossary[term] ?? glossary[term.toLowerCase()];
}
