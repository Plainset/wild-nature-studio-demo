// Wild Nature Studio — shared site behaviour: mobile nav toggle + scroll reveal.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });

    // Defensive check: reveal anything already in the viewport at load
    // (notably the hero) instead of waiting on the observer's first
    // async callback, which can fire after first paint in some sessions.
    var viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    var viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var isInViewport =
        rect.top < viewportHeight &&
        rect.bottom > 0 &&
        rect.left < viewportWidth &&
        rect.right > 0;

      if (isInViewport) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    });
  }
})();
