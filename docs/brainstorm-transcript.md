> **What this file is.** The raw, unedited transcript of the August 2026
> brainstorming conversations that preceded this project — committed for
> transparency about where YEGFacts came from. Nothing in it is
> methodology: it predates the methodology, the review panel, and every
> published finding. It records the founder's personal starting views and
> business thinking, including the conversation's own pushback that those
> views must not become the site's editorial position — which is why the
> methodology that followed was designed so they cannot. Read it as
> provenance, not policy.

# YEGFacts.ca

### user
Original custom instructions no longer available

---

### user
I am building YEGFacts.ca, an open-source, non-partisan civic data and policy fact-checking platform for Edmonton, Alberta.

---

### Project Background & Context

#### 1. The Inspiration & The Gap
- **Precedent:** Several Edmonton City Councillors have published dedicated single-topic explainers on their personal sites (e.g., Aaron Paquette's pages on *Managing Neighbourhood Growth* at `aaronpaquette.ca/mng` and *Rain/Drainage Infrastructure* at `aaronpaquette.ca/rain`; Michael Janz's pages on `michaeljanz.ca/bikeplan`, `housing`, and `transit`).
- **The Problem with Councillor Sites:** When dropped into online debates (Facebook, Reddit, X), personal councillor links are frequently dismissed by skeptics as political spin, partisan defense, or ideological lobbying.
- **The Opportunity:** A community-owned, non-partisan domain (`YEGFacts.ca`) backed by open-source GitHub contributions acts as an objective civic encyclopedia rather than a politician's blog.

#### 2. Ultimate Goal & Philosophy
- **North Star:** Make Edmonton the best city to live in, no matter how you choose or need to move (driving, walking, transit, or rolling).
- **Core Framing — Spatial & Fiscal Efficiency (Not Culture War):** Move the narrative away from "Bikes vs. Cars" to **traffic reduction, freedom of choice, and municipal fiscal health**. 
  - Giving people safe, viable alternatives for short trips (<3 km) removes cars from choke points (Gateway Blvd, Yellowhead), freeing up road capacity and parking for those who genuinely need to drive.
  - Complete networks, 15-minute district amenities (corner stores, neighbourhood services), and winter maintenance service standards (inspired by peer winter cities like Oulu, Finland) are necessary infrastructure investments, not luxury items.

#### 3. Brand Positioning Choice: "Neutral Fact-Checker + Open Civic Knowledge Base"
- **Why NOT an aggressive "Myth-Buster":** Calling someone's belief a "myth" triggers defensive hostility and hardens opinions. A neutral URL like `yegfacts.ca/winter-mobility` or `yegfacts.ca/road-capacity` informs without provoking.
- **Progressive Disclosure Architecture (3 Layers):**
  - **Layer 1 (The Snappy Rebuttal):** A neutral, 2-sentence executive summary with a 1-click "Copy Summary & Citation" button for instant drop-in during social media debates.
  - **Layer 2 (The Data & Evidence):** Clear visual charts, open data stats, budget ratios, and Edmonton-specific metrics (e.g., Eco-Counter data on 102 Ave / 100 Ave, snow-clearing response times).
  - **Layer 3 (Primary Sources):** Direct links to City of Edmonton council reports, audited financial statements, EPCOR utility filings, bylaws, and peer-reviewed studies.

#### 4. Scope & Architecture
- **Multi-Topic Scope:** Arguments in Edmonton never stay in a silo. Mobility debates immediately spill into housing density, zoning bylaws, and property tax subsidies. Scope must cover **Transportation, Housing/Infill, Municipal Budget/Taxes, and District Planning**.
- **Tech Stack:** Free/low-cost static site generator (e.g., Astro, VitePress, or Next.js + Tailwind CSS) deployed via GitHub Pages / Cloudflare Pages.
- **Content Engine:** Flat Markdown/MDX files with structured YAML frontmatter so non-technical contributors can easily edit or submit new pages via GitHub PRs.

---

### What I Need from You in This Session

1. **Content Schema & MVP Taxonomy:**
   - Define a structured Markdown/MDX frontmatter and content schema for each topic card.
   - Flesh out the first **10–12 essential topics** to launch with (e.g., Winter Cycling Feasibility, Infill & Sewer Capacity, Suburbs vs. Core Tax Subsidies, Road Diets & Traffic Flow, 15-Minute Districts vs. Freedom of Movement).

2. **Open-Source Governance & Guardrails:**
   - Draft a robust `CONTRIBUTING.md` and editorial policy to prevent political bias and enforce primary-source citations (no editorial blogs; only open data, bylaws, and audited city reports).
   - Create GitHub Issue & PR templates for "Data Correction" and "New Topic Request".

3. **UX & Social Share Optimization:**
   - Detail the UI/UX features built specifically for comment-section link-sharing (anchor links, 1-click clipboard copy, automated OpenGraph image generation with key stats).
   - Design the site categorization, search, and filtering UX.

4. **Community Rollout & Contributor Seeding:**
   - Strategy to seed the first wave of verified data and attract community contributors (local urbanists, transit advocates, data analysts, and researchers) without the project being branded as an ideological group.

Let's begin by defining the standard Markdown content template and the exact list of the top 10 MVP topics.

---

### assistant
[model_editable_context] {'content_type': 'model_editable_context', 'model_set_context': ''}

---

### assistant
I’ll make the MVP topics pass two filters: they should come up often in Edmonton debates, and they should be answerable mainly from stable primary sources rather than opinion pieces. I’ll also make the Markdown schema strict enough to support copyable rebuttals, automated citations, and later validation in CI.

---

### assistant
[code] fast|site:edmonton.ca "District Planning" Edmonton 15-minute districts zoning bylaw
fast|site:edmonton.ca Edmonton bike plan winter cycling snow clearing active pathways
fast|site:edmonton.ca Edmonton road diet traffic calming Vision Zero traffic safety road design
fast|site:edmonton.ca Edmonton inf

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca/city_government/urban_planning_and_design district planning 15 minute Edmonton City Plan districts
fast|site:edmonton.ca "15-minute" Edmonton City Plan districts
fast|site:epcor.com Edmonton infill drainage sewer capacity redevelopment
fast|site:edmonton.ca infill infrastructur

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca "2025-2026 Budget" Edmonton property tax operating budget capital budget
fast|site:edmonton.ca "Financial and Corporate Services" Edmonton annual report audited financial statements 2025
fast|site:edmonton.ca "growth pays for growth" Edmonton tax levy suburbs infrastructure
fas

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
A useful constraint emerged from the source check: some of the strongest launch pages are not generic “urbanism” topics but Edmonton-specific questions where the City already publishes the governing policy, service standard, or fiscal framework. For example, Edmonton explicitly says district plans do **not** restrict where people may travel, and its winter-maintenance standards distinguish roadway and active-pathway service levels.

---

### assistant
[code] fast|site:edmonton.ca Edmonton parking minimums zoning bylaw open option parking requirements
fast|site:edmonton.ca Edmonton "Open Option Parking" minimum parking requirements
fast|site:edmonton.ca Edmonton active transportation network expansion 100 million budget percentage transportation capital

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
For the MVP, I would make every page answer a **specific civic question**, not start from a claim it is trying to prove. That distinction will help YEGFacts look materially different from an advocacy site.

For example:

- Good: **“Do Edmonton’s district plans restrict where people can travel?”**
- Weaker: **“The truth about 15-minute cities”**
- Avoid: **“Myth: 15-minute cities restrict your movement”**

That also maps naturally to your three-layer design.

## 1. Standard YEGFacts topic schema

I would keep the schema fairly opinionated. The page frontmatter should contain everything needed for search, cards, social sharing, freshness checks, and OG generation, while the actual reasoning stays readable Markdown.

```md
---
schema_version: 1

# Identity
title: "15-Minute Districts and Freedom of Movement"
slug: "15-minute-districts"
category: "district-planning"
status: "verified"

# The question this page answers
question: "Do Edmonton's district plans restrict where residents can travel?"

# Layer 1: short answer
answer:
  label: "No"
  summary: >
    Edmonton's district plans do not restrict where residents can travel
    or require people to stay within their district. They are land-use
    planning tools intended to make more everyday destinations available
    close to home while maintaining travel between districts.

# Social sharing
share:
  text: >
    Edmonton's district plans don't restrict where you can travel.
    They guide where housing, services and transportation infrastructure
    should grow so more daily needs can optionally be met closer to home.
  og_stat: null
  og_label: null

# Classification
tags:
  - district-planning
  - 15-minute-city
  - mobility
  - zoning
  - city-plan

# Geographic / temporal scope
geography: "Edmonton"
as_of: "2026-08-30"
last_verified: "2026-08-30"
review_by: "2027-02-28"

# Facts suitable for cards/charts/OG images
key_facts:
  - value: "15"
    label: "planning districts"
    source: "district-policy"
  - value: "50%"
    label: "City Plan target for trips by transit and active transportation"
    source: "city-plan"

# Source registry
sources:
  - id: "district-policy"
    title: "District Policy and Plans"
    publisher: "City of Edmonton"
    type: "city-policy"
    url: "<source-url>"
    published: null
    accessed: "2026-08-30"
    primary: true

  - id: "city-plan"
    title: "The City Plan"
    publisher: "City of Edmonton"
    type: "statutory-plan"
    url: "<source-url>"
    published: null
    accessed: "2026-08-30"
    primary: true
---

# 15-Minute Districts and Freedom of Movement

## Short answer

Edmonton's district plans do **not** restrict where residents can travel
or require people to remain inside their district.

Their purpose is to guide land use, housing, amenities and transportation
investment so that more everyday needs can be met closer to home.

[Copy summary & citations]

## What Edmonton's policy actually says

Explain the relevant policy in plain language.

Quote only the minimum necessary text from the primary source.

## What changes

Describe the things the policy actually changes or guides.

- Land-use planning
- Locations where additional development is encouraged
- Infrastructure investment priorities
- Transportation options
- Access to nearby services

## What does not change

Clarify common areas of confusion.

- No travel restrictions
- No requirement to remain within a district
- No individual movement tracking
- No requirement to walk, cycle or use transit

## The numbers

Present 1–4 key statistics or charts.

### 15 planning districts

[chart / map / data visualization]

**Source:** [District Policy and Plans](#source-district-policy)

## Important context

Describe legitimate limitations, trade-offs or uncertainty.

This section is mandatory. A YEGFacts page should state evidence that
complicates the short answer rather than selecting only favourable facts.

## What we can conclude

Summarize only what the available evidence establishes.

Avoid recommendations such as "Council should..." or
"This is good/bad policy."

## Sources

### District Policy and Plans {#source-district-policy}

- **Publisher:** City of Edmonton
- **Type:** City policy / planning document
- **Accessed:** August 30, 2026
- [Primary source](<source-url>)

### The City Plan {#source-city-plan}

- **Publisher:** City of Edmonton
- **Type:** Statutory plan
- **Accessed:** August 30, 2026
- [Primary source](<source-url>)

## Revision history

See the GitHub history for this page.

[Report a data problem] [Edit this page on GitHub]
```

### A few schema decisions I would make now

**`answer.label` should not be a traditional fact-check rating.** Allow values such as `Yes`, `No`, `Mostly`, `It depends`, and `Insufficient evidence`. Don't use `TRUE`, `FALSE`, `MYTH`, or a Pinocchio-style score.

**`Important context` should be mandatory.** This is probably one of your strongest anti-bias mechanisms. Contributors must actively look for evidence that limits or qualifies the headline conclusion.

**Every numerical `key_fact` needs a source ID.** CI can reject something like:

```yaml
key_facts:
  - value: "$100M"
    label: "Active transportation spending"
```

unless it contains:

```yaml
    source: "2023-2026-capital-budget"
```

That eventually lets you automatically generate cards such as:

> **$100M**  
> Active Transportation Network Expansion  
> **2% of the transportation capital budget**

That particular comparison is already published by the City: the $100M program represents about 2% of approximately $5B in transportation capital spending. citeturn230905search0

I would also make `as_of`, `last_verified`, and `review_by` mandatory. YEGFacts will otherwise gradually become **YEGFactsFrom2026.ca** without anyone noticing.

---

# 2. Exact top 10 MVP topics

I would launch with these ten, in roughly this order.

| # | URL | Page title | Core question |
|---|---|---|---|
| **1** | `/15-minute-districts` | **15-Minute Districts and Freedom of Movement** | Do Edmonton's district plans restrict where people can travel? |
| **2** | `/active-transportation-cost` | **What Edmonton Actually Spends on Active Transportation** | How large is Edmonton's bike/walking infrastructure spending compared with the overall transportation budget? |
| **3** | `/winter-mobility` | **Winter Mobility in Edmonton** | Can walking, rolling and cycling infrastructure realistically operate through an Edmonton winter? |
| **4** | `/road-space` | **Road Space, Bike Lanes and Traffic Flow** | Does reallocating road space necessarily make traffic congestion worse? |
| **5** | `/speed-limits` | **Speed Limits, Traffic Calming and Road Safety** | What are Edmonton's lower speed limits and traffic-calming measures intended to accomplish, and what does the evidence show? |
| **6** | `/infill-zoning` | **What Infill Can Actually Be Built in Edmonton** | What does Edmonton's current zoning actually allow in established neighbourhoods? |
| **7** | `/infill-infrastructure` | **Infill, Sewers and Infrastructure Capacity** | Does infill simply add homes to existing pipes and roads without checking whether infrastructure can handle them? |
| **8** | `/growth-costs` | **The Municipal Cost of City Growth** | How do outward expansion and growth in existing neighbourhoods affect municipal infrastructure costs? |
| **9** | `/parking` | **Parking Requirements in Edmonton** | Did Edmonton ban parking requirements, and does that mean new buildings provide no parking? |
| **10** | `/city-budget` | **Where Edmonton's Property-Tax Money Goes** | What actually makes up Edmonton's municipal budget, and how large are commonly debated expenditures in context? |

These ten also give you a good homepage distribution instead of making YEGFacts look like a cycling site:

**Mobility:** 2, 3, 4, 5  
**Housing / infill:** 6, 7  
**Growth / planning:** 1, 8  
**Fiscal / municipal:** 2, 8, 10  
**Parking / land use:** 9

There is deliberate overlap. Real civic questions overlap.

---

## 3. Why I would choose these ten

### 1. 15-Minute Districts and Freedom of Movement

This should probably be one of the first pages you publish because the underlying factual question is unusually easy to resolve with primary documentation.

The City's current District Planning material explicitly says districts are **not** about restricting movement, monitoring people, or tracking individual carbon emissions, and that people remain free to travel anywhere in Edmonton however they choose. District plans instead guide locations for growth, services and infrastructure. citeturn239082search2

That is almost the ideal YEGFacts use case: controversial issue, narrow factual question, authoritative answer.

---

### 2. What Edmonton Actually Spends on Active Transportation

I would rank this extremely high because "$100 million for bike lanes" is exactly the sort of isolated number that spreads well online.

The more informative context is that the City describes the $100M Active Transportation Network Expansion as **2% of roughly $5B in transportation capital projects**. Its current budget FAQ also says the project's 2026 debt servicing plus operating costs amount to about **0.1% of the $3.9B tax-supported operating budget**. citeturn230905search0turn230905search5

That makes for an excellent Layer 1 → Layer 2 transition without YEGFacts needing to say whether $100M is "too much" or "too little."

---

### 3. Winter Mobility in Edmonton

I'd deliberately call this **Winter Mobility**, not "Winter Cycling."

The useful comparison isn't:

> Can a determined cyclist ride at -25°C?

It's:

> What infrastructure does Edmonton maintain in winter, to what service standard, and does that make non-driving trips practically available?

Edmonton currently assigns active pathways explicit snow-clearing priorities: priority 1 facilities are maintained to bare pavement within one day, priority 2 pathways within three days, while residential roads have a different service standard that can extend to 14 days after a residential blading cycle is initiated. The City also maintains roads and active pathways with separate operational teams and equipment. citeturn837234search1turn837234search2

That makes a great comparative service-level graphic.

---

### 4. Road Space, Bike Lanes and Traffic Flow

Keep the question narrower than "Do bike lanes reduce congestion?"

The page should explain:

- lane capacity versus intersection capacity;
- turning movements;
- bottlenecks;
- parking/loading;
- induced/diverted traffic;
- alternatives removing some vehicle trips;
- before/after Edmonton measurements where available.

The City itself states that its active-transportation program is intended partly to reduce vehicle trips and traffic congestion, but **that policy statement by itself is not proof that every individual bike-lane project improves traffic**. citeturn230905search0

That distinction is exactly the sort of intellectual discipline that will make YEGFacts credible.

---

### 5. Speed Limits, Traffic Calming and Road Safety

Another high-frequency comment-section argument with measurable outcomes.

Edmonton currently has a default 40 km/h limit on most residential and downtown streets and uses traffic-calming measures through its Vision Zero programs. citeturn837234search5turn837234search4

This page should distinguish:

**travel time → average speed → peak speed → collision frequency → collision severity.**

Otherwise people argue about different things while using the same word "works."

---

### 6. What Infill Can Actually Be Built in Edmonton

This is the natural "stop speculating, read the bylaw" page.

It should show actual diagrams:

- ordinary lot;
- corner lot;
- building envelope;
- setbacks;
- site coverage;
- maximum units;
- height;
- parking.

This one will need especially good freshness automation because Edmonton's infill rules are actively changing. The City's current material, for example, notes zoning changes taking effect in 2026 and describes the RS zone's rules for small-scale housing. citeturn239082search5

So I'd give this page something like:

```yaml
review_by: "2026-11-30"
```

rather than an annual review.

---

### 7. Infill, Sewers and Infrastructure Capacity

This is better than a simplistic page saying **"infill doesn't overload sewers."**

Sometimes infrastructure really **does** need upgrading.

The important factual point is that larger infill projects are subject to infrastructure review, including EPCOR water/sewer servicing and stormwater calculations, and Edmonton now explicitly funds some shared water, sanitary, storm, electrical and mobility upgrades where additional infrastructure is required. citeturn239082search0turn239082search1

So the short answer might be:

> **It depends on the location and project.** Infill does not automatically assume unlimited existing capacity; servicing requirements are reviewed, and some projects require upgrades to water, sewer, drainage, electrical or transportation infrastructure.

Very neutral, and much harder to attack.

---

### 8. The Municipal Cost of City Growth

I would **not** launch a page called:

> "Suburbs vs. Core Tax Subsidies"

yet.

It presupposes the conclusion and requires a fairly sophisticated attribution model.

Instead start with:

> **How does where Edmonton grows affect municipal costs?**

The City itself now describes outward growth as adding new roads, pipes and parks that must be built and maintained, and says using existing infrastructure more intensively can be more efficient over the long term. Edmonton is also updating its fiscal-impact modelling so Council can better account for the costs and revenues associated with growth. citeturn362418search4turn362418search0

Later, if you acquire defensible parcel-level revenue and lifecycle-cost data, YEGFacts can publish the stronger analysis.

---

### 9. Parking Requirements in Edmonton

Another near-perfect first-wave fact page.

Edmonton removed general minimum on-site vehicle parking requirements citywide in 2020. That does **not** prohibit parking. Owners and developers decide how much to provide, subject to remaining regulations such as accessible parking requirements; City development data cited on its current infill page says most developments still provide some parking. citeturn230905search1turn230905search6

Excellent social-share headline:

> **No minimum ≠ no parking.**

Without calling anybody wrong.

---

### 10. Where Edmonton's Property-Tax Money Goes

This becomes the foundational page that other articles link into.

Instead of creating separate rebuttals every time somebody says:

> "My taxes went up because of X"

you can show:

- operating vs capital;
- tax-supported vs utility;
- debt;
- grants;
- user fees;
- property-tax revenue;
- police;
- transit;
- roads;
- recreation;
- active transportation;
- debt servicing.

Edmonton publishes detailed operating and capital budget material that makes this unusually feasible from primary sources. citeturn362418search2turn362418search24

---

# 4. One structural change I strongly recommend

Don't make a YEGFacts page correspond one-to-one with an internet argument.

Make it correspond to a **stable factual question**.

Then aliases can point at it:

```yaml
aliases:
  - "15-minute-city"
  - "15-minute-prisons"
  - "district-travel-restrictions"
  - "climate-lockdowns"
```

Those aliases help search without ever appearing in the canonical page title.

Similarly:

```yaml
aliases:
  - "100-million-bike-lanes"
  - "bike-lane-budget"
  - "wasteful-bike-lanes"
```

can all resolve to:

**What Edmonton Actually Spends on Active Transportation**

This gives you excellent SEO/social-debate discoverability without allowing hostile framing to define the knowledge base.

## Recommended MVP taxonomy

I would keep the visible taxonomy extremely small:

```text
Transportation
Housing & Development
Growth & Planning
Budget & Taxes
```

Then use tags for everything else.

I would **not** create separate top-level categories for Cycling, Cars, Transit, Infill, Zoning, etc. Doing that too early encourages ideological silos and makes YEGFacts look like a collection of issue campaigns instead of a civic reference site.

The ten pages above are enough to establish the site's editorial identity: **specific question → short answer → Edmonton data → caveats → primary source**. That is the pattern I would standardize before writing any of them.

---

### user
think more about the positioning of this resource within the city residents, advocates, councillors, administration, classic media like tv/newsletters, social media, etc.
how to make this project successful? make it more authorative, independent, factual, popular

---

### assistant
I’m going to treat this as an institution-design problem, not just a content/SEO problem: who must trust YEGFacts, what would make each group use it, and what signals would make skeptics see it as independent rather than advocacy with better branding.

---

### assistant
[code] fast|Edmonton civic media Taproot Edmonton newsletter local news 2026|30|taprootedmonton.ca
fast|Edmonton Open Data portal city open data policy 2026|3650|edmonton.ca
fast|Edmonton City Council public reports open data budget civic engagement 2026|3650|edmonton.ca
fast|Edmonton local media CBC Edmon

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca open data Edmonton Open Data Portal policy civic data|3650|edmonton.ca
fast|site:taprootedmonton.ca Edmonton civic affairs newsletter city hall local news 2026|365|taprootedmonton.ca
fast|site:edmontonjournal.com Edmonton city hall local politics newsroom 2026|365|edmontonjourn

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|Taproot Edmonton The Pulse civic affairs newsletter about local journalism Edmonton|3650|taprootedmonton.ca
fast|Taproot Edmonton civic affairs agenda newsletter city hall|3650|taprootedmonton.ca
fast|Edmonton local newsletter city hall Taproot The Pulse 2026|365|taprootedmonton.ca
fast|Edmonto

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
The biggest risk is not factual accuracy; it is **selection bias**. If the first 20 pages mostly rebut anti-bike-lane, anti-infill, or anti-district-planning claims, skeptics will reasonably infer the site's political direction even if every sentence is sourced. The launch set and governance therefore need to demonstrate symmetry, not merely declare neutrality.

---

### assistant
[code] fast|University of Alberta Edmonton urban planning municipal research school urban regional planning 2026
fast|University of Alberta Edmonton municipal finance urban policy research 2026
fast|MacEwan University journalism Edmonton local media program 2026
fast|Edmonton Public Library civic engagemen

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:ualberta.ca urban planning Edmonton School of Urban Regional Planning faculty 2026|3650|ualberta.ca
fast|site:ualberta.ca Edmonton municipal policy urban planning research Alberta cities 2026|3650|ualberta.ca
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
A second important distinction: **“primary source” should not mean “the City says it, therefore it is true.”** A City bylaw is authoritative for what the rule is; a City project page is authoritative for what the City intends; but claims about outcomes—congestion, safety, fiscal efficiency, housing costs—need observed data, audits, calculations, or independent research. Edmonton already has a strong open-data ecosystem that makes that distinction practical.

---

### assistant
[code] open|turn276349search6
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
YEGFacts has a real opportunity because there is a missing layer in Edmonton's civic information ecosystem.

The City publishes enormous amounts of data and reports, but they are hard to interpret. Councillors explain issues well, but their explanations are politically attributable. Advocacy groups intentionally advocate. Traditional media covers controversies as they happen, but doesn't usually maintain a permanent evidence library. Social media has reach but terrible institutional memory.

YEGFacts should occupy the space **between the raw public record and the public debate**.

## The positioning I would aim for

> **YEGFacts is Edmonton's independent civic evidence library. It checks civic claims against public records, data and reproducible analysis.**

A possible tagline:

> **Edmonton civic claims, checked against the record.**

That is subtly different from calling yourself a "fact-checker."

I would actually reduce how prominently you market the **fact-checker** label. "Fact checker" implies an institution deciding who is right and wrong. "Civic evidence library" implies: *here are the records, here's the calculation, inspect it yourself.*

The fact-checking methodology remains underneath.

The ideal division of labour becomes:

| Institution | Its role |
|---|---|
| City administration | **What government says, does and records** |
| Councillors | **How elected representatives interpret it and what they think should happen** |
| Advocates | **What policy outcome they want** |
| Media | **What happened and why it matters today** |
| **YEGFacts** | **What the available evidence actually establishes** |

Do **not** try to replace Taproot, CBC, Global, CityNews, the Journal, councillor newsletters, or advocacy organizations. Become something they all link to.

That is a much more defensible niche.

Edmonton is unusually well suited for it. The City's Open Data portal contains hundreds of datasets plus Open Budget and Open Performance, and Edmonton explicitly frames open data as something residents can reuse to turn raw data into useful information. citeturn999053search12turn199053search2

There is also clearly an audience right now: Taproot's *Speaking Municipally* is covering detailed council issues weekly, including infill and active transportation, while Global covered another contentious bike-network council decision just four days ago, on August 26, 2026. citeturn199953search5turn999053search5

---

# One significant change I would make to your current framing

Your **personal North Star** can absolutely be:

> Make Edmonton the best city to live in regardless of whether you drive, walk, cycle, roll or take transit.

But I would **not put the stronger policy conclusions into the YEGFacts institutional mission**.

For example, this statement from the current concept:

> "Complete networks, 15-minute district amenities ... are necessary infrastructure investments, not luxury items."

is a policy position.

It may be a well-supported policy position, but once YEGFacts formally adopts it, someone skeptical of bike lanes can reasonably say:

> "The organization already decided what policy it wants. Of course its fact checks support it."

Instead, YEGFacts should be capable of publishing all of these:

> "Evidence supports this claim."

> "Evidence does not support this claim."

> "The City is technically correct, but this figure omits X."

> "The bike-lane advocate's claim overstates what the study found."

> "The opponent's claim is based on an incorrect denominator."

> "There isn't enough Edmonton-specific evidence to know."

That last answer—**we don't know**—will build tremendous credibility if you use it when appropriate.

---

# The most important thing: demonstrated neutrality

Do not ask people to believe that YEGFacts is neutral.

**Make them discover it.**

The International Fact-Checking Network's standards are an excellent blueprint even if you never formally join it. IFCN requires organizations to apply the same standards regardless of who made a claim, not disproportionately target one side, disclose interests, avoid taking policy positions on matters they fact-check, publish their methodology, disclose funding, show evidence both supporting and undermining a claim, and maintain an open corrections process. citeturn127024view0

I would build YEGFacts around essentially those rules from day one.

In particular:

1. **Change how topics are selected.** Publish a public scoring methodology: civic importance, prevalence of the claim, factual verifiability, Edmonton specificity, and availability of evidence. Never select a claim simply because you want to rebut it.

2. **Deliberately launch with conclusions that inconvenience multiple camps.** Your first 10–15 pages should include a few where the conclusion is favourable to active transportation/infill, a few where common urbanist arguments are overstated, some where City administration's framing needs qualification, and several where the answer is "mixed" or "depends." This would do more for independence than 20 paragraphs claiming to be non-partisan.

3. **Require a "What this evidence does NOT establish" section.** I like this even more than our previous "Important context" section. Someone reading a `$100M bike network = 2% of transportation capital` page should also immediately see that the percentage alone does not answer whether the individual projects are good investments.

4. **Use sources according to what they can establish.** A bylaw is definitive evidence of what the law says. A City budget is strong evidence of what is budgeted. A City webpage saying a project "reduces congestion" establishes the City's rationale—not that it actually reduced congestion. Outcome claims should use measurements, audits, independent research and reproducible calculations.

5. **Make calculations reproducible.** Every derived figure should have a "Show calculation" button. Ideally a journalist can see `numerator / denominator`, download the source CSV and reproduce your chart. GitHub is valuable here, but remember that most residents will never visit GitHub. The website itself needs to expose this transparency.

6. **Introduce two-stage review.** Important pages should eventually have an evidence/domain reviewer plus an editorial/methodology reviewer. For especially contentious pages, deliberately ask someone likely to challenge the draft to perform an adversarial review. Their job isn't to approve the policy conclusion; it is to find weak assumptions.

7. **Make substantive revisions impossible to hide.** Every page should say `Last verified`, show a human-readable revision history, and visibly mark significant corrections. IFCN explicitly treats transparent correction practices as a core requirement of credible fact checking. citeturn127024view0

8. **Disclose money and conflicts beyond what seems necessary.** Publish who operates YEGFacts, legal structure, funding, large donors, affiliations, and conflict rules. IFCN expects disclosure of sources representing at least 5% of revenue and clarity about who exercises editorial control. citeturn127024view0

9. **Keep the official social accounts boring.** No dunking on councillors, quote-tweeting bad takes, sarcasm, election endorsements, "look how stupid this claim is," or cheering council votes. Post new evidence, corrections, updated figures and links. The more provocative the website's users become, the more restrained the institution itself should be.

10. **Treat challenges as a feature.** Don't label the button merely "Report an error." Use something like **"Challenge this conclusion"**. Publish the challenge where possible, evidence submitted, response and eventual change/no-change. A page that survives serious public challenges becomes more authoritative over time.

The Trust Project has reached essentially the same conclusion for journalism: visible information about methods, sources, ownership, expertise, corrections, diverse perspectives and actionable reader feedback increases people's ability to assess trustworthiness. citeturn276349search1turn276349search2

---

# How each Edmonton audience should perceive YEGFacts

| Audience | What you want them thinking |
|---|---|
| **Ordinary residents** | "I don't need to read a 190-page City report. This tells me the answer and lets me check it." |
| **Reddit/Facebook/X users** | "This is easier to link than arguing for 20 comments." |
| **Urbanist / transit / cycling advocates** | "I can cite this instead of citing an advocacy organization, and it will carry more weight." |
| **Anti-infill / tax / road-capacity advocates** | "I don't agree with everything this site concludes, but I can challenge the analysis and it doesn't misrepresent the source." |
| **Councillors** | "I can safely link this because it isn't another councillor's political website." |
| **City administration** | "They may criticize our interpretation, but they understand our data and correct errors when we point them out." |
| **Journalists** | "Someone has already found the report, checked the denominator, made the chart and documented the methodology." |
| **Academics / researchers** | "The simplification is responsible and the analysis is reproducible." |

That second-last one is particularly important.

### Think of YEGFacts as a public research desk for local media

A TV reporter may have hours, not days, to cover:

> Council spends $100M on bike lanes.

YEGFacts should let them immediately obtain:

**$100M**  
**X-year period**  
**Y% of relevant capital spending**  
**$Z annual operating impact**  
**Source: approved City budget, page 123**  
**Calculation**  
**Download chart**

That's enormously valuable.

And unlike a newspaper article, YEGFacts keeps maintaining the number.

---

# Do not become too close to City Hall

The City should be one of YEGFacts's most important relationships—but **not its parent or validator**.

Edmonton's own Open City philosophy encourages citizens to reuse government information and participate in making it useful. citeturn199953search19turn999053search7

I would therefore establish a good relationship with the City's Open Data team and relevant analysts. Ask questions like:

> Which dataset should be considered authoritative?

> What does this field mean?

> Has this methodology changed?

> Is there a more complete dataset?

But never:

> Can you approve our article before we publish it?

Administration should have the same correction mechanism as everybody else.

Likewise, **don't launch YEGFacts through one councillor**.

If Aaron Paquette or Michael Janz enthusiastically promotes it first, you've potentially lost part of your intended audience before they read a page.

When you have a solid initial release, send it simultaneously to **every councillor's office**, administration, major local newsrooms and relevant community organizations. Ask them to **challenge inaccuracies**, not endorse the project.

The strongest eventual credibility signal would be something like:

> Janz links YEGFacts on one issue.  
> A councillor who often disagrees with Janz links it on another.  
> A journalist cites it.  
> A community league challenges a figure.  
> YEGFacts corrects it publicly.

At that point independence becomes observable behaviour rather than branding.

---

# Advocacy groups should contribute—but not own it

Organizations such as Paths for People already explicitly identify themselves as advocates and campaign for particular active-transportation policies. citeturn370248search0turn370248search3

That's useful. Advocacy organizations can give you:

- claims that need checking;
- datasets;
- expertise;
- research;
- reviewers;
- community reach.

But YEGFacts should never become their "neutral website."

The same rule should apply to homeowner/infill organizations, developer organizations, taxpayer groups, unions, business associations and other interested parties.

They can submit evidence.

They cannot buy conclusions.

And their relevant interest gets disclosed when their evidence is used.

---

# Build local institutional credibility

There are several obvious Edmonton communities from which to recruit **individual contributors and reviewers without turning them into organizational sponsors**.

The University of Alberta now has substantial urban-policy expertise. Its Cities Institute explicitly brings together more than 50 researchers across areas including housing, transportation, infrastructure and urban economics; the School of Urban and Regional Planning also has researchers working specifically on municipal finance, housing, transportation and governance. citeturn829086search11turn829086search0turn829086search7

MacEwan has a journalism program focused on research and reporting. citeturn370248search13

BetaCityYEG is still operating in 2026 as a citizen-led civic-tech community intended to connect people with technology projects that improve Edmonton. citeturn370248search8

Edmonton Public Library explicitly supports open-data literacy and runs Open Data Day programming. citeturn370248search1

Those are potentially much better contributor-seeding environments than starting exclusively inside Edmonton's urbanist community.

A reviewer roster containing, say, a transportation researcher, municipal-finance researcher, civil engineer, journalist, statistician, community-league participant and accessibility specialist looks fundamentally different from:

> "Seven people who all belong to the same advocacy network."

They don't even need to agree with one another.

That's desirable.

---

# Open source helps, but it is not enough

To developers:

> GitHub + PRs + history = transparent.

To most Edmontonians:

> GitHub = something programmers use.

The **website itself** therefore needs trust indicators.

A reader shouldn't have to understand Git to see:

**Last verified:** Aug 27, 2026  
**Evidence reviewer:** Jane Smith, transportation engineer  
**Editorial reviewer:** John Smith  
**Sources:** 7 primary, 2 independent  
**Calculations:** reproducible  
**Open challenges:** 1  
**Corrections:** 2  
**Next review:** Feb 2027

And then:

> View full history on GitHub

The repository is the audit trail; the website translates the audit trail.

---

# Independence also means financial independence

Initially, founder-funded and volunteer-run is probably actually an asset as long as you disclose it.

Once the project has traction, I would strongly consider turning YEGFacts into an independent Alberta nonprofit with a small board rather than leaving it permanently as one person's website.

I would avoid political-party, candidate and councillor-office funding entirely.

I would also be cautious about taking direct City funding early. IFCN explicitly recognizes that government funding does not automatically destroy independence where editorial separation is clear, but local perception matters just as much as formal independence. citeturn127024view0

Longer term, a healthier model is probably:

small individual donations + grants + institutional support with strong disclosure + no sponsored articles + no donor editorial rights.

The site should have a page called simply:

**Funding & Independence**

Not hidden in Terms & Conditions.

---

# Popularity requires a different strategy than authority

Authority gets people to trust the page.

**Utility gets them to share it.**

The product loop should be:

**Someone makes a claim → someone remembers YEGFacts → searches three words → gets a 15-second answer → copies it → everyone else sees YEGFacts.**

That means SEO and search terms matter enormously.

A neutral canonical page can still secretly understand hostile search language:

`15 minute prison Edmonton`

`Edmonton bike lanes 100 million`

`8 plex everywhere Edmonton`

`property tax bike lanes`

`Edmonton suburbs subsidized`

`why can't Edmonton clear snow`

All can land on neutrally titled evidence pages.

I would optimize the interface for **answer retrieval**, not browsing articles.

Homepage:

> **What are you trying to verify?**  
> `[ Search a claim, number or Edmonton issue ]`

Then perhaps:

**Being discussed now**

**Most shared**

**Recently verified**

**Recently corrected**

Your four taxonomy categories become secondary navigation.

---

# Media distribution could become the growth engine

Taproot is particularly interesting because *Speaking Municipally* already performs the adjacent task: it follows Edmonton City Council and explains context around decisions. citeturn199953search0

I wouldn't pitch Taproot:

> Please cover my new website.

I'd eventually pitch:

> We've built a reproducible data page for this week's zoning discussion. Every number links to the original City source and the chart/data are free to reuse with attribution.

Same with Global, CityNews, CBC, CTV, Edmonton Journal, community newsletters and councillor offices.

Make **their work easier**.

Coverage will follow if the resource repeatedly saves reporters time.

You could eventually provide an RSS/email feed specifically for journalists:

> **YEGFacts updated for Tuesday's Council meeting**
>
> 3 relevant evidence pages  
> 2 figures changed  
> 1 new City report incorporated

That is much more valuable professionally than a generic YEGFacts newsletter.

---

# What I would consider "success"

Don't primarily measure followers.

I'd watch four types of evidence:

**Authority:** journalists cite YEGFacts; academics/researchers review pages; councillors with substantially different views use it; City reports or public-hearing participants reference analyses.

**Independence:** corrections sometimes upset people who normally like the site; no political faction dominates contributors; verdicts include supportive, unsupported, mixed and uncertain conclusions.

**Utility:** Google queries land directly on the correct fact page; people frequently use Copy Summary; charts are downloaded/embedded; other sites deep-link individual facts.

**Institutional durability:** multiple people can review and publish; funding is diversified; stale pages are caught; corrections happen even when the founder isn't involved.

The ultimate signal would be hearing this in an Edmonton argument:

> "I don't really like YEGFacts' conclusion on X, but their sources are solid."

That's stronger than having everyone in one political community love it.

---

## What I would do before writing many more topic pages

I would temporarily prioritize the **institutional design over content volume**.

Before a public launch, I'd want YEGFacts to have roughly 10 excellent pages, but also a public methodology, source hierarchy, topic-selection rules, funding disclosure, conflict-of-interest policy, corrections policy, contributor identities, review system, public challenge mechanism and visible revision history.

And I would revise the initial 10 topics slightly so the launch itself **demonstrates independence**. In particular, I'd deliberately include two or three pages where popular claims made by *pro-density/pro-active-transportation* advocates receive a "mixed", "too broad", or "not established" conclusion.

That would be one of the most valuable credibility investments the project could make.

If you want, the next useful step is probably to design that **full trust/governance system and the launch topic set together**—including which initial YEGFacts pages should deliberately test claims from each direction rather than simply choosing ten neutral-looking titles.

I can also keep track of emerging Edmonton civic debates and identify claims that would be strong YEGFacts candidates as they appear.  
genui{"suggest_automation":{"label":"Track emerging Edmonton civic claims"}}

---

### user
> verdicts include supportive, unsupported, mixed and uncertain conclusions.

can you provide some examples of unsupported or uncertain conclusions that the initial version can have, something that goes against what city says and promises, for example
just want to understand via examples
what should be the tech stack for this? ideally it should be static, everything done as much as possible with AI (so it's neutral, not affected by my personal views, maybe this "made by AI" should be a differentiator, because AI can be told to be neutral and unbiased more than a human, it also makes the project work itself, without human intervention)

---

### assistant
The useful pattern is: YEGFacts should sometimes say **“the City’s stated goal is X, but the public evidence does not yet establish that X happened.”** That is a stronger neutrality signal than trying to manufacture a “both sides” balance.

---

### assistant
[code] fast|site:edmonton.ca "reduce traffic congestion" active transportation Edmonton|3650|edmonton.ca
fast|site:edmonton.ca Edmonton zoning affordability housing choices "affordability"|3650|edmonton.ca
fast|site:edmonton.ca Edmonton infill "existing infrastructure" cost efficient|3650|edmonton.ca
fast|

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca Edmonton "Open Option Parking" monitoring 2021 report Council impacts shared parking|3650|edmonton.ca
fast|site:edmonton.ca Edmonton open option parking evaluation after 2020 parking utilization report|3650|edmonton.ca
fast|site:edmonton.ca Edmonton "parking" "2021" "Open Optio

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca Edmonton 2025 traffic fatalities serious injuries annual report Vision Zero 2025|3650|edmonton.ca
fast|site:edmonton.ca Edmonton safe mobility annual report 2024 2025 fatalities serious injuries|3650|edmonton.ca
fast|site:edmonton.ca Edmonton "fatalities" "serious injuries" "20

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca 2025 2026 Parks Roads Annual Service Plan snow ice service standard "negative" Edmonton|3650|edmonton.ca
fast|site:edmonton.ca 2025 2026 snow ice control service plan Edmonton priority 1 2 3 performance|3650|edmonton.ca
fast|site:edmonton.ca "2025-2026" "Snow and Ice Control" E

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
On the AI part, I would **not** make “AI is unbiased” the differentiator. That claim is too easy to attack and not really defensible. The stronger differentiator is: **AI does the research and drafting, but every conclusion is constrained by a public, machine-checkable evidence process.** Neutrality comes from the protocol, not from assuming the model has no biases.

---

### assistant
[code] fast|Astro content collections schema zod official docs 2026|365|docs.astro.build
fast|Astro static site output official docs content collections MDX|365|docs.astro.build
fast|Pagefind static search official docs|365|pagefind.app
fast|Cloudflare Pages static site GitHub deploy official docs|365|deve

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:pagefind.app docs static search Pagefind indexes static site|3650|pagefind.app
fast|site:docs.github.com actions schedule cron workflow official|3650|docs.github.com
fast|site:data.edmonton.ca "Open Government Licence" Edmonton open data|3650|data.edmonton.ca
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:docs.github.com/en/actions workflow syntax schedule cron GitHub Actions|3650|docs.github.com
fast|site:docs.github.com actions pull request protected branch required reviews CODEOWNERS|3650|docs.github.com
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca Edmonton 50% trips active transportation transit target current mode share 2025|3650|edmonton.ca
fast|site:edmonton.ca Edmonton City Plan 50 percent trips transit active transportation progress 2025|3650|edmonton.ca
fast|site:edmonton.ca Edmonton mode share 2024 2025 transit wa

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca Edmonton 2024 greenhouse gas inventory 2025 35% reduction target achieved|3650|edmonton.ca
fast|site:edmonton.ca Edmonton community emissions 2024 2025 target 35 percent 2005|3650|edmonton.ca
fast|site:edmonton.ca "35 per cent reduction by 2025" Edmonton emissions progress|3650

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:data.edmonton.ca API Socrata Edmonton Open Data SODA API|3650|data.edmonton.ca
fast|site:support.socrata.com Edmonton open data API data.edmonton.ca|3650
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
Yes. I think there are several very good examples where YEGFacts could say, in effect, **“this is what the City says the policy will accomplish; the available evidence does not yet establish that it has accomplished it.”**

That is probably one of the most important roles for the site.

## 1. Examples that would demonstrate genuine independence

I would slightly change the verdict vocabulary. Instead of `Unsupported`, use **Not established**. “Unsupported” sounds close to “false,” while you often mean “there isn't enough evidence to make that conclusion.”

A useful set:

**Supported · Partially supported · Not established · Contradicted · Inconclusive**

Here are realistic Edmonton examples.

| Claim to examine | Possible YEGFacts verdict | Why |
|---|---|---|
| **“Expanding Edmonton's active transportation network reduces traffic congestion.”** | **Not established — Edmonton-specific outcome** | The City explicitly lists reduced congestion as a benefit. But the $100M expansion is still under construction through 2027, and the City's page does not establish a causal before/after congestion reduction attributable to the network. citeturn867270search2turn167178search5 |
| **“The active transportation expansion is reducing Edmonton's GHG emissions.”** | **Not established — measured outcome** | The City's carbon budget models active-transportation capacity as producing emissions reductions, but that is a modelling assumption, not the same thing as measuring how many vehicle trips were actually displaced and the resulting emissions reduction. citeturn867270search44 |
| **“Removing parking minimums gives Edmonton the ‘right amount’ of parking.”** | **Inconclusive** | The City says letting owners decide is more likely to produce the right amount and lists affordability and fiscal benefits. That's a hypothesis about market behaviour. The City's current page even still references monitoring impacts and reporting to Council. The empirical post-2020 result deserves its own examination. citeturn775965search0 |
| **“Removing parking minimums has made Edmonton housing more affordable.”** | **Not established** | Parking stalls can be expensive and removing a mandatory cost can make projects cheaper, but “project costs are lower” is not equivalent to “Edmonton rents/home prices fell because of this policy.” The City itself acknowledges housing affordability depends on many factors beyond zoning. citeturn619063search0turn619063search6 |
| **“Edmonton is making steady progress toward Vision Zero.”** | **Mixed / current trend is not clearly improving** | Edmonton remains below 2015 levels, which is real progress. But the City's 2024 reporting says overall fatalities and serious injuries were roughly unchanged from 2023, fatalities had been increasing since 2022, and pedestrian fatalities/serious injuries increased. That's exactly the kind of nuanced YEGFacts conclusion you want. citeturn867270search38 |
| **“Edmonton is on track to achieve its climate targets.”** | **Contradicted** | This is especially powerful because the City's own data says so. The 2026 budget reports 2024 community emissions of 15.2 MtCO₂e versus a 12.2 Mt target and explicitly says Edmonton is not on track for its 2025, 2030 or 2050 targets. citeturn712588search18 |
| **“Growing inside existing neighbourhoods saves the City money.”** | **Partially supported / exact savings not established** | Reusing existing infrastructure has an obvious cost advantage in some circumstances, and the City makes that argument. But Edmonton is simultaneously updating its fiscal-impact model specifically to better incorporate the costs **and revenues** of growth. YEGFacts should resist turning the general principle into an unsupported "$X saved per infill home" conclusion. citeturn619063search3turn619063search7 |
| **“Current investments will get Edmonton to 50% of trips by transit/walking/cycling.”** | **Inconclusive / projection, not demonstrated** | The City's target is 50%; its published baseline was about 23% in 2020. Its own Open Performance page says mode share has been relatively stable for decades and that transformative approaches will be required. It expects current investments to improve mode share, but that is a forecast. citeturn167178search0turn167178search25 |

That is the sort of balance I meant.

### The active-transportation example is particularly important

The City currently says:

> active transportation "reduces vehicle trips and traffic congestion"

and lists **reduce traffic congestion** as a benefit of the $100M expansion. citeturn619063search2

YEGFacts should separate three different propositions:

**A. Can active transportation reduce car trips?**  
Supported in principle.

**B. Can fewer car trips reduce congestion?**  
Supported in principle.

**C. Has Edmonton's $100M expansion measurably reduced congestion by X amount?**  
Not yet established from the evidence cited by the City.

That is not anti-bike-lane. It's just epistemically precise.

And if Edmonton publishes a strong controlled before/after study in 2029, the verdict changes.

That's exactly how the site should work.

---

# 2. I would actually add 2–3 of these to the launch

Your original launch subjects skew slightly toward answering objections to City/urbanist policy.

I would deliberately add:

### `/climate-targets`

**Is Edmonton On Track to Meet Its Climate Targets?**

Current answer:

> **No.** Edmonton's latest published community emissions are above its planned reduction trajectory. The City's own 2026 budget says Edmonton is not currently on track for its 2025, 2030 or 2050 community emissions targets. citeturn712588search18

That's a very strong credibility page.

### `/vision-zero-progress`

**Is Edmonton Making Progress Toward Vision Zero?**

Answer:

> **Mixed.** Fatalities and serious injuries remain below their 2015 level, but recent progress has stalled: 2024 was similar to 2023 overall, fatalities have increased since 2022, and serious pedestrian outcomes worsened in 2024. citeturn867270search38

Also excellent.

### `/bike-network-congestion`

**Has Edmonton's Bike Network Reduced Traffic Congestion?**

Answer:

> **Not yet established.** The City identifies congestion reduction as an intended benefit of active transportation, but the currently published program material does not quantify a causal congestion reduction produced by the network expansion. The major expansion program is also still under construction through 2027. citeturn867270search2

Now someone browsing YEGFacts can't reasonably say:

> "It just repeats City administration talking points."

Sometimes it verifies them. Sometimes it qualifies them. Sometimes the City's own measurements contradict the goal.

---

# 3. About making AI the differentiator

I like **AI doing almost all of the work**.

I don't like this positioning:

> **AI is neutral and unbiased, unlike humans.**

I don't think you can defend that statement.

Models can inherit biases from training data, search results, source selection and prompts. An AI can also very confidently convert "the City says this project will reduce congestion" into "the project reduces congestion" unless your process explicitly prevents it.

The much stronger proposition is:

> **YEGFacts uses AI to continuously research and challenge civic claims against public evidence. Every conclusion must be traceable to its sources and reproducible analysis.**

Or shorter:

> **AI-researched. Evidence-checked. Open source.**

That is genuinely interesting.

### AI should be the labour, not the authority

The authority should come from:

```text
claim
  ↓
source
  ↓
evidence
  ↓
calculation
  ↓
counter-evidence
  ↓
conclusion
```

Every link should be inspectable.

Then it doesn't really matter whether a human or AI wrote the paragraph.

---

# 4. You can make it nearly autonomous

I would build an actual **AI editorial pipeline**.

Something like:

```text
                    ┌─────────────────┐
                    │ Claim / Topic   │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ Research Agent  │
                    │ Find evidence   │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ Source Classifier│
                    │ What can each   │
                    │ source prove?   │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ Evidence Table  │
                    │ Facts only      │
                    └────────┬────────┘
                             ↓
              ┌──────────────┴──────────────┐
              ↓                             ↓
      ┌───────────────┐             ┌───────────────┐
      │ Support Agent │             │ Challenge Agent│
      │ Best evidence │             │ Find weaknesses│
      │ for claim     │             │ / contrary data│
      └───────┬───────┘             └───────┬───────┘
              └──────────────┬──────────────┘
                             ↓
                    ┌─────────────────┐
                    │ Synthesis Agent │
                    │ Assign verdict  │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ Deterministic   │
                    │ CI validators   │
                    └────────┬────────┘
                             ↓
                         YEGFacts
```

The important part is that the **Challenge Agent is mandatory**.

It gets a prompt approximately equivalent to:

> Assume the draft conclusion is misleading. Find the strongest primary-source evidence against it. Check denominators, dates, causation vs correlation, geographic applicability, missing context and whether cited sources actually establish the claim.

Then another model judges both.

Ideally use **different model families** for the researcher and adversarial reviewer so one model's tendencies don't simply reinforce themselves.

---

# 5. Don't let AI reason directly from arbitrary webpages

Give sources explicit authority levels.

Something like:

```yaml
source_types:
  legal:
    weight: 100
    examples:
      - bylaw
      - provincial legislation

  audited:
    weight: 100
    examples:
      - audited financial statement
      - city auditor report

  observed_data:
    weight: 95
    examples:
      - Edmonton Open Data
      - Statistics Canada
      - Alberta government dataset

  analytical_report:
    weight: 85
    examples:
      - council report
      - engineering study
      - peer-reviewed research

  policy_document:
    weight: 70

  city_webpage:
    weight: 50

  media:
    weight: 20

  advocacy:
    weight: 10
```

Not literally because `100 > 85` always means "more true"; rather it tells the agent **what a source is capable of establishing**.

For example:

### City project webpage

> "The bike network will reduce congestion."

Can establish:

**City claims congestion reduction is an intended benefit.**

Cannot establish:

**Congestion was reduced.**

### Edmonton Open Data before/after traffic counts

Can potentially establish:

**Vehicle volumes changed.**

Still doesn't automatically establish:

**Bike infrastructure caused the change.**

That distinction is where AI-based YEGFacts could become unusually good.

---

# 6. Recommended tech stack

I think there's a clear winner.

## **Astro + TypeScript + MDX + Cloudflare Pages**

I would choose Astro over Next.js or VitePress.

Astro defaults naturally to static output, and its Content Collections are specifically designed for structured Markdown/MDX content. Current Astro supports Zod-backed schemas and completely static build-time routes. citeturn132733search0turn132733search2

My stack would be:

| Layer | Choice |
|---|---|
| Site generator | **Astro** |
| Language | **TypeScript, strict** |
| Content | **Markdown / MDX** |
| Schema | **Astro Content Collections + Zod** |
| Styling | **Tailwind CSS** |
| Search | **Pagefind** |
| Charts | **Vega-Lite**, rendered to SVG at build time |
| OG images | **Satori + Resvg**, generated at build |
| Repository | **GitHub** |
| CI/automation | **GitHub Actions** |
| Hosting | **Cloudflare Pages** |
| Raw municipal data | **Edmonton Open Data API + committed derived datasets** |
| AI | Provider-independent agent scripts |
| Backend | **None for MVP** |

Pagefind is particularly appropriate: it creates its index after the static site is built and ships the search entirely with the static files—there is no search server. It also supports filters, which fits your topic/verdict/source filtering very well. citeturn290209search1turn290209search6

Cloudflare Pages can deploy the static output directly from GitHub and gives you automatic preview deployments for branches/PRs. citeturn132733search1turn132733search3

So the production architecture is almost comically simple:

```text
GitHub
  ↓
Astro build
  ↓
Static HTML/CSS/JS
  ↓
Cloudflare CDN
  ↓
YEGFacts.ca
```

No database.

No CMS.

No application server.

No API required for visitors.

---

# 7. The repository could look like this

```text
yegfacts/
├── src/
│   ├── content/
│   │   └── facts/
│   │       ├── climate-targets.mdx
│   │       ├── vision-zero-progress.mdx
│   │       └── active-transportation-cost.mdx
│   │
│   ├── data/
│   │   ├── sources/
│   │   │   ├── climate-targets.yaml
│   │   │   └── bike-network.yaml
│   │   │
│   │   ├── derived/
│   │   │   └── ...
│   │   │
│   │   └── charts/
│   │       └── ...
│   │
│   ├── components/
│   ├── layouts/
│   └── content.config.ts
│
├── research/
│   ├── climate-targets/
│   │   ├── evidence.json
│   │   ├── challenge.json
│   │   └── synthesis.json
│   └── ...
│
├── scripts/
│   ├── ai/
│   │   ├── research.ts
│   │   ├── challenge.ts
│   │   ├── synthesize.ts
│   │   └── refresh.ts
│   │
│   ├── data/
│   └── validate/
│
├── prompts/
│   ├── researcher.md
│   ├── adversarial-reviewer.md
│   └── editor.md
│
└── .github/
    └── workflows/
        ├── validate.yml
        ├── deploy.yml
        └── refresh-facts.yml
```

Importantly, **the prompts themselves are open source**.

Someone skeptical of YEGFacts can inspect:

> What exactly are you telling the AI?

That's an interesting differentiator.

---

# 8. Make AI's intermediate work public

This could be one of YEGFacts' best features.

Every article gets:

**How this conclusion was reached**

```text
Claim
"Edmonton is on track to meet its 2025 climate target."

Evidence reviewed
14 sources

Primary sources
8

Evidence supporting claim
2

Evidence challenging claim
5

Neutral/contextual
7

Verdict
Contradicted

Confidence
High
```

Then:

**View AI research record**

And the user can inspect an evidence table:

| Evidence | Effect | Source |
|---|---|---|
| Target: −35% by 2025 | Context | Energy Transition Strategy |
| 2024 emissions: 15.2 Mt | Against | 2024 GHG Inventory |
| 2024 target: ≤12.2 Mt | Against | Carbon Budget |
| City says not on track | Against | 2026 Budget |

This is far more persuasive than:

> GPT-7 says this is false.

---

# 9. Deterministic code should do all arithmetic

This is important.

**Never ask the LLM to calculate important numbers.**

For example:

```ts
const share =
  activeTransportationBudget /
  totalTransportationCapitalBudget;
```

The AI decides whether the calculation is relevant.

Code calculates it.

CI tests it.

The page displays:

```text
$100M ÷ ~$5B = ~2%
```

And there's:

**Show calculation**

This also makes the analysis reproducible.

For municipal datasets, Edmonton's Open Data portal explicitly exposes an API, and its datasets are made available under Edmonton's Open Government Licence. citeturn634558search0turn290209search3

So automated refreshes can be excellent.

---

# 10. Automation can keep the whole resource alive

GitHub Actions can run scheduled workflows, including timezone-aware cron schedules. citeturn198455search0

For example, every Sunday:

```text
1. Find pages whose source URLs changed.
2. Query relevant Open Data datasets.
3. Check pages approaching review_by.
4. Ask AI whether the new evidence materially affects a fact.
5. Recalculate derived values.
6. Run adversarial review again.
7. Generate updated Markdown.
8. Open a PR.
9. Generate preview deployment.
```

That means your involvement can become extremely small.

---

# 11. How much should actually publish without a human?

I would classify changes.

### Level A — fully autonomous

Things like:

> Property-tax budget changed from $X to $Y.

> 2025 traffic count released.

> Page's `last_verified` date updated because all sources remain identical.

> Chart regenerated from official dataset.

AI + deterministic checks can publish these automatically.

### Level B — probably autonomous after strong safeguards

Things such as:

> A new annual dataset changes the trend from −5% to −3% but doesn't change the conclusion.

Require two-model agreement + all validation checks.

### Level C — don't auto-publish initially

Anything that changes:

> **Supported → Contradicted**

or introduces a new causal conclusion like:

> "Bike lanes caused congestion."

Have the AI prepare the entire PR, evidence analysis and draft.

A human clicks **Merge**.

That's practically zero work while preserving a critical accountability boundary.

GitHub branch protections can enforce exactly that kind of approval requirement. citeturn198455search2

---

# 12. This is where I'd modify the "made by AI" idea

I wouldn't put:

> **The world's first unbiased AI civic fact checker**

on the homepage.

It creates an unnecessary claim you now have to defend.

I'd use something like:

> **Open civic facts for Edmonton**  
> Public records, open data and reproducible analysis.

Then a visible trust badge:

**AI-assisted · Open-source · Fully cited**

Clicking **AI-assisted** explains:

> YEGFacts uses AI agents to research civic claims, search for contradictory evidence, monitor primary sources and draft updates. Numerical analysis is performed by reproducible code. The AI's prompts, evidence and revision history are public.

That sounds technologically interesting **and** credible.

Over time, if the autonomous pipeline proves itself, you could go further:

> **Continuously maintained by AI, governed in public.**

I actually think that could become a meaningful differentiator.

---

## My preferred architecture in one sentence

**Astro/MDX static site + structured source/evidence registry + Edmonton Open Data ingestion + deterministic TypeScript calculations + two-agent AI research/adversarial-review pipeline + GitHub Actions + Cloudflare Pages.**

The website stays almost entirely static while the **repository behaves like an automated newsroom/research institution**.

And I think the most interesting version of YEGFacts is no longer just an Edmonton website. If you get the evidence schema + AI editorial pipeline right, **YEGFacts becomes the first deployment of a reusable open-source civic fact-checking engine**. The Edmonton-specific content is just the first implementation. memcite

---

### user
I can also use multiple agents (claude, chatgpt, gemini) to do the work and then get to conclusion, kinda like different opinions... all prompts will be public, each article should have one-line, one-paragrpha, tldr sections so people can go deeper if they want but can stop at the top if what they read satisfied them.

we should also provide a functionality for people to suggest new topics

---

### assistant
[model_editable_context] {'content_type': 'model_editable_context', 'model_set_context': ''}

---

### assistant
Yes. That makes the concept substantially stronger. I would explicitly design YEGFacts as a **multi-model evidence-review system**, not as “an AI that gives answers.”

The distinction matters:

> **Several independent AI models examine the same civic question, using the same public evidence rules. Their findings, disagreements, sources, prompts, and final synthesis are public.**

That is a compelling differentiator.

## Multi-agent review should not be simple majority voting

I would use Claude, ChatGPT, Gemini, and potentially others, but avoid:

> ChatGPT: Yes  
> Claude: Yes  
> Gemini: No  
> Therefore: Yes

Three models can repeat the same mistake.

Instead, give them partially different roles and make some stages **blind to the others' conclusions**.

```text
              CIVIC QUESTION
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       ChatGPT    Claude    Gemini
       research   research   research
          │         │         │
          └─────────┼─────────┘
                    ▼
             EVIDENCE REGISTRY
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Support    Skeptic    Source
       reviewer   reviewer   auditor
          │         │         │
          └─────────┼─────────┘
                    ▼
               SYNTHESIS
                    │
                    ▼
              FINAL VERDICT
```

The initial researchers should independently answer things like:

- What precisely is the claim?
- What evidence supports it?
- What evidence contradicts it?
- Which claims are factual versus predictions or value judgments?
- What does each source actually establish?
- Is there Edmonton-specific evidence?
- Are there confounding factors?
- What evidence would change the conclusion?

Then another model gets the combined **evidence**, not simply the other agents' prose, and synthesizes it.

### One model should explicitly try to break the conclusion

For every article:

> You are the adversarial evidence reviewer. Assume the proposed conclusion may be misleading. Find missing evidence, incorrect denominators, inappropriate causal claims, stale data, cherry-picked periods, contradictory primary sources, and alternative explanations.

This should be mandatory.

The public site could display:

**AI review**

| Reviewer | Conclusion |
|---|---|
| ChatGPT | Partially supported |
| Claude | Not established |
| Gemini | Partially supported |
| Adversarial review | Important qualification identified |
| **Final synthesis** | **Partially supported** |

Then below:

> **Why they disagreed**

That could be extremely useful.

If all three agree, that's informative.

If they disagree, **that's potentially even more informative**.

---

# Don't hide disagreement

This could become a distinctive YEGFacts feature.

Instead of forcing certainty:

### Evidence agreement: Moderate

> Two reviewers concluded the evidence partially supports the claim. One concluded that Edmonton-specific evidence remains insufficient. The disagreement concerns whether evidence from comparable North American cities can be generalized to Edmonton.

That's excellent civic information.

You could even have:

**Model agreement**

`●●○ Moderate`

But I'd avoid turning it into a gimmicky "3 AIs vote TRUE" score.

The important part is **why** they disagree.

---

# Public prompts: absolutely

I'd put every system prompt in `/prompts`.

For example:

```text
/prompts
  research.md
  evidence-audit.md
  adversarial-review.md
  synthesis.md
  copy-editor.md
  source-refresh.md
```

And each page could show:

> **How this article was produced**
>
> Reviewed independently by ChatGPT, Claude and Gemini  
> 13 sources considered  
> 8 primary sources  
> 2 material disagreements  
> Last AI review: Aug. 31, 2026  
>
> [View evidence] [View prompts] [View GitHub history]

I would expose the **structured findings and evidence**, rather than trying to publish models' hidden internal reasoning.

The reproducible artifact should be things like:

```json
{
  "claim": "...",
  "conclusion": "partially-supported",
  "supportingEvidence": [],
  "contradictingEvidence": [],
  "limitations": [],
  "confidence": "moderate"
}
```

That is much easier to audit anyway.

---

# Your progressive-disclosure idea is exactly right

I would make every article follow the same reading hierarchy.

## Level 0: Answer

One sentence.

> **No. Edmonton's district plans do not restrict residents from travelling outside their district.**

Someone arguing on Facebook may stop there.

---

## Level 1: Short answer

One paragraph, perhaps 70–120 words.

> Edmonton's district plans guide land use, transportation, housing and amenities, but they do not create travel restrictions or require residents to remain within their district. The City's adopted policy explicitly preserves travel throughout Edmonton. The “15-minute” concept describes an accessibility goal—making more everyday destinations available nearby—not a boundary on movement.

This should contain enough nuance that it can safely be copied without the rest of the article.

Button:

**Copy short answer + source**

---

## Level 2: TL;DR

Maybe 3–5 statements:

> **TL;DR**
>
> - Edmonton has 15 planning districts.
> - District boundaries do not restrict movement.
> - Residents can travel between districts by any mode.
> - The policy aims to make more everyday destinations available nearby.
> - There is no mechanism in the policy for individual travel monitoring.

This is where many curious readers stop.

---

## Level 3: Evidence

Now get serious.

```text
What the policy says
What the data says
Evidence supporting the claim
Evidence challenging the claim
What we don't know
What this evidence does NOT establish
```

Charts, maps, methodology, comparisons.

---

## Level 4: Audit trail

For nerds, journalists, researchers, councillors:

```text
Primary sources
Datasets
Calculations
AI reviews
Agent disagreements
Prompt versions
Git commits
Correction history
Download data
```

That's an excellent information architecture because **the same URL works for somebody on Facebook and a CBC journalist checking your work**.

---

# I'd make the one-line answer highly shareable

Each level should have its own permanent anchor:

```text
yegfacts.ca/15-minute-districts
yegfacts.ca/15-minute-districts#short
yegfacts.ca/15-minute-districts#tldr
yegfacts.ca/15-minute-districts#evidence
yegfacts.ca/15-minute-districts#sources
```

Buttons:

**Copy one-line answer**

**Copy short answer**

**Copy link to evidence**

And the copied text could automatically be:

> Edmonton's district plans do not restrict where residents can travel.  
> Source and evidence: YEGFacts.ca/15-minute-districts

Very low friction.

---

# Topic suggestions should be a major part of the product

Not something hidden in GitHub.

I'd put this prominently in the header:

**Suggest a fact to check**

And probably another CTA after every article:

> **Seen another Edmonton claim worth checking?**
>
> Suggest it to YEGFacts.

The form should be extremely simple.

### Suggest a topic

**What claim should we check?**

```text
"Edmonton spends more on bike lanes than potholes."
```

**Where did you encounter it?** *(optional)*

```text
Facebook / Reddit / councillor statement / news article / conversation
```

**Link** *(optional)*

```text
https://...
```

**Anything else we should know?** *(optional)*

Then:

**Submit**

Don't ask the user to classify it or provide evidence.

The AI can do that.

---

# This can still remain almost entirely static

For GitHub users:

> **Submit through GitHub**

opens an Issue Form.

But that's inadequate for normal residents.

I would add one tiny dynamic endpoint:

```text
POST /api/topic-suggestions
```

Cloudflare Pages Functions/Workers could handle it.

It could:

1. validate CAPTCHA/Turnstile;
2. rate-limit spam;
3. strip personally identifying information if unnecessary;
4. create a GitHub issue via a bot;
5. return a public suggestion ID.

So your actual application remains 99.9% static.

No database needed.

The public backlog itself can be GitHub Issues.

---

# Even better: make the suggestion backlog public

Create:

### Topics requested by Edmontonians

```text
Suggested                         Requests    Status
──────────────────────────────────────────────────────
Property taxes vs inflation          47       Researching
Snow clearing residential roads      32       Accepted
Bike lanes and congestion             29       Evidence review
Infill and sewer capacity             24       Published
Valley Line travel times              18       Needs evidence
```

People can vote:

**I want this checked too**

This gives YEGFacts several advantages.

### 1. Topic selection becomes less founder-driven

This is important for your neutrality problem.

You can say:

> 47 residents requested this question.

rather than:

> I decided this argument needed rebutting.

### 2. You discover what people actually argue about

You may find that the most useful topics aren't the ones urban-policy enthusiasts expect.

### 3. It creates recurring engagement

People come back to see:

> Did they investigate my question?

### 4. The backlog itself becomes interesting civic data

Eventually:

> **Most questioned Edmonton claims this month**

could be a YEGFacts feature.

---

# AI can triage incoming suggestions

Suppose 15 people submit:

```text
"$100m for bike lanes"
"city blew 100 million on bikes"
"why bikes get 100m"
"bike lane cost"
"100m active transport"
```

AI recognizes them as one topic:

**What Edmonton Actually Spends on Active Transportation**

and increments:

```yaml
requests: 15
```

It can also classify:

```yaml
category: transportation
claim_type: fiscal
researchability: high
primary_sources_available: true
duplicate_of: active-transportation-cost
```

The backlog becomes largely self-maintaining.

---

# I'd expose why topics are prioritized

For example:

### Why we're checking this

```text
Community requests        34
Civic impact              High
Factual verifiability     High
Primary evidence          Strong
Existing YEGFacts page    No
```

Then a transparent prioritization formula:

```text
priority =
  communityDemand
  × civicImportance
  × verifiability
  × evidenceAvailability
```

Not literally necessarily multiplication, but a published scoring system.

Again, **process replaces claims of neutrality**.

---

# You could also let people challenge published facts

I'd actually have two separate actions:

### Suggest a fact to check

For new topics.

### Challenge this conclusion

On every existing article.

Challenge form:

> Which statement do you think is wrong?

> What evidence should we consider?

> Source URL

Then AI automatically runs:

```text
new evidence
      ↓
source verification
      ↓
existing evidence comparison
      ↓
Claude + ChatGPT + Gemini review
      ↓
does conclusion change?
```

Possible result:

> **Challenge accepted — conclusion changed**

or:

> **Challenge reviewed — conclusion unchanged**

Both remain permanently attached to the revision history.

Imagine the credibility after several years:

> 73 public challenges reviewed  
> 11 resulted in corrections  
> 7 changed verdicts  
> 55 conclusions retained

That is an institutional trust signal.

---

# An article could therefore have this exact structure

```text
──────────────────────────────────────────────
Is Edmonton on track for its climate targets?

CONTRADICTED

ONE LINE
No. The City's latest published measurements say
Edmonton is not currently on track for its major
community emissions targets.

[Copy] [Share]

──────────────────────────────────────────────

SHORT ANSWER

~100-word explanation...

[Copy short answer + citations]

──────────────────────────────────────────────

TL;DR

• ...
• ...
• ...
• ...

──────────────────────────────────────────────

WHAT THE CITY SAYS

...

WHAT THE DATA SHOWS

...

WHAT SUPPORTS THE CLAIM

...

WHAT CHALLENGES THE CLAIM

...

WHAT WE DON'T KNOW

...

WHAT THIS DOES NOT PROVE

...

──────────────────────────────────────────────

AI REVIEW

ChatGPT       Contradicted
Claude        Contradicted
Gemini        Contradicted

Agreement: High

[See reviewers' findings]

──────────────────────────────────────────────

EVIDENCE

8 primary sources
3 datasets
2 calculations

[Explore evidence]

──────────────────────────────────────────────

SOURCES

...

──────────────────────────────────────────────

ARTICLE HISTORY

Aug 31 2026   Verified
Jul 22 2026   Updated dataset
Jun 02 2026   Reader challenge accepted

[Full GitHub history]

──────────────────────────────────────────────

Think this is wrong?
[Challenge this conclusion]

Have another question?
[Suggest a topic]
```

That is starting to feel much less like a blog and much more like an **open civic evidence system**.

## One conceptual adjustment I'd make

The brand shouldn't ultimately be:

> **AI tells Edmonton what's true.**

It should be:

> **Edmonton's evidence is checked in public.**

AI is what makes that economically possible at a scale no local newsroom, councillor or volunteer group could realistically maintain.

The combination that I think is genuinely differentiated is:

**multiple independent AI reviewers + public prompts + primary evidence + explicit disagreement + reproducible calculations + open-source history + public topic suggestions + public challenges + progressive disclosure.**

That's a much stronger product than simply a collection of well-researched civic explainers.

---

### user
each model should perform all roles, and then all work should be combined
so, we don't decide that claude is the decider here, all 3 are deciders, all 3 are supporters, all 3 are challengers
with the ability to add more models/agents in future if I have more capacity, to recheck things
wdyt?

---

### assistant
Yes. I think that is better than assigning permanent roles to models.

The clean design is: **every model independently performs the full analysis**, then a separate deterministic synthesis process combines their outputs. No model gets privileged authority.

That gives you a much stronger claim:

> **Each YEGFacts conclusion is independently researched, challenged, and evaluated by multiple AI models.**

rather than:

> Claude researches, ChatGPT challenges, Gemini decides.

The second design risks embedding model-specific biases directly into the workflow.

## I would structure each model's job identically

Every model receives the same:

- civic question;
- source-selection rules;
- source hierarchy;
- geographic/time scope;
- definition of verdicts;
- requirement to find evidence **for and against**;
- requirement to distinguish facts, projections, policy goals and opinions;
- requirement to identify missing evidence;
- requirement to attempt to falsify its own conclusion.

Each model returns the same structured schema:

```yaml
model: "..."
model_version: "..."

claim:
  normalized: "..."
  interpretation_notes: "..."

verdict:
  value: "partially-supported"
  confidence: "moderate"

supporting_evidence:
  - source: ...
    finding: ...
    strength: ...

challenging_evidence:
  - source: ...
    finding: ...
    strength: ...

city_position:
  stated_claim: "..."
  evidence_status: "..."

limitations:
  - ...

unknowns:
  - ...

what_would_change_my_conclusion:
  - ...

sources:
  - ...

suggested_one_line: "..."
suggested_short_answer: "..."
suggested_tldr:
  - ...
```

Then ChatGPT, Claude and Gemini independently produce three complete analyses.

## The important part: keep the first pass blind

I would not let them see each other's work initially.

```text
                    QUESTION
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
      ChatGPT       Claude       Gemini
      FULL REVIEW    FULL REVIEW    FULL REVIEW
          │            │            │
          └────────────┼────────────┘
                       ↓
              NORMALIZED RESULTS
                       ↓
                  COMPARISON
```

This gives you genuinely independent views.

If Gemini sees Claude's answer first, you risk anchoring and convergence.

---

# Then add a second round

This is where it gets especially strong.

After the independent analyses are complete, send the **other models' findings and evidence** back to every model:

> Here are the independent findings from the other reviewers. Re-evaluate your analysis. Do not change your conclusion merely to reach consensus. Identify evidence they found that you missed, errors in their reasoning, and whether any new evidence changes your verdict.

Then:

```text
Round 1
independent reviews

        ↓

Round 2
cross-review

ChatGPT critiques Claude + Gemini
Claude critiques ChatGPT + Gemini
Gemini critiques ChatGPT + Claude

        ↓

final individual positions
```

Now every model has been:

- researcher;
- supporter;
- skeptic;
- reviewer;
- decider.

Exactly as you're describing.

I like this substantially more.

---

# Don't force consensus

This is critical.

Suppose final positions are:

```text
ChatGPT      Partially supported
Claude       Not established
Gemini       Partially supported
```

YEGFacts should **not automatically turn that into "Partially supported" because 2–1 won**.

Instead the public conclusion might be:

> **Evidence is mixed.**
>
> Two reviewers concluded the claim is partially supported, while one found the Edmonton-specific evidence insufficient. The disagreement concerns whether X is sufficient to establish Y.

That is more intellectually honest.

You could still have a canonical verdict, but derive it using explicit deterministic rules.

For example:

```text
if all verdicts same:
    consensus = high

if adjacent verdicts only:
    consensus = moderate

if materially different:
    canonical = inconclusive
```

So:

```text
Supported
Partially supported
Not established
Contradicted
```

could have an ordinal relationship, but you should be careful because not all verdicts are mathematically comparable.

---

# The synthesis layer should not secretly become another AI decider

This matters given your philosophy.

If you do:

```text
3 independent models
        ↓
ChatGPT synthesis
        ↓
final truth
```

you're back to privileging ChatGPT.

Instead, separate **facts from prose**.

### Deterministic synthesis

Code can calculate:

```json
{
  "reviewers": 3,
  "supported": 0,
  "partially_supported": 2,
  "not_established": 1,
  "contradicted": 0,
  "agreement": "moderate"
}
```

It can merge duplicate source IDs, detect factual disagreements and identify areas of consensus.

Then each model can independently propose a synthesis too.

For example:

```text
ChatGPT synthesis
Claude synthesis
Gemini synthesis
```

And perhaps a deterministic rule selects only statements that are supported by the structured evidence and not materially disputed.

That's harder to build but much more consistent with the philosophy.

---

# I would actually think of models as a panel

Conceptually:

> **AI Evidence Panel**

Current members:

```text
OpenAI GPT-...
Anthropic Claude ...
Google Gemini ...
```

Later:

```text
+ another OpenAI model
+ another Anthropic model
+ open-source local model
+ specialized research model
```

The system shouldn't care.

Your interface becomes:

```ts
interface EvidenceReviewer {
  id: string;
  provider: string;
  model: string;

  review(input: ReviewInput): Promise<ReviewResult>;
}
```

Then adding another model is basically configuration:

```yaml
reviewers:
  - provider: openai
    model: ...
  - provider: anthropic
    model: ...
  - provider: google
    model: ...
```

Later:

```yaml
  - provider: mistral
    model: ...
```

No editorial architecture changes.

---

# Rechecking with new models is particularly valuable

This could become a major feature.

Suppose an article was published in 2026 using:

```text
GPT
Claude
Gemini
```

Then in 2027 you add another strong model.

You rerun the entire corpus.

The article might show:

> **Reviewed by 4 independent AI systems**
>
> Last full review: May 2027

And perhaps:

> Previous 3-model consensus: Partially supported  
> New 4-model consensus: Partially supported  
> No material disagreement introduced.

Or more interestingly:

> A newly added reviewer identified a missing Statistics Canada dataset. The page was reopened for review.

That's excellent.

It turns model improvements into a way of **continuously auditing old conclusions**.

---

# Model upgrades should trigger re-reviews too

Don't think only about adding providers.

If:

```text
Claude X → Claude Y
GPT X → GPT Y
Gemini X → Gemini Y
```

that's effectively a new panel.

Store:

```yaml
review_history:
  - date: 2026-09-12
    reviewers:
      - openai/...
      - anthropic/...
      - google/...
```

Then periodically rerun older high-impact articles.

This gives you something almost no traditional editorial institution can economically do:

> **Systematically re-litigate the entire evidence base when analytical capability improves.**

That's genuinely interesting.

---

# One thing I would avoid

Don't equate:

> more models = automatically more truth.

Five models trained on similar internet corpora can still share the same blind spots.

The diversity you care about is:

- different model providers;
- independent first-pass reasoning;
- independent source searches;
- explicit adversarial self-review;
- structured evidence;
- reproducible calculations;
- public disagreements;
- source quality.

Three genuinely independent reviews are probably much better than ten agents all receiving one another's answers.

---

# Public UI

I wouldn't overwhelm the top of the article with model mechanics.

Top remains:

> **ONE-LINE ANSWER**  
> ...

Then paragraph and TL;DR.

Farther down:

### Independent AI review

```text
3 independent reviewers

                    Initial     After cross-review

OpenAI             Partial     Partial
Anthropic          Unknown     Partial
Google             Partial     Partial

Final agreement: High
```

Then:

**Why reviewers disagreed initially**

> Anthropic initially considered the available Edmonton-specific sample too small. During cross-review, it identified additional City traffic-count data surfaced by another reviewer and revised its conclusion.

That is fascinating and useful transparency.

---

# Even the prompts should be model-neutral

I'd have one canonical editorial specification:

```text
/prompts/reviewer.md
```

rather than:

```text
/chatgpt-prompt.md
/claude-prompt.md
/gemini-prompt.md
```

Provider adapters can add the minimum formatting necessary.

That makes your methodology much cleaner:

> Every reviewer is asked the same questions under the same evidence rules.

Any provider-specific adaptations are also public.

---

## So yes: I would make this a core architectural principle

**No permanent AI roles. No privileged model.**

Every reviewer:

1. independently researches;
2. finds supporting evidence;
3. finds contradictory evidence;
4. attacks its own reasoning;
5. reaches its own verdict;
6. reviews the other reviewers' evidence;
7. revises or defends its verdict;
8. produces a final structured assessment.

Then YEGFacts publishes both **the combined conclusion and the disagreement**.

That feels much closer to an open scientific peer-review process than a normal AI content-generation pipeline, and I think that is a much stronger foundation for the project's credibility.

---

### user
we wouldn't be able to reach conclusive results for most topics with Edmonton data only
so, when local data is not enough, we should compare Edmonton with similar cities, and be honest that the results are extrapolation from different cities, and why it might/might not work for Edmonton
for example, cycling — compare with Montreal (much more snowy winter) to debunk winter city myth or Los Angeles (nicer climate, still car-centric)

---

### assistant
Yes. I’d make **comparative evidence a first-class part of the methodology**, not a fallback. The key is to distinguish “evidence from Edmonton” from “evidence that is plausibly transferable to Edmonton,” and to score that transferability explicitly instead of quietly generalizing from another city.

---

### assistant
[code] fast|Edmonton climate normals annual snowfall official Canada Edmonton annual snowfall 1991 2020|3650|climate.weather.gc.ca
fast|Montreal climate normals annual snowfall official Canada Montreal annual snowfall 1991 2020|3650|climate.weather.gc.ca
fast|Montreal cycling mode share official city winte

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:climate.weather.gc.ca Edmonton International Airport 1991 2020 snowfall cm climate normals
fast|site:climate.weather.gc.ca Montreal Trudeau 1991 2020 snowfall cm climate normals
fast|site:statcan.gc.ca Edmonton census bicycle commute percentage 2021 Montreal bicycle commute percentage 2021

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|Los Angeles commute mode share drive alone bicycle 2024 ACS official Census QuickFacts transportation
fast|site:census.gov Los Angeles city California bicycle commute ACS 2024 means of transportation
fast|site:ladot.lacity.gov Los Angeles bicycle commute mode share car trips
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
Exactly. I would formalize this as **evidence transferability**, because Edmonton-only evidence will often be too sparse to answer the interesting questions.

The important principle is:

> **Use Edmonton evidence where it exists. Use comparable-city and broader research where it doesn't. Always say how far the evidence can reasonably be transferred to Edmonton.**

And I would avoid requiring a city to be "similar to Edmonton" overall. It needs to be comparable **for the specific question being tested**.

## Cycling is a perfect example

Consider the claim:

> **“Edmonton is too wintery for cycling to be a meaningful transportation option.”**

You can attack different parts of that claim using different comparison cities.

### Montréal: test the snow argument

Montréal is useful because it deals with substantial winter snowfall while maintaining a large year-round cycling network. The City currently reports 1,083 km of cycling facilities, with **740 km available year-round and cleared in winter**. Montréal also says roughly 190 cm of snow falls during winter. citeturn685501search0turn685501search11

That gives YEGFacts fairly strong evidence against:

> **“A snowy Canadian winter makes a functioning year-round cycling network impractical.”**

But it **doesn't establish**:

> “If Edmonton builds Montréal-style infrastructure, Edmontonians will cycle at exactly Montréal's rate.”

Edmonton differs in temperature, urban form, density, trip distances, network maturity, transit, land use, etc.

So YEGFacts might conclude:

> **Contradicted as an absolute claim.** Substantial snowfall does not prevent a Canadian city from operating a large year-round cycling network. Montréal maintains hundreds of kilometres through winter. However, this does not establish how much Edmonton cycling would increase under similar infrastructure because the cities differ in density, trip distances, temperature and other factors.

That's a very defensible conclusion.

---

## Los Angeles tests a completely different hypothesis

Suppose someone says:

> **“People only cycle in cities with nice weather.”**

Los Angeles is useful precisely because it is **not Edmonton-like climatically**.

The Los Angeles region has exceptionally favourable cycling weather, yet cars remain dominant: 2024 U.S. Census data for Los Angeles County show about **76% of workers commuting by car**, while bicycle commuting is around 0.5%. citeturn304931search1turn304931search0

That doesn't prove infrastructure *causes* cycling.

But it strongly challenges this causal model:

```text
good weather
     ↓
lots of cycling
```

because here you have essentially:

```text
excellent weather
     ↓
still overwhelmingly car-oriented
```

Combine that with Montréal:

```text
Montréal
snowy winters
+ substantial cycling infrastructure
+ year-round cycling network

Los Angeles
very favourable weather
+ highly car-oriented urban form
+ very low bicycle commute share
```

And you can reasonably conclude:

> **Climate alone cannot explain cycling uptake.**

That's stronger than merely pointing at Montréal.

---

# This is almost like using control cases

This should become part of the YEGFacts research methodology.

For each hypothesis, models should actively look for:

**Confirming case:** a city where expected conditions produce the claimed result.

**Contradicting case:** a city where the expected condition exists but the result doesn't.

**Closest analogue:** a city resembling Edmonton on the variables that matter most.

**Extreme case:** a place that tests the boundary of the proposition.

For winter cycling:

| City | Why include it |
|---|---|
| **Edmonton** | Target city |
| **Calgary** | Nearby Alberta comparison |
| **Winnipeg** | Prairie / cold / relatively flat |
| **Montréal** | Much heavier snowfall + mature Canadian cycling network |
| **Oulu** | Extreme example of successful cold-weather cycling |
| **Los Angeles** | Negative control for "weather determines cycling" |

You don't need every city in every article. The agents determine which comparisons are materially useful.

---

# Crucially: don't cherry-pick Montréal and Oulu

Otherwise you've created another advocacy site.

If you're checking winter cycling, tell **every AI reviewer**:

> Search both for cities that support and cities that contradict the proposed relationship. Do not preferentially select successful cycling cities.

Perhaps an agent finds:

> City X built infrastructure but winter ridership remained very low.

Great.

Include it.

Then investigate why.

That's precisely what makes the result authoritative.

---

# I'd add a formal "transferability assessment"

Every external city used should have something like:

### Montréal → Edmonton

**Why it is relevant**

- Canadian legal/institutional context
- substantial snowfall
- sub-zero winter conditions
- major North American city
- year-round snow clearing

**Important differences**

- Montréal is denser
- many trips are shorter
- Edmonton is colder
- Montréal has an older/more mature cycling culture and network
- different transit and land-use patterns

**What we can infer**

> Heavy snowfall does not make year-round cycling infrastructure inherently infeasible.

**What we cannot infer**

> Edmonton would achieve Montréal's ridership by building the same number of kilometres of bike lanes.

**Transferability:** `Moderate–High for winter feasibility`  
**Transferability:** `Low–Moderate for predicted ridership`

Notice that **transferability belongs to a conclusion, not the city**.

That's important.

---

# Put this into the content schema

I'd extend the structured evidence format considerably.

```yaml id="w6ixp2"
evidence_scope:
  local:
    available: true
    strength: moderate

  comparative:
    required: true

comparisons:
  - city: "Montreal"
    jurisdiction: "Quebec, Canada"

    purpose:
      - "winter feasibility"
      - "snow-removal operations"

    similarities:
      - "Canadian city"
      - "snowy winter"
      - "municipally maintained cycling network"

    differences:
      - "higher urban density"
      - "warmer average winter temperatures"
      - "different cycling network maturity"
      - "different typical trip distances"

    supports:
      - >
        Substantial snowfall is compatible with maintaining
        year-round cycling infrastructure.

    does_not_establish:
      - >
        Edmonton would achieve Montreal's cycling mode share.

    transferability:
      winter_feasibility: high
      expected_ridership: moderate

  - city: "Los Angeles"
    jurisdiction: "California, USA"

    purpose:
      - "test climate hypothesis"

    similarities:
      - "North American metropolitan context"

    differences:
      - "much warmer climate"
      - "different density"
      - "different street network"
      - "different planning history"

    supports:
      - >
        Favourable weather alone is insufficient to produce
        high cycling uptake.

    does_not_establish:
      - >
        Infrastructure differences alone explain Los Angeles'
        transportation patterns.

    transferability:
      climate_causality: moderate
```

This is excellent material for both the AI and the reader.

---

# And reflect evidence strength in the answer

I think every conclusion should have an **evidence scope** immediately below it.

For example:

> ### One-line answer
>
> **No. Snowy winters do not inherently prevent cycling from functioning as transportation.**
>
> **Evidence:** Edmonton data + Canadian city comparisons + international research  
> **Edmonton-specific certainty:** Moderate  
> **General conclusion certainty:** High

That's an important distinction.

Maybe YEGFacts is very certain that:

> winter cycling is feasible.

but much less certain that:

> building X km of infrastructure would produce Y% Edmonton mode share.

Don't collapse those into one confidence number.

---

# The AI workflow becomes stronger too

Every model should independently go through roughly:

```text id="cazd48"
1. Define the exact claim.

2. Find Edmonton-specific evidence.

3. Determine what Edmonton evidence can establish.

4. Identify gaps.

5. Determine which variables matter to the claim.

6. Find comparable jurisdictions based on those variables.

7. Find counterexamples.

8. Find broader peer-reviewed / empirical research.

9. Evaluate transferability to Edmonton.

10. Look specifically for reasons the external
    evidence might NOT apply to Edmonton.

11. Reach a conclusion.

12. Explicitly state:
    - what is established
    - what is extrapolated
    - what remains unknown
```

Then your multi-model cross-review is especially valuable because the models might choose different comparison cities.

Claude might find Winnipeg.

Gemini might find Montréal.

ChatGPT might find Oulu and Minneapolis.

Now the second review round asks all three:

> Are these valid comparisons? Did another reviewer find a better counterexample? Does this change your conclusion?

That is a much better system than hardcoding "compare Edmonton with Oulu."

---

# I would actually label extrapolation visibly

Don't bury it in methodology.

Something like:

### How directly does this evidence apply to Edmonton?

**Direct Edmonton evidence** ●●○  
**Comparable-city evidence** ●●●  
**Broader research** ●●●

> Edmonton does not currently have sufficient local data to isolate the effect. The conclusion therefore relies partly on evidence from Montréal, Winnipeg and Oulu. We explain below why those comparisons are relevant and where they differ from Edmonton.

That kind of admission probably **increases** trust.

---

# This also solves a major philosophical problem

YEGFacts shouldn't require a perfect randomized experiment before saying anything useful.

There is a spectrum:

```text id="mf06eq"
DIRECTLY OBSERVED IN EDMONTON
            ↓
EDMONTON BEFORE/AFTER EVIDENCE
            ↓
SIMILAR CANADIAN CITY EVIDENCE
            ↓
OTHER NORTH AMERICAN EVIDENCE
            ↓
INTERNATIONAL COMPARABLE EVIDENCE
            ↓
GENERAL PEER-REVIEWED RESEARCH
            ↓
MODELLED / THEORETICAL EXPECTATION
```

All can be legitimate evidence.

They simply shouldn't be presented as equally direct.

---

## And your Montréal + Los Angeles example captures something important

Rather than asking only:

> **“Which city is most like Edmonton?”**

YEGFacts should ask:

> **“Which cities help isolate the variables behind this claim?”**

Montréal helps test **whether lots of snow makes cycling infrastructure infeasible**.

Los Angeles helps test **whether pleasant weather is sufficient to create significant cycling**.

Winnipeg might help test **cold + flat Prairie urban form**.

Oulu helps test **the extreme lower-temperature boundary under excellent winter maintenance**.

Edmonton's own counters and traffic data tell us **what is actually happening here today**.

Put those together and you get a much stronger conclusion than any single comparison can provide.

That's probably the methodology I would standardize across YEGFacts: **local evidence first, comparative triangulation second, explicit transferability assessment always.**

---

### user
> DIRECTLY OBSERVED IN EDMONTON
>
>             ↓
>
> EDMONTON BEFORE/AFTER EVIDENCE
>
>             ↓
>
> SIMILAR CANADIAN CITY EVIDENCE
>
>             ↓
>
> OTHER NORTH AMERICAN EVIDENCE
>
>             ↓
>
> INTERNATIONAL COMPARABLE EVIDENCE
>
>             ↓
>
> GENERAL PEER-REVIEWED RESEARCH
>
>             ↓
>
> MODELLED / THEORETICAL EXPECTATION



looks like this is super important, should it be on the same level as final grade (where we tell whether something is true  or false, but in different words)

---

### assistant
Yes — visually, I think it should be almost as prominent as the conclusion.

But I would **not combine it into the verdict**. They answer two different questions:

> **Finding:** What does the evidence suggest?  
> **Evidence basis:** How directly does that evidence apply to Edmonton?

That distinction is extremely important for YEGFacts.

For example:

### Is Edmonton too cold for cycling?

**Finding:** **Not supported**  
**Evidence basis:** **Mostly comparable-city evidence**  
**Confidence:** **High**

> Edmonton-specific data is limited. The conclusion relies substantially on evidence from comparable winter cities and broader transportation research.

Versus:

### Is Edmonton currently on track for its 2030 emissions target?

**Finding:** **No — off track**  
**Evidence basis:** **Direct Edmonton data**  
**Confidence:** **High**

Those two answers may both have high confidence, but the evidence behind them is fundamentally different.

## I would actually make three top-level indicators

Something like this at the top of every article:

```text
┌──────────────────────────────────────────────────────┐
│ FINDING                                              │
│ Not supported                                        │
│                                                      │
│ EVIDENCE BASIS                 CONFIDENCE             │
│ Comparable cities             High                   │
│ + broader research                                   │
│                                                      │
│ Edmonton-specific evidence: Limited                  │
└──────────────────────────────────────────────────────┘
```

Then the one-line answer immediately below.

That lets somebody understand the epistemic status of the article in about five seconds.

---

## But I would change the hierarchy we discussed

This:

> Edmonton → similar Canada → North America → international → peer-reviewed

is useful conceptually, but it's **not actually a strict quality hierarchy**.

A weak Edmonton before/after comparison can be much worse evidence than a rigorous peer-reviewed multi-city study.

For example:

> Cycling increased 30% on one Edmonton corridor after a bike lane opened.

That's directly Edmonton-specific.

But perhaps:

- weather differed;
- construction changed traffic;
- counts were taken during different months;
- surrounding network changed;
- COVID/work-from-home affected commuting.

Meanwhile a well-designed study involving 50 cities could provide much stronger causal evidence—but with a transferability question.

So there are really **two dimensions**:

### 1. Evidence quality

How well does the evidence establish the relationship?

```text
Strong causal / controlled evidence
        ↓
Strong observational evidence
        ↓
Descriptive data
        ↓
Modelled estimate
        ↓
Expert/theoretical expectation
```

### 2. Edmonton applicability

How directly does it apply here?

```text
Direct Edmonton evidence
        ↓
Highly comparable cities
        ↓
Partially comparable cities
        ↓
General external evidence
```

These should not be collapsed.

---

# I think "Evidence Basis" is the right public-facing concept

Instead of showing users a complicated methodology score, provide a simple category.

Possible values:

### **Direct Edmonton evidence**

The conclusion primarily comes from Edmonton measurements, budgets, bylaws, audits, etc.

### **Mostly Edmonton evidence**

Strong Edmonton evidence, supplemented with outside research.

### **Edmonton + comparable cities**

Edmonton evidence is incomplete, so comparable cities materially inform the conclusion.

### **Mostly comparable-city evidence**

Little useful Edmonton-specific evidence exists.

### **Broader research**

The conclusion is primarily based on broader studies rather than Edmonton-specific observations.

### **Modelled / uncertain**

The available evidence relies substantially on assumptions or projections.

That's understandable without reading a methodology document.

---

# Then allow users to expand it

At the top:

> **Evidence basis: Comparable cities + broader research ⓘ**

Clicking it:

> **Why isn't this based only on Edmonton?**
>
> Edmonton does not have enough data to determine whether winter weather itself prevents meaningful cycling uptake. YEGFacts therefore examined Edmonton data alongside Winnipeg, Montréal and Oulu and broader research.
>
> **Most transferable evidence:** winter maintenance feasibility  
> **Less transferable:** expected cycling mode share  
> **Major Edmonton differences:** lower density, longer average travel distances and colder winter extremes.

That's extremely valuable context.

---

# Your cycling example could look like this

## Is Edmonton too cold for cycling to work as transportation?

**Finding:** **No — climate alone does not explain low cycling use**

**Evidence basis:** **Edmonton + comparable winter cities**

**Confidence:** **High for feasibility · Moderate for expected Edmonton uptake**

### One line

> Severe winters do not make everyday cycling inherently impractical; cities with substantial snow and cold maintain meaningful year-round cycling, while warm weather alone does not produce high cycling rates.

Then:

### Why this isn't purely an Edmonton finding

> Edmonton has limited evidence showing what cycling rates would be under a mature, connected, consistently maintained network. The analysis therefore uses Montréal, Winnipeg, Oulu and other research to test different parts of the claim.

This is much stronger than pretending:

> “Science proves Edmonton would become Montréal.”

---

# Confidence may need to apply to individual conclusions

This is another important consequence.

One article might establish several things with different strengths.

For example:

### Winter cycling

**High confidence**

> Snow and cold do not make year-round cycling physically or operationally impossible.

**Moderate confidence**

> Better-maintained and more connected infrastructure would increase Edmonton winter cycling.

**Low confidence**

> Edmonton would reach a particular 10% cycling mode share.

That's much more intellectually honest than assigning the entire article:

> **Confidence: 87%**

I would avoid numerical confidence scores altogether. They give false precision.

Use:

**High · Moderate · Low · Insufficient evidence**

---

# This could become one of YEGFacts' signature features

Most fact-checking sites effectively give you:

> Claim → TRUE/FALSE.

YEGFacts could give you:

> **Finding**  
> What does the evidence indicate?
>
> **Evidence basis**  
> Where does the evidence come from?
>
> **Confidence**  
> How firmly can we say it?
>
> **Edmonton applicability**  
> How much extrapolation is involved?

That is far more useful for policy questions, because public-policy claims are rarely simple binary facts.

I'd make **Finding + Evidence Basis** equally prominent visually, with **Confidence** just below them.

Something like:

```text
FINDING                         EVIDENCE BASIS
Not supported                   Comparable-city evidence

CONFIDENCE                      EDMONTON DATA
High                            Limited
```

Then your one-line → paragraph → TL;DR → full evidence structure starts immediately underneath.

I think this should become part of the core YEGFacts methodology, not merely something explained on the methodology page.

---

### user
let's run a real example to see how the whole process might work
for example, I saw a lot of claims on social media that edmonton bought e-buses and this was a huge financial fiasco
run this example

---

### assistant
I’ll run this as if it were a YEGFacts article: first define the exact claim, then separate Edmonton-specific facts from broader e-bus evidence, test the strongest case for “financial fiasco,” test the strongest case against it, and finish with a public-facing finding plus evidence-basis/confidence labels.

---

### assistant
[code] fast|Edmonton electric buses Proterra financial fiasco city report audit 2024 2025 2026|3650|edmonton.ca
fast|site:edmonton.ca Proterra electric buses Edmonton 60 buses report pdf|3650|edmonton.ca
fast|Edmonton Proterra buses lawsuit warranty bankruptcy 2024 2025|3650|cbc.ca;globalnews.ca;edmontonjo

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca electric bus Proterra 2023 2024 report council availability range warranty Edmonton
fast|site:pub-edmonton.escribemeetings.com electric buses Proterra Edmonton report
fast|site:edmonton.ca "electric buses" "Proterra" "range" Edmonton
fast|site:edmonton.ca "60 electric buses" co

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"Edmonton" "Proterra" buses 2024
fast|"Edmonton" "electric buses" "Proterra" 2025
fast|"Edmonton" e-buses fiasco Proterra 2024 2025
fast|"Edmonton Transit" electric buses out of service Proterra
fast|"Edmonton" "electric bus" bankruptcy Proterra parts
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn404009search38
open|turn404009search1
open|turn404009search15
length|long

---

### assistant
[code] fast|"82,000,000" Edmonton Proterra proof claim
fast|"82 million" Proterra Edmonton proof claim
fast|"Edmonton" "Proof of Claim" Proterra 82
fast|"Edmonton" "58,761,600" Proterra
fast|"battery blankets" Edmonton Proterra 165 km 250 km
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"City of Edmonton" Proterra "82,000,000" CAD
fast|"Edmonton" Proterra "$82,000,000" CAD
fast|"Edmonton" Proterra "$82 million" Canadian dollars proof of claim
fast|"Edmonton" Proterra "82 million" "USD"
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"Edmonton" electric buses 2026 Proterra fleet status
fast|"Edmonton Transit" Proterra 2026
fast|"Edmonton" battery electric buses 2026 ETS Proterra
fast|"Edmonton" electric buses 2025 Proterra current fleet
fast|"Edmonton" electric bus fleet 2025 current
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn255667search36
open|turn263931search31
length|medium

---

### assistant
[code] open|https://www.edmonton.ca/public-files/assets/document?path=transit/ETS_Electric_Feasibility_Study.pdf
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] find|turn247876view0|Comparative Lifecycle Cost
find|turn247876view0|Expected financial impact
find|turn247876view0|12.3 Timing
find|turn247876view0|winter
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] screen|turn247876view0|12
screen|turn247876view0|13
screen|turn247876view0|14
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn187929search33
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
The first evidence pass already separates two claims that social media often merges: **(1) Edmonton’s specific Proterra procurement performed badly**, and **(2) battery-electric buses as a technology are a bad investment.** Edmonton’s own bankruptcy filing strongly supports the first claim; it does not by itself establish the second.

---

### assistant
[code] fast|site:ttc.ca electric bus head to head evaluation Proterra BYD New Flyer report 2022 pdf
fast|site:ttc.ca battery electric bus evaluation Proterra availability range winter
fast|site:stwalbert.ca electric bus BYD performance report range maintenance
fast|site:translink.ca battery electric buses

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn886074search44
find|turn886074search44|Availability
find|turn886074search44|winter
find|turn886074search44|cost
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] screen|turn551650view0|18
screen|turn551650view0|66
screen|turn551650view0|97
length|short

---

### assistant
[code] fast|site:stalbert.ca BYD electric bus report range maintenance 2023 2024 pdf
fast|site:stalbert.ca electric buses BYD lifecycle range report
fast|"St. Albert" electric bus BYD report 2024
fast|"St. Albert" electric buses range 110 km winter official
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"Proterra" Edmonton "replacement cost" 82 million buses
fast|"Edmonton" Proterra "replacement cost" buses claim
fast|"Edmonton" "claim" "replacement" "Proterra" buses 2024
fast|"Edmonton" Proterra "proof of claim" "replacement" buses
slow|"City of Edmonton" Proterra proof of claim 2024 PDF 82 m

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:pub-edmonton.escribemeetings.com electric buses 20 Proterra 2021 capital profile Edmonton 20 buses
fast|site:edmonton.ca 20 additional electric buses capital 2021 Edmonton Proterra
fast|"Edmonton" "20 electric buses" "$" Proterra 2021
fast|"60 electric buses" Edmonton "$60 million" cost Ci

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] click|turn255667search2|0
length|short

---

### assistant
[code] open|turn255667search2
length|medium

---

### assistant
[code] fast|"Edmonton" Proterra recovery bankruptcy claim 2025
fast|"Edmonton" Proterra claim settled 2025 82 million
fast|"City of Edmonton" Proterra bankruptcy recovery 2026
fast|"Edmonton" "$82 million" Proterra 2025
fast|"Edmonton" Proterra warranty Phoenix Motor 2025
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"PART VII" Edmonton Proterra claim amount
fast|"PART VI" Edmonton Proterra proof claim electric buses
fast|"Edmonton" "PART VII - CLAIM AMOUNT" Proterra
fast|"Edmonton" "damages total" Proterra 82 million buses
length|long

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca Edmonton electric bus Proterra 60 buses 2026|30|edmonton.ca
fast|site:edmonton.ca Proterra electric buses bankruptcy claim Edmonton 82 million|3650|edmonton.ca
fast|Edmonton Proterra 82 million bankruptcy claim status 2025 2026|3650
fast|site:veritaglobal.net Edmonton Proterra

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] find|turn543257search0|Edmonton
fast|"City of Edmonton" Proterra "58,761,600" 
fast|"City of Edmonton" Proterra "1,352,655.58"
fast|"City of Edmonton" Proterra "328 kilometers" "165"
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn543257search59
open|turn397489search11
open|turn543257search6
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:ttc.ca eBus head to head Proterra 95% availability April 2022 winter range 201 km|3650|ttc.ca
fast|site:ttc.ca Proterra electric bus winter range 201 km availability 95%|3650|ttc.ca
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn126881search20
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] screen|turn848122view0|31
screen|turn848122view0|66
length|short

---

### assistant
[code] fast|site:pub-edmonton.escribemeetings.com "Zero Emission Bus Program" "$27,000,000" Edmonton 20 buses
fast|site:pub-edmonton.escribemeetings.com "CIB" "20" "electric buses" Edmonton "$14.44"
fast|site:edmonton.ca "CM-66-3608" electric bus 43.735
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:pub-edmonton.escribemeetings.com Edmonton 25 electric buses 43,735,000 PTIF 21,863,000
fast|site:edmonton.ca 25 electric buses $43.735M Edmonton PTIF 2017 2019
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"electric technology is not as mature as diesel" Edmonton electric bus feasibility study
fast|"small procurement" Edmonton electric bus feasibility study "thorough analysis"
fast|"extreme cold" "could not be predicted accurately" Edmonton electric bus
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"165 km" Edmonton Proterra electric buses "328 km"
fast|"268 km" "Edmonton" Proterra electric bus
fast|"82 million" "165 kilometres" Edmonton electric buses
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca electric buses 30% less expensive service maintain diesel 2020 Edmonton
fast|site:edmonton.ca "30 per cent" "electric buses" maintenance Edmonton
fast|site:edmonton.ca "350 km" electric buses Edmonton maintenance 30
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:veritaglobal.net/proterra "Edmonton" 2026 Proterra claim
fast|"City of Edmonton" Proterra settlement 2025 2026
fast|"Edmonton" "Proterra" "settlement" 2026 electric buses
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn872130search35
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] find|turn336409view0|small procurement
find|turn336409view0|not as mature
find|turn336409view0|very severe
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] screen|turn336409view0|112
screen|turn336409view0|118
length|short

---

### assistant
[code] fast|site:veritaglobal.net/proterra "City of Edmonton" "$82" "Proof of Claim"
fast|site:veritaglobal.net/proterra Edmonton "82,000,000" Proterra
fast|site:veritaglobal.net/proterra Edmonton "328 km" "268 km"
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:veritaglobal.net/proterra/document "City of Edmonton" "General Unsecured" 2026
fast|site:veritaglobal.net/proterra/document "City of Edmonton" "FOREIGN" "2024"
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:pub-edmonton.escribemeetings.com Edmonton Canada Infrastructure Bank ZEB "operating cost savings" "repay" 20 electric buses
fast|site:pub-edmonton.escribemeetings.com Edmonton "CIB will take" risk "electric buses"
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
This is a very good test case because a neutral process lands somewhere that neither side gets to simplify:

> **Critics are basically right that Edmonton's specific Proterra purchase turned into a serious operational and procurement failure. But claims such as “$82 million of taxpayer money was lost” or “this proves electric buses don't work” go beyond what the evidence establishes.**

Running the example also exposes an important design lesson for YEGFacts: **one headline finding is useful, but controversial social-media claims often need a subclaim breakdown immediately underneath it.**

# Example YEGFacts article

## Did Edmonton's electric-bus purchase become a financial fiasco?

**FINDING**  
### Serious procurement failure; final financial loss not established

**EVIDENCE BASIS**  
### Direct Edmonton evidence

**CONFIDENCE**  
**High** that the Proterra procurement substantially underperformed  
**Moderate** on the ultimate financial loss

**Last checked:** August 31, 2026

### One line

**Edmonton's 60 Proterra buses substantially failed to meet contracted range and reliability expectations, and Proterra's bankruptcy impaired warranty/support, so describing this specific procurement as a serious failure is supported; however, the commonly cited $82 million figure is a bankruptcy damages claim, not a confirmed $82 million taxpayer loss.** citeturn980862search23turn119128search0

**[Copy one-line answer + sources]**

---

## Short answer

Edmonton had strong reasons to be dissatisfied with its Proterra electric buses. The City's own court filing says it paid Proterra US$58.76 million for 60 buses that failed contractual expectations for range, reliability and durability, at times leaving more than half unavailable for non-routine maintenance. The City later filed a claim exceeding $82 million after Proterra entered bankruptcy. But that $82 million is a **legal damages claim**, not an accounting of money permanently lost. The buses have provided transit service, 60 remain listed in ETS's fleet, and the eventual value of the buses, operating costs, public grants and bankruptcy recovery all matter before a final net loss can be calculated. citeturn980862search23turn119128search0turn543257search2

**[Copy short answer + sources]**

---

## TL;DR

- **The buses materially underperformed.** Edmonton says contracted range, reliability and durability requirements were not met, and at times more than half were unavailable for non-routine maintenance. citeturn980862search23
- **The range problem was large.** The later City claim said the contract specified 328 km normally and 268 km in extreme cold; Edmonton reported roughly 165 km average winter range and at best about 250 km in warmer weather. citeturn119128search0
- **The City's earlier public messaging was much more optimistic.** ETS said the buses were winter-compatible, capable of up to 350 km and roughly 30% cheaper to service and maintain than diesel buses. citeturn395027search13
- **"$82 million lost" is not established.** $82 million was the City's proof-of-claim amount against Proterra. It is not the same thing as an audited net loss. Edmonton's claim still appeared in the bankruptcy claims register in May 2026, and I did not find a public final recovery/net-loss calculation. citeturn768882search2turn543257search0
- **This does not prove battery-electric buses inherently fail.** Toronto's controlled comparison produced dramatically different results among manufacturers and found its Proterra fleet at about 95% availability by April 2022, though cold weather substantially reduced range. citeturn126881search21turn126881search20

That is probably enough for 90% of readers.

Then the page goes deeper.

---

# Claim breakdown

This is the feature I think this example tells us YEGFacts needs.

| Claim | Finding | Evidence basis | Confidence |
|---|---|---|---|
| **Edmonton's Proterra buses substantially failed to perform as promised** | **Supported** | Direct Edmonton | High |
| **The purchase caused significant financial harm** | **Supported** | Direct Edmonton | High |
| **Edmonton lost $82 million** | **Not established** | Direct Edmonton financial/legal | High |
| **The buses were useless** | **Contradicted / exaggerated** | Direct Edmonton | High |
| **The City was warned about important technology/winter risks beforehand** | **Supported** | Direct Edmonton | High |
| **The City obviously should have known the Proterra buses would fail** | **Not established** | Edmonton + procurement context | Moderate |
| **This proves battery-electric buses don't work in cold Canadian cities** | **Not supported** | Edmonton + comparable-city evidence | Moderate-High |
| **The original promised maintenance savings were actually achieved** | **Not established from the evidence reviewed** | Direct Edmonton | Moderate |

This is much better than stamping the whole thing:

> **TRUE**

because there are actually several different factual questions bundled into "e-buses were a huge fiasco."

---

# What did the City originally expect?

This is where YEGFacts becomes particularly useful.

Before the failure, ETS publicly described the buses as:

> winter compatible

with range of up to 350 km, and said they were approximately **30% less expensive to service and maintain than diesel buses**, plus fuel savings. citeturn395027search13

So YEGFacts doesn't need critics' interpretation to establish that expectations were missed.

We can compare:

| Metric | Earlier expectation/claim | Later reported experience |
|---|---:|---:|
| Range | up to 350 km publicly; contract later described as 328 km | at best ~250 km in warm weather |
| Extreme-cold range | contract: 268 km | ~165 km average winter range |
| Maintenance | ~30% cheaper than diesel | substantial non-routine maintenance documented |
| Availability | intended as regular ETS fleet | at times >50% unavailable for non-routine maintenance |

The right conclusion isn't:

> "An anti-EV group says the buses failed."

It's:

> **The City's own later legal position conflicts materially with the performance case the City publicly presented when deploying the buses.**

That's strong.

---

# How much money was actually lost?

This is where YEGFacts should push back on social media.

Edmonton's October 2023 court filing says the purchase price paid to Proterra was **US$58,761,600**. At that point, the City itemized approximately **C$1.35 million of specific additional damages** involving labour, parts, battery blankets and another receivable. citeturn397489search11turn980862search23

In February 2024, Edmonton subsequently filed a proof of claim seeking **more than $82 million** for alleged breach of contract and negligence after Proterra's bankruptcy complicated warranty and contractual support. citeturn119128search0

But:

```text
$82M bankruptcy claim
          ≠
$82M cash lost
          ≠
$82M Edmonton property-tax loss
```

The buses have residual/use value because they have actually carried passengers. There may be bankruptcy recovery. There were federal and provincial contributions. Infrastructure retains some value. Conversely, there may be future repair, parts, premature-replacement and operating costs that increase the ultimate loss.

Even funding isn't as simple as many posts imply. One $43.735M capital profile associated with the initial 25-bus program included $21.863M federal funding, $9.434M MSI funding, $10.882M in other provincial grants and $1.556M pay-as-you-go funding. A later $27M program for another 20 buses included $12.56M transferred from an existing bus-replacement profile and $14.44M of CIB-backed tax-supported debt. citeturn975164search24turn675455search0

All of that is still **public money** in the broader sense. But it demonstrates why:

> **"Edmonton taxpayers blew $82M"**

would be a bad YEGFacts summary.

The proper answer today is:

> **The procurement clearly generated material financial harm, but the final net public loss has not been established from the available evidence.**

And I'd actually identify this as a **data gap YEGFacts wants filled**.

---

# Did Edmonton know there were risks?

This part gets very interesting.

Edmonton didn't simply buy buses without studying them.

A major 2016 feasibility study concluded that introducing electric buses was feasible and recommended doing so. It estimated that the lifecycle cost of depot/trickle-charged buses could be comparable with diesel. citeturn395027search18turn533870view0

So a claim like:

> **"The City's own study told them e-buses wouldn't work and they bought them anyway."**

would be **contradicted**.

But the same study contained warnings that become quite important in hindsight.

The Edmonton road trials occurred during a **short period in January 2016 that wasn't particularly cold**, the buses were not tested in very severe conditions, and the report explicitly said extreme-cold performance could not be accurately predicted. Its overall data accuracy was only ±25%. citeturn533870view2

It also explicitly said:

> electric-bus technology was less mature than diesel technology;

and recommended a limited procurement as an opportunity to learn before further expansion, together with comprehensive fleet monitoring. citeturn533870view0

That's a fantastic YEGFacts finding because neither political interpretation captures it properly.

### "The City ignored obvious proof that e-buses couldn't work."

**Not supported.**

### "The City had thoroughly demonstrated that these buses would work in Edmonton winters."

**Also not supported.**

The actual evidence says:

> **The feasibility study was optimistic enough to recommend proceeding, but it explicitly acknowledged substantial uncertainty about extreme cold and immature technology.**

That is much more interesting.

---

# Another question the AI reviewers should raise

The 2016 Edmonton field trial involved BYD and New Flyer vehicles—not the eventual production Proterra fleet. The feasibility report was therefore evidence about the **technology category and operating concept**, not direct validation that Edmonton's later Proterra model would achieve its contractual range and reliability. citeturn543257search59

That distinction could easily disappear in ordinary political discourse:

> "We winter-tested electric buses."

True.

> "Therefore we had already demonstrated that these particular Proterra buses would perform as promised."

Not established by that test.

This is exactly the kind of semantic leap YEGFacts should catch automatically.

---

# Does Edmonton prove electric buses don't work?

Now we move to comparative evidence because Edmonton alone can't answer this.

Toronto's TTC conducted a head-to-head evaluation of 60 electric buses from **BYD, New Flyer and Proterra**.

By April 2022:

| TTC fleet | Availability |
|---|---:|
| Proterra | **95%** |
| New Flyer | **95%** |
| BYD | **30%** |
| Nova hybrid benchmark | **>95%** |

The TTC's conclusion was explicitly that battery-electric propulsion itself was **not a significant driver of bus performance**, although it cautioned that its findings applied to the particular models and Toronto operating environment. citeturn848122view0turn126881search21

Toronto also found a real winter effect:

| Manufacturer | Winter range | Summer range |
|---|---:|---:|
| BYD | 184 km | 290 km |
| New Flyer | 245 km | 276 km |
| Proterra | 201 km | 240 km |

So cold-weather range reduction is very real. citeturn126881search20

### Transferability to Edmonton

**Moderate.**

Toronto is warmer than Edmonton and operates a different network. We should absolutely **not** conclude:

> "Toronto's Proterra buses worked, therefore Edmonton's should have worked."

But Toronto is useful for answering the broader claim:

> "Battery-electric propulsion inherently makes transit buses unreliable."

The enormous difference between BYD and Proterra/New Flyer in the **same transit system** strongly suggests that manufacturer, vehicle design, support, maintenance and implementation matter substantially.

So YEGFacts could say:

> **Edmonton provides strong evidence that Edmonton's specific Proterra procurement failed. It does not establish that battery-electric buses as a technology are inherently unreliable or financially uneconomic.**

---

# What is still unknown?

This would be a prominent section, not fine print.

To determine whether the purchase was a **financial** disaster in a rigorous accounting sense, YEGFacts still needs actual Edmonton data for:

**annual kilometres per bus; fleet availability by propulsion type; scheduled and unscheduled maintenance costs; electricity costs; equivalent diesel fuel costs; parts and labour; battery replacements; expected remaining service life; replacement costs; original infrastructure spending; useful remaining infrastructure; grant contributions; and eventual bankruptcy recovery.**

Then we could calculate:

```text
Actual Proterra total cost of ownership
               vs.
Counterfactual diesel total cost of ownership
               vs.
Expected e-bus business case
```

That would allow a much stronger statement such as:

> **The buses have cost Edmonton $X million more than the diesel alternative through 2026.**

We can't responsibly write that number yet based on the evidence I found.

And that is itself an important YEGFacts output:

> **We know they failed operationally. We do not yet have sufficient public data to quantify the final financial loss.**

---

# How the multi-AI process would work on this article

In production, ChatGPT, Claude and Gemini would each independently receive only the original question and the common methodology. Each would have to find Edmonton evidence, arguments supporting the fiasco characterization, arguments challenging it, financial details, City statements, earlier studies, comparable cities and evidence-transfer limitations.

Their evidence registries would then be merged. If Claude finds the 2016 extreme-cold caveat, ChatGPT finds the bankruptcy filing, and Gemini finds the TTC comparison, **all three get all three pieces in round two** and individually reconsider their conclusions.

Critically, they would each be asked things like:

> Does the $82M claim equal an $82M loss?

> Does poor Edmonton performance establish poor battery-electric performance generally?

> Did the 2016 feasibility study adequately test the eventual buses?

> What evidence would be required to quantify the actual net loss?

> Find evidence that contradicts your current conclusion.

Then all three issue their **final individual assessments**.

I can't invoke Claude and Gemini from this chat, so I wouldn't populate fake "Claude: X / Gemini: Y" verdicts on this demonstration. What we've produced here is one real research pass and an evidence packet that the other independent reviewers would separately reproduce/challenge.

---

# What I think the eventual YEGFacts result should currently be

If the other models found no major contrary evidence, I'd be comfortable with:

> ### Finding
> **Serious procurement failure; final financial loss not established**
>
> ### Evidence basis
> **Direct Edmonton evidence**
>
> ### Confidence
> **High** — operational/procurement failure  
> **Moderate** — magnitude of financial loss
>
> ### One line
> **Edmonton's Proterra buses substantially failed to deliver the range and reliability the City contracted for, but the widely cited $82 million figure is a legal claim, not a confirmed taxpayer loss, and Edmonton's experience does not by itself show that electric buses generally fail.**

This is exactly the kind of article that could establish YEGFacts' independence.

It **validates a criticism of a City policy/investment using the City's own documents**, while simultaneously refusing the exaggerated versions of that criticism.

And the biggest product insight from doing this example is that I would now make **“Claim breakdown” a standard part of the schema**, directly after the TL;DR. A single grade is too lossy for real civic controversies like this.

Because the bankruptcy/recovery status can still change, this is also a good candidate for automatic monitoring.

genui{"suggest_automation":{"label":"Track Edmonton e-bus case updates"}}

---

### user
Do you think yegfacts can request this days from the city? I mean, it should be open data. Should requesting data from specific sources be a part of the process?

To determine whether the purchase was a financial disaster in a rigorous accounting sense, YEGFacts still needs actual Edmonton data for

---

### assistant
[model_editable_context] {'content_type': 'model_editable_context', 'model_set_context': ''}

---

### assistant
Yes. I would make **“request missing evidence from the authoritative source”** a formal stage of the YEGFacts process rather than stopping at “public data is insufficient.” For a project like the e-bus case, that may be the difference between a useful explainer and genuinely original civic accountability work.

---

### assistant
[code] fast|site:edmonton.ca open data request dataset Edmonton suggest dataset open data 2026|30|edmonton.ca
fast|site:edmonton.ca access to information request City of Edmonton 2026 FOIP ATIA|30|edmonton.ca
fast|site:alberta.ca Access to Information Act municipalities Alberta 2026|30|alberta.ca
fast|site

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:alberta.ca ATIA public body create record not required existing records request data extract machine readable Alberta|3650|alberta.ca
fast|site:edmonton.ca ATIA request existing records not create new record City Edmonton data extract|3650|edmonton.ca
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
Yes. I think **requesting missing data from the authoritative source should be a formal part of the YEGFacts methodology**.

In fact, this could become one of the project's strongest features. Instead of ending an article with:

> “There isn't enough public information to know.”

YEGFacts can say:

> “The available public information is insufficient. On September 2, YEGFacts requested the following underlying data from ETS. The request is pending.”

That turns YEGFacts from a fact-checking website into a small **civic research institution**.

Edmonton already explicitly supports this route. Its Open Data portal has a **Dataset Requests** process where residents can suggest datasets, and completed requests can result in new datasets being published publicly. The City says these requests help increase both the quantity and quality of open data. citeturn954588search1turn954588search5

## I would add an evidence-acquisition ladder

Something like:

```text
1. PUBLICLY AVAILABLE DATA
   ↓
2. DIRECT REQUEST TO RESPONSIBLE CITY AREA
   ↓
3. OPEN DATASET REQUEST
   ↓
4. FORMAL ACCESS TO INFORMATION REQUEST
   ↓
5. DOCUMENT THE UNAVAILABLE EVIDENCE
```

That should probably become part of the official YEGFacts methodology.

### 1. Search existing public evidence

City reports, Council attachments, Open Data, budgets, contracts, audits, etc.

### 2. Ask the responsible organization directly

For the bus example, contact ETS/City administration and say essentially:

> We're researching the lifecycle performance of Edmonton's Proterra fleet. Does ETS already maintain these figures, and can they be provided in machine-readable form?

The City itself says this should generally happen **before** a formal information request. Information may already be obtainable from the relevant business area. citeturn207724search2

### 3. Request it as Open Data

This is particularly appropriate when you're not merely asking for one document but for a reusable dataset such as:

```text
bus_id
year
propulsion
manufacturer
km_operated
availability
maintenance_hours
maintenance_parts_cost
energy_consumption
energy_cost
```

Ideally, YEGFacts doesn't just get a spreadsheet privately.

The better outcome is:

> **Please publish this as an Edmonton Open Data dataset so everybody can use it.**

That's aligned extremely well with YEGFacts.

### 4. Use ATIA if necessary

Alberta's old FOIP system was replaced by the **Access to Information Act (ATIA)** on June 11, 2025. Municipalities are covered, and Edmonton accepts formal ATI requests for information that isn't otherwise publicly available. General requests currently have a $25 initial fee, and the normal response period is 30 business days, subject to possible extensions. citeturn207724search0turn207724search7

So YEGFacts can absolutely use ATIA.

But I'd treat it as the escalation mechanism rather than the default.

---

# For the e-bus case, I would make an actual data request

And I would **not ask the City to tell us whether the buses were financially successful**.

That's our analysis.

Ask for the underlying records.

For each calendar year since the first Proterra buses entered service, ideally by vehicle or at least by fleet:

| Data | Why YEGFacts needs it |
|---|---|
| Number of buses in service | denominator |
| Revenue/service km | actual useful output |
| Total km | utilization |
| Days/hours available for service | reliability |
| Unscheduled downtime | reliability |
| Road calls / failures | reliability |
| Scheduled maintenance labour hours | operating cost |
| Unscheduled maintenance labour hours | operating cost |
| Parts cost | operating cost |
| Warranty-covered repairs | prevents overstating City cost |
| Warranty reimbursements | actual net cost |
| Electricity consumed | energy efficiency |
| Electricity cost | operating cost |
| Charging demand/infrastructure electricity costs | full energy cost |
| Battery replacements/major repairs | lifecycle cost |
| Battery state/remaining capacity if tracked | expected remaining life |
| Bus purchase cost | capital cost |
| Charging infrastructure capital cost | capital cost |
| Grants received by source | who paid |
| Proterra bankruptcy recovery received | net financial loss |
| Expected/actual retirement date | lifecycle |
| Equivalent diesel fleet maintenance data | counterfactual |
| Equivalent diesel fuel consumption/cost | counterfactual |

Then YEGFacts does:

```text
Proterra lifecycle cost per service-km
                  versus
comparable diesel lifecycle cost per service-km
```

and separately:

```text
Actual Proterra outcome
        versus
Original business-case assumptions
```

Those are much better measures of "financial fiasco" than simply quoting purchase price.

---

# Some of this really should be open data

I agree with you conceptually.

Things such as:

- fleet availability;
- kilometres operated;
- energy consumption;
- maintenance expenditure;
- vehicle age;
- vehicle type;
- capital cost;

are precisely the kinds of aggregated operational data that can support public scrutiny of a publicly funded transit system.

Edmonton explicitly says its Open Data initiative is intended to let people see data used in City decision-making and transform it into useful information. citeturn954588search11

But I wouldn't write on YEGFacts:

> **“The City is legally required to publish all of this as open data.”**

That's a different claim.

Some records may contain:

- proprietary vendor information;
- commercially sensitive contract terms;
- legal advice;
- information connected with litigation/bankruptcy;
- third-party confidential material;
- information that requires redaction.

And ATIA provides access to **records the City holds**; it isn't necessarily a mechanism for requiring the City to perform a new custom analysis for us. The Alberta request guidance specifically says requests should identify records sufficiently precisely for the public body to locate them. citeturn207724search24turn207724search25

That's why the request should say:

> Provide the existing dataset/export/report containing annual bus maintenance expenditures...

rather than:

> Calculate the total lifetime financial loss of the Proterra fleet.

**YEGFacts does the calculation.**

---

# This should become visible on articles

Imagine the e-bus article containing:

## Missing evidence

> A rigorous total-cost comparison requires maintenance, vehicle availability, energy consumption and lifecycle data that are not currently available in sufficient detail in the sources reviewed.

### YEGFacts data requests

| Requested | Source | Status |
|---|---|---|
| Proterra annual maintenance cost | Edmonton Transit Service | **Requested Sep. 3, 2026** |
| Annual fleet availability | Edmonton Transit Service | **Requested Sep. 3, 2026** |
| Energy consumption & electricity cost | Edmonton Transit Service | **Requested Sep. 3, 2026** |
| Diesel comparison data | Edmonton Transit Service | **Requested Sep. 3, 2026** |
| Proterra bankruptcy recovery | City of Edmonton | **Requested Sep. 3, 2026** |

Possible statuses:

**Publicly available · Requested · Received · Partially received · Declined · No record exists · ATIA pending**

Clicking the request could show the **exact request YEGFacts sent and the complete response**.

That is excellent transparency.

---

# It can become AI-driven too

This integrates naturally with your model panel.

Every model must answer:

> **What evidence is necessary to reach a stronger conclusion?**

Then combine the answers.

For the e-bus article:

```text
ChatGPT says missing:
- maintenance cost
- availability
- electricity cost
- bankruptcy recovery

Claude says missing:
- maintenance hours
- replacement parts
- battery condition
- diesel counterfactual

Gemini says missing:
- kilometres operated
- grants
- charging infrastructure cost
```

The system merges them:

```text
MISSING EVIDENCE REGISTRY
              ↓
determine data owner
              ↓
check Open Data
              ↓
generate narrowly scoped request
              ↓
human/automatic submission
              ↓
track response
              ↓
re-run all reviewers
```

That's a very natural extension of what we're designing.

---

# And I'd apply it beyond the City

Call the methodology something like **Authoritative Source Request** rather than "City Data Request."

Because another article might need information from:

- **EPCOR**
- Alberta Transportation
- Statistics Canada
- Edmonton Police Service
- Edmonton Public Library
- school boards
- CMHC
- transit agencies in comparison cities
- Infrastructure Canada

For example, some Edmonton organizations operate their own access/privacy programs rather than under the City's central ATIA process, so the correct authoritative source may differ. citeturn207724search5

The AI should identify that.

---

# This creates another valuable verdict state

Suppose we're still waiting.

Instead of:

> **Financial fiasco — True**

YEGFacts says:

### Finding
**Serious operational/procurement failure**

### Financial conclusion
**Not yet determinable**

### Why

> The data required to calculate actual lifecycle financial loss is not currently public in sufficient detail.

### Evidence requested

> YEGFacts has requested maintenance, availability, energy and lifecycle-cost records from ETS.

That is a **much stronger response than pretending certainty**.

And if the City releases the dataset six weeks later, your automation reruns all three models and updates the article.

---

## I think this belongs very near the centre of the YEGFacts process

The full process is becoming something like:

```text
QUESTION
   ↓
INDEPENDENT MULTI-MODEL RESEARCH
   ↓
EDMONTON EVIDENCE
   ↓
COMPARABLE-CITY / RESEARCH EVIDENCE
   ↓
MISSING-EVIDENCE ANALYSIS
   ↓
AUTHORITATIVE-SOURCE DATA REQUESTS
   ↓
ADVERSARIAL CROSS-REVIEW
   ↓
FINDING
   ↓
PUBLIC CHALLENGES
   ↓
NEW DATA / NEW MODELS
   ↓
RE-REVIEW
```

That moves YEGFacts beyond **summarizing what governments already publish**.

It can actively identify **what Edmonton needs to publish in order for residents to evaluate government claims properly**.

I think that is a major part of what could eventually make the project authoritative.

---

### user
this process should be automated, one ai agent will draft emails (human clicks send), reads replies and communicates
all emails should be saved as evidence, every article change should be versioned (maybe we achieve it with git for free, right?)

---

### assistant
[model_editable_context] {'content_type': 'model_editable_context', 'model_set_context': ''}

---

### assistant
Yes. I would make correspondence part of the evidence pipeline, with AI doing the clerical/research work and humans retaining only the irreversible actions: **send the message and merge a conclusion-changing update**. Git can give you the article/history layer essentially for free, but I would not put every raw email and attachment directly into the public Git repository.

---

### assistant
Yes. I would make this an explicit subsystem of YEGFacts: an **Evidence Request Agent**.

The principle would be:

> **AI researches, drafts, reads, classifies and follows up. A human authorizes outgoing communication.**

And yes, **Git should be the canonical history for every public article and analytical artifact**. Git is almost perfectly suited to this.

## The workflow

I would automate it like this:

```text
ARTICLE RESEARCH
      ↓
AI models identify missing evidence
      ↓
Missing-evidence registry
      ↓
Evidence Request Agent
      ↓
Determines authoritative source
      ↓
Drafts precise request
      ↓
HUMAN: click Send
      ↓
Email + attachments archived
      ↓
Reply arrives
      ↓
AI reads + extracts evidence
      ↓
Answered?
 ┌────┴─────┐
 No         Yes
 ↓           ↓
Draft       Update evidence
follow-up   registry
 ↓           ↓
HUMAN       Re-run all AI reviewers
Send         ↓
             Proposed article changes
                     ↓
                  Git PR
                     ↓
             HUMAN merge if material
                     ↓
                  Deploy
```

That could require surprisingly little ongoing work from you.

---

# Give YEGFacts its own mailbox

Something like:

**research@yegfacts.ca**

Every request should come from the institution, not your personal email.

The AI manages the mailbox conceptually, but it should never autonomously send external correspondence initially.

For every message:

> **Draft ready**
>
> To: Edmonton Transit Service  
> Subject: Request for Proterra fleet maintenance and availability data
>
> [Review] [Send]

You click Send.

Replies go back into the same system automatically.

The agent reads:

> "We have attached annual maintenance expenditures, but vehicle-level availability is unavailable..."

and converts that into structured state:

```yaml
request: ebus-lifecycle-001

status: partially-answered

received:
  - annual-maintenance-cost
  - annual-energy-consumption

missing:
  - vehicle-availability
  - warranty-reimbursements

attachments:
  - ets-maintenance-2020-2026.xlsx

next_action:
  type: follow-up
  reason: >
    Availability data was not included and the response
    did not state whether the City holds it.
```

Then it drafts the follow-up.

You click Send again.

---

# The agent should maintain conversations, not just send emails

Every evidence request becomes an object:

```text
REQ-2026-0017

Question:
Actual lifecycle cost of Edmonton Proterra fleet

Article:
yegfacts.ca/electric-buses

Authority:
Edmonton Transit Service

Requested:
Sep 4, 2026

Status:
Partial response

Messages:
4

Documents received:
3

Outstanding evidence:
- annual fleet availability
- warranty reimbursement
- battery replacement cost

Next action:
Follow-up drafted
```

That gives you a miniature automated research CRM without needing an actual CRM.

---

# Git is ideal for article versioning

I would make Git the authoritative history of:

- article text;
- findings;
- confidence;
- evidence basis;
- structured claims;
- source metadata;
- calculation code;
- datasets derived from sources;
- AI prompts;
- model results;
- comparison-city assessments;
- data-request metadata;
- correspondence transcripts suitable for publication;
- corrections.

Every article update becomes a commit/PR.

For example:

```text
Sep 04
Initial article published
Finding: Serious procurement failure;
financial loss undetermined

Oct 18
ETS maintenance data received

Oct 19
All three models re-reviewed evidence

Oct 20
Finding updated:
Financial underperformance supported

Nov 07
Reader challenged diesel comparison

Nov 08
Counterfactual calculation corrected
```

And the website generates:

### Article history

> **Oct. 20, 2026 — Material update**  
> ETS supplied annual maintenance data. The financial finding changed from *Not yet determinable* to *Financial underperformance supported*.  
> [See changes]

Behind that:

**View Git commit**

This costs essentially nothing from a version-control standpoint. Git itself is free and a public Git repository is a natural fit.

---

# But don't store every raw email directly in public Git

I would separate **public analytical history** from **raw evidence storage**.

### Public Git repository

Store:

```text
articles/
evidence/
requests/
correspondence/
calculations/
prompts/
reviews/
```

For correspondence:

```text
correspondence/
  REQ-2026-0017/
    metadata.yaml
    001-request.md
    002-city-response.redacted.md
    003-follow-up.md
```

### Private/raw evidence archive

Store:

```text
001-request.eml
002-response.eml
attachments/
original spreadsheets
original PDFs
```

Why separate them?

Raw email can contain:

- employee phone numbers;
- signatures;
- internal routing addresses;
- metadata;
- unrelated personal information;
- potentially confidential information;
- huge attachments.

You don't want an accidental Git commit permanently exposing something that should have been redacted.

---

# Cryptographically tie the raw evidence to Git

This is a particularly nice solution.

For every original email/attachment calculate a SHA-256 hash:

```yaml
file: response-2026-10-18.eml

sha256: >
  84b1c22f...

received_at: 2026-10-18T14:22:11-06:00
```

The raw file stays in private immutable storage.

The hash gets committed publicly.

Therefore if anyone later asks:

> "Did YEGFacts alter the City's response?"

you can verify that the retained original is exactly the file whose fingerprint was recorded when it arrived.

For publicly releasable records, you could additionally provide the original attachment directly.

---

# Public correspondence should be transparent

An article could have:

### Evidence requests

**Sep. 4, 2026 — YEGFacts → Edmonton Transit Service**

> Requested annual Proterra maintenance, availability and energy-use data.

[Read request]

**Sep. 28, 2026 — Edmonton Transit Service → YEGFacts**

> Provided maintenance and electricity figures. Vehicle availability was not included.

[Read response] [Download supplied dataset]

**Oct. 1, 2026 — YEGFacts → Edmonton Transit Service**

> Asked whether vehicle-availability records exist.

[Read follow-up]

This gives journalists and skeptical residents essentially the complete research trail.

---

# AI should also decide when a request is necessary

Every model independently answers:

```yaml
missing_evidence:
  - description: "Annual Proterra maintenance expenditures"
    importance: critical
    likely_holder: "Edmonton Transit Service"
    reason: >
      Required to evaluate lifecycle operating costs against diesel.

  - description: "Bankruptcy distributions received by Edmonton"
    importance: high
    likely_holder: "City of Edmonton"
```

The combined system deduplicates these.

Then the Evidence Request Agent determines:

```text
Is this already public?
        ↓ no

Can the existing City business area provide it?
        ↓ yes

Draft direct request
```

If that fails:

```text
Open Data request?
        ↓

Access-to-information request?
```

So escalation is automated too.

---

# The email agent should also challenge evasive/non-answers

Suppose ETS responds:

> "Electric buses remain an important part of our fleet modernization strategy."

The AI shouldn't mark that `answered`.

It evaluates the requested fields:

```text
Asked:
✓ maintenance cost
✓ availability
✓ energy consumption
✓ warranty reimbursements

Received:
✗ maintenance cost
✗ availability
✗ energy consumption
✗ warranty reimbursements
```

Status:

> **Question not answered**

Then drafts:

> Thank you. Our request is specifically for the existing records containing annual maintenance costs, fleet availability, electricity consumption and warranty reimbursements for the Proterra fleet from 2020 onward. Could you provide those records, or confirm which requested records are not held by ETS?

You click Send.

That's an excellent use of AI.

---

# Preserve the model history too

If you want true reproducibility, don't merely save the final article.

For every review run:

```text
reviews/
  electric-buses/
    2026-09-01/
      run.yaml
      openai.json
      claude.json
      gemini.json
      combined-evidence.json
      disagreements.json

    2026-10-20/
      run.yaml
      openai.json
      claude.json
      gemini.json
      combined-evidence.json
      disagreements.json
```

`run.yaml` should record:

```yaml
date: 2026-10-20

reviewers:
  - provider: openai
    model: ...
  - provider: anthropic
    model: ...
  - provider: google
    model: ...

prompt_version:
  commit: 34ab21...

evidence_version:
  commit: a912cd...

trigger:
  type: new-evidence
  source: REQ-2026-0017
```

Now six months later, you can answer:

> **Why did YEGFacts conclude this?**

precisely.

---

# Git also solves another major problem: methodology changes

Imagine in 2027 you realize that your comparative-city methodology was too permissive.

You update:

```text
/prompts/reviewer.md
/methodology/transferability.md
```

Git records the change.

Then the system identifies:

> 37 existing articles were produced using methodology v1.

It schedules them for re-review.

Eventually the article can say:

> **Methodology:** v3.1  
> **Last full review under current methodology:** June 2027

That's extremely strong.

---

# I'd make substantive changes go through PRs

The AI shouldn't directly mutate `main`.

Example:

> **PR #428 — Reassess e-bus financial finding after ETS response**

The PR contains:

```diff
- financial_loss:
-   finding: not-established
-   confidence: moderate

+ financial_loss:
+   finding: supported
+   confidence: high
```

and:

> **Why this changed**
>
> ETS supplied annual maintenance and energy-cost records covering 2020–2026. All three model reviewers concluded the new evidence materially strengthens the financial finding.

You inspect the diff.

**Merge.**

Cloudflare rebuilds the static site.

Done.

---

## Human involvement can therefore become very small

I would keep humans at four boundaries:

**1. Send external messages.**  
AI drafts; human sends.

**2. Submit formal legal/access requests.**  
AI prepares everything; human authorizes.

**3. Merge material conclusion changes.**  
Typo/data-refresh updates could eventually be automatic.

**4. Handle unusual ethical/legal situations.**

Everything else can be automated:

```text
research
source discovery
missing-data detection
email drafting
reply reading
attachment processing
follow-up drafting
evidence extraction
multi-model review
comparison analysis
article drafting
charts
citations
Git commits
PR creation
static-site build
staleness monitoring
```

And this gives YEGFacts a much better institutional story than **“AI writes some articles.”**

It's closer to:

> **YEGFacts is an open, versioned civic research system. AI performs the research and continuously challenges its conclusions; source correspondence, evidence, methodology and every substantive revision have an auditable history.**

That architecture feels consistent with the authority/independence goal you're aiming for.

---

### user
maybe we can save email screenshots and make them public (we can blur all confidential data), these can be reviewed by human first (or we can have another skill that makes sure that no private data is exposed in any materials or screenshots)

---

### assistant
Yes, but I would treat **public-release redaction as its own safety pipeline**, separate from the research agent. One important change: use **irreversible redaction**, not visual blur; blur can leave recoverable information and is harder to audit reliably.

---

### assistant
[code] fast|Alberta Access to Information Act personal information disclosure public records 2026|30|alberta.ca
fast|City of Edmonton access privacy personal information email disclosure 2026|30|edmonton.ca
fast|Alberta Protection of Privacy Act public body personal information 2026|30|alberta.ca
length|me

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
Yes. I would make **privacy review/redaction a dedicated automated stage with its own agent(s)**, and require one human click before anything originating from correspondence becomes public.

I also like publishing screenshots, but I would make them **supporting evidence**, not the canonical record.

## A good evidence-publication pipeline

```text
RAW EMAIL / ATTACHMENT
        │
        ▼
Private evidence vault
        │
        ├── SHA-256 original recorded
        │
        ▼
PRIVACY RELEASE PIPELINE
        │
        ├── deterministic PII scan
        ├── AI privacy reviewer #1
        ├── AI privacy reviewer #2
        ├── attachment/metadata inspection
        └── redaction proposal
        │
        ▼
Generate PUBLIC DERIVATIVES
        │
        ├── sanitized text/HTML
        ├── sanitized screenshot
        ├── sanitized PDF/attachment
        └── evidence metadata
        │
        ▼
Automated verification
        │
        ├── scan again for PII
        ├── extract PDF text and scan
        ├── verify image metadata removed
        └── fail closed if uncertain
        │
        ▼
HUMAN PREVIEW
       [Publish]
        │
        ▼
Commit public artifacts to Git
```

That human action can literally be:

> **Evidence ready for publication**  
> 3 items reviewed  
> 2 email addresses removed  
> 1 phone number removed  
> No unresolved privacy warnings  
>
> [Preview] **[Publish]**

The goal is for you to inspect the result, not manually perform redactions.

## I would create a separate “Privacy Release Agent”

It shouldn't know or care what conclusion YEGFacts wants.

Its mandate should simply be:

> Determine whether this material can safely be published. Minimize disclosure of information unrelated to the civic evidence. Identify personal, confidential, sensitive, third-party and irrelevant information. When uncertain, block publication and request human review.

That separation is useful.

Your **research agents want maximum information**.

Your **privacy agent wants minimum necessary disclosure**.

Those goals should intentionally conflict.

And Alberta's current privacy framework makes taking this seriously sensible: the Protection of Privacy Act has governed public-sector personal information since June 11, 2025, while Edmonton's access process specifically says records may need to be withheld or redacted where disclosure would unreasonably invade another person's privacy. citeturn855936search0turn855936search4

---

# Don't actually use blur

I'd change one detail in your idea:

**redact, don't blur.**

For example:

```text
From: █████████████
Phone: ████████████
```

The underlying information must be **removed**, not merely visually obscured.

Particularly for PDFs, putting a black rectangle over text is not sufficient if someone can copy the hidden text underneath.

The pipeline should:

1. remove the original text;
2. insert an opaque redaction;
3. flatten/rasterize where appropriate;
4. strip metadata;
5. run text extraction against the resulting PDF;
6. confirm that the removed strings cannot be recovered.

Screenshots are safer in one respect because you're creating a new raster image, but I'd still use opaque redactions rather than blur.

---

# I wouldn't screenshot Gmail itself

Instead of:

> screenshot of the YEGFacts Gmail interface

I'd have the system automatically render a clean **email facsimile** from the original message:

```text
──────────────────────────────────────────────
CITY OF EDMONTON → YEGFACTS
September 28, 2026 · 10:42 AM

Subject: RE: Proterra fleet maintenance data

From:
Edmonton Transit Service
[direct contact information redacted]

Thank you for your inquiry.

Attached are annual maintenance expenditures for
the Proterra fleet covering 2020 through 2025...

██████████████████████████████████████████
[personal contact information redacted]

──────────────────────────────────────────────
Evidence ID: YF-EBUS-REQ-0017-02
Original retained by YEGFacts
SHA-256: 4d82...
```

Then publish a PNG of that.

Advantages:

- no Gmail UI clutter;
- no accidentally visible labels/avatar/account;
- consistent appearance;
- easy mobile viewing;
- accessible public version alongside it;
- explicit redactions;
- evidence identifier.

You can still call it:

> **View original correspondence**

although technically I'd phrase it:

> **View redacted correspondence**

because that's exactly what it is.

---

# Publish three forms where useful

For an important response I'd expose:

### 1. Human-readable correspondence

Searchable HTML/text.

This should be the canonical version because browsers, screen readers, search engines and YEGFacts citations can understand it.

### 2. Visual facsimile

The screenshot you're suggesting.

Good for credibility:

> This really was the response.

### 3. Original supplied document, redacted if necessary

For example:

`ETS-Proterra-Maintenance-2020-2026.xlsx`

If no redaction is necessary, provide the actual received file and its hash.

---

# Each published artifact gets provenance

For example:

```yaml
evidence_id: "YF-EBUS-REQ-0017-02"

type: email
received: "2026-09-28T10:42:18-06:00"

sender:
  organization: "City of Edmonton"
  business_area: "Edmonton Transit Service"

original:
  visibility: private
  sha256: "4d82..."

public_derivative:
  created: "2026-09-28T11:03:14-06:00"
  sha256: "98ab..."

redactions:
  - category: direct-email-address
  - category: telephone-number
  - category: email-signature

privacy_review:
  automated_checks: passed
  human_review: approved
```

And yes: commit that to Git.

Now there's a permanent record that the public version was derived from a specific immutable original.

---

# I'd make the privacy rules public too

Something like:

## Correspondence publication policy

> YEGFacts publishes correspondence when it materially supports a civic finding. Before publication, correspondence is automatically reviewed for personal and confidential information and then approved by a human.
>
> We normally remove personal phone numbers, direct email addresses, signatures and unrelated personal information.
>
> We retain information such as the responding organization, business area, date and substantive response where needed to establish provenance.
>
> Original unmodified records are retained privately and cryptographically fingerprinted.

That is considerably stronger than:

> "We blur anything that looks private."

The current City process itself recognizes that access and privacy have to coexist: general ATI requests can specifically seek things such as emails about a City program, but Corporate Access and Privacy reviews records before release and removes information where required. citeturn855936search4

---

# Material received through formal ATI requests is easier

If YEGFacts obtains a document through Edmonton's formal ATI process, the City has already performed its own statutory release review and may have redacted information before sending it. citeturn855936search4

I would **still run YEGFacts' privacy gate**.

Why?

Because:

> legal permission to possess something  
> ≠  
> YEGFacts needs to republish everything in it.

The site's standard should be **minimum necessary disclosure**.

For example, a City employee's direct phone number may have survived the City's release process but have zero relevance to an e-bus analysis.

Remove it.

---

# The automated privacy check should be multi-layered

Just as you're using several models for factual analysis, don't rely on one LLM for privacy.

I'd use:

```text
                         DOCUMENT
                            │
           ┌────────────────┼────────────────┐
           ▼                ▼                ▼
      deterministic       Model A          Model B
        detection       privacy review   privacy review
           │                │                │
           └────────────────┼────────────────┘
                            ▼
                       MERGE FLAGS
                            │
                            ▼
                   REDACT PUBLIC COPY
                            │
                            ▼
                     SCAN AGAIN
                            │
                       ┌────┴────┐
                       │         │
                    clean      uncertain
                       │         │
                       ▼         ▼
                    preview    BLOCK
```

Deterministic detection should catch obvious things:

- email addresses;
- phone numbers;
- postal addresses;
- IDs/account numbers;
- signatures;
- metadata;
- hidden PDF text;
- spreadsheet hidden sheets/columns;
- comments and document revision metadata.

AI catches contextual things:

> "My daughter has..."

> an internal person's personal circumstances;

> an apparently innocuous identifier that could identify someone;

> unrelated material further down an email chain.

The combination is much safer than either alone.

---

# Attachments are actually the bigger risk

An `.xlsx` file is potentially much more dangerous than an email screenshot.

It can contain:

- hidden worksheets;
- hidden columns;
- comments;
- formulas pointing elsewhere;
- author metadata;
- names;
- internal identifiers.

Same with Word/PDF.

So the privacy skill should inspect **the actual document structure**, not merely what is visibly rendered.

And YEGFacts shouldn't publish the original raw attachment until it passes that process.

---

# Git completes the audit chain

Then an evidence-related article change might look like:

```text
Commit 1
Received ETS response
+ requests/REQ-0017/response.yaml
+ correspondence/REQ-0017/002-response.md
+ evidence/REQ-0017/002-response.png

Commit 2
Added ETS maintenance dataset
+ evidence/datasets/proterra-maintenance.csv
+ provenance metadata

PR #291
Re-ran ChatGPT / Claude / Gemini

Commit 3
Updated financial conclusion
"Not established" → "Supported"
```

A user can move from:

**finding**

→ **underlying number**

→ **City response**

→ **redacted correspondence**

→ **dataset**

→ **AI reviews**

→ **Git revision that changed the article**

That's about as auditable as a public evidence system can reasonably become.

## So I would absolutely build this

But I'd describe the design as:

> **Raw evidence is private by default. Publication requires creation of a sanitized derivative, independent automated privacy checks, and human approval.**

That gives you almost complete automation **without allowing an AI mistake to accidentally publish somebody's private information**.

And because Alberta now separately regulates public-sector privacy through POPA, having a documented privacy-by-design process also fits the broader environment YEGFacts will be operating in. citeturn855936search6turn855936search7

---

### user
is there any way to make money with this project? I mean, ideally it should financially support itself and my work

---

### assistant
Yes. The strongest path is probably **not ads and not “pay us for a favorable fact-check.”** I’d design monetization so people pay for **access, automation, research tooling, and speed**, while the underlying conclusions stay public and governed by the same methodology.

---

### assistant
[code] fast|Full Fact funding revenue donations consulting fact checking organization 2026|30|fullfact.org
fast|Taproot Edmonton membership sponsorship business model 2026|30|taprootedmonton.ca
fast|Knight Foundation grants local journalism civic technology Canada fact checking 2026|30
fast|Canada civic te

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:taprootedmonton.ca membership sponsorship Taproot Edmonton how funded
fast|site:taprootedmonton.ca become a member sponsor Taproot Edmonton
fast|site:taprootedmonton.ca "sponsor" "Taproot Edmonton"
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
There are two different businesses hiding here: **YEGFacts as a trusted Edmonton public resource**, and the **open-source AI civic-evidence engine underneath it**. The first can likely cover meaningful operating costs; the second is what could realistically pay for substantial founder time.

---

### assistant
Yes. I think it can make money, but I would **not expect the Edmonton fact-checking website alone to reliably support a full developer/researcher salary** at first.

The more promising model is:

> **YEGFacts is the free public-interest product and credibility engine. The technology and structured civic-data infrastructure underneath it becomes the commercial product.**

There is precedent for this. Full Fact, one of the more established fact-checking organizations, had about £3.05M of income in 2025 from a mixture of individual donations, foundations, technology grants, fact-checking programs and earned revenue. It also sells training and services through a trading operation, and its AI tools were used by 29 organizations across 14 countries in 2025. citeturn719711search0turn719711search1turn719711search48

## I would design four revenue layers

### 1. YEGFacts supporters — recurring baseline

Keep every fact, source and article free.

Offer:

> **Support independent civic evidence in Edmonton — $8/month or $80/year**

Benefits should be mostly non-editorial:

- weekly "What changed in Edmonton data" email;
- early access to new site features;
- supporter badge/profile if desired;
- quarterly project/research report;
- ability to vote on which unanswered community questions are most interesting.

Not:

> Pay and we'll investigate your political opponent.

Taproot demonstrates that Edmonton does have a market for directly supported civic information: it currently offers individual membership at $100/year and also takes contributions, advertising and sponsorship. citeturn414601search0turn414601search1

Even several hundred YEGFacts supporters would make the project much easier to sustain.

---

## 2. Grants and philanthropy

YEGFacts is unusually grant-friendly because it combines:

**local journalism + civic participation + open data + misinformation/fact checking + AI + open source.**

Those are all active funding areas.

For example, Knight currently explicitly funds journalism technology, AI, data-driven storytelling and tools that improve information ecosystems. Its 2026 Cities Challenge offered grants up to $200,000, although that particular program applies only to its selected U.S. communities. citeturn719711search2turn719711search9

Canada's Local Journalism Initiative currently funds original civic journalism for underserved communities, although YEGFacts' eligibility would depend on its eventual organizational structure and journalism model. citeturn719711search7

I wouldn't build a company that **depends** on grants, though. Full Fact provides a cautionary example: it publicly disclosed that Google funding exceeding £1M in the prior year disappeared when Google changed direction. citeturn719711search11

Grants should accelerate development, not determine whether YEGFacts survives.

---

# 3. YEGFacts Pro

This is where I think meaningful recurring revenue could develop.

**Never paywall the facts. Paywall productivity.**

Public user:

> Is the e-bus fiasco claim accurate?

Gets everything we've designed, free.

Professional user:

> Tell me every time a City report, dataset, council attachment, correspondence response or new analysis materially changes anything about transit, housing or the budget.

That's valuable.

### Potential YEGFacts Pro

Perhaps $20–$50/month for individuals and $100–$500+/month for organizations.

Things like:

**Evidence alerts**

> The City published new traffic-volume data affecting three YEGFacts pages.

**Council preparation**

> Tuesday's Urban Planning Committee agenda touches 7 existing YEGFacts topics. Here are the relevant claims, numbers and primary sources.

**Topic watchlists**

```text
Housing
Transit
Property taxes
Police
Active transportation
Downtown
```

**Data downloads**

Structured CSV/JSON instead of manually extracting reports.

**Evidence API**

```http
GET /api/facts/ebuses
GET /api/topics/property-tax
GET /api/sources/...
```

**Historical verdicts**

> What did the evidence show in 2026 versus 2028?

**Source-change monitoring**

> EPCOR updated the source used in this article.

**Embeddable charts/cards**

A newsroom can embed:

> YEGFacts verified data

with citations and auto-updating figures.

Potential customers:

- newsrooms;
- researchers;
- consulting firms;
- real-estate / planning organizations;
- community organizations;
- businesses following municipal policy;
- universities;
- NGOs.

Everyone receives the **same underlying factual conclusions**.

They are paying for monitoring and workflow, not truth.

---

# 4. The potentially much larger business: the engine

This is where I would look if the goal becomes replacing a meaningful portion of your professional income.

Internally, don't build:

> `YEGFacts software`

Build:

> **CivicFacts Engine**

YEGFacts is deployment #1.

```text
              CIVICFACTS ENGINE

    Multi-model evidence research
                 +
    source provenance
                 +
    comparative-city analysis
                 +
    evidence requests
                 +
    correspondence automation
                 +
    privacy/redaction
                 +
    Git versioning
                 +
    automated re-review
                 +
    public challenges

                     ↓

       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   YEGFacts.ca    Calgary...     Winnipeg...
```

The code can remain open source.

You sell:

**managed hosting**

> We operate the whole system for your organization.

**AI infrastructure**

> Models, scheduled research jobs, monitoring, evidence pipelines.

**connectors**

> Council agenda systems, municipal open data, ATI workflows, email.

**support / implementation**

> Configure the system for Calgary, Ottawa, Toronto, etc.

**institutional deployments**

> A newsroom wants its own fact-checking/evidence system.

**research API**

> Other products consume the structured evidence graph.

That's a standard open-source commercial model:

> Software is free. Operating it professionally is not.

---

# This could extend beyond municipalities

Once the underlying engine works, nothing really requires the subject to be Edmonton.

Imagine:

### ProvincialFacts

Alberta legislation, budgets, healthcare, education.

### Newsroom evidence engine

A reporter gives it:

> "Premier says Alberta has Canada's lowest taxes."

The system automatically:

1. normalizes the claim;
2. finds authoritative statistics;
3. asks what comparison definition matters;
4. runs multiple AI reviewers;
5. finds counterexamples;
6. identifies missing data;
7. produces cited evidence;
8. monitors the claim over time.

### Corporate claims

Companies could use essentially the same infrastructure for regulatory/public-policy intelligence.

At that point the addressable market is completely different from Edmonton residents.

---

# A model I particularly like

Potentially structure it eventually as:

```text
YEGFacts
Independent public-interest editorial operation

       │ uses

CivicFacts
Commercial/open-source technology operation
```

The second can pay engineers—including you—to develop and operate the infrastructure.

YEGFacts uses it at low/no cost and acts as its public proof of quality.

This isn't an unusual concept. Full Fact itself combines its public-interest fact-checking operation with paid training/services through **Full Fact Services**. citeturn719711search1

The exact Canadian corporate/nonprofit structure would need accounting/legal advice if it grows, but the conceptual separation makes sense.

---

# What I would avoid

Some revenue is probably not worth the credibility cost.

| Revenue | My view |
|---|---|
| Individual memberships | **Excellent** |
| Small donations | **Excellent** |
| Grants | **Good, diversified** |
| Pro subscriptions | **Excellent** |
| Data/API subscriptions | **Excellent** |
| Software hosting | **Excellent** |
| Training/consulting | **Good** |
| Generic advertising | **Possible** |
| Clearly disclosed sponsorship | **Possible, carefully** |
| City funding YEGFacts directly | **Risky** |
| Advocacy-group funded articles | **Very risky** |
| Developer paying for zoning fact-check | **Very risky** |
| Councillor/candidate funding | **I would prohibit it** |
| Pay-for-verdict | **Absolutely never** |

You should probably eventually have a public funding rule:

> **No person or organization purchasing services, donating funds, sponsoring the project or providing grants receives any control over YEGFacts findings, evidence selection or corrections.**

And disclose meaningful funders.

Full Fact goes further: its published policy says funders cannot interfere editorially and aren't exempt from being fact-checked. citeturn719711search10

I'd borrow that concept.

---

# Could it realistically support your work?

I think there are three stages.

### Stage 1 — YEGFacts as side project

Likely revenue:

> memberships + donations + maybe a small grant.

Could cover AI/API costs, hosting, ATI fees and eventually produce some side income.

### Stage 2 — recognized Edmonton institution

Imagine, purely as a target rather than a forecast:

- 750 supporters at roughly $8/month → ~$72K/year;
- organizational Pro subscriptions → perhaps another $20–50K;
- grants/sponsorship/projects → variable;
- occasional services/training.

At that point **a paid founder role becomes entirely plausible**.

The hard part isn't technical. It's earning enough public trust and habitual usage to get hundreds of people to support it.

### Stage 3 — CivicFacts becomes a product

This changes the economics.

Ten institutional customers paying $500–$1,500/month for managed research infrastructure are much more economically important than another thousand Edmonton page views.

Add implementation, hosting, API and services, and you're building an actual small SaaS/open-source company.

---

## The path I would pursue

I would **not try to monetize aggressively at launch**.

Build enough YEGFacts that people start saying:

> "Check YEGFacts."

Then introduce a simple **Support YEGFacts** membership.

Meanwhile, architect everything we've discussed as a **city-agnostic engine from day one**—model adapters, evidence schema, correspondence agent, redaction pipeline, source adapters, Git review workflow.

If YEGFacts gains authority, you now possess something significantly more valuable than the website:

> **a proven AI system for producing transparent, continuously maintained, adversarially reviewed civic evidence.**

That's the part I could see becoming a real business rather than merely a project that pays its hosting bill.

---

### user
should the AI system be open source or not? or only the topics/evidence/facts/prompts/etc.

also, for all the evidence and reports we get, we should save all of them into our system, maybe even make public if it's public data

---

### assistant
I would draw the boundary based on **whether code can affect a YEGFacts conclusion**. If it can influence what evidence is selected, how evidence is weighted, how models are prompted, or how a verdict is synthesized, I think it should be public; operational infrastructure around that can remain private/commercial.

---

### assistant
[code] fast|site:edmonton.ca open government licence Edmonton open data licence redistribution attribution|30|edmonton.ca
fast|site:data.edmonton.ca Open Government Licence Edmonton terms open data|30|data.edmonton.ca
fast|site:edmonton.ca copyright reports City of Edmonton terms use documents|30|edmonton.

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
I’d use an **“open editorial kernel, commercial operations”** model. That preserves the strongest trust claim—anyone can inspect or reproduce how YEGFacts reaches conclusions—without requiring you to give away every piece of hosted infrastructure that might later fund the project.

---

### assistant
Yes. I would make a distinction that is important for both **credibility** and **monetization**:

> **Everything that can affect a YEGFacts factual conclusion should be open source. Everything required merely to operate YEGFacts as a hosted service does not have to be.**

If only the topics, evidence and prompts were public while the actual evidence-processing/synthesis software were private, someone could reasonably say: “The important part is still a black box.”

## 1. What I would open-source

I would call this the **YEGFacts Editorial Kernel**.

It should include:

- evidence and article schemas;
- exact research/review prompts;
- source-classification rules;
- comparative-city/transferability methodology;
- missing-evidence detection;
- model adapters and common reviewer interface;
- cross-review workflow;
- rules for combining model findings;
- disagreement detection;
- finding/confidence/evidence-basis logic;
- source provenance and hashing;
- deterministic calculations;
- citation validation;
- stale-source detection;
- privacy/redaction rules;
- article-generation code;
- all article Markdown;
- structured outputs from each model;
- Git history.

So someone sufficiently motivated could clone it, add their own API keys and ask:

> “Can I reproduce YEGFacts' analysis of Edmonton's electric buses?”

Ideally, the answer is **yes**.

That is a powerful credibility property.

### What doesn't need to be open

Your commercial/operational layer can include:

- API keys and credentials, obviously;
- Gmail OAuth/account infrastructure;
- hosted queues and scheduling;
- multi-tenant customer management;
- billing;
- admin UI;
- spam/abuse infrastructure;
- uptime/monitoring infrastructure;
- premium notification system;
- proprietary integrations you develop for paying customers;
- managed storage;
- hosted model execution.

Conceptually:

```text
                 OPEN SOURCE

           YEGFacts Editorial Kernel
        ┌─────────────────────────────┐
        │ Evidence methodology        │
        │ Multi-model reviews         │
        │ Synthesis rules             │
        │ Calculations                │
        │ Provenance                  │
        │ Fact generation             │
        │ Validation                  │
        └─────────────────────────────┘
                       │
                       │ operated by
                       ▼
              COMMERCIAL SERVICE
        ┌─────────────────────────────┐
        │ Managed AI execution        │
        │ Email integration           │
        │ Source monitoring           │
        │ Scheduling                  │
        │ Hosting                     │
        │ Alerts                      │
        │ Institutional features      │
        └─────────────────────────────┘
```

That gives you a legitimate business:

> **The methodology is free. Running it reliably at scale is the product.**

---

# 2. I might actually make the whole engine AGPL

There is another viable option I would seriously consider.

Open-source the entire CivicFacts engine under **AGPL-3.0**, then sell:

- managed CivicFacts hosting;
- YEGFacts Pro;
- institutional deployments;
- support;
- custom integrations;
- commercial licensing if needed.

AGPL has an attractive property for this particular project: someone can't simply modify the server-side software, operate it as a competing web service and keep their modifications entirely private.

You could potentially use:

```text
CivicFacts Community
AGPL-3.0

CivicFacts Commercial
commercial licence for organizations
that don't want AGPL obligations
```

That can itself become a business model.

There are contributor/IP implications to dual licensing, so I'd get proper legal advice before choosing that structure.

But strategically I prefer:

> **open more, monetize operation**

over:

> **protect the secret AI software**

because transparency itself is a major component of CivicFacts' competitive advantage.

Your moat isn't likely to be 15,000 lines of TypeScript.

It's:

- trusted brand;
- years of evidence;
- accumulated correspondence;
- source adapters;
- civic institutional relationships;
- contributor network;
- historical data;
- model evaluation experience;
- reliability;
- integrations;
- distribution.

---

# 3. And yes: save the evidence itself

I think this is extremely important.

YEGFacts shouldn't merely store:

```yaml
url: https://edmonton.ca/some-report.pdf
```

because three years later:

- URL disappears;
- PDF gets silently replaced;
- dataset is updated;
- webpage changes;
- underlying methodology changes.

You need to know **exactly what evidence the models saw when they reached their conclusion.**

So every evidence item should become an immutable YEGFacts evidence object.

For example:

```yaml
id: YF-EV-2026-001928

title: "ETS 2024 Annual Service Plan"
source:
  publisher: "City of Edmonton"
  url: "https://..."
  retrieved_at: "2026-08-31T10:28:42-06:00"

original:
  filename: "ETS-2024-Annual-Service-Plan.pdf"
  media_type: "application/pdf"
  sha256: "a8214c..."

rights:
  status: "reviewed"
  public_mirror: true
  licence: "..."

privacy:
  contains_personal_information: false

used_by:
  - electric-buses
  - transit-budget
```

Now YEGFacts can say:

> This article used **version `a8214c...`** of this report.

---

# 4. But don't put all those files into Git

Git is excellent for:

- Markdown;
- YAML/JSON;
- prompts;
- source metadata;
- code;
- calculations;
- model reports;
- diffs.

It's bad as a giant archive of:

- PDFs;
- Excel files;
- email screenshots;
- videos;
- very large datasets.

Your repository would become enormous.

I would use something like **Cloudflare R2 object storage**.

Architecture:

```text
GitHub
────────────────────────────
articles
metadata
evidence manifests
prompts
model reviews
calculations
code
history

             references

Cloudflare R2
────────────────────────────
raw PDFs
Excel workbooks
CSV snapshots
email originals
screenshots
ATI responses
public evidence mirrors
```

And use the hash as the immutable identity:

```text
/evidence/sha256/a8214c.../original.pdf
```

Changing the file produces a new hash, therefore a new evidence version.

---

# 5. Have two evidence stores

This fits perfectly with the privacy discussion.

```text
                    EVIDENCE INGESTED
                           │
                           ▼
                  PRIVATE RAW VAULT
                    immutable original
                           │
                  privacy + rights review
                           │
             ┌─────────────┴──────────────┐
             ▼                            ▼
        releasable                  not releasable
             │                            │
             ▼                            │
       PUBLIC EVIDENCE                    │
          ARCHIVE                         │
                                          │
                             private evidence only
```

### Private evidence vault

Contains everything YEGFacts legitimately obtains:

- original email;
- original attachment;
- original City response;
- downloaded report;
- original spreadsheet;
- raw dataset snapshot.

Never modified.

### Public evidence archive

Contains only material cleared for republication:

- open datasets;
- appropriately licensed government reports;
- YEGFacts correspondence derivatives;
- redacted responses;
- data YEGFacts itself generated;
- permissible public documents.

---

# 6. “Public data” and “publicly accessible” are not identical

This is an important distinction.

Edmonton's **Open Data** material is explicitly intended for reuse and redistribution. The City's Open Data documentation says open data can be freely used, reused and redistributed. citeturn288617search4turn288617search34

So if YEGFacts uses an Edmonton Open Data dataset, I would generally mirror the exact snapshot used by the analysis, retaining the applicable licence/terms.

For example:

```text
City dataset
      ↓
YEGFacts snapshot Aug 31 2026
      ↓
SHA-256
      ↓
public evidence archive
```

Excellent.

But:

> **something being visible on edmonton.ca does not automatically mean YEGFacts can republish the whole thing.**

For example, Edmonton's bylaws page explicitly says City bylaw copyright belongs to the City and restricts reproduction beyond personal use without consent. citeturn288617search3

And some City-hosted consulting reports contain third-party copyright terms restricting reuse; one currently hosted Edmonton engineering report states that copyright belongs to the consultant and restricts third-party reliance/use. citeturn288617search32

So you'd want an automated **Rights Classifier** too.

---

# 7. Every evidence item gets a publication status

Something like:

```yaml
rights:
  public_access: true

  republication:
    status: allowed

  basis:
    type: open-data-licence

  attribution_required: true
```

Or:

```yaml
rights:
  public_access: true

  republication:
    status: unclear

  public_copy:
    allowed: false

  public_excerpt:
    allowed: review-required
```

Or:

```yaml
rights:
  public_access: false

  republication:
    status: redacted-derivative-only
```

Possible states:

**Open mirror**

> Entire original can be published.

**Public derivative**

> Publish sanitized/redacted version.

**Excerpt only**

> Keep the source privately; publish only necessary quoted/extracted evidence.

**Link only**

> Provide original source URL and provenance/hash.

**Private evidence**

> Models can use it where legally/ethically appropriate, but YEGFacts does not republish it.

If the licensing is uncertain, **fail closed**.

---

# 8. Ask for republication rights proactively

This could simplify correspondence enormously.

Every YEGFacts evidence request could include:

> YEGFacts is an open civic evidence project. We aim to make supporting evidence publicly auditable. Please indicate whether the records supplied may be republished by YEGFacts with attribution, and identify any information or third-party material that should not be redistributed.

Then the AI records the answer.

You could even ask City Open Data:

> Can this dataset be published through Edmonton Open Data instead?

Best-case result:

```text
YEGFacts requests data
        ↓
City publishes dataset openly
        ↓
everyone benefits
```

That's better than YEGFacts becoming the only holder.

---

# 9. Save every version of changing datasets

Suppose Edmonton updates a dataset nightly.

Don't overwrite:

```text
traffic-counts.csv
```

Instead:

```text
traffic-counts/
  2026-08-31/
    raw.csv
    sha256
  2026-09-30/
    raw.csv
    sha256
```

But you don't necessarily need snapshots every night.

The system can fetch periodically and calculate the hash:

```text
fetch
 ↓
hash identical?
 ├─ yes → record checked_at only
 └─ no  → create new evidence version
```

Very storage-efficient.

---

# 10. This means you can reproduce historical articles

Imagine someone asks in 2029:

> Why did YEGFacts say Edmonton's electric buses were a serious failure in 2026?

The system can reconstruct:

```text
Article version
August 31, 2026

Prompt version
v1.7

Models
GPT-x
Claude-y
Gemini-z

Evidence
YF-EV-0001 @ hash AAA
YF-EV-0002 @ hash BBB
YF-EV-0003 @ hash CCC

Calculations
commit 71ac...

Model reports
archived

Finding
Serious procurement failure;
financial loss not established
```

You could potentially **rerun the entire evaluation as it existed on August 31, 2026**.

That's extraordinary transparency.

---

# 11. The public evidence library itself becomes a product

Eventually:

> **YEGFacts Evidence Library**

Search:

`Proterra`

and get:

```text
Edmonton procurement contract
2016 e-bus feasibility study
2020 ETS service plan
2023 bankruptcy filing
2026 ETS response to YEGFacts
maintenance dataset
energy dataset
TTC comparative report
```

Each result:

**Original source**  
**Archived version**  
**Licence**  
**Date retrieved**  
**Used in 4 YEGFacts analyses**

That's useful even independently of the fact-check articles.

Journalists and researchers will start using YEGFacts because you've already done the annoying archival work.

---

# 12. It also gives you something commercially valuable

Over years you accumulate a **structured Edmonton civic knowledge graph**:

```text
claim
  ↕
evidence
  ↕
datasets
  ↕
Council reports
  ↕
organizations
  ↕
budgets
  ↕
projects
  ↕
correspondence
  ↕
historical versions
```

That becomes difficult to replicate.

The software is open.

The underlying public data is public.

But YEGFacts has spent years:

- discovering it;
- versioning it;
- connecting it;
- cleaning it;
- checking it;
- requesting missing pieces;
- tracking provenance;
- resolving contradictions.

**That accumulated structure becomes the moat.**

---

## So my recommendation is

I would make **all conclusion-affecting software open source**, probably with a copyleft licence worth discussing such as AGPL, while monetizing managed operation, integrations, monitoring, APIs and institutional services.

And I would make **evidence preservation a first-class subsystem from day one**:

> **Every source gets archived, hashed, versioned, licensed/classified and linked to the exact conclusions that used it.**

Publicly mirror everything that YEGFacts is clearly permitted to redistribute; retain other materials in the private immutable archive and expose the maximum legally/privacy-safe evidence through links, excerpts, metadata or sanitized derivatives.

That combination—**open editorial algorithm + immutable evidence archive + Git history**—would be a much stronger transparency foundation than simply saying “our prompts are public.”

---

### user
ok, let's think more about financial viability of this project.. maybe there're some grants or accelerators that can help financially with it... should this be a separate entity or can I operate it under my corporation?

---

### assistant
I’ll separate this into two questions: **what money YEGFacts could plausibly access in Canada/Alberta/Edmonton**, and **which legal structure preserves both grant eligibility and the independence/commercial upside we’ve been designing**. I’ll also distinguish near-term realistic programs from “maybe later if YEGFacts becomes a recognized newsroom/nonprofit.”

---

### assistant
[code] fast|Canada grants civic tech open data journalism AI nonprofit 2026 YEGFacts Edmonton|30
fast|Alberta Innovates funding AI startup grants Alberta 2026|30|albertainnovates.ca
fast|Innovate Edmonton accelerator grants startup Edmonton 2026 civic tech AI|30|innovateedmonton.com
fast|CIRA Net Good Gran

---

### user
also, is yegfacts.ca a good domain name?

---

### tool (web.run)
The output of this plugin was redacted.

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|Alberta Innovates startup funding AI software Alberta 2026|30|albertainnovates.ca
fast|Edmonton Unlimited startup accelerator grants 2026 Edmonton technology|30|edmontonunlimited.com
fast|PrairiesCan funding technology startups Alberta 2026|30|canada.ca
fast|NRC IRAP funding Canadian technology

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmontonunlimited.com funding startup Edmonton 2026 accelerator AI
fast|site:edmontonunlimited.com accelerator Edmonton AI startup 2026
fast|site:albertainnovates.ca "Alberta Digital Traction" 2026
fast|site:canada.ca PrairiesCan business scale-up productivity Alberta 2026 technology
fast|

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmontonunlimited.com programs startup founders Edmonton AI 2026
fast|site:edmontonunlimited.com accelerator startup grant Edmonton 2026
fast|site:amii.ca startup program Edmonton AI founders 2026
fast|site:amii.ca funding startup Alberta AI 2026
fast|site:alberta.ca startup grant technolo

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmontonunlimited.com "Community Safety & Wellness Accelerator" 2026 applications
fast|site:500.co Alberta Accelerator by 500 2026 applications Alberta
fast|site:platformcalgary.com "Alberta Accelerator by 500" 2026
fast|site:plugandplaytechcenter.com Alberta startup accelerator 2026 appli

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|Alberta society incorporation nonprofit requirements Alberta 2026|365|alberta.ca
fast|Canada not-for-profit corporation incorporation nonprofit can pay salaries directors 2026|365|ised-isde.canada.ca
fast|CRA non-profit organization can operate business earn income Canada 2026|365|canada.ca
fas

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:canada.ca Canadian journalism labour tax credit 2026 amount QCJO
fast|site:canada.ca journalism labour tax credit 2026 eligible salary 65%
fast|site:canada.ca supporting Canadian journalism tax credit 2026 QCJO labour
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|"YEGFacts" Edmonton
fast|"YEG Facts" Edmonton
fast|"Edmonton Facts" civic
length|short

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn593078search2
click|turn593078search2|3
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] click|turn343696view0|6
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:nrc.canada.ca IRAP eligibility funding Canadian incorporated SME innovative technology 2026
fast|site:nrc.canada.ca IRAP financial support technology innovation project SME 2026
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:edmonton.ca grants nonprofit Edmonton community civic 2026
fast|site:edmonton.ca community investment operating grant Edmonton 2026 nonprofit
fast|site:edmonton.ca grant civic engagement Edmonton nonprofit 2026
fast|site:edmonton.ca "Community Investment Operating Grant" 2026
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:alberta.ca nonprofit can pay employees salary directors Alberta society 2026
fast|site:canada.ca non profit organization salary employees directors Canada
fast|site:ised-isde.canada.ca not-for-profit corporation director remuneration employee salary Canada
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] click|turn343696view0|5
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] open|turn163890search10
find|turn163890search10|maximum
find|turn163890search10|$75,000
find|turn163890search10|Funding
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:ecfoundation.org grants Edmonton Community Foundation nonprofit civic journalism technology 2026
fast|site:ecfoundation.org "Community Grants" 2026 Edmonton nonprofit
fast|site:ecfoundation.org grants registered charity qualified donee Edmonton 2026
fast|site:ecfoundation.org journalism gr

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
[code] fast|site:ecfoundation.org/community-grants Edmonton Community Foundation community grants 2026 eligibility
fast|site:ecfoundation.org "Community Grants" Edmonton Community Foundation current eligibility charity
length|medium

---

### tool (web.run)
The output of this plugin was redacted.

---

### assistant
Yes. I think there is a plausible path to getting meaningful outside funding, especially because YEGFacts sits at the intersection of **AI, civic information, journalism, open data, misinformation resistance, and open-source technology**.

My recommendation is **do not create a nonprofit immediately**. Start YEGFacts under your existing corporation, but structure it so the public-interest YEGFacts operation can be spun into a separate nonprofit later.

## The structure I would aim for

Long term, I increasingly like this:

```text
                    YEGFacts
             public civic institution
              free / non-partisan
                       │
                       │ uses
                       ▼
                 CivicFacts
             AI evidence platform
          commercial/open-source product
```

Eventually:

```text
YEGFacts non-profit                  Your corporation
──────────────────                   ────────────────
Editorial mission                    CivicFacts software
Facts                                AI infrastructure
Evidence archive                     Managed hosting
Public data requests                 Integrations
Community contributors               Commercial customers
Donations/grants                      SaaS/API revenue
Membership/supporters                 Consulting
```

But **not yet**.

For the next phase I would run both as projects of your corporation:

```text
Your Alberta corporation
├── YEGFacts
│   └── public-interest Edmonton project
│
└── CivicFacts
    └── reusable technology
```

Keep separate bookkeeping/cost centres from day one.

That gives you the greatest flexibility to pursue commercial technology funding right now.

---

# There are some surprisingly relevant funding opportunities

## 1. NRC IRAP — probably the first one I would investigate

This is potentially a very good match for the **CivicFacts engine**, rather than saying:

> Give me money to write Edmonton fact checks.

Frame it as:

> We're developing an AI evidence-analysis system that uses independent frontier models, source provenance, adversarial review, evidence transferability, automated information requests, privacy-safe publication and continuous re-evaluation.

NRC IRAP supports incorporated Canadian for-profit SMEs developing and commercializing innovative technology products/services. It can provide advisory help and potentially project funding for technical innovation/R&D. Unlike some later-stage programs, the general IRAP eligibility page does not state a two-year operating-history requirement. citeturn294193search0

I'd contact them relatively early, before doing a huge amount of development.

The commercial story matters:

> YEGFacts is the first real-world deployment and validation environment for CivicFacts.

That's much stronger than pitching YEGFacts itself as the commercial product.

---

# 2. SR&ED + Alberta Innovation Employment Grant

Potentially significant if development genuinely involves technological uncertainty and experimentation.

Federal SR&ED currently gives most eligible CCPCs a refundable **35% investment tax credit** on qualified expenditures up to the applicable expenditure limit. citeturn562455search10

Alberta's **Innovation Employment Grant** then provides 8% on eligible Alberta SR&ED expenditures and potentially 20% on spending above the company's base level, subject to its rules. citeturn449178search9

This does **not** mean:

> "I wrote some AI software, therefore 55% gets reimbursed."

Normal application development isn't SR&ED.

But some of what we've been discussing could potentially involve real experimental development:

- reliable multi-model evidence synthesis;
- detecting model agreement/disagreement;
- automated transferability assessments;
- reducing hallucinated evidence;
- privacy-preserving document publication;
- automated claim decomposition;
- reproducible provenance;
- measuring model-review reliability;
- handling contradictory sources.

If you are genuinely experimenting because existing techniques don't straightforwardly solve the technical problem, part of the work may qualify.

This is worth discussing with someone experienced with **software SR&ED**, before you begin, because documentation of experiments and technological uncertainty matters.

---

# 3. Amii — very interesting immediately

This one jumped out because it could directly reduce your biggest variable expense: model usage.

Amii's **ML Exploration** program is currently accepting applications for Fall 2026, with a **September 6, 2026 deadline**. It's fully sponsored, valued at $3,000, and is for early-stage software companies exploring AI with annual revenue up to $2M. citeturn617731search3

More interestingly, active startups in Amii's ML Exploration or Level Up programs may qualify for **up to US$30,000 in Claude API credits**. citeturn617731search12

For YEGFacts/CivicFacts, $30K of frontier-model usage is much more useful than $30K of generic accelerator workshops.

Amii's **Level Up** program is also fully sponsored, valued at $10K, and its next listed opportunity is the Winter 2027 cohort. citeturn617731search10

Given your concept is intentionally multi-model, I'd also pursue comparable startup-credit programs from OpenAI/Google if accessible through startup ecosystems.

---

# 4. Edmonton's Community Safety & Wellness Accelerator

This is less obvious, but worth talking to them.

Edmonton Unlimited's accelerator specifically targets **AI/ML ventures creating positive social impact in Edmonton**. It includes mentorship, government/community introductions, customer connections and potential access to the ScaleGood Fund. citeturn617731search2

The question is whether:

> better civic information / misinformation resistance / accountable public decision-making

fits their definition of community safety and wellness.

Maybe. I wouldn't contort YEGFacts to qualify, but I would contact them.

---

# 5. PrairiesCan Regional AI Initiative — later, potentially substantial

This becomes very interesting once the corporation is older and CivicFacts is more mature.

PrairiesCan's **Regional Artificial Intelligence Initiative (RAII)** is currently open continuously through **December 31, 2028**, subject to funds remaining. citeturn343696view0

It explicitly covers AI commercialization in **digital industries**, including digital/media/content industries. Eligible activities include commercializing AI technologies, building startup teams, improving data governance, and developing AI-driven products. citeturn100566view0

For a business, funding is:

> **$250K–$5M per project**, with up to 50% interest-free repayable funding. citeturn100566view0

But a for-profit applicant currently must have been operating for at least two years and have at least one FTE, among other requirements. citeturn106613view0

So this is **not MVP money**.

It's potentially:

> CivicFacts has YEGFacts working, has several customers/pilots, and now needs $500K–$1M to productize and expand across Canada.

That would be a strong story.

---

# 6. Journalism funding — possible, but later

There are potentially significant programs here, but your current AI-first structure creates some complications.

### Local Journalism Initiative

The federal LJI explicitly funds **original civic journalism** and allows both private and nonprofit Canadian news organizations. citeturn562455search3

YEGFacts is directionally very compatible.

But we'd need to see how its administering organizations classify an AI-driven evidence platform versus a normal newsroom.

### Canada Periodical Fund

Digital publications can qualify, including publications operated by corporations or nonprofits. But currently they must have:

- completed a 12-month publishing cycle;
- at least $10K eligible editorial expenses;
- at least $10K non-government revenue;
- primarily original Canadian content;
- a named editor;
- written content from **more than one person**;
- authors identified;
- regular publication. citeturn562455search0turn562455search1

So YEGFacts could potentially evolve toward eligibility, but an almost entirely AI-produced publication might not fit cleanly.

I would **not design YEGFacts around qualifying for this grant**. If it eventually qualifies naturally, excellent.

---

# 7. Journalism labour tax credit could eventually become substantial

This gets interesting if YEGFacts eventually employs actual researchers/journalists.

A Qualified Canadian Journalism Organization currently has to meet various criteria, including producing original news content; the eligibility path also asks whether it regularly employs **two or more arm's-length journalists**. citeturn163890search3turn163890search6

The Canadian Journalism Labour Tax Credit supports newsroom employee wages. The enhanced rate is 35% through 2026 and returns to 25% afterward under the current law; qualifying labour expenditure is capped at $85K per employee. citeturn906818search0turn906818search2

If YEGFacts someday has three researchers earning $80K:

```text
3 × $80K × 25%
≈ $60K/year
```

potential refundable support under today's post-2026 rate, assuming the organization and employees actually qualify.

That's potentially meaningful.

But that's a **mature-YEGFacts scenario**, not something I'd optimize for now.

---

# What becoming a nonprofit would unlock

There are grants your corporation cannot access.

For example, Alberta's **Community Initiatives Program Project Grant** currently offers up to **$75,000** to Alberta nonprofits for community-driven projects, including technology and website/application development. citeturn564579view2turn564579view3

But there are catches:

- nonprofit required;
- at least one full year of operation;
- matching contribution equal to the amount requested;
- standalone research projects are ineligible. citeturn564579view3

So a future application might be:

> **Build an open civic evidence and data-literacy platform for Edmontonians**

rather than:

> Fund our fact-check research.

A nonprofit formed now wouldn't immediately qualify anyway because of that one-year history requirement.

That's another reason I wouldn't rush.

---

# There is also a much more ambitious journalism-nonprofit path

Canada has a special status called a **Registered Journalism Organization (RJO)**.

An RJO can:

- be tax-exempt;
- issue charitable-style donation receipts;
- receive gifts from registered charities.

But first it must qualify as a QCJO, be operated exclusively for journalism, be primarily engaged in original news, and have an arm's-length board. It cannot effectively be controlled by one person, and generally no single donor can represent more than 20% of annual revenue. citeturn163890search4turn163890search7

That's fascinating for YEGFacts because those constraints are actually aligned with **institutional independence**.

But it would mean surrendering some founder control.

That's something I'd consider only when YEGFacts is clearly becoming a permanent Edmonton institution.

---

# Can a nonprofit still support your work financially?

Yes.

"Nonprofit" does **not** mean everyone must volunteer.

It means profits aren't distributed to members/owners.

A nonprofit can have paid employees and executives. Under the federal not-for-profit framework, reasonable remuneration for officers and employees is explicitly contemplated. citeturn316581search0

So you could eventually be:

> Founder / Executive Director / Technical Lead  
> $X salary

What you can't do is:

> YEGFacts made $300K profit → distribute $200K dividend to founder.

This distinction matters.

If YEGFacts itself succeeds hugely financially, a for-profit corporation gives you substantially more personal upside.

---

# The hybrid solves this nicely

This is why I increasingly think the eventual answer might be:

```text
                 YEGFacts NFP
                     │
          independent editorial board
                     │
          grants / donations / members
                     │
           pays reasonable costs
                     │
                     ▼
        CivicFacts / your corporation
           software + infrastructure
```

But those transactions must be transparent and arm's-length.

For example:

> YEGFacts paid CivicFacts Inc. $18,000 in 2028 for hosting, AI inference, evidence storage and technical support. Founder X has an ownership interest in CivicFacts. The contract was approved by independent directors after reviewing comparable pricing.

Otherwise people will reasonably suspect:

> "The nonprofit is just funneling grants into the founder's company."

Governance matters enormously here.

Alternatively, YEGFacts itself employs you directly and CivicFacts remains separate.

---

# What I'd do now

### Phase 1 — next 6–12 months

**Keep it inside your existing corporation.**

Create:

```text
YEGFacts
public project

CivicFacts
technology project
```

Separate bookkeeping.

Make YEGFacts' operator transparent:

> YEGFacts is currently operated and funded by [legal corporation], an Alberta company founded/controlled by the project's founder.

Don't pretend it is already an independent nonprofit.

Instead establish the independence through:

- public methodology;
- public model prompts;
- multi-model review;
- funding disclosures;
- corrections;
- public Git history;
- conflict policy.

Meanwhile pursue:

**1. Amii / AI credits**  
**2. NRC IRAP conversation**  
**3. SR&ED/Alberta IEG evaluation**  
**4. Edmonton Unlimited connections**

Those all fit the existing-corporation model better.

### Phase 2 — after YEGFacts proves demand

Ask:

> What is this becoming?

If it's mostly:

**an AI SaaS business with an Edmonton showcase**

keep it corporate.

If it's becoming:

**an Edmonton civic institution supported by residents, journalists and grants**

spin YEGFacts into a nonprofit and keep CivicFacts commercial.

You don't need to decide that now.

---

# And yes: YEGFacts.ca is a good domain

I would keep it.

I'd rate it around **9/10 for this project**.

### Strengths

**Short.**

`YEGFacts.ca`

is much easier to drop into a Facebook comment than:

`EdmontonCivicEvidenceProject.ca`.

**Obviously local to Edmontonians.**

YEG is strongly associated locally with Edmonton.

**`.ca` is right.**

This should feel Canadian/local rather than like a generic international advocacy operation.

**Doesn't encode an ideology.**

Compare:

`EdmontonUrbanism.ca`

`MoveEdmonton.ca`

`BetterStreetsYEG.ca`

All immediately imply a policy direction.

`YEGFacts` doesn't.

**Expandable brand structure.**

Eventually:

```text
YEGFacts.ca       Edmonton
YYCFacts.ca       Calgary
YWGFacts.ca       Winnipeg
...
```

powered by:

```text
CivicFacts
```

I'm not saying those should necessarily be the names, but the architecture is possible.

---

## The only downside is "Facts"

Someone can attack it with:

> Who made you the arbiter of facts?

But I actually think the methodology we're designing answers that very well:

> **We aren't. Every finding shows its evidence, independent AI reviews, disagreements, extrapolations, calculations and revision history. Challenge it yourself.**

That can become part of the brand.

I prefer `YEGFacts.ca` over something softer like `YEGEvidence.ca`, which is technically more precise but much less memorable.

Also, a quick search doesn't show an obvious existing Edmonton civic organization using **YEGFacts**; the main similar result is simply the City's generic “Edmonton Facts and Figures” page. citeturn647317search0

Before formally incorporating or trademarking the name, I'd still run proper NUANS/CIPO searches.

---

## The funding opportunity I would pursue first

There is one concrete action I'd investigate **this week**:

**Amii ML Exploration / startup benefits**, because the Fall 2026 deadline is September 6 and participation can potentially lead to up to **US$30K of Claude credits**. citeturn617731search3turn617731search12

Then I'd speak to an NRC IRAP advisor once you have a concise CivicFacts technical/product description.

Those two are much more realistic near-term opportunities than creating a nonprofit specifically to chase grants.

Because funding programs change, I can also periodically look for new Canadian/Alberta civic-tech, journalism and AI funding opportunities that fit YEGFacts/CivicFacts.

genui{"suggest_automation":{"label":"Track YEGFacts funding opportunities"}}

---

### user
> Keep separate bookkeeping/cost centres from day one.
>
> Separate bookkeeping.

why would I do that? seems like premature optimization



> There is one concrete action I'd investigate **this week**:

ok, I'll check
then I'll try to build MVP

---

### assistant
I agree — separate bookkeeping/cost centres is premature at MVP stage.

For now, I’d just run YEGFacts through your existing corporation and treat its expenses like any other business expenses. At most, add a simple memo/tag like `YEGFacts` in your accounting software if it’s effortless, so you can later see roughly what it cost. No separate bank account, books, or elaborate allocation.

I’d only formalize separation once one of these happens:

- YEGFacts starts receiving its own grants/donations/revenue;
- you need to report project-specific costs to a funder;
- you spin it into a nonprofit;
- CivicFacts/YEGFacts becomes significant enough that you actually care about standalone profitability.

Until then, the more important thing is building the MVP.

For the MVP, I’d keep scope fairly ruthless: **static Astro site, 5–10 excellent topics, public methodology/prompts, multi-model review format, evidence archive/provenance, Git history, and “Suggest a topic.”** The email/data-request automation can come immediately after you prove the editorial workflow works manually once or twice.

And yes, checking Amii first makes sense because of the near-term deadline; after that I’d focus on shipping rather than grant-hunting.

---

### user
domain is registered right now

what're the next steps?
I think I'll pass this conversation to the local claude fable 5 agent for reading through it and deciding on the implementation 

anything else we need to brainstorm before that?

---

### assistant
Yes. I think you're basically at the point where **implementation is more valuable than further conceptual brainstorming**.

Before handing it to the implementation agent, I would freeze a few decisions so it doesn't accidentally redesign the product while coding.

### Decisions worth locking now

1. **Core identity**
   - `YEGFacts.ca`
   - Edmonton civic evidence / fact-checking platform
   - non-partisan, open-source, evidence-first
   - not an advocacy organization
   - AI is the research labour, not the authority

2. **Standard article output**
   Every topic should have, in this order:
   - **Finding**
   - **Evidence basis**
   - **Confidence**
   - one-line answer
   - one-paragraph answer
   - TL;DR
   - claim breakdown
   - Edmonton evidence
   - comparable-city / broader evidence
   - transferability analysis
   - evidence supporting the claim
   - evidence challenging it
   - what remains unknown
   - missing evidence / requests
   - sources
   - AI review
   - revision history
   - `Challenge this conclusion`
   - `Suggest a topic`

3. **Multi-model methodology**
   - every model performs the **entire research/review task**
   - same public methodology
   - independent/blind first pass
   - evidence is merged
   - every model gets a second pass to challenge/reconsider
   - no privileged model
   - disagreement remains visible
   - adding/replacing models later triggers re-review

4. **Evidence philosophy**
   This is critical enough that I'd write it into the initial methodology:

   **Evidence quality** and **Edmonton applicability** are separate dimensions.

   Evidence may include:
   - direct Edmonton observations/data;
   - Edmonton before/after evidence;
   - comparable Canadian cities;
   - relevant North American cities;
   - international comparison cases;
   - rigorous broader research;
   - modelling/theory.

   External evidence must say explicitly:
   - why the comparison is relevant;
   - what differs from Edmonton;
   - what can reasonably be extrapolated;
   - what cannot.

5. **Missing evidence is an output**
   An article doesn't stop at `insufficient evidence`.

   It produces:

   > What information would allow a stronger conclusion?

   Later the evidence-request agent:
   - finds the authoritative holder;
   - checks whether it already exists;
   - drafts an email;
   - human sends;
   - reads replies;
   - drafts follow-ups;
   - archives responses;
   - triggers re-review.

6. **Human control points**
   For now:
   - human sends external correspondence;
   - human approves public correspondence/redactions;
   - human merges material finding changes.

   Almost everything else can eventually automate.

7. **Public/open boundary**
   I would tell the implementation agent to architect for:

   **Public:**
   - articles;
   - methodology;
   - prompts;
   - evidence metadata;
   - calculations;
   - model structured reviews;
   - synthesis logic;
   - comparison methodology;
   - Git history;
   - releasable evidence.

   **Private:**
   - API keys;
   - raw correspondence containing PII;
   - credentials;
   - unreleasable evidence;
   - operational infrastructure.

   Don't spend much time deciding AGPL vs another licence yet. That's reversible enough before outside contributors arrive.

---

## One thing I would add before implementation: an evidence model

This may actually be **more important than the article Markdown schema**.

The fundamental object in YEGFacts isn't an article.

It's:

```text
CLAIM
   ↓
EVIDENCE
   ↓
INTERPRETATION
   ↓
FINDING
```

One piece of evidence may support ten different articles.

For example, don't architect this:

```text
articles/electric-buses/sources/
```

as though a source belongs to an article.

Architect:

```text
evidence/
  YF-EV-000001
  YF-EV-000002
  YF-EV-000003

topics/
  electric-buses
  transit-budget
```

and both topics reference evidence IDs.

Eventually that naturally becomes your civic knowledge graph.

The implementation agent should think **evidence-first, pages second**.

---

# MVP boundary

I would strongly resist implementing everything we've invented immediately.

### MVP 0.1

Build:

- Astro static site;
- structured evidence schema;
- structured topic/article schema;
- one excellent real article;
- public source/evidence pages;
- responsive progressive-disclosure UI;
- copy/share functionality;
- Git-backed revision history;
- `Suggest a topic`;
- methodology page;
- about/independence page.

Use the **e-bus article** as the first real end-to-end test.

That's actually an excellent first article because it proves YEGFacts isn't simply defending current City policy.

### MVP 0.2

Add:

- ChatGPT / Claude / Gemini adapters;
- structured independent reviews;
- evidence merging;
- second-round cross-review;
- disagreement UI;
- reproducible review runs.

### MVP 0.3

Add:

- evidence archival;
- immutable hashing;
- R2/public evidence storage;
- source-change monitoring;
- automated re-review.

### MVP 0.4

Add:

- research@yegfacts.ca;
- evidence-request agent;
- email ingestion;
- follow-up drafting;
- privacy/redaction pipeline;
- public correspondence.

That sequencing will save you from spending two months building an automated newsroom before discovering that the article/evidence model needs changing.

---

# Immediate non-coding things I'd do

Since the domain now exists:

- create a public GitHub repository or organization;
- reserve `YEGFacts` handles on the few social platforms you may eventually use;
- set up `research@yegfacts.ca` and perhaps `hello@yegfacts.ca`;
- put up even a minimal placeholder page once the repo exists;
- write a short `MISSION.md` / methodology principles document;
- use the e-bus question as the first acceptance test.

I wouldn't bother with logos, nonprofit incorporation, detailed accounting, newsletters, fundraising infrastructure, or a complex contributor system yet.

---

## The acceptance test I would give the implementation agent

This is the key question:

> **Can the system publish the Edmonton e-bus investigation we just performed in a way that a resident can understand in 10 seconds, a journalist can audit in 10 minutes, and a researcher can reproduce in an hour?**

If the architecture handles that well, you're probably building the right thing.

After that works, run something very different—perhaps **winter cycling feasibility**—because it exercises comparative-city evidence and transferability instead of mostly direct Edmonton evidence.

If both work cleanly, the core model is probably sound.

I think that's enough conceptual definition to hand the conversation over. The remaining questions are best answered by actually building the first two articles rather than designing more abstractions upfront.

---

### user
[image_asset_pointer]
[image_asset_pointer]
[image_asset_pointer]
ok, let's just pickup a tmp logo for the project, and a visual style
can't work on a project without some visual style locked in

---

### user
[image_asset_pointer]
[image_asset_pointer]
[image_asset_pointer]
ok, let's just pickup a tmp logo for the project, and a visual style
can't work on a project without some visual style locked in

don't generate, just choose from these

---

### assistant
[model_editable_context] {'content_type': 'model_editable_context', 'model_set_context': ''}

---

### assistant
Pick **the second image, top-right — “Geometric Minimalist.”**

It fits YEGFacts best.

### Why this one

- **Clearly Edmonton**: the Legislature-dome reference gives it local identity without needing text.
- **Evidence/research signal**: the magnifying-glass element fits the project naturally.
- **Institutional without looking governmental**: important distinction.
- **Neutral**: no obvious cycling, housing, environmental, tech, or political symbolism.
- **Scalable**: much simpler than the first logo and should survive as a favicon/avatar.
- **Not overly “AI”**: AI should be part of the methodology, not make the project look like another AI startup.
- **Can mature well**: we can simplify/refine it later without changing the overall identity.

I would **not** use the first image as the main logo. It communicates the idea immediately, but it is too busy and feels a little like a municipal consultancy or government program.

From the third sheet, **#10 Verified Compass** and **#7 Labyrinth to Truth** are decent icons, but they're generic. They could belong to almost any fact-checking organization. The Edmonton architectural reference is valuable.

---

# Temporary visual style: lock this too

I would use the logo to establish an **editorial / civic-institutional** style rather than a SaaS style.

### Palette

Use roughly:

- **Deep forest:** `#123F35` — primary brand
- **Dark navy:** `#123B5D` — evidence/data secondary
- **Muted gold:** `#C3A35E` — small highlights only
- **Warm off-white:** `#FAF9F6` — primary background
- **Charcoal:** `#20272B` — body text
- **Light neutral:** `#E8E9E6` — borders/background panels

The site should mostly be **off-white + dark text + forest/navy**.

Gold should be restrained.

### Typography

I'd use:

**Inter** for almost everything.

Possibly later:

- headings: **Source Serif 4**
- UI/body/data: **Inter**

That combination would make articles feel slightly more like a serious publication/research institution.

For MVP, **Inter everywhere is completely fine**.

---

# Visual personality

Think:

**public research institute + modern newsroom + open-data project**

Not:

**AI startup dashboard**

So avoid:

- neon gradients;
- huge rounded SaaS cards everywhere;
- glassmorphism;
- animated blobs;
- excessive illustrations;
- overly colourful verdict badges;
- giant AI branding.

Use:

- strong typography;
- lots of whitespace;
- thin rules;
- restrained cards;
- data tables;
- citations;
- charts;
- evidence provenance;
- visible dates/statuses.

Something roughly like:

```text
YEGFacts.ca              Topics  Methodology  Evidence  Suggest a topic
───────────────────────────────────────────────────────────────────────

TRANSPORTATION

Did Edmonton's electric-bus purchase
become a financial fiasco?

Serious procurement failure;
final financial loss not established.

Evidence basis
DIRECT EDMONTON EVIDENCE

Confidence
HIGH on operational failure · MODERATE on financial loss

───────────────────────────────────────────────────────────────────────

ONE LINE

Edmonton's Proterra buses substantially failed to meet...
                                                     [Copy]

───────────────────────────────────────────────────────────────────────
```

Very little decoration necessary.

---

# Verdict styling

Another thing worth locking now: **don't use traffic-light fact-check colours as the whole identity.**

A giant:

🟢 TRUE  
🔴 FALSE

would push YEGFacts toward simplistic fact-check theatre.

Instead, finding labels should look editorial:

> **FINDING**  
> Serious procurement failure; financial loss not established

And only use subtle semantic colours for things like:

- Supported
- Partially supported
- Not established
- Contradicted

The **words should carry the conclusion**, not red/green.

---

# Logo variants you'll eventually need

For implementation, don't worry about perfect production assets yet. Just have the agent treat this as the temporary direction:

**Primary:** symbol + `YEGFacts.ca`  
**Compact:** symbol only  
**Wordmark:** `YEGFacts.ca` only  
**Monochrome:** forest/navy single-colour version

I would also **drop the long tagline from the logo itself** on the actual site.

Use:

> **YEGFacts.ca**

as the logo.

Then elsewhere on the homepage:

> Edmonton civic evidence, checked against the record.

Much cleaner.

So I'd tell the implementation agent:

> **Temporary brand direction: use the Geometric Minimalist logo concept (second concept sheet, top-right). Visual language is restrained civic/editorial: off-white, deep forest green, dark navy, muted gold; typography-led, evidence-heavy, minimal decoration. Treat the logo as temporary and don't spend implementation time perfecting it.**

That's enough visual identity to start building without getting stuck in branding.