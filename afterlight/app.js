(function () {
  "use strict";

  const STORAGE_KEY = "afterlight-vault-v1";
  const DAY_MS = 24 * 60 * 60 * 1000;
  const ROLES = ["Photos", "Accounts", "Wishes", "Practical"];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function uid() {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function firmVault() {
    const t = Date.now();
    const s1 = uid();
    const s2 = uid();
    const s3 = uid();
    return {
      ownerName: "Margaret Chen",
      lastHereAt: t,
      simulatedNow: t,
      released: false,
      confirmations: {},
      thresholdDays: 14,
      confirmNeed: 2,
      firm: {
        name: "Holloway & Reed LLP",
        attorney: "Elena Holloway",
        role: "Estate Planning Attorney",
        city: "Raleigh, NC",
        phone: "(919) 555-0142",
        email: "eholloway@hollowayreed.example",
      },
      stewards: [
        { id: s1, name: "Daniel Chen", relation: "Son", role: "Practical" },
        { id: s2, name: "Priya Shah", relation: "Daughter", role: "Wishes" },
        { id: s3, name: "Luis Ortega", relation: "Neighbor / friend", role: "Photos" },
      ],
      wishes: [
        {
          id: uid(),
          title: "For Priya",
          body: "The family albums are in the Google Drive folder labeled Keep - Family. Print the 1998 trip photos for Daniel's kids. Everything else can wait.",
          sealed: true,
        },
        {
          id: uid(),
          title: "For Daniel - first week",
          body: "Call Elena Holloway at Holloway & Reed if you need the estate contacts. Cancel the gym. Keep the library card. The desk binder has utility account numbers.",
          sealed: false,
        },
        {
          id: uid(),
          title: "About social accounts",
          body: "Please memorial Instagram. Do not post a public announcement until the family has gathered. Close the old Twitter account.",
          sealed: true,
        },
      ],
      inventory: [
        { id: uid(), name: "Google / Gmail", where: "1Password / Family vault", action: "Transfer" },
        { id: uid(), name: "Instagram", where: "1Password / Social", action: "Memorial" },
        { id: uid(), name: "Chase online banking", where: "Paper packet / fireproof box", action: "Close" },
        { id: uid(), name: "Apple ID", where: "1Password / Devices", action: "Transfer" },
        { id: uid(), name: "Utility portal", where: "Desk binder / tab Utilities", action: "Close" },
      ],
    };
  }

  function sampleVault() {
    const t = Date.now();
    return {
      ownerName: "Alex Rivera",
      lastHereAt: t,
      simulatedNow: t,
      released: false,
      confirmations: {},
      thresholdDays: 14,
      confirmNeed: 2,
      firm: null,
      stewards: [
        { id: uid(), name: "Maya Rivera", relation: "Sister", role: "Wishes" },
        { id: uid(), name: "Jordan Lee", relation: "Partner", role: "Practical" },
        { id: uid(), name: "Sam Ortiz", relation: "Best friend", role: "Photos" },
      ],
      wishes: [
        {
          id: uid(),
          title: "For Maya",
          body: "If you are reading this, start with the photo albums in the shared drive labeled Family - keep. Everything else can wait. I love you.",
          sealed: true,
        },
        {
          id: uid(),
          title: "Practical first steps",
          body: "Call Jordan. The binder on the desk has the phone numbers. Cancel the gym. Keep the library card - donate the books.",
          sealed: false,
        },
      ],
      inventory: [
        { id: uid(), name: "Google", where: "1Password / Family vault", action: "Transfer" },
        { id: uid(), name: "Instagram", where: "1Password / Social", action: "Memorial" },
        { id: uid(), name: "Banking portal", where: "Paper packet / desk drawer", action: "Close" },
      ],
    };
  }

  function emptyVault() {
    const t = Date.now();
    return {
      ownerName: "",
      lastHereAt: t,
      simulatedNow: t,
      released: false,
      confirmations: {},
      thresholdDays: 14,
      confirmNeed: 2,
      firm: null,
      stewards: [],
      wishes: [],
      inventory: [],
    };
  }

  function loadVault() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const demo = sampleVault();
        saveVault(demo);
        return demo;
      }
      return Object.assign(emptyVault(), JSON.parse(raw));
    } catch (err) {
      return sampleVault();
    }
  }

  function saveVault(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  var vault = loadVault();
  var demoRunning = false;

  function now() {
    return vault.simulatedNow || Date.now();
  }

  function silentDays() {
    return Math.max(0, (now() - vault.lastHereAt) / DAY_MS);
  }

  function silenceRatio() {
    var t = Math.max(1, Number(vault.thresholdDays) || 14);
    return Math.min(1, silentDays() / t);
  }

  function thresholdReached() {
    return silentDays() >= (Number(vault.thresholdDays) || 14);
  }

  function confirmationCount() {
    return vault.stewards.filter(function (s) {
      return vault.confirmations[s.id];
    }).length;
  }

  function canRelease() {
    return (
      !vault.released &&
      thresholdReached() &&
      confirmationCount() >= (Number(vault.confirmNeed) || 1) &&
      vault.stewards.length > 0
    );
  }

  function formatRelative(ts) {
    var diff = now() - ts;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + " minute" + (mins === 1 ? "" : "s") + " ago";
    var hours = Math.floor(mins / 60);
    if (hours < 48) return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    var days = Math.floor(hours / 24);
    return days + " day" + (days === 1 ? "" : "s") + " ago";
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function formatDateOnly(ts) {
    return new Date(ts).toLocaleDateString(undefined, { dateStyle: "long" });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setDemoStatus(text, step, total) {
    var el = $("#demoStatus");
    var bar = $("#demoProgressBar");
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
    if (bar && total) {
      bar.hidden = false;
      bar.style.width = Math.round((step / total) * 100) + "%";
    }
  }

  function clearDemoStatus() {
    var el = $("#demoStatus");
    var bar = $("#demoProgressBar");
    if (el) {
      el.hidden = true;
      el.textContent = "";
    }
    if (bar) {
      bar.hidden = true;
      bar.style.width = "0%";
    }
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function switchTab(id) {
    var tab = document.querySelector('.vault-tab[data-tab="' + id + '"]');
    if (tab) tab.click();
  }

  function renderStatus() {
    var value = $("#statusValue");
    var meta = $("#statusMeta");
    var shell = $("#vaultShell");
    var meter = $("#silenceMeter");
    var silenceCopy = $("#silenceCopy");
    var beginBtn = $("#btnBeginRelease");
    var hint = $("#releaseHint");
    var firmBadge = $("#firmBadge");

    var state = "present";
    var label = "Present";

    if (vault.released) {
      state = "released";
      label = "Released";
    } else if (thresholdReached()) {
      state = "silent";
      label = "Silent - threshold reached";
    } else if (silentDays() >= 1) {
      state = "silent";
      label = "Quiet";
    }

    value.dataset.state = state;
    value.textContent = label;
    meta.textContent = vault.released
      ? "Stewardship packet unlocked | last presence " + formatRelative(vault.lastHereAt)
      : "Last confirmed " + formatRelative(vault.lastHereAt) + " | " + silentDays().toFixed(1) + " silent days";

    shell.classList.toggle("is-released", vault.released);
    shell.classList.toggle("is-sealed", !vault.released);
    shell.classList.toggle("is-firm", !!(vault.firm && vault.firm.name));

    if (firmBadge) {
      if (vault.firm && vault.firm.name) {
        firmBadge.hidden = false;
        firmBadge.textContent = "Client of " + vault.firm.name;
      } else {
        firmBadge.hidden = true;
      }
    }

    var ratio = silenceRatio();
    if (meter) meter.style.width = Math.round(ratio * 100) + "%";
    if (silenceCopy) {
      silenceCopy.textContent = vault.released
        ? "Release complete. Sealed wishes are open."
        : silentDays().toFixed(1) +
          " of " +
          vault.thresholdDays +
          " days silent (" +
          Math.round(ratio * 100) +
          "%). Use Simulate silence or Run firm demo.";
    }

    if (!beginBtn) return;
    beginBtn.disabled = !canRelease();
    if (vault.released) {
      beginBtn.disabled = true;
      beginBtn.textContent = "Release complete";
      hint.textContent = "Sealed wishes are unlocked for stewards.";
    } else if (!thresholdReached()) {
      hint.textContent = "Simulate enough silence before stewards can begin release.";
      beginBtn.textContent = "Begin release";
    } else if (confirmationCount() < (Number(vault.confirmNeed) || 1)) {
      hint.textContent =
        "Need " +
        vault.confirmNeed +
        " steward confirmation" +
        (vault.confirmNeed === 1 ? "" : "s") +
        " (" +
        confirmationCount() +
        " so far).";
      beginBtn.textContent = "Begin release";
    } else {
      hint.textContent = "Threshold met and confirmations gathered. You can begin release.";
      beginBtn.textContent = "Begin release";
    }
  }

  function renderStewards() {
    var list = $("#stewardList");
    if (!list) return;
    if (!vault.stewards.length) {
      list.innerHTML = '<p class="empty">No stewards yet. Add someone you trust.</p>';
      return;
    }
    list.innerHTML = vault.stewards
      .map(function (s) {
        return (
          '<article class="list-item" data-id="' +
          s.id +
          '"><div><h4>' +
          escapeHtml(s.name) +
          '</h4><p class="meta">' +
          escapeHtml(s.relation) +
          '</p><span class="badge">' +
          escapeHtml(s.role) +
          '</span></div><button type="button" class="btn btn-ghost btn-sm" data-remove-steward="' +
          s.id +
          '">Remove</button></article>'
        );
      })
      .join("");
  }

  function renderWishes() {
    var list = $("#wishList");
    if (!list) return;
    if (!vault.wishes.length) {
      list.innerHTML = '<p class="empty">No wishes yet. Write a short letter for someone you love.</p>';
      return;
    }
    list.innerHTML = vault.wishes
      .map(function (w) {
        var locked = w.sealed && !vault.released;
        var badge;
        if (!w.sealed) badge = '<span class="badge open">Open</span>';
        else if (vault.released) badge = '<span class="badge open">Unlocked</span>';
        else badge = '<span class="badge sealed">Sealed until release</span>';
        return (
          '<article class="list-item ' +
          (locked ? "is-locked" : "") +
          '" data-id="' +
          w.id +
          '"><div><h4>' +
          escapeHtml(w.title) +
          "</h4>" +
          badge +
          '</div><button type="button" class="btn btn-ghost btn-sm" data-remove-wish="' +
          w.id +
          '">Remove</button><p class="body">' +
          escapeHtml(locked ? "............ ............ ............" : w.body) +
          "</p></article>"
        );
      })
      .join("");
  }

  function renderInventory() {
    var list = $("#inventoryList");
    if (!list) return;
    if (!vault.inventory.length) {
      list.innerHTML =
        '<p class="empty">No accounts listed. Add services and where the credentials live.</p>';
      return;
    }
    list.innerHTML = vault.inventory
      .map(function (item) {
        return (
          '<article class="list-item" data-id="' +
          item.id +
          '"><div><h4>' +
          escapeHtml(item.name) +
          '</h4><p class="meta">' +
          escapeHtml(item.where) +
          '</p><span class="badge">' +
          escapeHtml(item.action) +
          '</span></div><button type="button" class="btn btn-ghost btn-sm" data-remove-inv="' +
          item.id +
          '">Remove</button></article>'
        );
      })
      .join("");
  }

  function renderConfirmations() {
    var list = $("#confirmList");
    if (!list) return;
    if (!vault.stewards.length) {
      list.innerHTML = '<p class="empty">Add stewards before collecting confirmations.</p>';
      return;
    }
    list.innerHTML = vault.stewards
      .map(function (s) {
        var ok = !!vault.confirmations[s.id];
        var disabled = vault.released || !thresholdReached() ? " disabled" : "";
        return (
          '<div class="confirm-row ' +
          (ok ? "confirmed" : "") +
          '"><div><span class="name">' +
          escapeHtml(s.name) +
          '</span><span class="role">' +
          escapeHtml(s.role) +
          " | " +
          escapeHtml(s.relation) +
          '</span></div><button type="button" class="btn ' +
          (ok ? "btn-sea" : "btn-ghost") +
          ' btn-sm" data-confirm="' +
          s.id +
          '"' +
          disabled +
          ">" +
          (ok ? "Confirmed" : "Confirm") +
          "</button></div>"
        );
      })
      .join("");
  }

  function renderForms() {
    if ($("#ownerName")) $("#ownerName").value = vault.ownerName || "";
    if ($("#thresholdDays")) $("#thresholdDays").value = vault.thresholdDays;
    if ($("#confirmNeed")) $("#confirmNeed").value = vault.confirmNeed;
  }

  function renderAll() {
    renderForms();
    renderStatus();
    renderStewards();
    renderWishes();
    renderInventory();
    renderConfirmations();
  }

  function persist() {
    saveVault(vault);
    renderAll();
  }

  function initTabs() {
    var tabs = $$(".vault-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.dataset.tab;
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        $$(".vault-panel").forEach(function (panel) {
          var on = panel.id === "panel-" + id;
          panel.classList.toggle("is-active", on);
          panel.hidden = !on;
        });
      });
    });
  }

  function initForms() {
    var formProfile = $("#formProfile");
    if (!formProfile) return;

    formProfile.addEventListener("submit", function (e) {
      e.preventDefault();
      vault.ownerName = $("#ownerName").value.trim();
      persist();
    });

    $("#formSteward").addEventListener("submit", function (e) {
      e.preventDefault();
      if (vault.stewards.length >= 5) {
        alert("This vault holds up to five stewards.");
        return;
      }
      var name = $("#stewardName").value.trim();
      var relation = $("#stewardRelation").value.trim();
      var role = $("#stewardRole").value;
      if (ROLES.indexOf(role) === -1) return;
      vault.stewards.push({ id: uid(), name: name, relation: relation, role: role });
      e.target.reset();
      persist();
    });

    $("#formWish").addEventListener("submit", function (e) {
      e.preventDefault();
      vault.wishes.push({
        id: uid(),
        title: $("#wishTitle").value.trim(),
        body: $("#wishBody").value.trim(),
        sealed: $("#wishSealed").checked,
      });
      e.target.reset();
      $("#wishSealed").checked = true;
      persist();
    });

    $("#formInventory").addEventListener("submit", function (e) {
      e.preventDefault();
      vault.inventory.push({
        id: uid(),
        name: $("#invName").value.trim(),
        where: $("#invWhere").value.trim(),
        action: $("#invAction").value,
      });
      e.target.reset();
      persist();
    });

    $("#formRelease").addEventListener("submit", function (e) {
      e.preventDefault();
      vault.thresholdDays = Math.max(1, Math.min(365, Number($("#thresholdDays").value) || 14));
      vault.confirmNeed = Math.max(1, Math.min(5, Number($("#confirmNeed").value) || 2));
      if (!vault.released) vault.confirmations = {};
      persist();
    });

    $("#stewardList").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-remove-steward");
      if (!id) return;
      vault.stewards = vault.stewards.filter(function (s) {
        return s.id !== id;
      });
      delete vault.confirmations[id];
      persist();
    });

    $("#wishList").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-remove-wish");
      if (!id) return;
      vault.wishes = vault.wishes.filter(function (w) {
        return w.id !== id;
      });
      persist();
    });

    $("#inventoryList").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-remove-inv");
      if (!id) return;
      vault.inventory = vault.inventory.filter(function (i) {
        return i.id !== id;
      });
      persist();
    });

    $("#confirmList").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-confirm");
      if (!id || vault.released || !thresholdReached()) return;
      vault.confirmations[id] = true;
      persist();
    });
  }

  function buildExportHtml(branded) {
    var firm = vault.firm;
    var useBrand = branded && firm && firm.name;

    var stewards = vault.stewards
      .map(function (s) {
        return (
          "<li><strong>" +
          escapeHtml(s.name) +
          "</strong> - " +
          escapeHtml(s.relation) +
          " | Role: " +
          escapeHtml(s.role) +
          "</li>"
        );
      })
      .join("");

    var wishes = vault.wishes
      .map(function (w) {
        var locked = w.sealed && !vault.released;
        return (
          "<li><strong>" +
          escapeHtml(w.title) +
          "</strong> " +
          (w.sealed ? "(sealed)" : "(open)") +
          "<br>" +
          escapeHtml(locked ? "[Content sealed until release]" : w.body) +
          "</li>"
        );
      })
      .join("");

    var inventory = vault.inventory
      .map(function (i) {
        return (
          "<li><strong>" +
          escapeHtml(i.name) +
          "</strong> - " +
          escapeHtml(i.action) +
          '<br><span class="muted">Credentials: ' +
          escapeHtml(i.where) +
          "</span></li>"
        );
      })
      .join("");

    var cover = "";
    if (useBrand) {
      cover =
        '<section class="cover">' +
        '<div class="mark">HR</div>' +
        "<h1>" +
        escapeHtml(firm.name) +
        "</h1>" +
        '<p class="tag">Client stewardship packet</p>' +
        "<h2>" +
        escapeHtml(vault.ownerName || "Client") +
        "</h2>" +
        '<p class="muted">Prepared ' +
        escapeHtml(formatDateOnly(Date.now())) +
        " by " +
        escapeHtml(firm.attorney) +
        ", " +
        escapeHtml(firm.role) +
        "</p>" +
        '<p class="muted">' +
        escapeHtml(firm.city) +
        " | " +
        escapeHtml(firm.phone) +
        " | " +
        escapeHtml(firm.email) +
        "</p>" +
        "</section>" +
        '<section class="letter">' +
        "<h2>Cover letter</h2>" +
        "<p>Dear family and stewards of " +
        escapeHtml(vault.ownerName || "our client") +
        ",</p>" +
        "<p>Alongside the estate documents we prepared, this Afterlight packet collects the digital and practical instructions " +
        escapeHtml(vault.ownerName || "the client") +
        " wanted you to have: who is responsible for what, which accounts exist, and where credentials live - not the passwords themselves.</p>" +
        "<p>This packet is not a will, trust, or power of attorney. For legal questions, contact our office. For the items below, follow the roles and instructions " +
        escapeHtml(vault.ownerName || "the client") +
        " recorded.</p>" +
        "<p>Sincerely,<br><strong>" +
        escapeHtml(firm.attorney) +
        "</strong><br>" +
        escapeHtml(firm.name) +
        "</p>" +
        "</section>";
    }

    return (
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />' +
      "<title>" +
      (useBrand ? escapeHtml(firm.name) + " - " : "") +
      "Stewardship packet - " +
      escapeHtml(vault.ownerName || "Vault") +
      "</title><style>" +
      "body{font-family:Georgia,'Times New Roman',serif;background:#f7f4ef;color:#1c1a17;padding:40px;line-height:1.55;max-width:720px;margin:0 auto}" +
      ".cover{border-bottom:2px solid #8a7a66;padding-bottom:1.5rem;margin-bottom:1.75rem}" +
      ".mark{display:inline-grid;place-items:center;width:48px;height:48px;border-radius:10px;background:#1c1a17;color:#f7f4ef;font-family:system-ui,sans-serif;font-weight:700;letter-spacing:.04em;margin-bottom:1rem}" +
      "h1{font-weight:500;letter-spacing:-.02em;margin:0 0 .35rem;font-size:1.85rem}" +
      "h2{font-weight:500;font-size:1.2rem;margin:1.5rem 0 .75rem}" +
      ".tag{text-transform:uppercase;letter-spacing:.14em;font-size:.72rem;color:#6c665d;font-family:system-ui,sans-serif;margin:0 0 1rem}" +
      "p,li{color:#3d3a35}ul{padding-left:1.2rem;margin:0 0 .5rem}" +
      ".muted{color:#6c665d;font-size:.9rem}" +
      ".letter{margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid #d9d2c6}" +
      "@media print{body{padding:24px}}" +
      "</style></head><body>" +
      cover +
      (useBrand ? "" : "<h1>Afterlight stewardship summary</h1>") +
      (useBrand
        ? ""
        : '<p class="muted">Prepared ' +
          escapeHtml(formatDate(Date.now())) +
          " | Concept export (not a legal document)</p>") +
      "<h2>Client</h2><p>" +
      escapeHtml(vault.ownerName || "Untitled") +
      " | Last presence: " +
      escapeHtml(formatDate(vault.lastHereAt)) +
      "</p>" +
      '<p class="muted">Release status: ' +
      (vault.released ? "Released" : "Sealed") +
      " | Threshold: " +
      vault.thresholdDays +
      " days | Confirmations required: " +
      vault.confirmNeed +
      "</p>" +
      "<h2>Stewards</h2><ul>" +
      (stewards || "<li>None listed</li>") +
      "</ul><h2>Wishes &amp; letters</h2><ul>" +
      (wishes || "<li>None listed</li>") +
      "</ul><h2>Account inventory</h2><ul>" +
      (inventory || "<li>None listed</li>") +
      '</ul><p class="muted" style="margin-top:2rem">This packet does not replace a will or estate attorney. Point stewards to where credentials live - never paste passwords into this summary.' +
      (useBrand
        ? " For legal matters related to " +
          escapeHtml(vault.ownerName || "the client") +
          ", contact " +
          escapeHtml(firm.name) +
          "."
        : "") +
      "</p>" +
      "<script>window.onload=function(){window.print()}<\\/script></body></html>"
    );
  }

  function exportSummary(branded) {
    var html = buildExportHtml(!!branded || !!(vault.firm && vault.firm.name));
    var win = window.open("", "_blank");
    if (!win) {
      alert("Allow pop-ups to export the summary.");
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  async function runFirmDemo(options) {
    options = options || {};
    if (demoRunning) return;
    demoRunning = true;
    var btn = $("#btnFirmDemo");
    if (btn) btn.disabled = true;

    var total = 5;
    try {
      setDemoStatus("1/5 Loading sample client Margaret Chen...", 1, total);
      vault = firmVault();
      persist();
      switchTab("stewards");
      await wait(900);

      setDemoStatus("2/5 Advancing silence past the 14-day threshold...", 2, total);
      switchTab("release");
      vault.simulatedNow = vault.lastHereAt + (vault.thresholdDays + 1) * DAY_MS;
      persist();
      await wait(1000);

      setDemoStatus("3/5 Gathering dual steward confirmations...", 3, total);
      vault.confirmations[vault.stewards[0].id] = true;
      persist();
      await wait(700);
      vault.confirmations[vault.stewards[1].id] = true;
      persist();
      await wait(900);

      setDemoStatus("4/5 Releasing sealed wishes...", 4, total);
      vault.released = true;
      persist();
      switchTab("wishes");
      var shell = $("#vaultShell");
      if (shell) {
        shell.classList.add("is-released");
        shell.animate(
          [{ filter: "brightness(1)" }, { filter: "brightness(1.12)" }, { filter: "brightness(1)" }],
          { duration: 700, easing: "ease-out" }
        );
      }
      await wait(1100);

      setDemoStatus("5/5 Opening branded stewardship packet...", 5, total);
      await wait(500);
      exportSummary(true);
      setDemoStatus("Demo complete - branded packet opened. Firm Seat starts at $200/mo.", 5, total);
      await wait(4000);
    } finally {
      demoRunning = false;
      if (btn) btn.disabled = false;
      if (!options.keepStatus) clearDemoStatus();
    }
  }

  function initActions() {
    $("#btnStillHere").addEventListener("click", function () {
      var t = Date.now();
      vault.lastHereAt = t;
      vault.simulatedNow = t;
      vault.released = false;
      vault.confirmations = {};
      var shell = $("#vaultShell");
      shell.classList.remove("is-released");
      shell.classList.add("is-sealed");
      shell.animate(
        [
          { boxShadow: "0 0 0 0 rgba(122,173,160,0)" },
          { boxShadow: "0 0 40px rgba(122,173,160,0.25)" },
          { boxShadow: "0 0 0 0 rgba(122,173,160,0)" },
        ],
        { duration: 700, easing: "ease-out" }
      );
      persist();
    });

    $("#btnSimulate").addEventListener("click", function () {
      var step = Math.max(1, Math.ceil((Number(vault.thresholdDays) || 14) / 3));
      vault.simulatedNow = now() + step * DAY_MS;
      persist();
    });

    $("#btnBeginRelease").addEventListener("click", function () {
      if (!canRelease()) return;
      vault.released = true;
      var shell = $("#vaultShell");
      shell.classList.add("is-released");
      shell.animate(
        [{ filter: "brightness(1)" }, { filter: "brightness(1.15)" }, { filter: "brightness(1)" }],
        { duration: 800, easing: "ease-out" }
      );
      persist();
      switchTab("wishes");
    });

    $("#btnReset").addEventListener("click", function () {
      if (!confirm("Reset the vault to an empty state? Demo sample data will be cleared.")) return;
      vault = emptyVault();
      clearDemoStatus();
      persist();
    });

    $("#btnExport").addEventListener("click", function () {
      exportSummary(!!(vault.firm && vault.firm.name));
    });

    var firmBtn = $("#btnFirmDemo");
    if (firmBtn) {
      firmBtn.addEventListener("click", function () {
        runFirmDemo({ keepStatus: true });
      });
    }

    var sampleBtn = $("#btnSamplePacket");
    if (sampleBtn) {
      sampleBtn.addEventListener("click", function () {
        vault = firmVault();
        vault.released = true;
        vault.stewards.forEach(function (s, i) {
          if (i < 2) vault.confirmations[s.id] = true;
        });
        vault.simulatedNow = vault.lastHereAt + 15 * DAY_MS;
        persist();
        exportSummary(true);
      });
    }
  }

  function initChrome() {
    var header = $("#siteHeader");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 40);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  function bootFromQuery() {
    var q = params();
    if (q.get("demo") === "firm") {
      var vaultEl = $("#vault");
      if (vaultEl) vaultEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        runFirmDemo({ keepStatus: true });
      }, 400);
      return;
    }
    if (q.get("export") === "1") {
      vault = firmVault();
      vault.released = true;
      vault.stewards.forEach(function (s, i) {
        if (i < 2) vault.confirmations[s.id] = true;
      });
      vault.simulatedNow = vault.lastHereAt + 15 * DAY_MS;
      persist();
      setTimeout(function () {
        exportSummary(true);
      }, 350);
    }
  }

  initTabs();
  initForms();
  initActions();
  initChrome();
  renderAll();
  bootFromQuery();
})();
