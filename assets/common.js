// Shared helpers: HTML escaping, theme toggle, contact e-mail.
window.CS = {
  esc: function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  },
  mailto: function (subject, body) {
    var e = (window.CS_CONFIG || {}).contactEmail || "";
    return "mailto:" + e + "?subject=" + encodeURIComponent(subject || "CyberSploit data request") +
      (body ? "&body=" + encodeURIComponent(body) : "");
  },
};

(function () {
  var root = document.documentElement;
  var btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    btn.addEventListener("click", function () {
      var cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      var next = cur === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try { localStorage.setItem("cs-theme", next); } catch (e) {}
    });
  }
  var email = (window.CS_CONFIG || {}).contactEmail || "";
  document.querySelectorAll("[data-email]").forEach(function (el) { el.textContent = email; });
  document.querySelectorAll("[data-mailto]").forEach(function (el) {
    el.href = CS.mailto("CyberSploit data request",
      "Name:\nAffiliation:\nIntended use:\nCVE IDs / scope of interest:\n\nI agree to use the data for research and defensive purposes only and not to redistribute it.");
  });
})();

// Request dialog: every mailto link opens this dialog first. People without a desktop mail app
// (and visitors in WeChat's in-app browser, where mailto links do nothing) can copy the address
// and the message and send it from any mailbox, or open Gmail / Outlook.com with it prefilled.
(function () {
  var dlg, box, body, ok, cur = {}, att = null, lastFocus;
  var ZH = "没有邮件客户端？填好内容后点“Copy all”，到QQ邮箱、网易邮箱或学校邮箱新建邮件，粘贴发送即可。";
  var ZH_ATT = "清单较长，正文里不再逐条列出。请点“Download list”下载清单，发邮件时加为附件；下载不了（比如在微信里打开）就点“Copy IDs”，把编号粘贴进正文。";
  var enc = encodeURIComponent;

  function parse(href) {
    var q = href.indexOf("?");
    var p = new URLSearchParams(q < 0 ? "" : href.slice(q + 1));
    return { to: decodeURIComponent(href.slice(7, q < 0 ? href.length : q)), subject: p.get("subject") || "", body: p.get("body") || "" };
  }
  function row(label, key, cls) {
    return '<div class="rq-row"><span class="rq-l">' + label + '</span><span class="rq-v ' + (cls || "") + '" data-f="' + key +
      '"></span><button type="button" class="btn sm" data-c="' + key + '">Copy</button></div>';
  }
  function $(sel) { return box.querySelector(sel); }

  function build() {
    dlg = document.createElement("div");
    dlg.className = "rq";
    dlg.hidden = true;
    dlg.innerHTML =
      '<div class="rq-box" role="dialog" aria-modal="true" aria-labelledby="rq-t" tabindex="-1">' +
      '<button type="button" class="rq-x" aria-label="Close">×</button>' +
      '<h3 id="rq-t">Send us an email</h3>' +
      '<p class="rq-lead">Fill in the message below, then send it from any mailbox — your mail app, Gmail, Outlook, QQ Mail, 163 Mail or your institutional email.</p>' +
      '<p class="rq-zh" lang="zh"></p>' +
      row("To", "to", "mono") + row("Subject", "subject") +
      '<div class="rq-att" hidden><div class="rq-att-t"><b>Attachment</b><span class="rq-att-n mono"></span></div>' +
      '<p class="rq-att-p">This list is too long to paste into a message. Download it and attach the file to your email.</p>' +
      '<div class="rq-att-a"><button type="button" class="btn sm primary" data-a="dl">Download list (.csv)</button>' +
      '<button type="button" class="btn sm" data-a="copy">Copy IDs</button></div></div>' +
      '<div class="rq-mh"><label class="rq-l" for="rq-body">Message</label><button type="button" class="btn sm" data-c="body">Copy</button></div>' +
      '<textarea id="rq-body" class="rq-body" rows="9" spellcheck="false"></textarea>' +
      '<div class="rq-act">' +
      '<button type="button" class="btn primary" data-c="all">Copy all</button>' +
      '<a class="btn" data-l="app">Open mail app</a>' +
      '<a class="btn" data-l="gmail" target="_blank" rel="noopener">Gmail</a>' +
      '<a class="btn" data-l="outlook" target="_blank" rel="noopener">Outlook.com</a>' +
      '</div><div class="rq-ok" aria-live="polite"></div></div>';
    document.body.appendChild(dlg);
    box = dlg.firstChild;
    body = $("#rq-body");
    ok = $(".rq-ok");

    body.addEventListener("input", links);
    $(".rq-x").addEventListener("click", close);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !dlg.hidden) close(); });
    $('[data-a="dl"]').addEventListener("click", function () {
      var url = URL.createObjectURL(new Blob([att.csv], { type: "text/csv;charset=utf-8" }));
      var l = document.createElement("a");
      l.href = url; l.download = att.name; box.appendChild(l); l.click(); box.removeChild(l);
      setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
      ok.className = "rq-ok";
      ok.textContent = "Downloaded " + att.name + " — remember to attach it to your email.";
    });
    $('[data-a="copy"]').addEventListener("click", function () {
      copy(att.ids, function (done) {
        ok.className = "rq-ok" + (done ? "" : " err");
        ok.textContent = done ? "Copied " + att.count.toLocaleString("en-US") + " record IDs." : "Could not copy automatically.";
      });
    });
    box.querySelectorAll("[data-c]").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-c");
        var text = k === "to" ? cur.to : k === "subject" ? cur.subject : k === "body" ? body.value :
          "To: " + cur.to + "\nSubject: " + cur.subject + "\n\n" + body.value;
        copy(text, function (done) {
          ok.className = "rq-ok" + (done ? "" : " err");
          ok.textContent = done ? (k === "all" ? "Copied the address, subject and message." : "Copied.")
            : "Could not copy automatically — please select the text and copy it.";
        });
      });
    });
  }

  function links() {
    var s = enc(cur.subject), b = enc(body.value), to = enc(cur.to);
    $('[data-l="app"]').href = "mailto:" + cur.to + "?subject=" + s + "&body=" + b;
    $('[data-l="gmail"]').href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + to + "&su=" + s + "&body=" + b;
    $('[data-l="outlook"]').href = "https://outlook.live.com/mail/0/deeplink/compose?to=" + to + "&subject=" + s + "&body=" + b;
  }

  function copy(text, done) {
    function fallback() {
      var t = document.createElement("textarea");
      t.value = text;
      t.setAttribute("readonly", "");
      t.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
      box.appendChild(t);
      t.select();
      t.setSelectionRange(0, text.length);
      var r = false;
      try { r = document.execCommand("copy"); } catch (e) {}
      box.removeChild(t);
      done(r);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  // opts.attach = { name, count, csv, ids }: long lists go into a downloadable CSV instead of the message body
  function open(href, opts) {
    if (!dlg) build();
    cur = parse(href);
    att = (opts && opts.attach) || null;
    $(".rq-att").hidden = !att;
    $(".rq-zh").textContent = att ? ZH_ATT : ZH;
    if (att) $(".rq-att-n").textContent = att.name + " · " + att.count.toLocaleString("en-US") + " records";
    $('[data-f="to"]').textContent = cur.to;
    $('[data-f="subject"]').textContent = cur.subject;
    body.value = cur.body;
    ok.textContent = "";
    links();
    lastFocus = document.activeElement;
    dlg.hidden = false;
    document.body.classList.add("rq-open");
    box.focus();
  }

  function close() {
    dlg.hidden = true;
    document.body.classList.remove("rq-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || (dlg && dlg.contains(a)) || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(a.href);
  });
  window.CS.openRequest = open;
})();
