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

This tool is part of a growing atlas of tools built the same way:

- [Clinical Algorithm Atlas](https://satbuhan.github.io/clinical-algorithm-atlas/) — the hub page for all of them
- [Ketamine in head injury — safety analysis & complication management](https://github.com/satbuhan/ketamine-head-injury-protocol) ([live site](https://satbuhan.github.io/ketamine-head-injury-protocol/))
- [Reperfusion therapy in acute pulmonary thromboembolism](https://github.com/satbuhan/pte-thrombolysis-protocol) ([live site](https://satbuhan.github.io/pte-thrombolysis-protocol/))
- [Acute aortic dissection — initial medical management](https://github.com/satbuhan/aortic-dissection-protocol) ([live site](https://satbuhan.github.io/aortic-dissection-protocol/))
- [Butyrophenone selection — acute agitation & hyperactive delirium](https://github.com/satbuhan/agitation-delirium-protocol) ([live site](https://satbuhan.github.io/agitation-delirium-protocol/))
- [Influenza antiviral selection — baloxavir marboxil vs oseltamivir](https://github.com/satbuhan/influenza-antiviral-protocol) ([live site](https://satbuhan.github.io/influenza-antiviral-protocol/))
- [Dexketoprofen vs ibuprofen — selecting an NSAID for acute pain](https://github.com/satbuhan/nsaid-pain-protocol) ([live site](https://satbuhan.github.io/nsaid-pain-protocol/))
- [Anticoagulant reversal in gastrointestinal haemorrhage](https://github.com/satbuhan/anticoagulant-reversal-protocol) ([live site](https://satbuhan.github.io/anticoagulant-reversal-protocol/))
- [The adult with obesity in emergency and critical care](https://github.com/satbuhan/obesity-critical-care-protocol) ([live site](https://satbuhan.github.io/obesity-critical-care-protocol/))
- [Dapagliflozin / SGLT2 inhibitor — overdose and acute illness management](https://github.com/satbuhan/dapagliflozin-overdose-protocol) ([live site](https://satbuhan.github.io/dapagliflozin-overdose-protocol/))
- [Lidocaine vs prilocaine — local anaesthesia for laceration repair](https://github.com/satbuhan/lidocaine-prilocaine-protocol) ([live site](https://satbuhan.github.io/lidocaine-prilocaine-protocol/))
- [LMWH selection & renal dosing in unstable angina / NSTEMI](https://github.com/satbuhan/lmwh-nste-acs-protocol) ([live site](https://satbuhan.github.io/lmwh-nste-acs-protocol/))

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
- **Reference verification for this tool uses a different workflow from
  every earlier tool in this atlas, by the author's explicit choice.** In
  every prior tool, Claude independently verified each reference itself via
  web search within this session — a process that reliably exhausted this
  session's shared search budget on manuscripts with 90+ references (as
  happened repeatedly building the Ketamine tool) and consumed a large share
  of the available context on citation-checking rather than engineering.
  For this tool (108 references), that verification step is instead being
  run externally, so its own search budget is used rather than this
  session's. **Every one of the 108 entries in `assets/content.js`'s
  `REFERENCES` array is currently marked
  `"Pending independent verification by an external reviewer (not yet
  checked against its primary source)."` in its own `kind` field** — none
  should be treated as confirmed yet. This file will be updated in place
  once that external review's results come back, following the same
  correction workflow established in earlier tools (e.g. the Ketamine
  tool's ref 63, where a fabricated-as-cited reference was identified and
  replaced with the real paper covering the same claim) — nothing gets
  marked verified without a specific primary source behind it.
- One reference's title formatting is worth a second look once verification
  starts: **ref 28** ("PaxlovidInformation From FDA and Guidance for AES
  Members") has a missing space that looks like a text-extraction artifact
  from the source manuscript rather than an error in this file — flagged
  here so it isn't mistaken for a transcription mistake during review.

## Disclaimer

This is an academic / educational reference tool, not a substitute for
institutional protocol or bedside clinical judgement. Verify any dose or
threshold against current local protocol before clinical use. Reference
verification for this tool is in progress (see Status above) — do not rely
on any individual citation until it has been independently confirmed.

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
