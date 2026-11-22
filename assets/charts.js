// Minimal SVG charts for the statistics section (no dependencies).
// Single-series charts use --series-1; before/after uses a muted dot (before) and --series-1 (after).
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var tip = document.createElement("div"); tip.className = "tip"; document.body.appendChild(tip);
  function showTip(e, html) { tip.innerHTML = html; tip.style.opacity = 1; moveTip(e); }
  function moveTip(e) {
    var x = e.clientX + 14, y = e.clientY + 14, w = tip.offsetWidth, h = tip.offsetHeight;
    if (x + w > innerWidth - 8) x = e.clientX - w - 14;
    if (y + h > innerHeight - 8) y = e.clientY - h - 14;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function hideTip() { tip.style.opacity = 0; }
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function fmt(v) { return typeof v === "number" ? v.toLocaleString("en-US") : v; }
  function compact(v) { return v >= 1e6 ? (v / 1e6).toFixed(1) + "M" : v >= 1e4 ? Math.round(v / 1e3) + "K" : fmt(v); }
  function hover(node, html) {
    node.addEventListener("mouseenter", function (e) { showTip(e, html); });
    node.addEventListener("mousemove", moveTip);
    node.addEventListener("mouseleave", hideTip);
  }
  // Rounded data-end, square baseline (horizontal bar growing right / column growing up).
  function barPathH(x, y, w, h, r) { r = Math.min(r, w, h / 2); return "M" + x + "," + y + "h" + (w - r) + "a" + r + "," + r + " 0 0 1 " + r + "," + r + "v" + (h - 2 * r) + "a" + r + "," + r + " 0 0 1 -" + r + "," + r + "h-" + (w - r) + "z"; }
  function barPathV(x, y, w, h, r) { r = Math.min(r, h, w / 2); return "M" + x + "," + (y + h) + "v-" + (h - r) + "a" + r + "," + r + " 0 0 1 " + r + ",-" + r + "h" + (w - 2 * r) + "a" + r + "," + r + " 0 0 1 " + r + "," + r + "v" + (h - r) + "z"; }
  function table(container, head, rows) {
    var d = document.createElement("details"); d.className = "tbl";
    d.innerHTML = "<summary>View as table</summary><table><thead><tr>" + head.map(function (h, i) { return "<th" + (i ? ' class="num"' : "") + ">" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows.map(function (r) { return "<tr>" + r.map(function (c, i) { return "<td" + (i ? ' class="num"' : "") + ">" + fmt(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
    container.appendChild(d);
  }

  // Horizontal bars: data = [[label, value, tooltipExtra?]]
  function barsH(container, data, opt) {
    opt = opt || {};
    var W = Math.max(300, Math.round(container.clientWidth) || 440), lw = opt.labelWidth || 120, rowH = 30, bh = 14, H = data.length * rowH;
    var max = Math.max.apply(null, data.map(function (d) { return d[1]; })) || 1;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opt.title || "" }, container);
    var plotW = W - lw - 64;
    data.forEach(function (d, i) {
      var y = i * rowH, w = Math.max(2, d[1] / max * plotW);
      el("text", { x: lw - 10, y: y + rowH / 2 + 4, "text-anchor": "end", "class": "lbl" }, svg).textContent = d[0];
      var p = el("path", { d: barPathH(lw, y + (rowH - bh) / 2, w, bh, 4), "class": "bar" }, svg);
      el("text", { x: lw + w + 8, y: y + rowH / 2 + 4, "class": "val" }, svg).textContent = opt.pct ? d[1] + "%" : fmt(d[1]);
      var hit = el("rect", { x: 0, y: y, width: W, height: rowH, "class": "hit" }, svg);
      hover(hit, "<b>" + d[0] + "</b><br>" + (opt.pct ? d[1] + "%" : fmt(d[1]) + (opt.unit ? " " + opt.unit : "")) + (d[2] ? "<br>" + d[2] : ""));
      hit.addEventListener("mouseenter", function () { p.style.opacity = 0.8; });
      hit.addEventListener("mouseleave", function () { p.style.opacity = 1; });
    });
    table(container, opt.head || ["", "Value"], data.map(function (d) { return [d[0], d[1]]; }));
  }

  // Columns over a category axis: data = [[label, value, tooltipHtml]]
  function columns(container, data, opt) {
    opt = opt || {};
    var W = 1040, H = 220, ml = 44, mb = 24, mt = 10, n = data.length;
    var max = Math.max.apply(null, data.map(function (d) { return d[1]; })) || 1;
    var step = Math.pow(10, Math.floor(Math.log10(max))); var top = Math.ceil(max / step) * step; if (top / step > 6) step *= 2; top = Math.ceil(max / step) * step;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opt.title || "" }, container);
    var pw = W - ml - 8, ph = H - mb - mt, band = pw / n, bw = Math.min(24, band - 2);
    var g = el("g", { "class": "grid" }, svg);
    for (var t = 0; t <= top; t += step) {
      var gy = mt + ph - t / top * ph;
      el("line", { x1: ml, x2: W - 8, y1: gy, y2: gy }, g);
      el("text", { x: ml - 8, y: gy + 4, "text-anchor": "end" }, svg).textContent = compact(t);
    }
    el("line", { x1: ml, x2: W - 8, y1: mt + ph, y2: mt + ph, "class": "base" }, svg);
    data.forEach(function (d, i) {
      var x = ml + i * band + (band - bw) / 2, h = d[1] / top * ph;
      var p = el("path", { d: barPathV(x, mt + ph - h, bw, Math.max(h, 1), 4), "class": "bar" }, svg);
      if (i % (opt.tickEvery || 1) === 0 || i === n - 1)
        el("text", { x: x + bw / 2, y: H - 6, "text-anchor": "middle" }, svg).textContent = d[0];
      var hit = el("rect", { x: ml + i * band, y: mt, width: band, height: ph, "class": "hit" }, svg);
      hover(hit, d[2]);
      hit.addEventListener("mouseenter", function () { p.style.opacity = 0.8; });
      hit.addEventListener("mouseleave", function () { p.style.opacity = 1; });
    });
    if (opt.tableHead) table(container, opt.tableHead, opt.tableRows);
  }

  // Before → after per category (0–100%): rows = [[label, before, after]]
  function dumbbell(container, rows, opt) {
    opt = opt || {};
    var W = Math.max(320, Math.round(container.clientWidth) || 440), lw = 130, rowH = 34, mt = 26, H = mt + rows.length * rowH + 8, pw = W - lw - 24;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opt.title || "" }, container);
    var g = el("g", { "class": "grid" }, svg);
    [0, 25, 50, 75, 100].forEach(function (t) {
      var x = lw + t / 100 * pw;
      el("line", { x1: x, x2: x, y1: mt - 6, y2: H - 8 }, g);
      el("text", { x: x, y: 12, "text-anchor": "middle" }, svg).textContent = t + "%";
    });
    rows.forEach(function (r, i) {
      var y = mt + i * rowH + rowH / 2, xb = lw + r[1] / 100 * pw, xa = lw + r[2] / 100 * pw;
      el("text", { x: lw - 12, y: y + 4, "text-anchor": "end", "class": "lbl" }, svg).textContent = r[0];
      el("line", { x1: xb, x2: xa, y1: y, y2: y, "class": "db-line" }, svg);
      el("circle", { cx: xb, cy: y, r: 5, "class": "db-before" }, svg);
      el("circle", { cx: xa, cy: y, r: 6, "class": "db-after" }, svg);
      var hit = el("rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, "class": "hit" }, svg);
      hover(hit, "<b>" + r[0] + "</b><br>Before: " + r[1] + "%<br>After: " + r[2] + "%");
    });
    var lg = document.createElement("div"); lg.className = "legend";
    lg.innerHTML = '<span><i class="k-before"></i>Before fusion</span><span><i class="k-after"></i>After fusion</span>';
    container.insertBefore(lg, svg);
    table(container, ["Aspect", "Before (%)", "After (%)"], rows);
  }

  // Meter (single share): pct 0–100
  function meter(container, pct, label) {
    var d = document.createElement("div"); d.className = "meter";
    d.innerHTML = '<div class="track"><div class="fill" style="width:' + pct + '%"></div></div>';
    d.setAttribute("role", "img"); d.setAttribute("aria-label", label + ": " + pct + "%");
    container.appendChild(d);
  }

  window.CSCharts = { barsH: barsH, columns: columns, dumbbell: dumbbell, meter: meter, fmt: fmt };
})();
