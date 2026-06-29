/* =========================================================
   script.js — Icebreaker & Profile Discovery Webpage
   ========================================================= */

"use strict";

// ── State ──────────────────────────────────────────────────
let heartCount = 0; // Serves as interactive engagement score
let noClickCount = 0;
let carouselIndex = 0;
let carouselTotal = 5;
let slideIndex = 0;
let musicMuted = false;
let quoteTimer = null;
let letterFullText = "";

// ── Casual & Observational Quotes ──────────────────────────
const quotes = [
  '"Getting to know new people is always a great adventure." ✨',
  '"You seem like someone who makes boring standard chats illegal." 😂',
  '"One quick look at your profile profile wasn’t enough to crack the case." 🔎',
  '"You have a style that definitely deserves a solid shoutout." ⭐',
  '"I have a pretty strong hunch this conversation is going to be fun." 😉',
  '"Every awesome profile leaves a trail of clues." 🗺️',
  "\"Let's skip the standard 'Hey, how are you?' routine.\" 🚀",
  '"I am 100% sure you have some hilarious school stories to share." 🎒',
  '"Looking forward to uncovering your absolute favorite music tracks." 🎧',
  '"Your profile instantly radiates standard-defying energy." ⚡',
  '"Let\'s trade a few fun facts and see where it goes." 🕊️',
  '"I have a feeling this icebreaker is just getting started." ✉️',
];

// ── Casual Reveal Note ───────────────────────────────────────
const letterText = `Hey! 👋

I know sending a custom link out of the blue can be a bit surprising, but your profile has such a refreshing and brilliant vibe. Aside from the hilarious KV school connection (which we completely need to talk about!), you genuinely seem like a beautiful, down-to-earth, and interesting person to know.

I know the internet can be a wild place, so there's absolutely no pressure here at all—just a friendly invite to skip the boring small talk and have a casual chat whenever you're free. Let me know if you’re up for a few more laughs! 😊✨

Cheers,

Nitin`;

// ── DOM Ready ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initFireflies();
  initLoadingScreen();
  initFloatingHearts();
  initRandomQuotes();
  startHeartParticles("heart-particles-1");
  initTiltCards();
  initScrollObserver();
  initSlideshowScene6();
  initPetals();
  initTouchCarousel();
});

/* ==========================================================
   LOADING SCREEN
   ========================================================== */
function initLoadingScreen() {
  const bar = document.getElementById("loading-bar");
  const loading = document.getElementById("scene-loading");
  const s1 = document.getElementById("scene-1");

  // Spawn loading particles
  spawnLoadingParticles();

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      bar.style.width = "100%";
      clearInterval(interval);
      setTimeout(() => {
        loading.style.transition = "opacity 0.8s ease";
        loading.style.opacity = "0";
        setTimeout(() => {
          loading.classList.remove("active");
          loading.style.display = "none";
          s1.classList.add("active");
          s1.style.display = "flex";
          s1.classList.add("scene-transition");
          startTypewriter(
            "typewriter-1",
            "Hey! I just wanted to say you are absolutely beautiful, and I'd love to have a quick chat with you. Up for a small mystery? 😉",
            40,
          );
        }, 800);
      }, 400);
    } else {
      bar.style.width = progress + "%";
    }
  }, 60);
}

function spawnLoadingParticles() {
  const container = document.getElementById("loading-particles");
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.style.cssText = `
      position:absolute;
      width:${Math.random() * 6 + 2}px;
      height:${Math.random() * 6 + 2}px;
      border-radius:50%;
      background:hsl(${200 + Math.random() * 40},100%,${60 + Math.random() * 20}%);
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      opacity:${Math.random() * 0.6 + 0.2};
      animation: loadPFloat ${3 + Math.random() * 5}s ease-in-out ${Math.random() * 3}s infinite alternate;
      box-shadow: 0 0 8px currentColor;
    `;
    container.appendChild(p);
  }
  // Add keyframe if not exists
  if (!document.getElementById("loadPFloat-style")) {
    const style = document.createElement("style");
    style.id = "loadPFloat-style";
    style.textContent = `@keyframes loadPFloat {
      0%   { transform: translate(0,0) scale(1); }
      100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.5); }
    }`;
    document.head.appendChild(style);
  }
}

/* ==========================================================
   TYPEWRITER EFFECT
   ========================================================== */
function startTypewriter(elId, text, speed = 60) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i++];
    } else {
      clearInterval(interval);
    }
  }, speed);
}

/* ==========================================================
   YES / NO BUTTONS
   ========================================================== */
function onYes1() {
  noClickCount = 0;

  // Hide existing cards
  const s1card = document.getElementById("scene1-card");
  const angryCat = document.getElementById("angry-cat-overlay");
  const sweetRet = document.getElementById("sweet-return");
  fadeOutEl(s1card);
  if (angryCat) fadeOutEl(angryCat);
  if (sweetRet) fadeOutEl(sweetRet);

  // Trigger massive confetti + effects
  triggerMassiveConfetti();
  triggerHeartExplosion();
  triggerScreenGlow();

  // Show post-yes content
  setTimeout(() => {
    const pyc = document.getElementById("post-yes-content");
    pyc.style.display = "flex";
    pyc.style.animation = "fadeInUp 0.8s ease forwards";
    incrementHeartCount(10);
  }, 600);
}

function onNo1() {
  noClickCount++;

  if (noClickCount === 1) {
    // Button runs away
    runAwayButton();
  } else {
    // Screen shake
    document.body.classList.add("shaking");
    setTimeout(() => document.body.classList.remove("shaking"), 600);

    // Hide other content
    const s1card = document.getElementById("scene1-card");
    const sweetRet = document.getElementById("sweet-return");
    if (s1card) fadeOutEl(s1card);
    if (sweetRet) fadeOutEl(sweetRet);

    // Show friendly cat warning
    const angryCat = document.getElementById("angry-cat-overlay");
    angryCat.style.display = "flex";

    setTimeout(() => {
      fadeOutEl(angryCat);
      // Show sweet return
      setTimeout(() => {
        const sweet = document.getElementById("sweet-return");
        sweet.style.display = "flex";
        sweet.style.animation = "fadeInUp 0.8s ease forwards";
      }, 400);
    }, 2500);
  }
}

function runAwayButton() {
  const btn = document.getElementById("btn-no-1");
  if (!btn) return;

  const scene = document.getElementById("scene-1");
  const rect = btn.getBoundingClientRect();
  const sw = scene.offsetWidth;
  const sh = scene.offsetHeight;

  let x =
    Math.random() > 0.5
      ? Math.random() * (sw - 200) + 50
      : Math.random() * -200 - 20;
  let y =
    Math.random() > 0.5
      ? Math.random() * (sh - 100) + 20
      : Math.random() * -100 - 20;

  btn.style.position = "fixed";
  btn.style.left = rect.left + "px";
  btn.style.top = rect.top + "px";
  btn.style.transition = "left 0.4s ease, top 0.4s ease";
  btn.style.zIndex = "9999";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      btn.style.left = x + "px";
      btn.style.top = y + "px";
    });
  });
}

/* ==========================================================
   SCENE NAVIGATION
   ========================================================== */
function goToScene(num) {
  // Hide all scenes
  document.querySelectorAll(".scene").forEach((s) => {
    s.classList.remove("active");
    s.style.display = "none";
  });

  const target = document.getElementById("scene-" + num);
  if (!target) return;

  target.style.display = "flex";
  target.classList.add("active");
  target.classList.remove("scene-transition");
  void target.offsetWidth; // reflow
  target.classList.add("scene-transition");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Scene-specific init
  if (num === 2) initMusicScene();
  if (num === 3) setTimeout(revealMasonryItems, 200);
  if (num === 5) initLetterScene();
  if (num === 6) initFinalScene();

  incrementHeartCount(5);
}

function fadeOutEl(el) {
  if (!el) return;
  el.style.transition = "opacity 0.4s ease";
  el.style.opacity = "0";
  setTimeout(() => {
    el.style.display = "none";
    el.style.opacity = "";
  }, 400);
}

/* ==========================================================
   SCENE 2 — MUSIC
   ========================================================== */
function initMusicScene() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;
  audio.volume = 0;
  audio.play().catch(() => {}); // Autoplay tier handling

  // Fade in audio comfort level
  let vol = 0;
  const fadeIn = setInterval(() => {
    vol += 0.02;
    if (vol >= 0.4) {
      vol = 0.4;
      clearInterval(fadeIn);
    }
    audio.volume = musicMuted ? 0 : vol;
  }, 100);
}

function toggleMute() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("mute-btn");
  musicMuted = !musicMuted;
  audio.muted = musicMuted;
  btn.textContent = musicMuted ? "🔇" : "🔊";
}

/* ==========================================================
   SCENE 3 — GALLERY
   ========================================================== */
function revealMasonryItems() {
  const items = document.querySelectorAll(".masonry-item");
  items.forEach((item, i) => {
    setTimeout(() => item.classList.add("visible"), i * 80);
  });
}

function initScrollObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".masonry-item")
    .forEach((el) => observer.observe(el));
}

/* ==========================================================
   LIGHTBOX
   ========================================================== */
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.style.backgroundImage = `url('${src}')`;
  lb.classList.add("open");
  incrementHeartCount(2);
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

/* ==========================================================
   SCENE 4 — CAROUSEL
   ========================================================== */
function carouselNext() {
  carouselIndex = (carouselIndex + 1) % carouselTotal;
  updateCarousel();
}

function carouselPrev() {
  carouselIndex = (carouselIndex - 1 + carouselTotal) % carouselTotal;
  updateCarousel();
}

function goToSlide(idx) {
  carouselIndex = idx;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById("carousel-track");
  const cards = track.querySelectorAll(".reason-card");
  const cardW = cards[0] ? cards[0].offsetWidth + 20 : 0;

  track.style.transform = `translateX(${-carouselIndex * cardW}px)`;

  document.querySelectorAll(".carousel-dots .dot").forEach((d, i) => {
    d.classList.toggle("active", i === carouselIndex);
  });
}

function initTouchCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? carouselNext() : carouselPrev();
  });
}

/* ==========================================================
   SCENE 5 — CASUAL LETTER
   ========================================================== */
function initLetterScene() {
  const el = document.getElementById("letter-text");
  if (!el || el.textContent.trim().length > 0) return;

  let i = 0;
  const lines = letterText.split("\n");
  let lineIdx = 0;
  let charIdx = 0;
  let current = "";

  const type = setInterval(() => {
    if (lineIdx >= lines.length) {
      clearInterval(type);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      current += line[charIdx++];
    } else {
      current += "\n";
      lineIdx++;
      charIdx = 0;
    }
    el.textContent = current;
  }, 20);
}

/* ==========================================================
   SCENE 6 — FINAL REVEAL SEQUENCE
   ========================================================== */
function initFinalScene() {
  // Slideshow
  startSlideshow();

  // Casual reveal sequence timings
  setTimeout(() => {
    const sub = document.getElementById("final-sub");
    if (sub) sub.style.opacity = "1";
  }, 1500);

  setTimeout(() => {
    const love = document.getElementById("final-love");
    if (love) {
      love.style.opacity = "1";
      love.style.transform = "scale(1)";
    }
    // Celebratory sparklers & ambient engines
    triggerMassiveConfetti();
    triggerHeartExplosion();
    triggerBalloonConfetti();
    incrementHeartCount(50);
  }, 3500);
}

function startSlideshow() {
  const slides = document.querySelectorAll(".slide-img");
  if (!slides.length) return;

  setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 3000);
}

/* ==========================================================
   CONFETTI ENGINE
   ========================================================== */
function triggerMassiveConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = [
    "#33a8ff",
    "#ffc233",
    "#ffd6e7",
    "#7ce8ff",
    "#ffffff",
    "#9461ff",
    "#ff69b4",
  ];
  const shapes = ["circle", "rect"];

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random() - canvas.height,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 10,
      alpha: 1,
    });
  }

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.rot += p.rotV;
      p.alpha -= 0.007;
      if (p.alpha > 0) alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    });

    if (alive) frame = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  cancelAnimationFrame(frame);
  draw();
}

function triggerBalloonConfetti() {
  const canvas = document.getElementById("final-confetti");
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const emojis = ["🎈", "✨", "🌸", "🌟", "💬", "🎉", "☕", "😎", "👋"];
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + 50,
    vy: -(Math.random() * 3 + 2),
    vx: (Math.random() - 0.5) * 2,
    size: Math.random() * 18 + 16,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    alpha: 1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.004;
      if (p.alpha > 0 && p.y > -100) alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, p.x, p.y);
      ctx.restore();
    });
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

/* ==========================================================
   AMBIENT SPARKS ENGINE
   ========================================================== */
function triggerHeartExplosion() {
  const container = document.getElementById("floating-hearts-container");
  const sparks = ["⭐", "✨", "⚡", "💫", "🌸", "👋", "☕"];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "float-heart";
      h.textContent = sparks[Math.floor(Math.random() * sparks.length)];
      h.style.left = Math.random() * 100 + "vw";
      h.style.animationDuration = 2 + Math.random() * 3 + "s";
      h.style.fontSize = 1 + Math.random() * 1.5 + "rem";
      h.style.animationDelay = Math.random() * 0.5 + "s";
      container.appendChild(h);
      setTimeout(() => h.remove(), 5000);
    }, i * 40);
  }
}

function triggerScreenGlow() {
  let overlay = document.querySelector(".screen-glow-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "screen-glow-overlay";
    document.body.appendChild(overlay);
  }
  overlay.classList.add("active");
  setTimeout(() => overlay.classList.remove("active"), 1500);
}

/* ==========================================================
   FLOATING ELEMENTS (Global Ambient Context)
   ========================================================== */
function initFloatingHearts() {
  const elements = ["✨", "⭐", "🌸", "💫", "🎈"];
  setInterval(() => {
    const container = document.getElementById("floating-hearts-container");
    const h = document.createElement("div");
    h.className = "float-heart";
    h.textContent = elements[Math.floor(Math.random() * elements.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 5 + Math.random() * 5 + "s";
    h.style.fontSize = 0.8 + Math.random() * 0.6 + "rem";
    h.style.opacity = "0.34";
    container.appendChild(h);
    setTimeout(() => h.remove(), 10000);
  }, 900);
}

/* ==========================================================
   PARTICLE ENGAGEMENT FALLOUT (Scene 1)
   ========================================================== */
function startHeartParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const elements = ["✨", "⭐", "💫"];
  setInterval(() => {
    const p = document.createElement("span");
    p.textContent = elements[Math.floor(Math.random() * elements.length)];
    p.style.cssText = `
      position:absolute;
      left:${Math.random() * 100}%;
      bottom:0;
      font-size:${0.8 + Math.random() * 1}rem;
      color:hsl(${200 + Math.random() * 40},80%,${60 + Math.random() * 20}%);
      opacity:0.5;
      animation: heartRise ${3 + Math.random() * 4}s linear forwards;
      pointer-events:none;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 7000);
  }, 500);
}

/* ==========================================================
   FIREFLIES ENGINE
   ========================================================== */
function initFireflies() {
  const container = document.getElementById("fireflies-container");
  for (let i = 0; i < 25; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    const dur = 6 + Math.random() * 8 + "s";
    const dx = Math.random() * 200 - 100 + "px";
    const dy = Math.random() * 200 - 100 + "px";
    const dx2 = Math.random() * 200 - 100 + "px";
    const dy2 = Math.random() * 200 - 100 + "px";
    f.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      --dx:${dx};
      --dy:${dy};
      --dx2:${dx2};
      --dy2:${dy2};
      animation-duration:${dur};
      animation-delay:${Math.random() * 5}s;
      width:${3 + Math.random() * 5}px;
      height:${3 + Math.random() * 5}px;
    `;
    container.appendChild(f);
  }
}

/* ==========================================================
   CURSOR SPARKLE TRAIL
   ========================================================== */
function initCursor() {
  const cursor = document.getElementById("cursor-sparkle");
  const colors = ["#33a8ff", "#ffc233", "#ffd6e7", "#7ce8ff", "#ffffff"];

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Spawn sparkle trail
    if (Math.random() > 0.4) {
      const s = document.createElement("div");
      s.className = "sparkle-trail";
      s.style.cssText = `
        left:${e.clientX}px;
        top:${e.clientY}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        box-shadow:0 0 6px currentColor;
        width:${4 + Math.random() * 6}px;
        height:${4 + Math.random() * 6}px;
      `;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }
  });

  document.addEventListener("click", (e) => {
    // Burst on click
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("div");
      s.className = "sparkle-trail";
      const angle = (i / 8) * 360;
      const dist = 20 + Math.random() * 30;
      s.style.cssText = `
        left:${e.clientX}px;
        top:${e.clientY}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        box-shadow:0 0 8px currentColor;
        width:6px; height:6px;
        transform:translate(
          ${Math.cos((angle * Math.PI) / 180) * dist}px,
          ${Math.sin((angle * Math.PI) / 180) * dist}px
        );
      `;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
    incrementHeartCount(1);
  });
}

/* ==========================================================
   ENGAGEMENT SCORE RATIO
   ========================================================== */
function incrementHeartCount(n = 1) {
  heartCount += n;
  const el = document.getElementById("heart-count");
  if (el) el.textContent = heartCount;

  const counter = document.getElementById("heart-counter");
  if (counter) {
    counter.style.transform = "scale(1.25)";
    setTimeout(() => {
      counter.style.transform = "";
    }, 200);
  }
}

/* ==========================================================
   RANDOM OBSERVED DIALOGUES
   ========================================================== */
function initRandomQuotes() {
  const bubble = document.getElementById("random-quote-bubble");
  let qi = 0;

  function showQuote() {
    if (!bubble) return;
    bubble.textContent = quotes[qi % quotes.length];
    bubble.classList.add("visible");
    qi++;
    setTimeout(() => {
      bubble.classList.remove("visible");
      setTimeout(showQuote, 4000);
    }, 5000);
  }

  setTimeout(showQuote, 7000);
}

/* ==========================================================
   3D TILT CARDS
   ========================================================== */
function initTiltCards() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * 16;
      const ry = ((e.clientX - cx) / rect.width) * -16;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ==========================================================
   PETALS / FLOWERS FALLING FLUID (Scene 5)
   ========================================================== */
function initPetals() {
  const container = document.getElementById("petals-container");
  if (!container) return;
  const petals = ["🌸", "✨", "🍁", "🌻", "✿", "❀"];

  setInterval(() => {
    const p = document.createElement("div");
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.cssText = `
      position:fixed;
      left:${Math.random() * 110 - 5}vw;
      top:-40px;
      font-size:${1 + Math.random() * 1.2}rem;
      opacity:${0.4 + Math.random() * 0.4};
      animation: petalFall ${5 + Math.random() * 5}s linear forwards;
      pointer-events:none;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 10000);
  }, 700);

  // Fall Keyframes setup
  const style = document.createElement("style");
  style.textContent = `@keyframes petalFall {
    0%   { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.8; }
    100% { transform: translateY(110vh) rotate(540deg) translateX(${(Math.random() - 0.5) * 80}px); opacity: 0; }
  }`;
  document.head.appendChild(style);
}

/* ==========================================================
   SCENE 6 — SLIDESHOW INLINE
   ========================================================== */
function initSlideshowScene6() {
  // Triggered dynamically through scene activation
}

/* ==========================================================
   WINDOW RESIZE
   ========================================================== */
window.addEventListener("resize", () => {
  const canvas1 = document.getElementById("confetti-canvas");
  const canvas2 = document.getElementById("final-confetti");
  if (canvas1) {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
  }
  if (canvas2) {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
  }
});

/* ==========================================================
   KEYBOARD TRAFFIC MANAGEMENT
   ========================================================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "s" || e.key === "S") {
    triggerHeartExplosion();
    incrementHeartCount(5);
  }
  if (e.key === "Escape") {
    closeLightbox();
  }
});
