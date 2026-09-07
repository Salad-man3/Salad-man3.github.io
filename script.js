(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var year = document.getElementById("year");
  var copyButton = document.getElementById("copy-email");
  var copyFeedback = document.getElementById("copy-feedback");
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = [];

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function closeNavigation(returnFocus) {
    if (!navToggle || !siteNav) return;

    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");

    if (returnFocus) {
      navToggle.focus();
    }
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var willOpen = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(willOpen));
      siteNav.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("nav-open", willOpen);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNavigation(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        closeNavigation(true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeNavigation(false);
      }
    });
  }

  function showCopyMessage(message) {
    if (!copyFeedback) return;

    copyFeedback.textContent = message;
    window.setTimeout(function () {
      copyFeedback.textContent = "";
    }, 2800);
  }

  function legacyCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    try {
      document.execCommand("copy");
      showCopyMessage("Email copied to clipboard.");
    } catch (_error) {
      showCopyMessage("Copy failed. Use the email link instead.");
    }

    document.body.removeChild(field);
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var email = copyButton.getAttribute("data-email") || "salahjoja@gmail.com";

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () {
            showCopyMessage("Email copied to clipboard.");
          },
          function () {
            legacyCopy(email);
          },
        );
      } else {
        legacyCopy(email);
      }
    });
  }

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;

    var section = document.querySelector(href);
    if (section) {
      sections.push({ id: href.slice(1), link: link, el: section });
    }
  });

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", href === "#" + id);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach(function (item) {
      observer.observe(item.el);
    });
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var revealElements = document.querySelectorAll("[data-reveal]");

  function showReveals(elements) {
    elements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (revealElements.length) {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      showReveals(revealElements);
    } else {
      var heroReveals = document.querySelectorAll(".hero-sequence [data-reveal]");
      showReveals(heroReveals);

      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08,
        },
      );

      revealElements.forEach(function (el) {
        if (!el.closest(".hero-sequence")) {
          revealObserver.observe(el);
        }
      });
    }
  }

  var verboseToggle = document.getElementById("verbose-toggle");

  if (verboseToggle) {
    verboseToggle.addEventListener("click", function () {
      var enabled = document.documentElement.classList.toggle("verbose");
      verboseToggle.setAttribute("aria-pressed", String(enabled));
    });
  }
})();
