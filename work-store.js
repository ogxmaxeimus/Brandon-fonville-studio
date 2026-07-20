/**
 * Portfolio work data + ownership persistence (localStorage).
 * The public site and ownership page both read from here.
 */
(function () {
  const STORAGE_KEY = "bfc-work-data";
  const AUTH_KEY = "bfc-ownership-auth";
  const PASSWORD = "Fonville919";

  const LICENSES = [
    {
      title: "Blue Collar Millionaire",
      href: "agreements/blue-collar-millionaire-license.html",
      description: "Design license agreement :  logo suite for apparel & merchandise",
    },
    {
      title: "BCM Past Due Statement",
      href: "agreements/blue-collar-millionaire-late-statement.html",
      description: "Overdue notice for Invoice #KSUSPO8P-0012: $110 + $25 late fee ($135 due)",
    },
    {
      title: "BCM Invoice Terms",
      href: "agreements/blue-collar-millionaire-invoice-terms.html",
      description: "Late fee & payment policy :  invoices are separate from license agreements",
    },
    {
      title: "BCM Master Design Services Agreement",
      href: "agreements/bcm-msa.pdf",
      description: "Ongoing designer/client contract for future work",
    },
    {
      title: "BCM Statement of Work Template",
      href: "agreements/bcm-sow.pdf",
      description: "Per project scope, deliverables, timeline, and payment approval form",
    },
    {
      title: "BCM Payment & Scope Addendum",
      href: "agreements/bcm-payment-addendum.pdf",
      description: "Separate scopes, simultaneous projects, overdue balances, and source file policy",
    },
  ];

  const DEFAULT_PROJECTS = [
    {
      id: "maxeimus",
      title: "Maxeimus",
      titleSub: "of Raleigh",
      meta: "Heritage athleisure & lifestyle",
      tag: "Full brand system",
      caseStudy: {
        eyebrow: "Case study · Brand system",
        sub: "A full heritage athleisure and lifestyle brand system spanning identity, apparel, packaging, print, and web.",
        facts: [
          { label: "Role", value: "Lead Brand & Product Designer" },
          { label: "Team", value: "Independent, with the brand owner" },
          { label: "Tools", value: "Adobe Illustrator · Photoshop · Mockups" },
          { label: "Scope", value: "Identity → packaging → social → web" },
        ],
        overview:
          "I served as the lead brand and product designer for Maxeimus of Raleigh, a heritage athleisure and lifestyle label, and delivered a complete brand system end to end. That included the crest logo and identity, stationery and wax seal, apparel graphics, packaging (hang tags, labels, gift box, and tissue), a social media template system, an editorial LA28 poster, and a web lookbook. Working independently in direct collaboration with the brand owner, I used Adobe Illustrator and Photoshop for the identity and print ready artwork, and presented each direction through realistic mockups for review and sign-off.",
        outcome:
          "The brand had to feel premium and heritage driven while staying versatile across apparel, packaging, print, and digital, and it had to stay consistent the whole way. I built a cohesive visual language anchored by the crest and seal that scaled cleanly from a tiny hang tag up to a full editorial poster, and prepared production ready files for each medium. The outcome was a unified, retail ready identity the client could confidently roll out across products, packaging, and social channels without the brand ever feeling disjointed.",
      },
      items: [
        {
          category: "Brand Identity",
          src: "assets/work/work-identity.png",
          webp: "assets/work/work-identity.webp",
          alt: "Maxeimus brand identity with crest logo, stationery, and wax seal",
          width: 1536,
          height: 1024,
          title: "Brand Identity",
          span: "Crest logo • stationery • seal",
        },
        {
          category: "Apparel",
          src: "assets/work/work-apparel.png",
          webp: "assets/work/work-apparel.webp",
          alt: "Maxeimus athleisure t-shirt apparel graphic",
          width: 1536,
          height: 1024,
          title: "Apparel",
          span: "Athleisure tee • print ready",
        },
        {
          category: "Packaging",
          src: "assets/work/work-packaging.png",
          webp: "assets/work/work-packaging.webp",
          alt: "Maxeimus packaging with hang tags, labels, gift box, and tissue",
          width: 1536,
          height: 1024,
          title: "Packaging",
          span: "Tags • labels • gift box",
        },
        {
          category: "Social",
          src: "assets/work/work-social.png",
          webp: "assets/work/work-social.webp",
          alt: "Maxeimus social media template set with Instagram grid and story layouts",
          width: 1536,
          height: 1024,
          title: "Social Templates",
          span: "Instagram system • stories",
        },
        {
          category: "Print",
          src: "assets/work/work-poster.png",
          webp: "assets/work/work-poster.webp",
          alt: "Maxeimus LA28 Summer Games editorial sunburst poster",
          width: 1536,
          height: 1024,
          title: "LA28 Poster",
          span: "Editorial print • typography",
        },
        {
          category: "Digital",
          src: "assets/work/work-thumbnail.png",
          webp: "assets/work/work-thumbnail.webp",
          alt: "Maxeimus website lookbook campaign shown on a laptop",
          width: 1536,
          height: 1024,
          title: "Web Lookbook",
          span: "Digital • campaign design",
        },
      ],
    },
    {
      id: "bcm",
      title: "Blue Collar Millionaire",
      titleSub: "",
      meta: "Apparel & lifestyle brand · Est. 2016",
      tag: "Apparel & merchandise",
      caseStudy: {
        eyebrow: "Case study · Apparel & merchandise",
        sub: "Apparel graphics, merchandise, and campaign imagery for a lifestyle brand established in 2016.",
        facts: [
          { label: "Role", value: "Brand & Product Designer" },
          { label: "Team", value: "Solo, with the founder" },
          { label: "Tools", value: "Adobe Illustrator · Photoshop · Mockups" },
          { label: "Scope", value: "Apparel · merch · campaign" },
        ],
        overview:
          "For Blue Collar Millionaire, an apparel and lifestyle brand established in 2016, I designed and mocked up the merchandise line and campaign imagery. The work spanned a lifestyle campaign shot, a charcoal hoodie with the circular monogram badge, a full merch flat lay (cap, apparel stack, tote, and mug), and an embroidered beanie. As the solo designer working directly with the founder, I used Adobe Illustrator for the vector logo suite and Photoshop with product mockups to bring the collection to life.",
        outcome:
          "The brand needed graphics that communicated grit and aspiration while still reading clearly across apparel, embroidery, and small accessories. I carried the monogram and crest marks onto hoodies, headwear, and lifestyle goods so the identity felt tangible and retail ready. The result was a cohesive merchandise range and campaign visuals the brand could take straight to market.",
      },
      items: [
        {
          category: "Campaign",
          src: "assets/work/bcm-lifestyle.png",
          webp: "assets/work/bcm-lifestyle.webp",
          alt: "Blue Collar Millionaire lifestyle campaign with olive hoodie in an industrial workshop",
          width: 1024,
          height: 682,
          title: "Campaign",
          span: "Lifestyle • brand story",
        },
        {
          category: "Apparel",
          src: "assets/work/bcm-hoodie-back.png",
          webp: "assets/work/bcm-hoodie-back.webp",
          alt: "Blue Collar Millionaires charcoal hoodie with circular monogram badge on back",
          width: 1024,
          height: 682,
          title: "Hoodie",
          span: "Apparel • back graphic",
        },
        {
          category: "Product",
          src: "assets/work/bcm-merch-flatlay.png",
          webp: "assets/work/bcm-merch-flatlay.webp",
          alt: "Blue Collar Millionaire merchandise flat lay with cap, apparel, tote bag, and mug",
          width: 1024,
          height: 682,
          title: "Merch Range",
          span: "Product • accessories",
        },
        {
          category: "Product",
          src: "assets/work/bcm-beanie.png",
          webp: "assets/work/bcm-beanie.webp",
          alt: "Blue Collar Millionaire charcoal beanie with embroidered monogram cuff",
          width: 1024,
          height: 682,
          title: "Beanie",
          span: "Headwear • embroidery",
        },
      ],
    },
    {
      id: "knightsplay",
      title: "Knights Play",
      titleSub: "Golf Center",
      meta: "Public golf facility · Apex, NC",
      tag: "Rebrand kit",
      caseStudy: {
        eyebrow: "Case study · Rebrand kit",
        sub: "A digital to environmental rebrand for a public golf facility in Apex, NC.",
        facts: [
          { label: "Role", value: "Lead Designer" },
          { label: "Team", value: "Independent, with facility stakeholders" },
          { label: "Tools", value: "Figma · Illustrator · Photoshop" },
          { label: "Scope", value: "App · signage · print · apparel" },
        ],
        overview:
          "I led the rebrand kit for Knights Play Golf Center, a public golf facility in Apex, NC. The project spanned both digital and environmental design: a mobile app concept (tee time booking, on course GPS, and order to bay), wayfinding signage, business cards and stationery, and branded staff apparel and merch. As the lead designer, I used Figma for the app UI and Illustrator and Photoshop for signage, print, and apparel mockups, coordinating directly with the facility's stakeholders throughout.",
        outcome:
          "The facility needed one identity that worked across a phone screen, a parking lot sign, a business card, and a polo, each with very different production constraints. I built a flexible KP shield system and a green and cream palette that stayed recognizable everywhere, and prepared each asset for its real world output method. The outcome was a cohesive, modern rebrand that elevated the customer experience from the first booking through on course wayfinding to the retail shop.",
      },
      items: [
        {
          category: "Digital",
          src: "assets/work/kp-app.png",
          webp: "assets/work/kp-app.webp",
          alt: "Knights Play Golf Center mobile app showing tee time booking, on course GPS, and order to bay screens",
          width: 1536,
          height: 1024,
          title: "Mobile App",
          span: "Digital • product design",
        },
        {
          category: "Signage",
          src: "assets/work/kp-wayfinding.png",
          webp: "assets/work/kp-wayfinding.webp",
          alt: "Knights Play Golf Center wayfinding signage post directing to the course, range, and clubhouse",
          width: 1536,
          height: 1024,
          title: "Wayfinding",
          span: "Environmental • signage",
        },
        {
          category: "Print",
          src: "assets/work/kp-cards.png",
          webp: "assets/work/kp-cards.webp",
          alt: "Knights Play Golf Center business cards in green and cream with gold KP shield",
          width: 1536,
          height: 1024,
          title: "Business Cards",
          span: "Stationery • print",
        },
        {
          category: "Apparel",
          src: "assets/work/kp-staff-apparel.png",
          webp: "assets/work/kp-staff-apparel.webp",
          alt: "Knights Play branded apparel flatlay with polo, cap, towel, ball marker, and accessories",
          width: 1536,
          height: 1024,
          title: "Apparel & Merch",
          span: "Polo • cap • accessories",
        },
      ],
    },
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "project";
  }

  function getDefaults() {
    return clone({ projects: DEFAULT_PROJECTS, licenses: LICENSES });
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaults();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.projects)) return getDefaults();
      const savedLicenses = Array.isArray(parsed.licenses) ? parsed.licenses : [];
      const savedLicenseHrefs = new Set(savedLicenses.map((license) => license.href));
      const mergedLicenses = [
        ...savedLicenses,
        ...clone(LICENSES).filter((license) => !savedLicenseHrefs.has(license.href)),
      ];
      return {
        projects: parsed.projects,
        licenses: mergedLicenses,
      };
    } catch {
      return getDefaults();
    }
  }

  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return getDefaults();
  }

  function getDefaultProject(id) {
    return clone(DEFAULT_PROJECTS.find((project) => project.id === id) || null);
  }

  function getMissingProjectIds(data) {
    const currentIds = new Set((data.projects || []).map((project) => project.id));
    return DEFAULT_PROJECTS.map((project) => project.id).filter((id) => !currentIds.has(id));
  }

  function restoreProject(data, id) {
    const fresh = getDefaultProject(id);
    if (!fresh) return data;

    const next = {
      projects: [...data.projects],
      licenses: data.licenses || clone(LICENSES),
    };
    const existingIndex = next.projects.findIndex((project) => project.id === id);

    if (existingIndex >= 0) {
      next.projects[existingIndex] = fresh;
      return next;
    }

    const defaultOrder = DEFAULT_PROJECTS.map((project) => project.id);
    const insertAt = defaultOrder.indexOf(id);
    if (insertAt >= 0) {
      next.projects.splice(insertAt, 0, fresh);
    } else {
      next.projects.push(fresh);
    }

    return next;
  }

  function buildCaseStudies(projects) {
    const map = {};
    projects.forEach((project) => {
      map[project.id] = {
        eyebrow: project.caseStudy.eyebrow,
        title: project.titleSub ? `${project.title} ${project.titleSub}` : project.title,
        sub: project.caseStudy.sub,
        facts: project.caseStudy.facts,
        images: project.items.map((item) => ({
          src: item.src,
          caption: `${item.title} · ${item.span.replace(/ • /g, " · ")}`,
        })),
        overview: project.caseStudy.overview,
        outcome: project.caseStudy.outcome,
      };
    });
    return map;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderWorkItem(item) {
    const imgAttrs = `class="work-img" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy" width="${item.width || 1024}" height="${item.height || 683}"`;
    const media = item.webp
      ? `<picture><source srcset="${escapeHtml(item.webp)}" type="image/webp" /><img ${imgAttrs} /></picture>`
      : `<img ${imgAttrs} />`;

    return `<figure class="work-item" data-cat="${escapeHtml(item.category)}">
      ${media}
      <figcaption><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.span)}</span></figcaption>
    </figure>`;
  }

  function renderProject(project, options) {
    const preview = options && options.preview;
    const titleHtml = project.titleSub
      ? `${escapeHtml(project.title)} <span class="group-sub">${escapeHtml(project.titleSub)}</span>`
      : escapeHtml(project.title);

    const itemsHtml = (project.items || []).map(renderWorkItem).join("");
    const groupClass = preview ? "work-group work-group-preview" : "work-group reveal";

    return `<div class="${groupClass}" data-project="${escapeHtml(project.id)}">
      <div class="work-group-head">
        <h3>${titleHtml}</h3>
        <span class="group-meta">${escapeHtml(project.meta)}</span>
        <span class="group-tag">${escapeHtml(project.tag)}</span>
        <button type="button" class="case-study-btn" data-open="${escapeHtml(project.id)}">View case study</button>
      </div>
      <div class="work-grid">${itemsHtml}</div>
    </div>`;
  }

  function renderWorkSection(container, projects) {
    if (!container) return;
    container.innerHTML = projects.map(renderProject).join("");
  }

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }

  function login(password) {
    if (password === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  function newProject() {
    const id = `project-${Date.now()}`;
    return {
      id,
      title: "New Project",
      titleSub: "",
      meta: "Client · project type",
      tag: "Category",
      caseStudy: {
        eyebrow: "Case study",
        sub: "Short project description.",
        facts: [
          { label: "Role", value: "Designer" },
          { label: "Team", value: "Solo" },
          { label: "Tools", value: "Figma · Illustrator" },
          { label: "Scope", value: "Brand design" },
        ],
        overview: "Project overview goes here.",
        outcome: "What was achieved goes here.",
      },
      items: [
        {
          category: "Product",
          src: "assets/work/example.png",
          webp: "",
          alt: "Project image",
          width: 1024,
          height: 683,
          title: "Image title",
          span: "Category • detail",
        },
      ],
    };
  }

  function newWorkItem() {
    return {
      category: "Product",
      src: "assets/work/example.png",
      webp: "",
      alt: "Project image",
      width: 1024,
      height: 683,
      title: "Image title",
      span: "Category • detail",
    };
  }

  window.WorkStore = {
    STORAGE_KEY,
    AUTH_KEY,
    PASSWORD,
    getDefaults,
    load,
    save,
    reset,
    getDefaultProject,
    getMissingProjectIds,
    restoreProject,
    buildCaseStudies,
    renderWorkSection,
    renderProject,
    renderWorkItem,
    escapeHtml,
    slugify,
    isAuthenticated,
    login,
    logout,
    newProject,
    newWorkItem,
  };
})();
