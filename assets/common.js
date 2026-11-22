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
