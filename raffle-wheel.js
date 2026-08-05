/**
 * Chance-to-win raffle + spinning wheel for the packages section.
 *
 * Customize prizes in RAFFLE_CONFIG below.
 * Entries post to the same Formspree endpoint as the contact form
 * (subject tagged so you can filter them). Swap FORM_ENDPOINT if you
 * create a dedicated Formspree form later.
 */
(function () {
  "use strict";

  // ========== EDIT PRIZES / SETTINGS HERE ==========
  const RAFFLE_CONFIG = {
    /** Formspree (or other) endpoint that receives raffle entries */
    formEndpoint: "https://formspree.io/f/xwvjkpva",

    /** localStorage key for emails that already spun */
    storageKey: "bfc-raffle-entries",

    /** Extra full rotations before landing (feel of the spin) */
    minTurns: 4,
    maxTurns: 6,

    /**
     * Prize segments on the wheel.
     * - label: short text drawn on the wheel (keep under ~22 chars)
     * - result: longer copy shown after the spin
     * - weight: relative chance (higher = more likely)
     * - win: true if Brandon should follow up / fulfill
     */
    prizes: [
      {
        id: "consult",
        label: "Free consult",
        result: "A complimentary 30-minute strategy consult with the studio.",
        weight: 2,
        win: true,
      },
      {
        id: "discount",
        label: "10% off",
        result: "10% off your first studio package when you book a project.",
        weight: 2,
        win: true,
      },
      {
        id: "priority",
        label: "Priority review",
        result: "Priority proposal review — we'll move your discovery to the front of the queue.",
        weight: 2,
        win: true,
      },
      {
        id: "checklist",
        label: "Brand checklist",
        result: "A studio brand-launch checklist PDF sent to your inbox.",
        weight: 3,
        win: true,
      },
      {
        id: "merch",
        label: "Studio merch",
        result: "A small studio sticker pack (shipped with your first project, or separately).",
        weight: 2,
        win: true,
      },
      {
        id: "again",
        label: "Not this round",
        result: "Not this round — thanks for entering. Book a package anytime and you're always welcome back.",
        weight: 3,
        win: false,
      },
    ],
  };
  // ========== END EDITABLE CONFIG ==========

  const root = document.getElementById("raffle");
  if (!root) return;

  const canvas = document.getElementById("raffleCanvas");
  const form = document.getElementById("raffleForm");
  const spinBtn = document.getElementById("raffleSpinBtn");
  const statusEl = document.getElementById("raffleStatus");
  const resultEl = document.getElementById("raffleResult");
  const wheelEl = document.getElementById("raffleWheel");
  const stageEl = root.querySelector(".raffle-stage");

  if (!canvas || !form || !spinBtn || !wheelEl) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prizes = RAFFLE_CONFIG.prizes;
  const segmentAngle = (Math.PI * 2) / prizes.length;
  const degPer = 360 / prizes.length;

  // Rotation is drawn on the canvas (not CSS), so nothing can override the visual.
  // 0deg = segment 0 centered under the top pointer. Positive = clockwise.
  let currentRotation = 0;
  let spinning = false;
  let entry = null; // { name, email } after successful entry

  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.className = "form-status raffle-status" + (kind ? " " + kind : "");
  }

  function setResult(prize) {
    if (!resultEl) return;
    if (!prize) {
      resultEl.hidden = true;
      resultEl.innerHTML = "";
      return;
    }
    const eyebrow = prize.win ? "You landed on" : "Result";
    resultEl.hidden = false;
    resultEl.innerHTML =
      `<p class="raffle-result-eyebrow">${eyebrow}</p>` +
      `<p class="raffle-result-label">${escapeHtml(prize.label)}</p>` +
      `<p class="raffle-result-copy">${escapeHtml(prize.result)}</p>` +
      (prize.win
        ? `<p class="raffle-result-note">We'll follow up at <strong>${escapeHtml(entry.email)}</strong> to confirm.</p>`
        : `<p class="raffle-result-note">Still exploring packages? <a href="#contact">Start a project</a> anytime.</p>`);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(RAFFLE_CONFIG.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(RAFFLE_CONFIG.storageKey, JSON.stringify(store));
    } catch {
      /* private mode / quota � ignore */
    }
  }

  function hasSpun(email) {
    const store = loadStore();
    return Boolean(store[normalizeEmail(email)]);
  }

  function markSpun(email, prizeId) {
    const store = loadStore();
    store[normalizeEmail(email)] = {
      prizeId,
      at: new Date().toISOString(),
    };
    saveStore(store);
  }

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function segmentColors() {
    const accent = cssVar("--accent", "#c4b5a0");
    const accent2 = cssVar("--accent-2", "#d4c8b4");
    const surface = cssVar("--surface-2", "#1f1f25");
    const bgSoft = cssVar("--bg-soft", "#141417");
    const text = cssVar("--text", "#edeae4");
    const ink = cssVar("--accent-ink", "#141210");
    return { accent, accent2, surface, bgSoft, text, ink };
  }

  function drawWheel() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.min(wheelEl.clientWidth || 320, 360);
    const pixelSize = Math.round(size * dpr);

    if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
      canvas.width = pixelSize;
      canvas.height = pixelSize;
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = segmentColors();
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 2;

    ctx.clearRect(0, 0, size, size);

    // Static wheel art — CSS transform on #raffleWheel handles spin.
    // Index 0 centered under the top pointer at rotation 0.
    const startOffset = -Math.PI / 2 - segmentAngle / 2;

    for (let i = 0; i < prizes.length; i++) {
      const start = startOffset + i * segmentAngle;
      const end = start + segmentAngle;
      const fill = i % 2 === 0 ? colors.accent : colors.surface;
      const labelColor = i % 2 === 0 ? colors.ink : colors.text;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = colors.bgSoft;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const mid = start + segmentAngle / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(mid);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = labelColor;
      ctx.font = `600 ${Math.max(11, size * 0.038)}px "Source Sans 3", "Syne", sans-serif`;
      const label = prizes[i].label;
      const maxW = radius * 0.58;
      ctx.fillText(truncateToWidth(label, maxW), radius * 0.88, 0);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = colors.bgSoft;
    ctx.fill();
    ctx.strokeStyle = colors.accent2;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = colors.accent2;
    ctx.font = `700 ${Math.max(10, size * 0.032)}px "Syne", "Source Sans 3", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BF", cx, cy);
  }

  function truncateToWidth(text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let t = text;
    while (t.length > 1 && ctx.measureText(t + "…").width > maxWidth) {
      t = t.slice(0, -1);
    }
    return t + "…";
  }

  function pickPrizeIndex() {
    const total = prizes.reduce((sum, p) => sum + Math.max(0, p.weight || 1), 0);
    let r = Math.random() * total;
    for (let i = 0; i < prizes.length; i++) {
      r -= Math.max(0, prizes[i].weight || 1);
      if (r <= 0) return i;
    }
    return prizes.length - 1;
  }

  /** Which prize is under the top pointer for a given rotation */
  function indexFromRotation(rotationDeg) {
    const r = ((rotationDeg % 360) + 360) % 360;
    // Wheel turned CW by r → pointer samples wheel-local angle (360 - r)
    const local = (360 - r) % 360;
    return Math.floor((local + degPer / 2) / degPer) % prizes.length;
  }

  /**
   * Absolute rotation (degrees) so segment `index` sits under the top pointer.
   * Always spins forward by at least minTurns full rotations.
   */
  function rotationForIndex(index) {
    const turns =
      RAFFLE_CONFIG.minTurns +
      Math.random() * (RAFFLE_CONFIG.maxTurns - RAFFLE_CONFIG.minTurns);
    // Small jitter so the pointer doesn't always hit dead-center
    const jitter = (Math.random() - 0.5) * degPer * 0.55;
    const base = ((currentRotation % 360) + 360) % 360;
    // Segment i is centered under the pointer when rotation ≡ -i * degPer (mod 360)
    const targetMod = (((360 - index * degPer) % 360) + jitter + 360) % 360;
    let delta = targetMod - base;
    if (delta <= 0) delta += 360;
    return currentRotation + turns * 360 + delta;
  }

  /** Strong coast: fast start, long deceleration into the prize */
  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  }

  function animateSpin(toRotation, durationMs) {
    return new Promise((resolve) => {
      // Clear any leftover CSS transform from older builds
      wheelEl.style.transform = "";

      if (reduceMotion || durationMs < 50) {
        currentRotation = toRotation;
        drawWheel();
        resolve();
        return;
      }

      const from = currentRotation;
      const start = performance.now();

      function frame(now) {
        const t = Math.min(1, (now - start) / durationMs);
        currentRotation = from + (toRotation - from) * easeOutQuint(t);
        drawWheel();
        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          currentRotation = toRotation;
          drawWheel();
          resolve();
        }
      }
      requestAnimationFrame(frame);
    });
  }

  async function submitEntry(name, email) {
    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("_subject", "Raffle entry: Chance to Win — Brandon Fonville Studio");
    body.append("form_type", "raffle");
    body.append("message", "Raffle giveaway entry from packages / Chance to Win.");
    // Honeypot
    const gotcha = form.querySelector('[name="_gotcha"]');
    if (gotcha?.value) return { ok: true, bot: true };

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4500);
      const res = await fetch(RAFFLE_CONFIG.formEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      return { ok: res.ok, bot: false };
    } catch {
      // Offline / blocked / slow — still unlock spin; entry stored locally after spin
      return { ok: false, bot: false, offline: true };
    }
  }

  function unlockSpin(name, email, statusMsg) {
    entry = { name, email };
    setStatus(statusMsg, "success");
    form.hidden = true;
    spinBtn.hidden = false;
    spinBtn.disabled = false;
    spinBtn.focus();
    stageEl?.classList.add("raffle-ready");
  }

  async function onEnter(e) {
    e.preventDefault();
    if (spinning) return;

    const name = form.querySelector("#raffleName")?.value?.trim();
    const email = form.querySelector("#raffleEmail")?.value?.trim();
    if (!name || !email) {
      setStatus("Please add your name and email.", "error");
      return;
    }

    if (hasSpun(email)) {
      setStatus("This email already had a spin. One entry per person.", "error");
      spinBtn.disabled = true;
      return;
    }

    setStatus("Saving your entry…", "pending");
    const enterBtn = form.querySelector('[type="submit"]');
    if (enterBtn) enterBtn.disabled = true;

    try {
      const { ok, bot, offline } = await submitEntry(name, email);
      if (bot) {
        setStatus("", "");
        return;
      }
      // Unlock spin even if Formspree is unreachable so the experience still works locally
      const msg = ok
        ? "You're in. Spin the wheel for your chance to win."
        : offline || !ok
          ? "You're in (saved on this device). Spin the wheel for your chance to win."
          : "You're in. Spin the wheel for your chance to win.";
      unlockSpin(name, email, msg);
    } catch {
      unlockSpin(name, email, "You're in. Spin the wheel for your chance to win.");
    } finally {
      if (enterBtn) enterBtn.disabled = false;
    }
  }

  async function onSpin() {
    if (spinning || !entry) return;
    if (hasSpun(entry.email)) {
      setStatus("This email already had a spin.", "error");
      spinBtn.disabled = true;
      return;
    }

    spinning = true;
    spinBtn.disabled = true;
    setStatus("Spinning…", "pending");
    setResult(null);
    stageEl?.classList.add("is-spinning");

    const intendedIndex = pickPrizeIndex();
    const target = rotationForIndex(intendedIndex);
    const duration = reduceMotion ? 0 : 4800 + Math.random() * 900;

    await animateSpin(target, duration);

    // Trust the final visual angle — result must match what the pointer is on
    const index = indexFromRotation(currentRotation);
    const prize = prizes[index];

    markSpun(entry.email, prize.id);
    stageEl?.classList.remove("is-spinning");
    stageEl?.classList.add("has-result");
    setStatus("", "");
    setResult(prize);

    // Notify Formspree of the outcome (best-effort, don't block UX)
    try {
      const body = new FormData();
      body.append("name", entry.name);
      body.append("email", entry.email);
      body.append("prize", prize.label);
      body.append("prize_id", prize.id);
      body.append("won", prize.win ? "yes" : "no");
      body.append("_subject", `Raffle result: ${prize.label} — Brandon Fonville Studio`);
      body.append("form_type", "raffle_result");
      body.append(
        "message",
        `Raffle spin result for ${entry.name} <${entry.email}>: ${prize.label} (win=${prize.win})`
      );
      fetch(RAFFLE_CONFIG.formEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      }).catch(() => {});
    } catch {
      /* ignore */
    }

    spinning = false;
  }

  // Init
  drawWheel();
  spinBtn.hidden = true;
  spinBtn.disabled = true;
  form.addEventListener("submit", onEnter);
  spinBtn.addEventListener("click", onSpin);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawWheel, 120);
  });

  // Redraw when theme toggles (colors change)
  const themeObserver = new MutationObserver(() => drawWheel());
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
})();
