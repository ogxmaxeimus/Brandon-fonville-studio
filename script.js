// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("bfc-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
if (initialTheme === "dark") root.setAttribute("data-theme", "dark");
else root.removeAttribute("data-theme");

themeBtn?.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("bfc-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("bfc-theme", "dark");
  }
});

// ---------- Intro title sheet ----------
const intro = document.getElementById("intro");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function finishIntro() {
  intro?.classList.add("is-done");
  intro?.setAttribute("aria-hidden", "true");
  requestAnimationFrame(() => {
    document.querySelector(".hero")?.classList.add("is-ready");
    document.documentElement.classList.add("hero-ready");
  });
}
if (!intro || reduceMotion || sessionStorage.getItem("bfc-intro") === "1") {
  intro?.classList.add("is-done");
  finishIntro();
} else {
  setTimeout(() => {
    sessionStorage.setItem("bfc-intro", "1");
    finishIntro();
  }, 1650);
}

// ---------- Header over hero ----------
const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
function syncHeaderOverHero() {
  if (!header || !hero) return;
  const heroBottom = hero.getBoundingClientRect().bottom;
  header.classList.toggle("is-over-hero", heroBottom > 72);
}
syncHeaderOverHero();
window.addEventListener("scroll", syncHeaderOverHero, { passive: true });
window.addEventListener("resize", syncHeaderOverHero);

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  })
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
  if (form.querySelector('[name="_gotcha"]')?.value) return;

  setStatus("Sending…", "pending");
  if (submitBtn) submitBtn.disabled = true;

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
    if (submitBtn) submitBtn.disabled = false;
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
  // Low threshold so tall blocks (work board, packages) reveal as soon as they enter
  { threshold: 0.02, rootMargin: "0px 0px -24px 0px" }
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
// Safety net: IO alone can miss tall sections / late layout; keep scroll coherent
let revealScrollTick = 0;
window.addEventListener(
  "scroll",
  () => {
    if (revealScrollTick) return;
    revealScrollTick = requestAnimationFrame(() => {
      revealScrollTick = 0;
      revealInView();
    });
  },
  { passive: true }
);

// ---------- Assembly layers ----------
const ASSEMBLY = [
  {
    meta: "Brand · System",
    title: "The Identity",
    body: "Logo suite, strategy, colors, typography, guidelines, and launch-ready files for print and digital.",
  },
  {
    meta: "Product · Digital",
    title: "The Product",
    body: "UI/UX, SaaS product design, websites, apps, user flows, prototypes, and developer handoff.",
  },
  {
    meta: "Physical · Production",
    title: "The Physical",
    body: "Apparel, packaging, merch, phone cases, labels, product mockups, and print-ready production files.",
  },
  {
    meta: "Ops · Handoff",
    title: "The Finish",
    body: "Contracts, structured revisions, production prep, and files delivered as if someone will build from them tomorrow.",
  },
];

const assemblyNav = document.getElementById("assemblyNav");
const assemblyMeta = document.getElementById("assemblyMeta");
const assemblyTitle = document.getElementById("assemblyTitle");
const assemblyBody = document.getElementById("assemblyBody");

function setAssembly(index) {
  const layer = ASSEMBLY[index];
  if (!layer) return;
  assemblyMeta.textContent = layer.meta;
  assemblyTitle.textContent = layer.title;
  assemblyBody.textContent = layer.body;
  assemblyNav?.querySelectorAll("button").forEach((btn, i) => {
    btn.classList.toggle("is-active", i === index);
  });
}

assemblyNav?.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-layer]");
  if (!btn) return;
  setAssembly(Number(btn.getAttribute("data-layer")));
});

// Auto-advance assembly while in view
let assemblyIndex = 0;
let assemblyTimer = null;
const assemblySection = document.getElementById("services");
const assemblyWatcher = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      if (assemblyTimer) return;
      assemblyTimer = setInterval(() => {
        assemblyIndex = (assemblyIndex + 1) % ASSEMBLY.length;
        setAssembly(assemblyIndex);
      }, 4200);
    } else if (assemblyTimer) {
      clearInterval(assemblyTimer);
      assemblyTimer = null;
    }
  },
  { threshold: 0.35 }
);
if (assemblySection) assemblyWatcher.observe(assemblySection);

// ---------- Process gauge ----------
const processSteps = document.querySelectorAll(".process-steps > li");
const processWeek = document.getElementById("processWeek");
const processTicks = document.querySelectorAll(".process-ticks li");

const processObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const li = entry.target;
      const stage = Number(li.getAttribute("data-stage") || 0);
      processSteps.forEach((el) => el.classList.toggle("is-active", el === li));
      if (processWeek) processWeek.textContent = `Stage ${String(stage + 1).padStart(2, "0")} / 06`;
      processTicks.forEach((tick, i) => tick.classList.toggle("is-done", i <= stage));
    });
  },
  { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
);
processSteps.forEach((li) => processObserver.observe(li));

// ---------- Portfolio work ----------
let caseStudies = {};
const workProjectsEl = document.getElementById("workProjects");
const workBoard = document.getElementById("workBoard");

const WORK_PREVIEWS = {
  tradeverified: { src: "assets/work/tv-landing.png", caption: "TradeVerified · Product" },
  scopesignal: { src: "assets/work/ss-demo.png", caption: "ScopeSignal · Product" },
  maxeimus: { src: "assets/work/work-identity.png", caption: "Maxeimus · Identity" },
  bcm: { src: "assets/work/bcm-crest.png", caption: "Blue Collar Millionaire · Mark" },
  knightsplay: { src: "assets/work/kp-wayfinding.png", caption: "Knights Play · Wayfinding" },
  ashfordvale: { src: "assets/work/av-home.png", caption: "Ashford Vale · Web" },
  harborglobal: { src: "assets/work/hg-home.png", caption: "Harbor Global · Web" },
  saltmarsh: { src: "assets/work/sm-home.png", caption: "Saltmarsh · Product Launch" },
};

function initPortfolio() {
  if (typeof WorkStore === "undefined") return;
  let data = WorkStore.load();
  const missing = WorkStore.getMissingProjectIds(data);
  if (missing.length) {
    missing.forEach((id) => {
      data = WorkStore.restoreProject(data, id);
    });
    WorkStore.save(data);
  }
  caseStudies = WorkStore.buildCaseStudies(data.projects);
  if (workProjectsEl) {
    WorkStore.renderWorkSection(workProjectsEl, data.projects);
    bindCaseStudyTriggers();
    observeReveals(workProjectsEl);
  }
  initWorkBoard(data.projects);
}

function initWorkBoard(projects) {
  if (!workBoard) return;

  workBoard.innerHTML = projects
    .map((p, i) => {
      const preview = WORK_PREVIEWS[p.id] || {
        src: (p.items && p.items[0] && p.items[0].src) || "",
        caption: `${p.title} · ${p.tag || ""}`.trim(),
      };
      const code = `A-${String(101 + i).padStart(3, "0")}`;
      const meta = (p.meta || p.tag || "").toUpperCase();
      return `
      <button type="button" class="work-card reveal" data-project="${p.id}" aria-label="Open case study: ${p.title}">
        <div class="work-card__frame">
          <div class="work-card__blueprint" aria-hidden="true" style="background-image:url('${preview.src}')"></div>
          <div class="work-card__photo" style="background-image:url('${preview.src}')"></div>
          <span class="work-card__ring" aria-hidden="true"></span>
          <span class="work-card__code">${code}</span>
        </div>
        <div class="work-card__meta">
          <h3>${p.title}</h3>
          <p>${meta}</p>
        </div>
      </button>`;
    })
    .join("");

  observeReveals(workBoard);

  workBoard.querySelectorAll(".work-card").forEach((card) => {
    const frame = card.querySelector(".work-card__frame");
    const photo = card.querySelector(".work-card__photo");

    const move = (e) => {
      const rect = frame.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      photo.style.setProperty("--mx", `${x}%`);
      photo.style.setProperty("--my", `${y}%`);
      photo.style.setProperty("--reveal", "150px");
      card.classList.add("is-revealing");
    };
    const leave = () => {
      photo.style.setProperty("--reveal", "0px");
      card.classList.remove("is-revealing");
    };

    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerleave", leave);
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project");
      if (id) openCaseStudy(id);
    });
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

caseModal?.querySelectorAll("[data-close]").forEach((el) =>
  el.addEventListener("click", closeCaseStudy)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && caseModal?.classList.contains("open")) closeCaseStudy();
});
