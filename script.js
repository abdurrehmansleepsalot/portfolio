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

// ============================================================
// PARTICLE CANVAS — interactive star field background
// ============================================================
(function initParticleCanvas() {
  var canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var COUNT = window.innerWidth < 768 ? 45 : 90;
  var LINK_DIST = 120;
  var REPEL_DIST = 100;
  var REPEL_STRENGTH = 0.035;
  var COLORS = ["#C3073F", "#950740", "#6F2232"];

  var mouseX = -9999;
  var mouseY = -9999;
  var scrollOff = 0;
  var particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.45 + 0.15,
      pf: Math.random() * 0.15 + 0.03,
      _dy: 0
    };
  }

  function initPool() {
    COUNT = window.innerWidth < 768 ? 45 : 90;
    particles = [];
    for (var k = 0; k < COUNT; k++) {
      particles.push(mkParticle());
    }
  }

  function wrapAxis(val, max) {
    if (val < 0) { return max; }
    if (val > max) { return 0; }
    return val;
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var h = canvas.height;
    var len = particles.length;

    // Update physics & cache draw Y
    for (var i = 0; i < len; i++) {
      var p = particles[i];
      var dy = ((p.y - scrollOff * p.pf) % h + h) % h;
      p._dy = dy;

      var ddx = p.x - mouseX;
      var ddy = dy - mouseY;
      var dist2 = ddx * ddx + ddy * ddy;
      if (dist2 < REPEL_DIST * REPEL_DIST && dist2 > 0.01) {
        var dist = Math.sqrt(dist2);
        var f = (REPEL_DIST - dist) / REPEL_DIST * REPEL_STRENGTH;
        p.vx += (ddx / dist) * f;
        p.vy += (ddy / dist) * f;
      }

      p.vx *= 0.97;
      p.vy *= 0.97;

      var spd = p.vx * p.vx + p.vy * p.vy;
      if (spd > 1.44) {
        var s = 1.2 / Math.sqrt(spd);
        p.vx *= s;
        p.vy *= s;
      }

      p.x += p.vx;
      p.y += p.vy;

      p.x = wrapAxis(p.x, canvas.width);
      p.y = wrapAxis(p.y, canvas.height);
    }

    // Draw particles
    ctx.shadowBlur = 8;
    for (var i = 0; i < len; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p._dy, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowColor = p.color;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw constellation lines
    ctx.strokeStyle = "#C3073F";
    ctx.lineWidth = 0.5;
    for (var i = 0; i < len - 1; i++) {
      var pi = particles[i];
      for (var j = i + 1; j < len; j++) {
        var pj = particles[j];
        var cdx = pi.x - pj.x;
        var cdy = pi._dy - pj._dy;
        var cdist2 = cdx * cdx + cdy * cdy;
        if (cdist2 < LINK_DIST * LINK_DIST) {
          ctx.globalAlpha = (1 - Math.sqrt(cdist2) / LINK_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi._dy);
          ctx.lineTo(pj.x, pj._dy);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  resize();
  initPool();
  frame();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      initPool();
    }, 200);
  });

  window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener("scroll", function () {
    scrollOff = window.scrollY;
  }, { passive: true });
})();

// ============================================================
// PAGE LOAD SEQUENCE — fade out loader, add page-loaded class
// ============================================================
(function initPageLoad() {
  var loader = document.getElementById("page-loader");
  if (!loader) return;

  function reveal() {
    loader.classList.add("loader-hidden");
    setTimeout(function () {
      loader.style.display = "none";
      document.body.classList.add("page-loaded");
    }, 550);
  }

  if (document.readyState === "complete") {
    setTimeout(reveal, 150);
  } else {
    window.addEventListener("load", function () {
      setTimeout(reveal, 150);
    });
  }
})();

// ============================================================
// DIRECTIONAL SCROLL REVEALS — alternate left / right
// ============================================================
(function initDirectionalReveals() {
  var sections = document.querySelectorAll(".section");
  sections.forEach(function (section, idx) {
    var elems = section.querySelectorAll(".fade-in:not(.section-title)");
    elems.forEach(function (el, i) {
      el.setAttribute("data-dir", (idx + i) % 2 === 0 ? "left" : "right");
    });
  });
})();

// ============================================================
// PROJECT CARDS — 3D tilt + glassmorphism mouse glow
// ============================================================
(function initCardEffects() {
  document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rotX = ((y - cy) / cy) * -7;
      var rotY = ((x - cx) / cx) * 7;
      var gx = (x / rect.width) * 100;
      var gy = (y / rect.height) * 100;
      card.style.transform =
        "translateY(-6px) perspective(600px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
      card.style.background =
        "radial-gradient(circle at " + gx + "% " + gy + "%, rgba(195,7,63,0.12) 0%, var(--bg-card) 65%)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
      card.style.background = "";
    });
  });
})();

// ============================================================
// BUTTON RIPPLE EFFECT
// ============================================================
(function initRipple() {
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = (e.clientX - rect.left) + "px";
      ripple.style.top  = (e.clientY - rect.top)  + "px";
      btn.appendChild(ripple);
      setTimeout(function () {
        if (ripple.parentNode) { ripple.parentNode.removeChild(ripple); }
      }, 620);
    });
  });
})();

// ============================================================
// HERO NAME GLITCH — periodic flicker after page loads
// Uses Web Animations API so the CSS gradient-shift is not interrupted
// ============================================================
(function initGlitch() {
  setTimeout(function () {
    var nameEl = document.querySelector(".hero-name");
    if (!nameEl || typeof nameEl.animate !== "function") return;

    var glitchFrames = [
      { transform: "translate(0)" },
      { transform: "translate(-3px,-1px) skewX(-1deg)" },
      { transform: "translate(3px,1px)  skewX(1deg)" },
      { transform: "translate(-2px,2px)" },
      { transform: "translate(2px,-2px)" },
      { transform: "translate(-1px,0)" },
      { transform: "translate(0)" }
    ];

    function triggerGlitch() {
      var anim = nameEl.animate(glitchFrames, { duration: 400, easing: "ease" });
      anim.onfinish = function () {
        setTimeout(triggerGlitch, 4000 + Math.random() * 7000);
      };
    }

    triggerGlitch();
  }, 3800);
})();

// ============================================================
// AMBIENT ORBS — floating glow dots inside sections
// ============================================================
(function generateAmbientOrbs() {
  document.querySelectorAll(".section").forEach(function (section) {
    var container = document.createElement("div");
    container.className = "ambient-orbs";
    container.setAttribute("aria-hidden", "true");
    var count = 8 + Math.floor(Math.random() * 6);
    for (var i = 0; i < count; i++) {
      var orb = document.createElement("div");
      orb.className = "ambient-orb";
      var size = (Math.random() * 4 + 2).toFixed(1);
      orb.style.cssText =
        "width:"  + size + "px;" +
        "height:" + size + "px;" +
        "left:"   + (Math.random() * 92 + 4) + "%;" +
        "top:"    + (Math.random() * 84 + 8) + "%;" +
        "animation-delay:"    + (Math.random() * 6).toFixed(2) + "s;" +
        "animation-duration:" + (Math.random() * 5 + 5).toFixed(1) + "s;" +
        "opacity:"            + (Math.random() * 0.22 + 0.04).toFixed(2);
      container.appendChild(orb);
    }
    section.appendChild(container);
  });
})();

// ============================================================
// SECTION DIVIDERS — animated gradient lines between sections
// ============================================================
(function addSectionDividers() {
  document.querySelectorAll(".section").forEach(function (section) {
    var next = section.nextElementSibling;
    if (!next) return;
    var div = document.createElement("div");
    div.className = "section-divider";
    div.setAttribute("aria-hidden", "true");
    section.parentNode.insertBefore(div, section.nextSibling);
  });
})();
