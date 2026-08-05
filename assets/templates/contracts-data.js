/**
 * Legal content for contract templates rendered by contract.html
 */
(function (global) {
  const DESIGNER = {
    name: "Brandon Fonville",
    business: "Brandon Fonville Creative Studio",
    address: "Raleigh, North Carolina, United States",
    email: "hello@brandonfonville.com",
    website: "https://brandonfonville.com",
  };

  const GOVERNING_LAW = "State of North Carolina, United States";

  function section(title, items) {
    return { title, items };
  }

  function generalClauses() {
    return [
      section("Governing law", [
        `This Agreement is governed by the laws of the ${GOVERNING_LAW}, without regard to conflict-of-law principles.`,
      ]),
      section("Entire agreement", [
        "This document constitutes the entire agreement between the parties for the subject matter described herein and supersedes all prior discussions or understandings on that subject.",
        "Amendments must be in writing and signed by both parties.",
        "Electronic signatures and PDF copies are acceptable unless otherwise required by law.",
      ]),
    ];
  }

  const CONTRACTS = {
    msa: {
      docTitle: "Master Design Services Agreement",
      title: "Master design services agreement",
      subtitle:
        "This Master Services Agreement (MSA) establishes the general terms under which Brandon Fonville Creative Studio will provide design services. Project-specific details are defined in attached Statements of Work.",
      notice:
        "Use this agreement as your primary freelancer contract. Attach a Statement of Work (SOW) for each project.",
      clientRole: "Client",
      designerRole: "Designer",
      summaryFields: [
        { label: "Agreement term", value: "12 months, auto-renewing", id: "agreementTerm" },
        { label: "Hourly rate (if applicable)", value: "$75–$150/hr", id: "hourlyRate" },
        { label: "Revision policy", value: "Per SOW", id: "revisionPolicy" },
      ],
      sections: [
        section("1. Services", [
          "Designer agrees to provide creative design services as described in one or more Statements of Work (SOW) executed under this MSA.",
          "Services may include graphic design, branding, UI/UX design, product design, website design, marketing design, and related creative deliverables.",
          "Designer will perform services in a professional and workmanlike manner consistent with industry standards.",
        ]),
        section("2. Statements of Work", [
          "Each project is defined by a separate SOW describing project name, objectives, deliverables, timeline, milestones, revision limits, and fees.",
          "If a conflict exists between this MSA and a SOW, the SOW governs for that project unless the SOW explicitly states otherwise.",
          "No work begins until both parties sign the applicable SOW and any required deposit is received.",
        ]),
        section("3. Payment terms", [
          "Fees are as stated in each SOW. Unless otherwise specified, a 50% deposit is required before work commences.",
          "Final files and deliverables are released upon receipt of payment in full.",
          "Invoices are due within 14 days of issue. Late payments accrue a fee of 1.5% per month (or the maximum allowed by law).",
          "Accepted payment methods: bank transfer, credit card, Stripe invoice, or other methods agreed in writing.",
        ]),
        section("4. Deadlines & client responsibilities", [
          "Designer will use reasonable efforts to meet deadlines stated in the SOW. Timelines depend on timely client feedback and asset delivery.",
          "Client will provide brand information, content, references, approvals, and access needed to complete the project.",
          "Client confirms it has rights to all materials supplied to Designer (logos, photos, fonts, trademarks, copy, etc.).",
          "Delays caused by missing client input may shift delivery dates without penalty to Designer.",
        ]),
        section("5. Revisions & communication", [
          "Revision rounds are limited to the number specified in the SOW. Additional revisions are billed at the rate stated in the SOW or at $25–$75 per round.",
          "A revision is a round of consolidated feedback applied to an existing direction — not a new concept or scope change.",
          "Designer will respond to client communications within 1–2 business days during active projects.",
          "Primary communication channel: email. Urgent matters may use agreed alternate channels.",
        ]),
        section("6. Confidentiality", [
          "Each party agrees to keep confidential any non-public business, technical, or creative information received from the other party.",
          "Confidential information does not include information that is publicly available, independently developed, or rightfully received from a third party.",
          "Confidentiality obligations survive termination for 2 years.",
        ]),
        section("7. Intellectual property", [
          "Upon receipt of payment in full, ownership and usage rights transfer as specified in the applicable SOW or IP agreement.",
          "Until payment in full, all work product remains the property of Designer.",
          "Designer retains the right to display completed work in portfolio, website, social media, and promotional materials unless otherwise agreed in writing.",
          "Pre-existing tools, templates, fonts, and methodologies remain Designer's property.",
        ]),
        section("8. Termination", [
          "Either party may terminate this MSA or any SOW for material breach if the breach is not cured within 10 business days of written notice.",
          "Upon termination, Client pays for all work performed to date. No rights are granted for unpaid deliverables.",
          "Sections on confidentiality, IP, liability, and payment survive termination.",
        ]),
        section("9. Liability limitations", [
          "Designer warrants that work is original to the extent described and does not knowingly infringe third-party rights.",
          "Designer is not responsible for trademark clearance, legal compliance, printing outcomes, or third-party platform changes unless separately contracted.",
          "Designer's total liability is limited to the fees paid for the project giving rise to the claim, except where prohibited by law.",
        ]),
        ...generalClauses(),
      ],
    },

    sow: {
      docTitle: "Statement of Work",
      title: "Statement of work",
      subtitle:
        "This Statement of Work (SOW) is issued under the Master Design Services Agreement between Designer and Client and defines the specific project scope, deliverables, and fees.",
      clientRole: "Client",
      designerRole: "Designer",
      summaryFields: [
        { label: "Project name", value: "", id: "projectName", placeholder: "e.g. Branding Package" },
        { label: "Project fee (USD)", value: "", id: "projectFee", placeholder: "$0.00" },
        { label: "Target delivery", value: "", id: "deliveryDate", type: "date" },
      ],
      sections: [
        section("1. Project overview", [
          "Project name: as stated in the summary above.",
          "Objectives: Client seeks creative design services as described in the deliverables below.",
          "This SOW is effective upon signature by both parties and receipt of any required deposit.",
        ]),
        section("2. Deliverables", [
          "Designer will deliver the following (check all that apply and describe):",
          "☐ Logo design — concepts, revisions, final files",
          "☐ Color palette and typography system",
          "☐ Brand guidelines document",
          "☐ Social media templates",
          "☐ Website design (mockups / Figma files)",
          "☐ UI/UX deliverables (wireframes, prototypes)",
          "☐ Packaging / print materials",
          "☐ Other: _________________________",
        ]),
        section("3. Timeline & milestones", [
          "Kickoff: within 3 business days of signed SOW and deposit receipt.",
          "Concept presentation: within ___ business days of kickoff.",
          "Revision rounds: ___ rounds included (additional rounds billed separately).",
          "Final delivery: by the target delivery date stated above, subject to timely client feedback.",
        ]),
        section("4. Revision limits", [
          "This SOW includes ___ rounds of revisions per deliverable phase.",
          "A revision round consists of consolidated feedback applied to the current direction.",
          "New concepts, scope changes, or additional deliverables require a Change Order.",
          "Additional revision rounds: $___ per round.",
        ]),
        section("5. Fees & payment", [
          "Total project fee: as stated in the summary above.",
          "Deposit: ___% due before work begins.",
          "Balance: due before final file release.",
          "Payment methods: as defined in the MSA or Invoice Terms Agreement.",
        ]),
        section("6. Acceptance", [
          "Client accepts this SOW and authorizes Designer to begin work upon signature below.",
          "This SOW is governed by the Master Design Services Agreement between the parties.",
        ]),
        ...generalClauses(),
      ],
    },

    proposal: {
      docTitle: "Proposal Agreement",
      title: "Design proposal & agreement",
      subtitle:
        "This proposal outlines the problem, solution, process, deliverables, timeline, and investment for the project described below. Signature constitutes acceptance and authorizes work to begin.",
      clientRole: "Client",
      designerRole: "Designer",
      summaryFields: [
        { label: "Proposal date", value: "", id: "proposalDate", type: "date" },
        { label: "Total investment", value: "", id: "investment", placeholder: "$0.00" },
        { label: "Estimated timeline", value: "", id: "timeline", placeholder: "e.g. 3–4 weeks" },
      ],
      sections: [
        section("1. The challenge", [
          "Client describes the problem or opportunity: _________________________",
          "Current situation and goals: _________________________",
        ]),
        section("2. Proposed solution", [
          "Designer proposes the following approach to address Client's needs:",
          "_________________________",
          "This solution aligns with Client's brand, audience, and business objectives as discussed.",
        ]),
        section("3. Process", [
          "Discovery & intake — gather brand info, goals, audience, and requirements.",
          "Concept development — present initial directions for review.",
          "Refinement — apply feedback within included revision rounds.",
          "Final delivery — provide approved files in agreed formats.",
          "Optional: ongoing support or retainer available upon request.",
        ]),
        section("4. Deliverables", [
          "The following deliverables are included in this proposal:",
          "_________________________",
        ]),
        section("5. Timeline", [
          "Estimated project duration: as stated in the summary above.",
          "Timeline begins upon signed proposal and deposit receipt.",
          "Client feedback turnaround directly impacts delivery schedule.",
        ]),
        section("6. Investment", [
          "Total investment: as stated in the summary above.",
          "Deposit: 50% due upon acceptance to reserve project time.",
          "Balance: due before final file release.",
          "Additional work outside this scope requires a Change Order.",
        ]),
        section("7. Acceptance", [
          "By signing below, Client accepts this proposal and agrees to the terms herein.",
          "Upon acceptance, Designer will issue an invoice for the deposit and schedule project kickoff.",
          "This proposal is valid for 14 days from the proposal date.",
        ]),
        ...generalClauses(),
      ],
    },

    intake: {
      docTitle: "Client Intake Questionnaire",
      title: "Client intake questionnaire",
      subtitle:
        "Please complete this questionnaire before project kickoff. Your answers help define scope, direction, and deliverables. This is not a contract — a separate agreement will govern the engagement.",
      clientRole: "Client",
      designerRole: "Designer",
      isForm: true,
      formSections: [
        {
          title: "Brand information",
          fields: [
            { label: "Business / brand name", placeholder: "" },
            { label: "Tagline or slogan", placeholder: "" },
            { label: "Website (if any)", placeholder: "https://" },
            { label: "Social media handles", placeholder: "@brand" },
            { label: "Brand personality (3–5 words)", placeholder: "e.g. bold, premium, approachable" },
          ],
        },
        {
          title: "Project goals",
          fields: [
            { label: "What do you want to achieve?", placeholder: "Primary goal" },
            { label: "What problem does this solve?", placeholder: "" },
            { label: "How will you measure success?", placeholder: "" },
            { label: "Timeline or launch date", placeholder: "" },
          ],
        },
        {
          title: "Target audience",
          fields: [
            { label: "Who is your ideal customer?", placeholder: "" },
            { label: "Age range / demographics", placeholder: "" },
            { label: "Where do they spend time online?", placeholder: "" },
          ],
        },
        {
          title: "Competitors & references",
          fields: [
            { label: "Main competitors (names + URLs)", placeholder: "" },
            { label: "Brands you admire (and why)", placeholder: "" },
            { label: "Design styles to avoid", placeholder: "" },
          ],
        },
        {
          title: "Preferences & requirements",
          fields: [
            { label: "Color preferences", placeholder: "" },
            { label: "Typography preferences", placeholder: "" },
            { label: "Must-have elements", placeholder: "" },
            { label: "File formats needed", placeholder: "PNG, PDF, AI, Figma, etc." },
            { label: "Additional notes", placeholder: "", multiline: true },
          ],
        },
      ],
      sections: [],
    },

    "invoice-terms": {
      docTitle: "Invoice Terms Agreement",
      title: "Invoice terms & payment agreement",
      subtitle:
        "These terms govern all invoices issued by Brandon Fonville Creative Studio and apply to the project referenced below unless superseded by a signed MSA or SOW.",
      summaryFields: [
        { label: "Project reference", value: "", id: "projectRef", placeholder: "Project name or SOW #" },
        { label: "Total fee (USD)", value: "", id: "totalFee", placeholder: "$0.00" },
        { label: "Deposit amount", value: "50%", id: "deposit" },
      ],
      sections: [
        section("1. Deposit requirements", [
          "A 50% deposit is required before project commencement unless otherwise agreed in writing.",
          "The deposit reserves Designer’s time and is non-refundable once work has begun.",
          "Deposits are applied to the total project fee.",
        ]),
        section("2. Payment schedule", [
          "Deposit: due upon acceptance, before work begins.",
          "Milestone payments (if applicable): due upon completion of agreed milestones.",
          "Final balance: due before final files, source files, or deliverables are released.",
          "No deliverables are withheld as leverage — payment and delivery occur simultaneously upon final approval.",
        ]),
        section("3. Late fees", [
          "Invoices are due within 14 days of issue unless otherwise stated.",
          "Overdue balances accrue a late fee of 1.5% per month (18% annually) or the maximum permitted by law.",
          "Designer may suspend work on overdue accounts after 7 days past due with written notice.",
        ]),
        section("4. Accepted payment methods", [
          "Bank transfer / ACH",
          "Credit or debit card (via Stripe invoice)",
          "Other methods agreed in writing",
        ]),
        section("5. Refund policy", [
          "Deposits are non-refundable once work has commenced.",
          "If Designer terminates without cause before delivery, Client receives a prorated refund for undelivered work.",
          "If Client terminates, Client pays for all work completed to date. No refund for completed phases.",
          "Rush fees, third-party costs, and completed milestones are non-refundable.",
        ]),
        section("6. Ownership retention", [
          "All work product remains Designer’s property until payment in full is received.",
          "Client may not use, reproduce, or distribute deliverables until the applicable invoice is paid.",
        ]),
        ...generalClauses(),
      ],
    },

    "payment-plan": {
      docTitle: "Payment Plan Agreement",
      title: "Milestone payment plan agreement",
      subtitle:
        "This agreement establishes a structured payment schedule for the project below. Each milestone payment is due before the next phase begins.",
      summaryFields: [
        { label: "Project name", value: "", id: "projectName" },
        { label: "Total project fee", value: "", id: "totalFee", placeholder: "$0.00" },
        { label: "Number of milestones", value: "3", id: "milestones" },
      ],
      sections: [
        section("1. Payment schedule", [
          "Milestone 1 — Upfront (40%): due upon signed agreement, before work begins.",
          "Milestone 2 — Mid-project (30%): due upon completion of: _________________________",
          "Milestone 3 — Final delivery (30%): due before final files are released.",
          "Percentages and milestones may be adjusted by mutual written agreement.",
        ]),
        section("2. Milestone definitions", [
          "Each milestone is complete when Designer delivers the agreed deliverables for that phase and Client provides approval or consolidated feedback within 5 business days.",
          "Silence or failure to respond within 5 business days constitutes approval to proceed.",
        ]),
        section("3. Late payment", [
          "If a milestone payment is more than 7 days overdue, Designer may pause work until payment is received.",
          "Late fees of 1.5% per month apply to overdue balances.",
        ]),
        section("4. Scope changes", [
          "Changes to scope, deliverables, or timeline require a signed Change Order with updated fees.",
          "Payment milestones may be adjusted to reflect scope changes.",
        ]),
        ...generalClauses(),
      ],
    },

    retainer: {
      docTitle: "Retainer Agreement",
      title: "Monthly retainer agreement",
      subtitle:
        "This agreement establishes an ongoing design retainer between Designer and Client for recurring creative support.",
      summaryFields: [
        { label: "Monthly hours", value: "10", id: "monthlyHours" },
        { label: "Monthly fee (USD)", value: "", id: "monthlyFee", placeholder: "$0.00" },
        { label: "Start date", value: "", id: "startDate", type: "date" },
      ],
      sections: [
        section("1. Retainer services", [
          "Designer provides ongoing design support including: branding, marketing design, social graphics, product design support, and related creative tasks.",
          "Services are limited to the monthly hour allocation stated above.",
          "Work is prioritized for retainer clients over non-retainer project work.",
        ]),
        section("2. Hours & billing", [
          "Monthly allocation: as stated in the summary above.",
          "Unused hours do not roll over to the following month unless agreed in writing.",
          "Additional hours beyond the monthly allocation are billed at $___/hr.",
          "Monthly fee is due on the 1st of each month. Work pauses if payment is more than 7 days late.",
        ]),
        section("3. Response times", [
          "Designer will respond to retainer requests within 1 business day.",
          "Standard turnaround for retainer tasks: 2–3 business days unless rush fees apply.",
          "Rush requests (same-day or next-day) may incur additional fees.",
        ]),
        section("4. Priority support", [
          "Retainer clients receive priority scheduling and faster response times.",
          "Designer will allocate up to ___% of monthly capacity to retainer work.",
        ]),
        section("5. Term & termination", [
          "This retainer renews monthly unless either party provides 14 days written notice.",
          "Either party may terminate with 14 days notice. Fees for the current month are non-refundable.",
        ]),
        ...generalClauses(),
      ],
    },

    "late-payment": {
      docTitle: "Late Payment / Collections Agreement",
      title: "Late payment & collections notice",
      subtitle:
        "This notice applies to overdue invoices and establishes late fees, work suspension, and collection terms.",
      summaryFields: [
        { label: "Invoice #", value: "", id: "invoiceNum" },
        { label: "Original due date", value: "", id: "dueDate", type: "date" },
        { label: "Amount overdue", value: "", id: "overdueAmount", placeholder: "$0.00" },
      ],
      sections: [
        section("1. Overdue balance", [
          "The invoice referenced above is past due. Client agrees to remit payment within 7 days of this notice.",
        ]),
        section("2. Late fees", [
          "A late fee of 1.5% per month (18% annually) accrues on all overdue balances from the original due date.",
          "Late fees are in addition to the principal amount owed.",
        ]),
        section("3. Suspension of work", [
          "Designer reserves the right to suspend all active and pending work until the overdue balance is paid in full.",
          "Suspension does not waive Client's obligation to pay for work completed prior to suspension.",
        ]),
        section("4. Ownership retention", [
          "All deliverables, files, and work product remain Designer's property until payment in full is received.",
          "Client may not use, publish, or distribute any work product associated with unpaid invoices.",
        ]),
        section("5. Collection costs", [
          "If payment is not received within 30 days of this notice, Client agrees to pay reasonable collection costs including attorney fees if required to enforce payment.",
        ]),
        ...generalClauses(),
      ],
    },

    "ip-assignment": {
      docTitle: "Intellectual Property Assignment Agreement",
      title: "Intellectual property assignment",
      subtitle:
        "Upon full payment, Designer assigns all right, title, and interest in the final approved creative work to Client as described below.",
      notice: "Use when the client wants full ownership, exclusive rights, or trademark ability.",
      summaryFields: [
        { label: "Work description", value: "", id: "workDesc", placeholder: "e.g. Final approved logo design" },
        { label: "Assignment fee (USD)", value: "", id: "assignmentFee", placeholder: "$0.00" },
        { label: "Payment confirmation", value: "Paid in full", id: "paymentStatus" },
      ],
      sections: [
        section("1. Assigned work", [
          "The 'Assigned Work' means the final approved creative deliverables described above, as accepted by Client in writing or via the Final Approval form.",
          "Excluded from this assignment: concepts not selected, work-in-progress files, Designer's pre-existing tools, templates, fonts, and methodologies.",
        ]),
        section("2. Assignment of rights", [
          "Upon receipt of payment in full, Designer hereby assigns to Client all right, title, and interest in and to the Assigned Work, including all copyrights, trademarks (if applicable), and other intellectual property rights.",
          "Designer agrees to execute any additional documents reasonably necessary to effectuate this assignment.",
        ]),
        section("3. Warranties", [
          "Designer warrants that the Assigned Work is original to the extent created for Client and does not knowingly infringe third-party rights.",
          "Designer makes no warranty regarding trademark registrability — Client is responsible for trademark searches and registration.",
        ]),
        section("4. Portfolio rights", [
          "Notwithstanding this assignment, Designer retains the right to display the Assigned Work in portfolio, website, and promotional materials unless Client requests otherwise in writing within 30 days.",
        ]),
        ...generalClauses(),
      ],
    },

    "copyright-transfer": {
      docTitle: "Copyright Transfer Agreement",
      title: "Copyright transfer agreement",
      subtitle:
        "Formal transfer of copyright ownership for the creative works described below, effective upon full payment.",
      summaryFields: [
        { label: "Work title / description", value: "", id: "workTitle" },
        { label: "Transfer fee (USD)", value: "", id: "transferFee", placeholder: "$0.00" },
        { label: "Effective date", value: "", id: "effectiveDate", type: "date" },
      ],
      sections: [
        section("1. Work description", [
          "The 'Work' consists of the creative materials described above, including all associated files, formats, and derivatives created specifically for Client.",
        ]),
        section("2. Copyright transfer", [
          "Designer transfers to Client all copyrights in the Work, including the exclusive right to reproduce, distribute, display, perform, and create derivative works.",
          "Transfer is effective upon receipt of payment in full as confirmed above.",
        ]),
        section("3. Moral rights", [
          "To the extent permitted by law, Designer waives any moral rights in the Work or agrees not to assert them against Client's use of the Work.",
        ]),
        section("4. Representations", [
          "Designer represents that the Work is original and created for Client, and does not knowingly incorporate infringing third-party material.",
        ]),
        ...generalClauses(),
      ],
    },

    "trademark-usage": {
      docTitle: "Trademark Usage Agreement",
      title: "Trademark & brand usage agreement",
      subtitle:
        "Defines how Client may use logos and brand marks created by Designer, including usage rules, modifications, and trademark responsibilities.",
      summaryFields: [
        { label: "Brand / mark name", value: "", id: "markName" },
        { label: "Usage term", value: "Perpetual", id: "usageTerm" },
        { label: "Territory", value: "Worldwide", id: "territory" },
      ],
      sections: [
        section("1. Licensed marks", [
          "This agreement covers the logo, wordmark, and brand marks delivered as part of the project referenced above.",
        ]),
        section("2. Permitted usage", [
          "Client may use the marks for: marketing, merchandise, website, social media, print, packaging, and signage as approved in the brand guidelines.",
          "Usage must comply with the brand standards document provided by Designer.",
        ]),
        section("3. Prohibited modifications", [
          "Client may not alter colors, proportions, typography, or layout of the marks without written approval.",
          "Client may not combine marks with other logos or use on offensive or illegal materials.",
        ]),
        section("4. Trademark responsibilities", [
          "Client is solely responsible for trademark registration, clearance searches, and enforcement.",
          "Designer does not warrant that marks are registrable or free of third-party conflicts.",
        ]),
        ...generalClauses(),
      ],
    },

    "font-asset-license": {
      docTitle: "Font & Asset Licensing Agreement",
      title: "Font & third-party asset agreement",
      subtitle:
        "Clarifies licensing responsibilities for fonts, stock photos, icons, templates, and other third-party assets used in the project.",
      sections: [
        section("1. Designer-provided assets", [
          "Designer will use only properly licensed fonts, stock imagery, icons, and templates in deliverables.",
          "License types (commercial, extended, etc.) will be documented and appropriate for Client's intended use.",
          "Client receives a license to use included assets as part of the final deliverables, not standalone redistribution rights.",
        ]),
        section("2. Client-supplied assets", [
          "Client warrants it has rights to all materials supplied to Designer (photos, logos, fonts, copy, trademarks).",
          "Client indemnifies Designer against claims arising from Client-supplied materials.",
        ]),
        section("3. Third-party costs", [
          "Premium stock assets, specialty fonts, or licensed templates requiring additional fees will be quoted and approved before purchase.",
          "Client is responsible for ongoing license renewals for third-party assets after project delivery.",
        ]),
        section("4. Source files", [
          "If source files are provided, Client is responsible for maintaining valid licenses for embedded fonts and linked assets.",
        ]),
        ...generalClauses(),
      ],
    },

    "logo-design": {
      docTitle: "Logo Design Agreement",
      title: "Logo design agreement",
      subtitle: "Covers logo concepts, sketches, revisions, final files, ownership, and trademark responsibility.",
      summaryFields: [
        { label: "Package", value: "Logo Design", id: "package" },
        { label: "Concepts included", value: "3", id: "concepts" },
        { label: "Revision rounds", value: "3", id: "revisions" },
        { label: "Project fee", value: "", id: "projectFee", placeholder: "$0.00" },
      ],
      sections: [
        section("1. Scope", [
          "Designer will create logo concepts including primary mark, and optionally secondary marks or monograms as specified.",
          "Deliverables: concepts (PDF/PNG), revised versions, final files (PNG, JPEG, PDF; source files if purchased).",
        ]),
        section("2. Process", [
          "Discovery intake → concept presentation (___ concepts) → revision rounds (___ included) → final delivery.",
          "Each revision round must include consolidated feedback. Piecemeal feedback may count as multiple rounds.",
        ]),
        section("3. Ownership", [
          "Upon full payment, ownership transfers as specified: ☐ Full assignment ☐ License (see Design License Agreement).",
          "Concepts not selected remain Designer's property.",
        ]),
        section("4. Trademark responsibility", [
          "Client is responsible for trademark searches and registration. Designer does not guarantee registrability.",
        ]),
        ...generalClauses(),
      ],
    },

    branding: {
      docTitle: "Branding Agreement",
      title: "Brand identity agreement",
      subtitle: "Full identity project covering logo, colors, typography, guidelines, and brand collateral.",
      summaryFields: [
        { label: "Package", value: "Full Brand Identity", id: "package" },
        { label: "Project fee", value: "", id: "projectFee", placeholder: "$0.00" },
        { label: "Timeline", value: "", id: "timeline", placeholder: "e.g. 4–6 weeks" },
      ],
      sections: [
        section("1. Deliverables", [
          "Logo suite (primary, secondary, monogram as applicable)",
          "Color palette with hex/RGB/CMYK values",
          "Typography system (primary and secondary typefaces)",
          "Brand guidelines document (PDF)",
          "Social media templates (if included)",
          "Packaging or print templates (if included)",
        ]),
        section("2. Process & revisions", [
          "Phases: discovery → logo concepts → identity system → guidelines → final delivery.",
          "___ revision rounds included per phase. Additional rounds billed at $___ each.",
        ]),
        section("3. File formats", [
          "Final delivery: PNG, JPEG, PDF. Source files (AI, Figma) available as add-on.",
        ]),
        section("4. Ownership", [
          "Upon full payment, Client receives ownership or license as specified in the attached IP agreement.",
        ]),
        ...generalClauses(),
      ],
    },

    "ui-ux": {
      docTitle: "UI/UX Design Agreement",
      title: "UI/UX design agreement",
      subtitle: "Product design covering research, wireframes, prototypes, design systems, and developer handoff.",
      summaryFields: [
        { label: "Product name", value: "", id: "productName" },
        { label: "Project fee", value: "", id: "projectFee", placeholder: "$0.00" },
        { label: "Platforms", value: "Web", id: "platforms" },
      ],
      sections: [
        section("1. Scope", [
          "User research and discovery (if included)",
          "Information architecture and user flows",
          "Wireframes (low-fidelity)",
          "High-fidelity UI designs in Figma",
          "Interactive prototype (if included)",
          "Design system / component library (if included)",
          "Developer handoff with specs and assets",
          "Usability testing support (if included)",
        ]),
        section("2. Deliverables & formats", [
          "Figma files with organized layers and components",
          "Exported assets (SVG, PNG) as needed for development",
          "Design documentation and handoff notes",
        ]),
        section("3. Revisions", [
          "___ revision rounds per major phase. Structural changes after approval require Change Order.",
        ]),
        section("4. Development", [
          "This agreement covers design only unless development is separately contracted.",
          "Designer is not responsible for implementation bugs unless development is in scope.",
        ]),
        ...generalClauses(),
      ],
    },

    "product-design": {
      docTitle: "Product Design Agreement",
      title: "Product design agreement",
      subtitle: "Physical or digital product design from research through specifications.",
      sections: [
        section("1. Scope", [
          "Research and concept development",
          "Sketches and renderings",
          "Prototyping (digital or physical coordination)",
          "Technical specifications for manufacturing (if applicable)",
          "Material and finish recommendations",
        ]),
        section("2. Manufacturing", [
          "Designer provides design specifications only unless production management is separately contracted.",
          "Client is responsible for manufacturer selection, tooling, and production quality.",
        ]),
        section("3. Ownership", [
          "Upon full payment, design IP transfers as specified. Designer retains portfolio rights.",
        ]),
        ...generalClauses(),
      ],
    },

    "website-design": {
      docTitle: "Website Design Agreement",
      title: "Website design agreement",
      subtitle: "Design-only website project — sitemap, wireframes, mockups, revisions, and developer handoff.",
      summaryFields: [
        { label: "Site type", value: "", id: "siteType", placeholder: "e.g. Marketing site, 5 pages" },
        { label: "Project fee", value: "", id: "projectFee", placeholder: "$0.00" },
        { label: "Pages included", value: "", id: "pages" },
      ],
      sections: [
        section("1. Deliverables", [
          "Sitemap and information architecture",
          "Wireframes for key pages",
          "High-fidelity mockups (desktop and mobile)",
          "Design system (colors, typography, components)",
          "Developer handoff package (Figma + exported assets)",
        ]),
        section("2. Out of scope", [
          "Development, hosting, domain registration, CMS setup, and content writing are not included unless specified.",
        ]),
        section("3. Revisions", [
          "___ rounds per page template. Additional pages require Change Order.",
        ]),
        ...generalClauses(),
      ],
    },

    "website-dev": {
      docTitle: "Website Design + Development Agreement",
      title: "Website design & development agreement",
      subtitle: "Full website build including design, development, hosting setup, and maintenance terms.",
      sections: [
        section("1. Scope", [
          "Website design (as defined in scope)",
          "Front-end development and CMS integration (if applicable)",
          "Responsive implementation",
          "Basic SEO setup (meta tags, sitemap)",
          "Hosting and domain setup assistance",
        ]),
        section("2. Maintenance & bugs", [
          "___ days of post-launch bug fixes included.",
          "Ongoing maintenance available via retainer or separate agreement.",
        ]),
        section("3. Third-party tools", [
          "Client is responsible for subscription costs (hosting, CMS, plugins, analytics).",
          "Designer will recommend and configure agreed tools.",
        ]),
        section("4. Content", [
          "Client provides all copy, images, and legal pages. Placeholder content may be used during development.",
        ]),
        ...generalClauses(),
      ],
    },

    "saas-dev": {
      docTitle: "SaaS / Product Development Agreement",
      title: "SaaS & product development agreement",
      subtitle: "Apps and platforms covering strategy, UX/UI, development, code ownership, and data handling.",
      sections: [
        section("1. Scope", [
          "Product strategy and roadmap input",
          "UX/UI design (Figma)",
          "Front-end and/or full-stack development (as specified)",
          "API integrations (as specified)",
          "Launch support",
        ]),
        section("2. Code ownership", [
          "Upon full payment: ☐ Client owns all code ☐ Designer retains framework/tools, Client owns custom work",
          "Third-party libraries remain under their respective licenses.",
        ]),
        section("3. Data handling", [
          "Client is data controller. Designer will follow agreed security practices.",
          "Privacy policy and compliance are Client's responsibility unless separately contracted.",
        ]),
        section("4. Launch expectations", [
          "MVP scope is defined in attached SOW. Post-launch features require separate agreement.",
        ]),
        ...generalClauses(),
      ],
    },

    "mobile-app": {
      docTitle: "Mobile App Design Agreement",
      title: "Mobile app design agreement",
      subtitle: "iOS/Android design with prototypes, developer handoff, and app store asset requirements.",
      summaryFields: [
        { label: "Platforms", value: "iOS & Android", id: "platforms" },
        { label: "Screens (est.)", value: "", id: "screens" },
        { label: "Project fee", value: "", id: "projectFee", placeholder: "$0.00" },
      ],
      sections: [
        section("1. Deliverables", [
          "UI designs for iOS and Android (or cross-platform)",
          "Interactive prototype",
          "App icon and store listing graphics (if included)",
          "Developer handoff with specs, assets, and component documentation",
        ]),
        section("2. App store requirements", [
          "Designer provides design assets meeting platform guidelines. Client handles submission and developer accounts.",
        ]),
        ...generalClauses(),
      ],
    },

    packaging: {
      docTitle: "Packaging Design Agreement",
      title: "Packaging design agreement",
      subtitle: "Product packaging, labels, boxes, and inserts with print-ready deliverables.",
      sections: [
        section("1. Deliverables", [
          "Packaging design concepts and revisions",
          "Dielines and print-ready files (PDF, AI)",
          "Label designs",
          "Insert / collateral (if included)",
        ]),
        section("2. Print production", [
          "Designer provides print-ready files only. Client manages printer selection and proofing.",
          "Color matching (Pantone) specified in deliverables. Client approves press proofs.",
        ]),
        ...generalClauses(),
      ],
    },

    "apparel-merch": {
      docTitle: "Apparel / Merch Design Agreement",
      title: "Apparel & merchandise design agreement",
      subtitle: "Shirt and merchandise design covering artwork, mockups, printing, and licensing.",
      summaryFields: [
        { label: "Garment types", value: "", id: "garments", placeholder: "e.g. T-shirts, hoodies" },
        { label: "Project fee", value: "", id: "projectFee", placeholder: "$0.00" },
        { label: "Ownership", value: "License", id: "ownership" },
      ],
      sections: [
        section("1. Scope", [
          "Artwork creation for apparel and merchandise",
          "Product mockups for client approval",
          "Print-ready files (PNG, PDF at 300 DPI)",
        ]),
        section("2. Printing & production", [
          "☐ Designer manages printing ☐ Client manages printing",
          "Garment sourcing and fulfillment are Client's responsibility unless otherwise agreed.",
          "Client approves final mockups before production.",
        ]),
        section("3. Licensing / ownership", [
          "Upon full payment, Client receives rights as specified: ☐ Full ownership ☐ License for merchandise use",
          "Designer retains portfolio rights.",
        ]),
        ...generalClauses(),
      ],
    },

    "change-order": {
      docTitle: "Change Order Agreement",
      title: "Change order",
      subtitle: "Documents additional work requested outside the original agreement scope.",
      summaryFields: [
        { label: "Original agreement / SOW", value: "", id: "originalSow" },
        { label: "Additional fee", value: "", id: "additionalFee", placeholder: "$0.00" },
        { label: "Timeline impact", value: "", id: "timelineImpact", placeholder: "+3 business days" },
      ],
      sections: [
        section("1. Original scope", [
          "Reference: original agreement or SOW dated __________.",
        ]),
        section("2. Additional work requested", [
          "Client requests the following work outside the original scope:",
          "_________________________",
        ]),
        section("3. Additional fee & timeline", [
          "Additional fee: as stated above. Due before additional work begins or upon completion as agreed.",
          "Timeline impact: as stated above. Original delivery date is extended accordingly.",
        ]),
        section("4. Acceptance", [
          "Both parties agree this Change Order modifies the original agreement. All other terms remain in effect.",
        ]),
        ...generalClauses(),
      ],
    },

    "revision-policy": {
      docTitle: "Revision Policy Agreement",
      title: "Revision policy",
      subtitle: "Defines what counts as a revision, included rounds, and pricing for additional revisions.",
      sections: [
        section("1. Included revisions", [
          "Each project phase includes ___ rounds of revisions as stated in the SOW or proposal.",
        ]),
        section("2. What counts as a revision", [
          "A revision is consolidated feedback applied to the current design direction.",
          "Examples: adjust colors, resize elements, refine typography, tweak layout.",
        ]),
        section("3. What is NOT a revision", [
          "New concepts or directions after a concept has been approved",
          "Adding deliverables not in the original scope",
          "Piecemeal feedback sent across multiple emails (may count as multiple rounds)",
          "Changing requirements after approval",
        ]),
        section("4. Additional revision pricing", [
          "Additional revision rounds: $15–$40 each (or as stated in SOW).",
          "New concepts: quoted separately.",
        ]),
        ...generalClauses(),
      ],
    },

    "project-pause": {
      docTitle: "Project Pause Agreement",
      title: "Project pause agreement",
      subtitle: "Formalizes a project pause when the client is unavailable or requests a hold.",
      summaryFields: [
        { label: "Pause start date", value: "", id: "pauseStart", type: "date" },
        { label: "Maximum pause duration", value: "30 days", id: "pauseDuration" },
        { label: "Restart fee", value: "", id: "restartFee", placeholder: "$0 or waived" },
      ],
      sections: [
        section("1. Pause terms", [
          "Project is paused at Client's request or due to Client's failure to provide required feedback/materials.",
          "Designer will hold the project slot for the maximum duration stated above.",
        ]),
        section("2. Restart", [
          "To resume, Client notifies Designer in writing and pays any restart fee stated above.",
          "Timeline adjusts by the duration of the pause plus ___ business days for re-scheduling.",
        ]),
        section("3. Deposit & fees", [
          "Deposit becomes non-refundable after ___ days of pause.",
          "If pause exceeds maximum duration, Designer may terminate the project. Client pays for work completed to date.",
        ]),
        ...generalClauses(),
      ],
    },

    cancellation: {
      docTitle: "Project Cancellation Agreement",
      title: "Project cancellation / termination",
      subtitle: "Ends the project with clear terms for fees owed, work completed, and ownership rights.",
      summaryFields: [
        { label: "Original project", value: "", id: "projectName" },
        { label: "Termination date", value: "", id: "terminationDate", type: "date" },
        { label: "Final amount due", value: "", id: "finalAmount", placeholder: "$0.00" },
      ],
      sections: [
        section("1. Termination", [
          "The parties agree to terminate the project referenced above effective on the termination date.",
          "Reason: ☐ Mutual agreement ☐ Client request ☐ Designer termination for cause ☐ Other: _______",
        ]),
        section("2. Fees owed", [
          "Client owes the final amount stated above for work completed through the termination date.",
          "Deposit is ☐ applied to final amount ☐ non-refundable ☐ partially refundable: _______",
        ]),
        section("3. Work completed & deliverables", [
          "Designer will deliver all completed work for which payment is received.",
          "Unpaid work remains Designer's property. Client receives no license to unpaid deliverables.",
        ]),
        section("4. Ownership", [
          "Ownership of completed, paid work transfers per the original agreement. Unfinished concepts remain Designer's property.",
        ]),
        ...generalClauses(),
      ],
    },

    "final-approval": {
      docTitle: "Final Approval & Acceptance Form",
      title: "Final approval & acceptance",
      subtitle: "Client confirms all deliverables are approved, received, and the project is complete.",
      summaryFields: [
        { label: "Project name", value: "", id: "projectName" },
        { label: "Delivery date", value: "", id: "deliveryDate", type: "date" },
        { label: "Final payment status", value: "Paid in full", id: "paymentStatus" },
      ],
      sections: [
        section("1. Deliverables received", [
          "Client confirms receipt of all deliverables listed in the project agreement:",
          "_________________________",
        ]),
        section("2. Approval", [
          "Client approves all deliverables as final and acceptable.",
          "No further revisions are included unless separately contracted.",
        ]),
        section("3. Project completion", [
          "Client confirms the project is complete.",
          "Designer is released from further obligations except any warranty or support terms in the original agreement.",
        ]),
        section("4. Payment confirmation", [
          "Final payment status: as stated above.",
          "Upon confirmation, ownership/license terms in the original agreement take full effect.",
        ]),
      ],
    },

    nda: {
      docTitle: "Non-Disclosure Agreement",
      title: "Non-disclosure agreement",
      subtitle: "Protects confidential information shared during pre-project discussions or engagements.",
      clientRole: "Disclosing Party",
      designerRole: "Receiving Party",
      sections: [
        section("1. Confidential information", [
          "Confidential Information means any non-public business, technical, financial, or creative information disclosed by Disclosing Party, including business plans, product concepts, customer data, and proprietary designs.",
        ]),
        section("2. Obligations", [
          "Receiving Party will not disclose Confidential Information to third parties without written consent.",
          "Receiving Party will use Confidential Information only for evaluating or performing the contemplated engagement.",
          "Receiving Party will protect Confidential Information with reasonable care.",
        ]),
        section("3. Exclusions", [
          "Information that is publicly available, already known, independently developed, or rightfully received from a third party is not confidential.",
        ]),
        section("4. Term", [
          "Obligations survive for 2 years from the date of disclosure, or until the information becomes public through no fault of Receiving Party.",
        ]),
        section("5. Remedies", [
          "Unauthorized disclosure may cause irreparable harm. Disclosing Party may seek injunctive relief in addition to other remedies.",
        ]),
        ...generalClauses(),
      ],
    },

    "mutual-nda": {
      docTitle: "Mutual Non-Disclosure Agreement",
      title: "Mutual non-disclosure agreement",
      subtitle: "Both parties agree to protect each other's confidential information.",
      clientRole: "Party A",
      designerRole: "Party B",
      sections: [
        section("1. Mutual obligations", [
          "Each party may disclose Confidential Information to the other for the purpose of evaluating or performing a potential or active collaboration.",
          "Each party agrees to protect the other's Confidential Information with the same care it uses for its own.",
        ]),
        section("2. Confidential information", [
          "Includes business plans, product concepts, technical data, financial information, customer lists, and proprietary creative work.",
        ]),
        section("3. Term", [
          "Obligations survive for 2 years from the last disclosure.",
        ]),
        section("4. Return of materials", [
          "Upon request, each party will return or destroy the other's Confidential Information.",
        ]),
        ...generalClauses(),
      ],
    },

    "independent-contractor": {
      docTitle: "Independent Contractor Agreement",
      title: "Independent contractor agreement",
      subtitle: "Clarifies that Designer is an independent contractor, not an employee of Client.",
      sections: [
        section("1. Relationship", [
          "Designer is an independent contractor, not an employee, partner, or agent of Client.",
          "Designer controls the manner and means of performing services.",
          "Nothing in this agreement creates an employment relationship.",
        ]),
        section("2. Taxes & benefits", [
          "Designer is responsible for all taxes, insurance, and benefits.",
          "Client will not withhold taxes or provide employee benefits.",
          "Designer will provide Form W-9 or equivalent as requested.",
        ]),
        section("3. Equipment & expenses", [
          "Designer provides own equipment, software, and workspace unless otherwise agreed.",
          "Reimbursable expenses must be pre-approved in writing.",
        ]),
        section("4. Responsibilities", [
          "Designer performs services per the applicable SOW or project agreement.",
          "Designer may work with other clients concurrently unless exclusivity is separately agreed.",
        ]),
        ...generalClauses(),
      ],
    },

    subcontractor: {
      docTitle: "Subcontractor Agreement",
      title: "Subcontractor agreement",
      subtitle: "Terms for subcontractors hired by Designer to assist on client projects.",
      designerRole: "Contractor",
      clientRole: "Subcontractor",
      sections: [
        section("1. Scope", [
          "Subcontractor will perform services as assigned by Contractor for the client project referenced below.",
          "Scope: _________________________",
        ]),
        section("2. Payment", [
          "Subcontractor fee: $_______ due upon completion / milestone: _______",
          "Payment within 14 days of Contractor receiving client payment for applicable work.",
        ]),
        section("3. IP assignment", [
          "All work product created by Subcontractor is work-for-hire and assigned to Contractor.",
          "Subcontractor will not retain rights or use work in portfolio without Contractor's written consent.",
        ]),
        section("4. Confidentiality", [
          "Subcontractor will protect all client and project information as confidential.",
        ]),
        ...generalClauses(),
      ],
    },

    "work-for-hire": {
      docTitle: "Work-for-Hire Agreement",
      title: "Work-for-hire agreement",
      subtitle: "Client receives complete ownership of all work product from the start of the engagement.",
      notice: "Use when the client requires full ownership from inception, typical for corporate engagements.",
      sections: [
        section("1. Work-for-hire designation", [
          "All creative work performed under this agreement is 'work made for hire' as defined by U.S. copyright law.",
          "To the extent any work does not qualify as work-for-hire, Designer hereby assigns all rights to Client.",
        ]),
        section("2. Ownership", [
          "Client owns all right, title, and interest in work product from the moment of creation.",
          "Designer retains no usage rights except portfolio display unless Client requests otherwise in writing.",
        ]),
        section("3. Payment", [
          "Fees are as stated in the applicable SOW. Payment does not condition ownership transfer under this agreement.",
        ]),
        ...generalClauses(),
      ],
    },

    referral: {
      docTitle: "Referral Agreement",
      title: "Referral agreement",
      subtitle: "Defines referral fees and conditions for introductions that lead to signed client work.",
      summaryFields: [
        { label: "Referral fee", value: "10%", id: "referralFee" },
        { label: "Payment timing", value: "Upon client payment", id: "paymentTiming" },
        { label: "Term", value: "12 months", id: "term" },
      ],
      sections: [
        section("1. Referral terms", [
          "Referrer introduces potential clients to Designer. If the introduction leads to a signed project, Referrer receives the referral fee stated above.",
        ]),
        section("2. Fee calculation", [
          "Referral fee is calculated on the first project only (or as specified): ☐ First project ☐ All projects for 12 months",
          "Fee is based on net project revenue received by Designer, excluding expenses and third-party costs.",
        ]),
        section("3. Payment", [
          "Referral fee is paid within 14 days of Designer receiving payment from the referred client.",
        ]),
        section("4. Conditions", [
          "Referral must be the client's first contact with Designer for the referred project.",
          "Designer reserves the right to decline any referred project.",
        ]),
        ...generalClauses(),
      ],
    },

    partnership: {
      docTitle: "Partnership Agreement",
      title: "Design partnership agreement",
      subtitle: "Terms for collaboration between Designer and Partner on joint projects.",
      clientRole: "Partner",
      designerRole: "Designer",
      sections: [
        section("1. Collaboration scope", [
          "Parties will collaborate on: _________________________",
          "Each party's responsibilities: Designer: _______ Partner: _______",
        ]),
        section("2. Revenue split", [
          "Project revenue split: Designer ___% / Partner ___%",
          "Split applies to net revenue after direct project expenses.",
        ]),
        section("3. IP ownership", [
          "Joint work product ownership: ☐ Shared equally ☐ As specified per project ☐ Other: _______",
        ]),
        section("4. Decision-making", [
          "Major decisions (pricing, scope, client communication) require mutual written agreement.",
        ]),
        section("5. Termination", [
          "Either party may exit with 30 days written notice. Active projects are completed or transferred by mutual agreement.",
        ]),
        ...generalClauses(),
      ],
    },
  };

  function getContractContent(id) {
    return CONTRACTS[id] || null;
  }

  global.ContractsData = {
    DESIGNER,
    GOVERNING_LAW,
    CONTRACTS,
    getContractContent,
  };
})(typeof window !== "undefined" ? window : globalThis);
