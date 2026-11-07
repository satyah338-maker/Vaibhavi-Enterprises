# Vaibhavi Enterprises — Website Completion Roadmap

**Target market:** Industrial coatings & porous plastic filters (PTFE, HALAR/ECTFE, FBE, PVDF, FEP, PFA, Vaicon filters)
**Primary geography:** Maharashtra, India (Mumbai, Pune, Nashik, Thane, Nagpur, Aurangabad)
**Current status:** Core Next.js 15 site live; build + lint pass; home page Products/Services + Clients sections fixed

---

## Phase 1 — Foundation & Local SEO (Weeks 1–2)

### 1.1 Location pages (Maharashtra cities)
Create dedicated pages for each target city so the site ranks for `"coating + city"` queries.

| Page | URL | Target Keywords |
|---|---|---|
| Mumbai | `/locations/mumbai` | PTFE coating Mumbai, industrial coating Mumbai, FBE coating Mumbai |
| Pune | `/locations/pune` | PTFE coating Pune, FBE coating Pune, chemical coating Pune |
| Nashik | `/locations/nashik` | coating company Nashik, industrial coating Nashik |
| Thane | `/locations/thane` | coating services Thane, PTFE coating Thane |
| Nagpur | `/locations/nagpur` | industrial coating Nagpur, FBE coating Nagpur |
| Aurangabad | `/locations/aurangabad` | coating company Aurangabad, pharma coating Aurangabad |

Each location page should include:
- H1: `Industrial Coating Services in [City], Maharashtra`
- Local NAP (Name, Address, Phone) matching Google Business Profile
- Embedded Google Map
- City-specific intro paragraph (e.g., "Serving chemical plants in Pune's industrial belt...")
- Local client logos / case studies from that city
- "Request a Quote" CTA

### 1.2 Google Business Profile (GBP)
- Claim/verify `Vaibhavi Enterprises` on Google Maps (Goregaon East, Mumbai)
- Add photos: coating shop, filter media, facility, team
- Add services: PTFE coating, FBE coating, HALAR coating, porous plastic filters
- Set business hours: Mon–Sat 9:00–18:00 IST
- Collect reviews from existing clients (ONGC, L&T, Godrej, Mafatlal, Birla)

### 1.3 NAP consistency (citations)
List on Indian B2B directories with identical Name/Address/Phone:
- IndiaMART
- TradeIndia
- ExportersIndia
- JustDial
- Sulekha
- GetIt / Yellow Pages India

---

## Phase 2 — Content & Application Expansion (Weeks 3–4)

### 2.1 Add missing application categories
Based on competitor research (PPG, Dupont, Berger, Indian coating industry), add these application pages if not already present:

| Category | Slug | Coatings | Industries |
|---|---|---|---|
| Power Generation | `/applications/power-generation` | PTFE, FBE | Power plants, boilers, turbines |
| Marine & Offshore | `/applications/marine-offshore` | FBE, HALAR | Ships, offshore platforms, saltwater equipment |
| Aerospace | `/applications/aerospace` | PTFE, PFA | Seals, gaskets, fuel components |
| Construction / Infrastructure | `/applications/construction` | FBE | Structural steel, bridges, rebar |
| Medical Devices | `/applications/medical-devices` | PTFE, PFA | Surgical instruments, tubing |

Each application page: hero, industries served, products used, case study, quote CTA.

### 2.2 Blog / Resource section
Add `/blog` with Maharashtra-focused articles:
- "PTFE coating for chemical plants in Mumbai — corrosion resistance guide"
- "FBE vs HALAR coating: which for Maharashtra oil & gas pipelines?"
- "Vaicon porous plastic filters for pharma plants in Pune & Aurangabad"
- "Why Whitford Quality Approved coating matters for Indian manufacturers"

Publish 1 article/week; interlink to application + location pages.

### 2.3 Case study expansion
Add more project case studies with:
- Client name + city (e.g., "ONGC — Mumbai")
- Before/after photos
- Coating type, thickness, standards (SSPC-SP10, holiday testing)
- Results (years of asset life extended, % maintenance reduction)

---

## Phase 3 — Quote/Enquiry UX & Conversion (Weeks 5–6)

### 3.1 Multi-step enquiry form
Upgrade `/enquiry` from single-step to 4-step:

| Step | Fields |
|---|---|
| 1. Contact | Name, Company, Email, Phone, City (Maharashtra dropdown) |
| 2. Product | Coating type (PTFE/FBE/Halar/etc.), Application industry |
| 3. Technical | Substrate, temperature range, chemical exposure, quantity, file upload (drawings/specs) |
| 4. Timeline | Required date, urgency, additional notes |

- File upload: PDF, DWG, JPG, PNG (max 10MB)
- Step progress indicator
- "We'll respond within 24 hours" confirmation
- Save to database + email notification

### 3.2 Sticky CTA
- Floating "Request a Quote" button on all pages (bottom-right, next to WhatsApp)
- Navbar CTA more prominent (already has "Get a Quote")

### 3.3 Client portal (revisit driver)
- `/client/login` — existing clients track quote status, reorder, download certificates
- Email magic-link or password auth

### 3.4 Referral / share
- "Refer a colleague" form on thank-you page
- Social share buttons on case study pages (WhatsApp, LinkedIn — most relevant for Indian B2B)

---

## Phase 4 — SEO & Technical (Weeks 7–8)

### 4.1 Schema markup (all pages)
- `Organization` (home)
- `LocalBusiness` (home + location pages)
- `Service` (each coating type: PTFE, FBE, HALAR, filters)
- `BreadcrumbList` (all nested pages)
- `FAQPage` (enquiry + application pages)
- `Review` / `AggregateRating` (client testimonials)

### 4.2 Performance
- Image optimization: Next.js `Image` with `sizes` (already used); convert large JPGs to WebP/AVIF
- Lazy load below-fold images
- Core Web Vitals target: LCP < 2.5s, CLS < 0.1, INP < 200ms

### 4.3 Sitemap & robots
- `sitemap.ts` already includes all routes; add location pages + blog
- `robots.ts` already allows all; add sitemap reference (already present)

### 4.4 Open Graph / Twitter cards
- Dynamic OG images per application/location page
- Already configured on home + application pages; extend to blog + locations

---

## Phase 5 — Competitor Differentiation (Ongoing)

| Feature | Competitors (PPG, Dupont, Berger) | Vaibhavi Advantage to Highlight |
|---|---|---|
| Certifications | ISO, various | **Whitford Quality Approved Coater (2009–2011)** — first Indian coater |
| Local presence | Global / national | **Mumbai-based since 1989**, Goregaon facility, in-house coating shop |
| Industries | Broad global | **Maharashtra-focused** chemical, pharma, oil & gas, food processing |
| Service | Standard quotes | **24-hour response**, custom thickness/grade/color, job-work coating |
| Trust | Brand names | Client logos: ONGC, L&T, Godrej, Mafatlal, Birla, Tata |

---

## Implementation Checklist

```
[ ] Phase 1: Location pages (Mumbai, Pune, Nashik, Thane, Nagpur, Aurangabad)
[ ] Phase 1: Google Business Profile setup & verification
[ ] Phase 1: NAP citations on IndiaMART, TradeIndia, JustDial, ExportersIndia
[ ] Phase 2: New application pages (Power, Marine, Aerospace, Construction, Medical)
[ ] Phase 2: Blog section with Maharashtra content
[ ] Phase 2: Additional case studies with client names + cities
[ ] Phase 3: Multi-step enquiry form with file upload
[ ] Phase 3: Sticky "Request a Quote" CTA
[ ] Phase 3: Client login portal
[ ] Phase 3: Referral / social share on case studies
[ ] Phase 4: Schema markup (LocalBusiness, Service, Breadcrumb, FAQ, Review)
[ ] Phase 4: Image optimization (WebP/AVIF)
[ ] Phase 4: Sitemap update with new routes
[ ] Phase 5: Competitor comparison page ("Why Vaibhavi")
```

---

## Success Metrics (90 days)

| Metric | Target |
|---|---|
| Organic traffic from Maharashtra | +40% |
| Keyword rankings: "PTFE coating Mumbai", "FBE coating Pune" | Top 10 |
| Enquiry form submissions | +50% |
| Quote-to-customer conversion | Track via CRM |
| Google Business Profile views | +60% |
| Page speed (LCP) | < 2.5s |

---

**Next immediate action:** Create the 6 location pages and set up Google Business Profile. These give the fastest SEO return for Maharashtra targeting.
