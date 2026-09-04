## Standards

- [methodology/changelog.yaml:377](methodology/changelog.yaml:377) still links to the removed `/methodology#launch-slate` anchor. [changes.astro:91](src/pages/methodology/changes.astro:91) renders that link on the site. Grepping only `src/` misses data-sourced links.

## Spec

- The dangling changelog link violates the explicit no-dangling-reference constraint. The other checks pass: the methodology names Ildar twice, the panel-quality sentence remains self-contained, v1.17 says its entry preserves the record, and the built methodology page has nine section anchors with nine matching outline targets.

Summary: one finding on each axis, both caused by the stale v1.17 link.

REVISE


