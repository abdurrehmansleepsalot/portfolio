/* global document, window */
"use strict";

// ============================================================
// NAVBAR — scroll class + hamburger toggle
// ============================================================
(function initNavbar() {
  var navbar = document.getElementById("navbar");
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("nav-links");
  var allNavLinks = navLinks.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
})();

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ============================================================
// TYPING EFFECT — hero name
// ============================================================
(function initTyping() {
  var el = document.getElementById("typed-name");
  var text = "Muhammad Abdur Rehman";
  var index = 0;
  var delay = 100;

  function onTypingDone() {
    setTimeout(function () {
      var card = document.getElementById("profile-card");
      if (card) {
        card.classList.add("visible");
        card.removeAttribute("aria-hidden");
      }
      // Trigger the roles dropdown after the card appears
      setTimeout(function () {
        var dropdown = document.getElementById("hero-roles-dropdown");
        if (dropdown) {
          dropdown.classList.add("visible");
        }
      }, 400);
    }, 500);
  }

  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    } else {
      onTypingDone();
    }
  }

  setTimeout(type, 600);
})();

// ============================================================
// FOOTER YEAR
// ============================================================
(function setFooterYear() {
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

// ============================================================
// INTERSECTION OBSERVER — fade-in on scroll
// ============================================================
(function initScrollAnimations() {
  var elements = document.querySelectorAll(".fade-in");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
