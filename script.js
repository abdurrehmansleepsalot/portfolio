/* global document, window, requestAnimationFrame, cancelAnimationFrame */
"use strict";

// ============================================================
// NAVBAR — scroll class + hamburger toggle
// ============================================================
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const allNavLinks = navLinks.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
})();

// ============================================================
// SMOOTH SCROLL (polyfill for older browsers)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
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
  var text = "Abdur Rehman";
  var index = 0;
  var delay = 120;

  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }

  // Small initial pause before starting
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
    // Fallback: show everything immediately
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
// PARTICLE CANVAS — hero background
// ============================================================
(function initParticles() {
  var canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var particlesArray = [];
  var animationId = null;
  var mouse = { x: null, y: null, radius: 120 };

  // Config
  var NUM_PARTICLES = 70;
  var MAX_DISTANCE = 120;
  var PIXELS_PER_PARTICLE = 10000; // one particle per this many pixels of canvas area
  var PARTICLE_COLOR = "rgba(0, 240, 255, ";
  var LINE_COLOR = "rgba(0, 240, 255, ";

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", function () {
    resize();
    initParticleArray();
  });

  canvas.addEventListener("mousemove", function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", function () {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle constructor
  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Mouse repulsion
    if (mouse.x !== null) {
      var dx = this.x - mouse.x;
      var dy = this.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        var force = (mouse.radius - dist) / mouse.radius;
        this.x += (dx / dist) * force * 2.5;
        this.y += (dy / dist) * force * 2.5;
      }
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = PARTICLE_COLOR + this.opacity + ")";
    ctx.fill();
  };

  function initParticleArray() {
    particlesArray = [];
    // Scale particle count with canvas area
    var count = Math.min(
      NUM_PARTICLES,
      Math.floor((canvas.width * canvas.height) / PIXELS_PER_PARTICLE)
    );
    for (var i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connectParticles() {
    var len = particlesArray.length;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        var dx = particlesArray[i].x - particlesArray[j].x;
        var dy = particlesArray[i].y - particlesArray[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DISTANCE) {
          var alpha = (1 - dist / MAX_DISTANCE) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = LINE_COLOR + alpha + ")";
          ctx.lineWidth = 0.6;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(function (p) {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  // Pause animation when hero is not visible (performance)
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
  initParticleArray();
  animate();
})();
