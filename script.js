/* global document, window, requestAnimationFrame, cancelAnimationFrame */
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

  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
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

// ============================================================
// GRADIENT MESH BLOB BACKGROUND — hero canvas
// ============================================================
(function initBlobBackground() {
  var canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var animationId = null;

  var blobs = [
    { x: 0.2, y: 0.3, r: 0.35, color: "rgba(30, 58, 95, 0.55)", vx: 0.00018, vy: 0.00012 },
    { x: 0.75, y: 0.6, r: 0.3,  color: "rgba(15, 36, 68, 0.5)",  vx: -0.00014, vy: 0.00016 },
    { x: 0.5,  y: 0.15, r: 0.28, color: "rgba(26, 26, 78, 0.45)", vx: 0.00012, vy: -0.00018 },
    { x: 0.85, y: 0.2, r: 0.22, color: "rgba(13, 27, 42, 0.4)",  vx: -0.00016, vy: 0.00014 }
  ];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resize);

  function drawBlob(blob) {
    var cx = blob.x * canvas.width;
    var cy = blob.y * canvas.height;
    var radius = blob.r * Math.min(canvas.width, canvas.height);
    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, blob.color);
    grad.addColorStop(1, "rgba(5, 5, 16, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blobs.forEach(function (blob) {
      blob.x += blob.vx;
      blob.y += blob.vy;

      if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
      if (blob.y < 0 || blob.y > 1) blob.vy *= -1;

      drawBlob(blob);
    });

    animationId = requestAnimationFrame(animate);
  }

  if ("IntersectionObserver" in window) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          if (!animationId) animate();
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      },
      { threshold: 0 }
    );
    heroObserver.observe(canvas);
  }

  resize();
  animate();
})();
