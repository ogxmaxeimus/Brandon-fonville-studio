// Brandon Fonville Creative Studio — jamarea-variant
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Theme
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

// Fullscreen menu
const menu = document.getElementById("siteMenu");
const menuToggle = document.getElementById("menuToggle");
function openMenu() {
  if (!menu || !menuToggle) return;
  menu.classList.add("is-open");
  menu.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}
function closeMenu() {
  if (!menu || !menuToggle) return;
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}
menuToggle?.addEventListener("click", () => {
  if (menu?.classList.contains("is-open")) closeMenu();
  else openMenu();
});
menu?.querySelectorAll("[data-menu-close]").forEach((el) => el.addEventListener("click", closeMenu));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu?.classList.contains("is-open")) closeMenu();
});

// Home entrance + project flipper
const home = document.querySelector(".home");
if (home) {
  requestAnimationFrame(() => {
    home.classList.add("is-ready");
    document.documentElement.classList.add("home-ready");
  });
}

const FLIPPER_PROJECTS = [
  { id: "maxeimus", title: "Maxeimus", tag: "Identity" },
  { id: "scopesignal", title: "ScopeSignal", tag: "Product" },
  { id: "tradeverified", title: "TradeVerified", tag: "Product" },
  { id: "knightsplay", title: "Knights Play", tag: "Wayfinding" },
  { id: "ashfordvale", title: "Ashford Vale", tag: "Web" },
  { id: "harborglobal", title: "Harbor Global", tag: "Web" },
];

function initHomeFlipper() {
  const titleEl = document.getElementById("flipperTitle");
  const tagEl = document.getElementById("flipperTag");
  const indexEl = document.getElementById("flipperIndex");
  const works = document.querySelector(".home-works");
  if (!titleEl || !works) return;

  let i = 0;
  const setActive = (idx) => {
    i = idx;
    const p = FLIPPER_PROJECTS[i];
    const num = String(i + 1).padStart(3, "0");
    titleEl.textContent = p.title;
    if (tagEl) tagEl.textContent = p.tag;
    if (indexEl) indexEl.textContent = `0 ( ${num} ) 0`;
    works.classList.add("is-dimming");
    works.querySelectorAll(".home-work").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-project") === p.id);
    });
  };

  setActive(0);
  setInterval(() => setActive((i + 1) % FLIPPER_PROJECTS.length), 2800);

  works.querySelectorAll(".home-work").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const id = el.getAttribute("data-project");
      const idx = FLIPPER_PROJECTS.findIndex((p) => p.id === id);
      if (idx >= 0) setActive(idx);
    });
  });
}
initHomeFlipper();

// Contact form
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

// Portfolio (works page)
let caseStudies = {};
const workProjectsEl = document.getElementById("workProjects");

const WORK_PREVIEWS = {
  tradeverified: { src: "assets/work/tv-landing.png", caption: "TradeVerified · Product" },
  scopesignal: { src: "assets/work/ss-demo.png", caption: "ScopeSignal · Product" },
  maxeimus: { src: "assets/work/work-identity.png", caption: "Maxeimus · Identity" },
  bcm: { src: "assets/work/bcm-crest.png", caption: "Blue Collar Millionaire · Mark" },
  knightsplay: { src: "assets/work/kp-wayfinding.png", caption: "Knights Play · Wayfinding" },
  ashfordvale: { src: "assets/work/av-home.png", caption: "Ashford Vale · Web" },
  harborglobal: { src: "assets/work/hg-home.png", caption: "Harbor Global · Web" },
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
  initWorkIndex(data.projects);
}

function initWorkIndex(projects) {
  const listEl = document.getElementById("workIndexList");
  const previewEl = document.getElementById("workIndexPreview");
  const imgEl = document.getElementById("workIndexImg");
  const captionEl = document.getElementById("workIndexCaption");
  if (!listEl || !previewEl || !imgEl) return;

  const items = projects.map((p, i) => {
    const preview = WORK_PREVIEWS[p.id] || {
      src: (p.items && p.items[0] && p.items[0].src) || "",
      caption: `${p.title} · ${p.tag || ""}`.trim(),
    };
    const num = String(i + 1).padStart(2, "0");
    return { id: p.id, title: p.title, tag: p.tag || "", preview, num };
  });

  listEl.innerHTML = items
    .map(
      (item) => `
      <button type="button" class="work-index__item" role="listitem" data-project="${item.id}" data-src="${item.preview.src}" data-caption="${item.preview.caption}">
        <span class="work-index__num">${item.num}</span>
        <span class="work-index__title">${item.title}</span>
        <span class="work-index__meta">${item.tag}</span>
      </button>`
    )
    .join("");

  const indexRoot = document.getElementById("workIndex");
  let activeBtn = null;

  const showPreview = (btn) => {
    if (!btn) return;
    const src = btn.getAttribute("data-src");
    const caption = btn.getAttribute("data-caption") || "";
    if (!src) return;
    if (imgEl.getAttribute("src") !== src) {
      imgEl.style.opacity = "0";
      imgEl.onload = () => { imgEl.style.opacity = ""; };
      imgEl.src = src;
    }
    if (captionEl) captionEl.textContent = caption;
    previewEl.classList.add("is-live");
    indexRoot?.classList.add("is-hovering");
    listEl.querySelectorAll(".work-index__item").forEach((el) => el.classList.remove("is-active"));
    btn.classList.add("is-active");
    activeBtn = btn;
  };

  listEl.querySelectorAll(".work-index__item").forEach((btn) => {
    btn.addEventListener("mouseenter", () => showPreview(btn));
    btn.addEventListener("focus", () => showPreview(btn));
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-project");
      if (id) openCaseStudy(id);
    });
  });

  indexRoot?.addEventListener("mouseleave", () => {
    indexRoot.classList.remove("is-hovering");
    if (activeBtn) activeBtn.classList.add("is-active");
  });

  if (items[0]) showPreview(listEl.querySelector(".work-index__item"));
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
