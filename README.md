# Midazolam versus Clonazepam — Seizures, Acute Agitation & Anxiety — Interactive Decision Algorithm

An interactive, referenced walkthrough of the decision algorithm for choosing
between midazolam and clonazepam — in seizure emergencies (Panel A: the
intravenous-access-gated route/drug choice, escalation to second-line
therapy, and refractory status epilepticus) and in acute agitation or acute
anxiety/panic (Panel B, where no direct comparison of the two drugs exists).
Every box and decision point in either diagram can be selected to reveal, in
one place: what the step means, why the algorithm calls for it, the exact
dosing as authored, and the sources behind it.

**Live site:** https://satbuhan.github.io/midazolam-clonazepam-protocol/ *(once GitHub Pages is enabled — see Status)*

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.24112591.svg)](https://doi.org/10.5281/zenodo.24112591)

This tool is part of a growing atlas of tools built the same way:

- [Clinical Algorithm Atlas](https://satbuhan.github.io/clinical-algorithm-atlas/) — the hub page for all of them
- [Acute aortic dissection — initial medical management](https://github.com/satbuhan/aortic-dissection-protocol) ([live site](https://satbuhan.github.io/aortic-dissection-protocol/))
- [Butyrophenone selection — acute agitation & hyperactive delirium](https://github.com/satbuhan/agitation-delirium-protocol) ([live site](https://satbuhan.github.io/agitation-delirium-protocol/))
- [Influenza antiviral selection — baloxavir marboxil vs oseltamivir](https://github.com/satbuhan/influenza-antiviral-protocol) ([live site](https://satbuhan.github.io/influenza-antiviral-protocol/))
- [Dexketoprofen vs ibuprofen — selecting an NSAID for acute pain](https://github.com/satbuhan/nsaid-pain-protocol) ([live site](https://satbuhan.github.io/nsaid-pain-protocol/))
- [Anticoagulant reversal in gastrointestinal haemorrhage](https://github.com/satbuhan/anticoagulant-reversal-protocol) ([live site](https://satbuhan.github.io/anticoagulant-reversal-protocol/))
- [The adult with obesity in emergency and critical care](https://github.com/satbuhan/obesity-critical-care-protocol) ([live site](https://satbuhan.github.io/obesity-critical-care-protocol/))
- [Dapagliflozin / SGLT2 inhibitor — overdose and acute illness management](https://github.com/satbuhan/dapagliflozin-overdose-protocol) ([live site](https://satbuhan.github.io/dapagliflozin-overdose-protocol/))
- [Lidocaine vs prilocaine — local anaesthesia for laceration repair](https://github.com/satbuhan/lidocaine-prilocaine-protocol) ([live site](https://satbuhan.github.io/lidocaine-prilocaine-protocol/))
- [Reperfusion therapy in acute pulmonary thromboembolism](https://github.com/satbuhan/pte-thrombolysis-protocol) ([live site](https://satbuhan.github.io/pte-thrombolysis-protocol/))
- [LMWH selection & renal dosing in NSTE-ACS](https://github.com/satbuhan/lmwh-nste-acs-protocol) ([live site](https://satbuhan.github.io/lmwh-nste-acs-protocol/))
- [Ketamine in head injury — safety & complication management](https://github.com/satbuhan/ketamine-head-injury-protocol) ([live site](https://satbuhan.github.io/ketamine-head-injury-protocol/))
- [Vasopressor (aminergic) agent selection in shock states](https://github.com/satbuhan/vasopressor-shock-protocol) ([live site](https://satbuhan.github.io/vasopressor-shock-protocol/))
- [Whole-body CT in traumatic circulatory shock](https://github.com/satbuhan/wbct-trauma-protocol) ([live site](https://satbuhan.github.io/wbct-trauma-protocol/))
- [Epinephrine/Adrenaline revisited — contemporary decision-making algorithm](https://github.com/satbuhan/epinephrine-revisited-protocol) ([live site](https://satbuhan.github.io/epinephrine-revisited-protocol/))
- [Ketamine in emergency and critical care — indication-based decision algorithm](https://github.com/satbuhan/ketamine-indications-protocol) ([live site](https://satbuhan.github.io/ketamine-indications-protocol/))
- [Tenecteplase versus alteplase — fibrinolysis in STEMI](https://github.com/satbuhan/tenecteplase-alteplase-stemi-protocol) ([live site](https://satbuhan.github.io/tenecteplase-alteplase-stemi-protocol/))
- [Blood gas-guided assessment of the chemical warfare agent casualty](https://github.com/satbuhan/cwa-blood-gas-protocol) ([live site](https://satbuhan.github.io/cwa-blood-gas-protocol/))
- [Calcium channel blocker toxicity — phenotype-guided management](https://github.com/satbuhan/ccb-toxicity-protocol) ([live site](https://satbuhan.github.io/ccb-toxicity-protocol/))
- [Choosing an adjunct to haloperidol in hyperactive delirium with severe agitation](https://github.com/satbuhan/haloperidol-adjunct-protocol) ([live site](https://satbuhan.github.io/haloperidol-adjunct-protocol/))
- [Selection of a neuromuscular blocking agent for rapid sequence induction and intubation](https://github.com/satbuhan/succinylcholine-rocuronium-protocol) ([live site](https://satbuhan.github.io/succinylcholine-rocuronium-protocol/))
- [Pharmacological pain management in elderly patients](https://github.com/satbuhan/geriatric-pain-protocol) ([live site](https://satbuhan.github.io/geriatric-pain-protocol/))
- [Metoclopramide versus Ondansetron — Antiemetic Selection by Clinical Setting](https://github.com/satbuhan/metoclopramide-ondansetron-protocol) ([live site](https://satbuhan.github.io/metoclopramide-ondansetron-protocol/))

## Why this exists

A flowchart alone tells a reader *what* to do at each step but not *why*,
and a reader outside the authors' own team cannot easily check the evidence
behind a specific number (a dose, a percentage, a certainty rating). This
page keeps the original algorithm exactly as authored, and attaches the
clinical reasoning and literature to each box without cluttering the diagram
itself.

The algorithm this page presents is Figure 1 of a systematic review by the
same authors, "Midazolam versus clonazepam in the management of seizures
and acute agitation or anxiety: a systematic review" (manuscript in
preparation, 108 references); the supplementary content on this page draws
on that review's evidence base.

## Status

This is a working version, built to be tested on both desktop and mobile.
Several things are worth flagging explicitly:

- **This is the first tool in the atlas to draw two independent diagrams on
  one page**, because the source figure genuinely is two separate
  algorithms (Panel A: seizures; Panel B: agitation/anxiety), not one
  continuous flow. `assets/app.js` was generalised to render two flow grids
  (`#flow-a`/`#edges-a` and `#flow-b`/`#edges-b`), each driven by its own
  `EDGES_A`/`EDGES_B` array, rather than the single shared `LAYOUT`/`EDGES`
  pair every earlier tool used — `NODES`, `REFERENCES` and `GLOSSARY` stay
  single combined arrays; only the diagram geometry is split. See
  METHODOLOGY.md for the general pattern.
- **The "Still seizing after 5 minutes?" decision's Observe box sits beside
  the diamond, not below it** — matching the source, which draws it that
  way, and avoiding a real rendering bug this introduced: an earlier layout
  placed Observe directly below the decision and directly above
  Repeat-dose, which put it in the path of the decision's other ("Yes")
  edge and made that line pass invisibly behind the Observe box (edges
  render under nodes). Grouping Observe with the decision in a 2-wide row
  fixed this and is more faithful to the source besides.
- **The evidence-sidebar box ("Evidence: Midazolam IM vs clonazepam IV...")
  draws no arrows in the source at all** — a floating aside beside the main
  trunk. It is grouped with Repeat-dose (2-wide) purely for position, using
  the dashed "note" styling already built into this atlas's CSS for exactly
  this case, with no edge drawn to or from it, matching the source exactly.
- **Reference verification for this tool used a different workflow from
  every earlier tool in this atlas, by the author's explicit choice.** In
  every prior tool, Claude independently verified each reference itself via
  web search within this session — a process that reliably exhausted this
  session's shared search budget on manuscripts with 90+ references (as
  happened repeatedly building the Ketamine tool) and consumed a large share
  of the available context on citation-checking rather than engineering.
  For this tool (108 references), that verification step was run externally
  (Gemini) instead, using its own search budget rather than this session's.
  **Result: all 108 references in `assets/content.js`'s `REFERENCES` array
  are now marked `"Independently verified against its primary source
  (external review by Gemini, 2026-11-02)."` in their own `kind` field** —
  no corrections or fabrications were found, a cleaner result than the
  Ketamine tool's 98-reference pass (which found two confirmed fabrications,
  one fabricated-as-cited substitution, and several smaller corrections).
  Claude did not take that clean result on trust: before applying it, 8
  references were independently spot-checked via web search, prioritizing
  the diagram-cited ones and the single most fabrication-prone-looking
  entry — **ref 33**, a 2026 head-to-head midazolam-vs-clonazepam
  prehospital trial that is the primary source behind the evidence-sidebar
  box, which an initial author-name search failed to find but a second,
  differently-worded search confirmed is real (PubMed PMID 42641490,
  ScienceDirect PII S1059131126002359). All 8 spot-checked references,
  including that one, checked out.
- **Ref 28**'s title has a missing space ("PaxlovidInformation From FDA and
  Guidance for AES Members") — confirmed to be a text-extraction artifact
  from the source manuscript, not an error in this file or in the external
  review; its DOI and PMID are correct and unaffected.

## Disclaimer

This is an academic / educational reference tool, not a substitute for
institutional protocol or bedside clinical judgement. Verify any dose or
threshold against current local protocol before clinical use.

## How it's built

Plain HTML/CSS/JS, no build step and no framework — a single static site
that GitHub Pages can serve directly.

```
index.html           page structure (two panel sections + shared readout)
assets/style.css      design (the "paper" masthead/references,
                       the diagram scope + readout panel)
assets/content.js     ← single source of truth for every node's text,
                       dosing, and reference list. Edit this file to change
                       what the page says.
assets/app.js          rendering + interaction (builds both diagrams and
                       their connector lines from content.js, handles the
                       click-to-expand panel on desktop and the bottom
                       sheet on mobile)
```

### Running it locally

No install needed:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Editing content

Open `assets/content.js`. Each entry in `NODES` is one box or decision
diamond from the algorithm (`meaning`, `rationale`, optional `cautions`, and
`refs` pointing at numbered entries in `REFERENCES`). Add or edit a
reference in `REFERENCES` and point to it by `id` from any node. Never
change a node's `label` or `sub` text without the author team's sign-off —
those fields are the algorithm itself, transcribed verbatim from Figure 1.
Boxes with several distinct sentences or dosing options (e.g.
`mdz-noniv`'s route-by-route dosing, both Panel B content boxes) carry the
source box's own line breaks as literal `\n` — preserve those exactly; they
render as separate lines, not flattened into comma-separated prose, because
that is how the original boxes are drawn.

### Building the next tool in this atlas

See [`METHODOLOGY.md`](METHODOLOGY.md) — the full build/verification
process (fidelity rule, content schema, citation verification, QA steps),
written so that any collaborator or AI assistant can pick up this project
in a fresh session and build the next tool the same way.

## License

Content and code are released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) —
share and adapt with attribution, non-commercially, under the same license.
