// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const stored = localStorage.getItem("bfc-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = stored || (prefersLight ? "light" : "dark");
if (initialTheme === "light") root.setAttribute("data-theme", "light");

themeBtn?.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  if (isLight) {
    root.removeAttribute("data-theme");
    localStorage.setItem("bfc-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("bfc-theme", "light");
  }
});

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

// ---------- Contact form (Formspree) ----------
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

function setStatus(message, kind) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = "form-status" + (kind ? " " + kind : "");
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Honeypot: if filled, silently drop (likely a bot)
  if (form.querySelector('[name="_gotcha"]')?.value) return;

  setStatus("Sending…", "pending");
  submitBtn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      form.reset();
      setStatus("Thanks! Your project request has been sent. I'll be in touch shortly.", "success");
    } else {
      const data = await res.json().catch(() => ({}));
      const msg = data?.errors?.map((x) => x.message).join(", ");
      setStatus(msg || "Something went wrong. Please email me directly instead.", "error");
    }
  } catch (err) {
    setStatus("Network error. Please try again or email me directly.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

function revealInView() {
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
      el.classList.add("in");
      io.unobserve(el);
    }
  });
}

revealInView();
window.addEventListener("load", revealInView);
window.addEventListener("resize", revealInView);

// Cursor glow follows pointer (skipped for touch / reduced motion)
const glow = document.querySelector(".cursor-glow");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (glow && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
} else if (glow) {
  glow.style.display = "none";
}

// Subtle parallax tilt on package + service cards
document.querySelectorAll(".service-card, .package").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// ---------- Portfolio work (loaded from WorkStore) ----------
let caseStudies = {};
const workProjectsEl = document.getElementById("workProjects");

let featuredSlider = null;

function initPortfolio() {
  const data = WorkStore.load();
  const publicProjects = data.projects.filter((project) => project.id !== "tradeverified");
  caseStudies = WorkStore.buildCaseStudies(publicProjects);
  WorkStore.renderWorkSection(workProjectsEl, publicProjects);
  bindCaseStudyTriggers();
  observeReveals(workProjectsEl);
  initFeaturedSlider(publicProjects);
}

function initFeaturedSlider(projects) {
  const root = document.getElementById("workSlider");
  if (!root || !window.WorkSlider || typeof gsap === "undefined") return;
  if (featuredSlider) featuredSlider.destroy();
  const slides = WorkSlider.buildSlides(projects);
  featuredSlider = WorkSlider.create(root, {
    slides,
    onOpen: (id) => openCaseStudy(id),
  });
}

function observeReveals(container) {
  if (!container) return;
  container.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
  revealInView();
}

const caseModal = document.getElementById("caseModal");
const caseEls = {
  eyebrow: document.getElementById("caseEyebrow"),
  title: document.getElementById("caseTitle"),
  sub: document.getElementById("caseSub"),
  facts: document.getElementById("caseFacts"),
  gallery: document.getElementById("caseGallery"),
  overview: document.getElementById("caseOverview"),
  outcome: document.getElementById("caseOutcome"),
};
let lastFocused = null;

function openCaseStudy(id) {
  const data = caseStudies[id];
  if (!data || !caseModal) return;

  caseEls.eyebrow.textContent = data.eyebrow;
  caseEls.title.textContent = data.title;
  caseEls.sub.textContent = data.sub;
  caseEls.facts.innerHTML = data.facts
    .map((f) => `<li><strong>${f.label}:</strong> ${f.value}</li>`)
    .join("");
  caseEls.gallery.innerHTML = data.images
    .map(
      (img) =>
        `<figure><img src="${img.src}" alt="${data.title}: ${img.caption}" loading="lazy" /><figcaption>${img.caption}</figcaption></figure>`
    )
    .join("");
  caseEls.overview.textContent = data.overview;
  caseEls.outcome.textContent = data.outcome;

  lastFocused = document.activeElement;
  caseModal.classList.add("open");
  caseModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  caseModal.querySelector(".case-modal-close")?.focus();
  caseModal.querySelector(".case-modal-scroll").scrollTop = 0;
}

function closeCaseStudy() {
  if (!caseModal) return;
  caseModal.classList.remove("open");
  caseModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus();
}

window.openCaseStudy = openCaseStudy;

// Open from a "View case study" button or from clicking any work item in a group
function bindCaseStudyTriggers() {
  workProjectsEl?.addEventListener("click", (e) => {
    const group = e.target.closest(".work-group[data-project]");
    if (!group) return;
    const clicked = e.target.closest(".work-item, .case-study-btn");
    if (!clicked) return;
    openCaseStudy(group.getAttribute("data-project"));
  });
}

initPortfolio();

// Close interactions
caseModal?.querySelectorAll("[data-close]").forEach((el) =>
  el.addEventListener("click", closeCaseStudy)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && caseModal?.classList.contains("open")) closeCaseStudy();
});
