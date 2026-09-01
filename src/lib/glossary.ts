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
  'mode share':
    'The share of trips made by one mode of travel. It only means something once the denominator is stated — all trips, or journey-to-work trips, over what period. Shares measured on different denominators cannot be compared.',
  'statutory plan':
    'A land-use plan a council adopts under Alberta’s Municipal Government Act. It guides decisions about rezoning, subdivision and development permits.',
  'carbon budget':
    'A cap on emissions rather than money: the total greenhouse gas a city can emit over a period and still hit its target. Edmonton presents one to Council alongside its financial budgets, for information rather than approval.',
  'community emissions':
    'Greenhouse gas emitted across the whole city — homes, industry, vehicles, businesses. Distinct from corporate emissions, which are only the City organization’s own operations and are about two per cent of the total.',
  tCO2e:
    'Tonnes of carbon dioxide equivalent — every greenhouse gas converted to the amount of CO2 that would warm the planet as much, so one number covers them all.',
  'office consolidation':
    'A convenience copy of a bylaw with all its later amendments merged into one document. The original bylaws on file with the City Clerk govern if the two ever differ.',
};

export function define(term: string): string | undefined {
  return glossary[term] ?? glossary[term.toLowerCase()];
}
