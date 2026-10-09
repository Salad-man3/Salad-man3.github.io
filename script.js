/* Salah Joja — portfolio behaviour.
   Four jobs: switch theme, collapse the section index on small screens, copy
   the email address, and mark the section you're reading. The hero's one
   animation is pure CSS, so nothing here touches motion. */
(function () {
  "use strict";

  var root = document.documentElement;
  var BREAKPOINT = 960;

  // Tells the stylesheet it may hide the index behind a toggle. Without JS the
  // index stays open rather than becoming unreachable.
  root.className += " js";

  /* ------------------------------------------------------------- theme --- */

  var THEME_KEY = "sj-site-theme";
  var themeButtons = document.querySelectorAll("[data-theme-toggle]");

  // Storage throws in private windows and when site data is blocked, so every
  // access is guarded and the page still works without it.
  function readTheme() {
    try {
      var saved = window.localStorage.getItem(THEME_KEY);
      return saved === "light" || saved === "dark" ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var light = theme === "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#f3f5f7" : "#142030");

    for (var i = 0; i < themeButtons.length; i++) {
      themeButtons[i].setAttribute("aria-pressed", light ? "true" : "false");
      themeButtons[i].setAttribute(
        "aria-label",
        light ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  // Defaults to dark when nothing is stored. The OS preference is deliberately
  // ignored: console-first is the intended design, not a fallback.
  applyTheme(readTheme() || "dark");

  for (var t = 0; t < themeButtons.length; t++) {
    themeButtons[t].addEventListener("click", function () {
      var next =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* preference simply won't persist */
      }
    });
  }

  /* ------------------------------------------------------------- year --- */

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* -------------------------------------------------------------- nav --- */

  var toggle = document.querySelector(".nav-toggle");
  var index = document.getElementById("index-nav");

  function closeNav(restoreFocus) {
    if (!toggle || !index) return;
    index.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) toggle.focus();
  }

  if (toggle && index) {
    toggle.addEventListener("click", function () {
      var open = index.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    index.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && index.classList.contains("is-open")) {
        closeNav(true);
      }
    });

    // Above the breakpoint the index is a permanent column, so drop the
    // collapsed state rather than leaving a stale aria-expanded behind.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= BREAKPOINT) closeNav(false);
    });
  }

  /* ------------------------------------------------------- copy email --- */

  var copyButton = document.getElementById("copy-email");
  var copyStatus = document.getElementById("copy-status");
  var statusTimer;

  function setStatus(message, state) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    if (state) {
      copyStatus.setAttribute("data-state", state);
    } else {
      copyStatus.removeAttribute("data-state");
    }
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(function () {
      copyStatus.textContent = "";
      copyStatus.removeAttribute("data-state");
    }, 2800);
  }

  // execCommand is deprecated but still the only fallback when the page is not
  // in a secure context or the Clipboard API is blocked.
  function legacyCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "absolute";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    document.body.removeChild(field);
    return ok;
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var email = copyButton.getAttribute("data-email") || "";

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () {
            setStatus("Copied.");
          },
          function () {
            setStatus("Copy failed. Use the address above.", "error");
          }
        );
        return;
      }

      if (legacyCopy(email)) {
        setStatus("Copied.");
      } else {
        setStatus("Copy failed. Use the address above.", "error");
      }
    });
  }

  /* -------------------------------------------------------- scrollspy --- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".index-list a[data-nav]")
  );

  if (navLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    var targets = [];

    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      targets.push(section);
    });

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (other) {
              other.classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px" }
    );

    targets.forEach(function (section) {
      spy.observe(section);
    });
  }
})();
