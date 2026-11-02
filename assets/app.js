(function () {
  "use strict";

  // This tool's own slug, used to (a) skip self-links when another tool's
  // glossary term points back here and (b) build this tool's own deep links
  // when it's the one being pointed at. Every tool in the atlas sets this to
  // its own repo name.
  const TOOL_SLUG = "midazolam-clonazepam-protocol";

  /* The source figure is genuinely TWO independent decision algorithms
     stacked on one page (Panel A: seizures; Panel B: agitation/anxiety),
     not one continuous flow — unlike every other tool in this atlas so
     far, which draws a single diagram. Panel A and Panel B share nothing
     but the readout panel and the references list, so this file renders
     two separate flow grids (#flow-a/#edges-a and #flow-b/#edges-b), each
     driven by its own LAYOUT/EDGES pair, via a generalised render()/
     drawEdges() that both panels call with their own container + data.
     NODES, REFERENCES and GLOSSARY stay single combined arrays — only the
     diagram geometry is split. */
  const PANEL = {
    trigger: "a", "iv-access-decision": "a", "mdz-noniv": "a", "czp-iv": "a",
    "still-seizing-decision": "a", observe: "a", "evidence-sidebar": "a",
    "repeat-dose": "a", "second-line": "a", refractory: "a",
    "predominant-problem-decision": "b", "agitation-header": "b",
    "anxiety-header": "b", "agitation-content": "b", "anxiety-content": "b"
  };

  const LAYOUT = {
    trigger:                  { col: "full", row: 1 },
    "iv-access-decision":     { col: "full", row: 2, decision: true },
    "mdz-noniv":               { group: "a-route", row: 3 },
    "czp-iv":                  { group: "a-route", row: 3 },
    // still-seizing-decision and observe sit side by side (matching the
    // source, which draws Observe beside the diamond, not below it) —
    // this also keeps Observe out of the way of the decision's other
    // ("Yes") edge, which continues straight down to repeat-dose two rows
    // below; placing Observe directly in that path previously made the
    // "Yes" line pass invisibly behind it (edges render under nodes).
    "still-seizing-decision": { group: "a-fork2", row: 4, decision: true },
    observe:                   { group: "a-fork2", row: 4 },
    // The evidence-sidebar box draws no arrows in the source at all — a
    // floating aside beside the main trunk — which is why it is grouped
    // with repeat-dose (2-wide) rather than placed in the main column:
    // the group gives it a position next to the related step without an
    // edge ever being drawn to or from it (see EDGES_A below).
    "evidence-sidebar":        { group: "a-aside", row: 5 },
    "repeat-dose":              { group: "a-aside", row: 5 },
    "second-line":             { col: "full", row: 6 },
    refractory:                { col: "full", row: 7 },

    "predominant-problem-decision": { col: "full", row: 1, decision: true },
    "agitation-header":              { group: "b-fork", row: 2 },
    "anxiety-header":                { group: "b-fork", row: 2 },
    "agitation-content":             { group: "b-content", row: 3 },
    "anxiety-content":               { group: "b-content", row: 3 }
  };

  // How many columns each named group's wrapper subdivides into — every
  // group in this tool is a simple 2-wide row (the source never fans out
  // wider than two boxes at once in either panel).
  const GROUP_COLUMNS = { "a-route": 2, "a-fork2": 2, "a-aside": 2, "b-fork": 2, "b-content": 2 };

  const EDGES_A = [
    ["trigger", "iv-access-decision"],
    ["iv-access-decision", "mdz-noniv", "No"],
    ["iv-access-decision", "czp-iv", "Yes"],
    ["mdz-noniv", "still-seizing-decision"],
    ["czp-iv", "still-seizing-decision"],
    ["still-seizing-decision", "observe", "No"],
    ["still-seizing-decision", "repeat-dose", "Yes"],
    // evidence-sidebar intentionally has no edge at all — see LAYOUT note.
    ["repeat-dose", "second-line"],
    ["second-line", "refractory"]
  ];

  const EDGES_B = [
    // The source draws these two arrows with no Yes/No (or any other)
    // label — "Predominant problem?" simply forks into two named outcomes.
    ["predominant-problem-decision", "agitation-header"],
    ["predominant-problem-decision", "anxiety-header"],
    ["agitation-header", "agitation-content"],
    ["anxiety-header", "anxiety-content"]
  ];

  const byId = {};
  NODES.forEach((n) => (byId[n.id] = n));

  /* ---- plain-text safety + glossary auto-linking ---- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // longest match first, so a longer term wins over any shorter overlapping one
  const GLOSSARY_SORTED = GLOSSARY.slice().sort((a, b) => b.match.length - a.match.length);

  /* ---- cross-atlas concept links ----
     A term that's independently glossary-defined in 2+ tools (checked and
     curated by hand when the index was built — same string, same clinical
     meaning, not just a coincidental match) gets a "Also covered in" line
     added under its definition, deep-linking straight to the other tool's
     node via its #node-<id> hash. Fetched once, best-effort: the page works
     identically if this never loads (slow network, offline, concepts.json
     unreachable) — it only adds a line that otherwise doesn't appear. */
  let CONCEPTS = null;
  let currentNodeId = null; // re-rendered once CONCEPTS loads, if a node is already open
  fetch("https://satbuhan.github.io/clinical-algorithm-atlas/assets/concepts.json")
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      CONCEPTS = (data && data.terms) || {};
      if (currentNodeId) selectNode(currentNodeId);
    })
    .catch(() => {
      CONCEPTS = {};
    });

  // Other tools' occurrences of this same term, as an "Also covered in"
  // list — empty string if the index hasn't loaded yet, carries nothing to
  // show, or every occurrence is this tool itself.
  function crossLinksHtml(matchText) {
    if (!CONCEPTS) return "";
    const entries = CONCEPTS[matchText.toLowerCase().trim()];
    if (!entries) return "";
    const others = entries.filter((o) => o.tool !== TOOL_SLUG);
    if (!others.length) return "";
    const links = others
      .map((o) => {
        const href = o.nodeId ? o.url + "#node-" + o.nodeId : o.url;
        return '<a href="' + href + '">' + escapeHtml(o.title) + " →</a>";
      })
      .join(", ");
    return '<p class="term-crosslinks">Also covered in: ' + links + "</p>";
  }

  function linkify(rawText, usedTerms) {
    const text = escapeHtml(rawText);
    let result = "";
    let cursor = 0;
    // find the earliest, longest unused glossary match from `cursor` onward
    while (cursor < text.length) {
      let best = null;
      for (const g of GLOSSARY_SORTED) {
        if (usedTerms.has(g.match)) continue;
        const re = new RegExp("\\b" + g.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
        const m = re.exec(text.slice(cursor));
        if (
          m &&
          (!best || m.index < best.index || (m.index === best.index && m[0].length > best.text.length))
        ) {
          best = { index: m.index, text: m[0], g };
        }
      }
      if (!best) break;
      const matchStart = cursor + best.index;
      const matchEnd = matchStart + best.text.length;
      result += text.slice(cursor, matchStart);
      const g = best.g;
      const label = g.full ? g.full[0].toUpperCase() + g.full.slice(1) : "";
      result +=
        '<button type="button" class="term" aria-expanded="false">' +
        best.text +
        "</button>" +
        '<span class="term-def" hidden>' +
        (g.full ? "<strong>" + escapeHtml(label) + "</strong> — " : "") +
        escapeHtml(g.def) +
        crossLinksHtml(g.match) +
        "</span>";
      usedTerms.add(g.match);
      cursor = matchEnd;
    }
    result += text.slice(cursor);
    return result;
  }

  function nodeEl(n) {
    const layout = LAYOUT[n.id] || {};
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "node-" + n.id;
    btn.dataset.node = n.id;
    btn.setAttribute("aria-pressed", "false");

    let cls = "node";
    if (layout.decision) cls += " node--decision";
    if (n.type === "terminal") cls += " node--terminal";
    if (n.tone === "key") cls += " node--key";
    if (n.tone === "alarm") cls += " node--alarm";
    if (n.tone === "note") cls += " node--note";
    if (layout.col) cls += " " + layout.col;
    btn.className = cls;
    // Explicit row keeps every edge short and direct instead of relying
    // on implicit grid auto-placement. (Grouped nodes sit inside their
    // own flow-wrap-N subgrid, not the outer .flow grid, so the row goes
    // on the wrapper instead — see render().)
    if (layout.row && !layout.group) btn.style.gridRow = String(layout.row);

    const title = document.createElement("span");
    title.className = "node__title";
    title.textContent = n.label;
    btn.appendChild(title);

    if (n.sub) {
      const sub = document.createElement("span");
      sub.className = "node__sub";
      sub.textContent = n.sub;
      btn.appendChild(sub);
    }

    btn.addEventListener("click", () => selectNode(n.id));
    return btn;
  }

  // Renders the subset of NODES belonging to one panel into that panel's
  // own flow container. Generalised (vs. a single global render()) because
  // this tool draws two independent diagrams rather than one.
  function renderPanel(flowEl, panelId) {
    const seenGroups = {};
    NODES.filter((n) => PANEL[n.id] === panelId).forEach((n) => {
      const layout = LAYOUT[n.id] || {};
      if (layout.group) {
        let wrap = seenGroups[layout.group];
        if (!wrap) {
          wrap = document.createElement("div");
          const cols = GROUP_COLUMNS[layout.group] || 2;
          wrap.className = "flow-wrap-" + cols;
          if (layout.row) wrap.style.gridRow = String(layout.row);
          flowEl.appendChild(wrap);
          seenGroups[layout.group] = wrap;
        }
        wrap.appendChild(nodeEl(n));
      } else {
        flowEl.appendChild(nodeEl(n));
      }
    });
  }

  function clearActive() {
    document.querySelectorAll(".node.is-active").forEach((el) => {
      el.classList.remove("is-active");
      el.setAttribute("aria-pressed", "false");
    });
  }

  const readout = document.getElementById("readout");
  const readoutIdle = document.getElementById("readoutIdle");
  const readoutContent = document.getElementById("readoutContent");
  const readoutClose = document.getElementById("readoutClose");
  const backdrop = document.getElementById("backdrop");

  function kindTag(ids) {
    return ids
      .map((id) => '<a class="refchip" href="#ref-' + id + '">[' + id + "]</a>")
      .join("");
  }

  function selectNode(id) {
    const n = byId[id];
    if (!n) return;
    currentNodeId = id;
    clearActive();
    const el = document.getElementById("node-" + id);
    if (el) {
      el.classList.add("is-active");
      el.setAttribute("aria-pressed", "true");
    }

    readoutIdle.hidden = true;
    readoutContent.hidden = false;

    const usedTerms = new Set();

    let html = "";
    html += '<p class="readout__tag">' + escapeHtml(n.type) + "</p>";
    html += '<h2 class="readout__title">' + escapeHtml(n.label) + "</h2>";
    if (n.sub) html += '<p class="readout__sub">' + escapeHtml(n.sub) + "</p>";
    html += "<h3>What this means</h3><p>" + linkify(n.meaning, usedTerms) + "</p>";
    html += "<h3>Why</h3><p>" + linkify(n.rationale, usedTerms) + "</p>";
    if (n.cautions && n.cautions.length) {
      html +=
        "<h3>Cautions &amp; special populations</h3><ul class=\"caution-list\">" +
        n.cautions.map((c) => "<li>" + linkify(c, usedTerms) + "</li>").join("") +
        "</ul>";
    }
    html += "<h3>References</h3><div class=\"refchips\">" + kindTag(n.refs) + "</div>";

    readoutContent.innerHTML = html;

    if (window.matchMedia("(max-width: 900px)").matches) {
      readout.classList.add("is-open");
      backdrop.classList.add("is-open");
    }
  }

  function closeReadout() {
    readout.classList.remove("is-open");
    backdrop.classList.remove("is-open");
  }

  readoutContent.addEventListener("click", (e) => {
    const btn = e.target.closest(".term");
    if (!btn) return;
    const def = btn.nextElementSibling;
    if (!def || !def.classList.contains("term-def")) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", open ? "false" : "true");
    def.hidden = open;
  });

  readoutClose.addEventListener("click", closeReadout);
  backdrop.addEventListener("click", closeReadout);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeReadout();
  });

  /* ---- references list ---- */
  function renderReferences() {
    const list = document.getElementById("referencesList");
    const count = document.getElementById("refCount");
    if (count) count.textContent = "(" + REFERENCES.length + ")";
    REFERENCES.forEach((r) => {
      const li = document.createElement("li");
      li.id = "ref-" + r.id;
      const linkHtml = r.url
        ? "<br><a href=\"" +
          r.url +
          '" target="_blank" rel="noopener">' +
          r.url +
          "</a>"
        : "";
      li.innerHTML =
        r.text + ' <span class="kind">' + r.kind + "</span>" + linkHtml;
      list.appendChild(li);
    });
  }

  /* ---- connector lines (desktop only) ---- */
  function pointAt(flowEl, el, side) {
    const flowRect = flowEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const x = {
      left: r.left,
      right: r.right,
      center: (r.left + r.right) / 2
    };
    const y = {
      top: r.top,
      bottom: r.bottom,
      center: (r.top + r.bottom) / 2
    };
    return {
      x: x[side.x] - flowRect.left,
      y: y[side.y] - flowRect.top
    };
  }

  // Draws one panel's EDGES into its own SVG overlay, sized to its own
  // flow container. Generalised (vs. a single global drawEdges()) for the
  // same two-panel reason as renderPanel() above.
  function drawPanelEdges(flowEl, edgesSvg, edges) {
    const flowRect = flowEl.getBoundingClientRect();
    edgesSvg.setAttribute("width", flowRect.width);
    edgesSvg.setAttribute("height", flowRect.height);
    edgesSvg.setAttribute("viewBox", "0 0 " + flowRect.width + " " + flowRect.height);
    edgesSvg.innerHTML =
      '<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4A6684"/></marker></defs>';

    edges.forEach(([fromId, toId, label, variant]) => {
      const a = document.getElementById("node-" + fromId);
      const b = document.getElementById("node-" + toId);
      if (!a || !b) return;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      // Compare vertical CENTERS, not tops: a decision diamond uses
      // align-self:center (it doesn't stretch to the row's full height),
      // while an ordinary box with multi-line sub text can be taller than
      // the row's other cells and define the row height itself — so two
      // nodes genuinely on the same grid row can still have different
      // `top`s even though they're vertically centered on each other.
      const aCenterY = (ar.top + ar.bottom) / 2;
      const bCenterY = (br.top + br.bottom) / 2;

      let p1, p2;
      if (Math.abs(aCenterY - bCenterY) < 8) {
        // same row: connect sides
        p1 = pointAt(flowEl, a, { x: ar.left < br.left ? "right" : "left", y: "center" });
        p2 = pointAt(flowEl, b, { x: ar.left < br.left ? "left" : "right", y: "center" });
      } else {
        p1 = pointAt(flowEl, a, { x: "center", y: "bottom" });
        p2 = pointAt(flowEl, b, { x: "center", y: "top" });
      }

      const midY = (p1.y + p2.y) / 2;
      let d =
        Math.abs(p1.y - p2.y) < 4
          ? "M" + p1.x + "," + p1.y + " L" + p2.x + "," + p2.y
          : "M" + p1.x + "," + p1.y +
            " C" + p1.x + "," + midY + " " + p2.x + "," + midY + " " + p2.x + "," + p2.y;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "flow-edge" + (variant === "info" ? " is-info" : ""));
      if (variant !== "info") path.setAttribute("marker-end", "url(#arrow)");
      edgesSvg.appendChild(path);

      if (label) {
        const sameRow = Math.abs(p1.y - p2.y) < 4;
        const lx = sameRow ? (p1.x + p2.x) / 2 : p2.x + (p1.x > p2.x ? -10 : 10);
        const ly = sameRow ? p1.y - 8 : p1.y + (p2.y - p1.y) * 0.22;

        // Label background scales with text length.
        const labelW = Math.max(28, label.length * 6.1 + 12);

        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("class", "edge-label-bg");
        bg.setAttribute("x", lx - labelW / 2);
        bg.setAttribute("y", ly - 11);
        bg.setAttribute("width", labelW);
        bg.setAttribute("height", 14);
        edgesSvg.appendChild(bg);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("class", "edge-label");
        text.setAttribute("x", lx);
        text.setAttribute("y", ly);
        text.setAttribute("text-anchor", "middle");
        text.textContent = label;
        edgesSvg.appendChild(text);
      }
    });
  }

  const flowElA = document.getElementById("flow-a");
  const edgesSvgA = document.getElementById("edges-a");
  const flowElB = document.getElementById("flow-b");
  const edgesSvgB = document.getElementById("edges-b");

  function drawAllEdges() {
    drawPanelEdges(flowElA, edgesSvgA, EDGES_A);
    drawPanelEdges(flowElB, edgesSvgB, EDGES_B);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawAllEdges, 120);
  });

  renderPanel(flowElA, "a");
  renderPanel(flowElB, "b");
  renderReferences();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawAllEdges);
  }
  window.addEventListener("load", drawAllEdges);
  drawAllEdges();

  // Deep link support: "#node-<id>" (matching each node button's own DOM
  // id) opens that node's readout and scrolls it into view on arrival —
  // what the cross-atlas "Also covered in" links above point at, so a
  // click lands on the right box instead of just the other tool's
  // homepage. Harmless on a plain, hash-free visit.
  const linkedNodeId = window.location.hash.replace(/^#node-/, "");
  if (linkedNodeId && byId[linkedNodeId]) {
    selectNode(linkedNodeId);
    window.addEventListener("load", () => {
      const el = document.getElementById("node-" + linkedNodeId);
      if (el) el.scrollIntoView({ block: "center", inline: "center" });
    });
  }
})();
