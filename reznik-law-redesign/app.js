(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".nav-drop").forEach(function (drop) {
    var btn = drop.querySelector(".nav-drop-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = drop.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-drop.is-open").forEach(function (drop) {
      if (!drop.contains(e.target)) {
        drop.classList.remove("is-open");
        var btn = drop.querySelector(".nav-drop-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }
})();
