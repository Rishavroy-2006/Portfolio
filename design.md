# Design System Specification: Dark Engineered Precision

> **Aesthetic Persona**: *Dark Engineered Precision / Obsidian Space*  
> **Philosophy**: Built for an AI/ML engineer and edge systems builder. The interface acts as a high-performance instrument panel—restrained, tactile, information-dense without clutter, and free of AI marketing slop. Every interactive element maintains real state, provides microsecond tactile feedback, and grounds technical claims in working code and verified artifacts.

---

## 1. Visual World & Aesthetic Persona

- **Primary World**: Obsidian Space with Electric Sky & Laser Indigo precision accents.
- **Surface Texture**: Layered obsidian and deep graphite panels (`#09090b`, `#0d0f14`, `#131722`) with ultra-fine 1px border geometry (`rgba(255, 255, 255, 0.08)`), subtle backplate blur (`backdrop-blur-md`), and localized optical glow.
- **Lighting Model**: Ambient top-down light with soft, directional depth shadows. Zero garish full-screen rainbow gradients. Accent glows are anchored directly to active operational elements (status beacons, interactive waveforms, terminal prompts).
- **Mode Commitment**: **Experience & Persuade** (per `/impeccable`). The visitor is invited into working software artifacts from the first viewport. The interface recedes to let the engineering speak.

---

## 2. Typography System

The typography pairs **Geist Sans** (high legibility, neutral geometric proportions) for structural titles and editorial prose with **Geist Mono** (tabular alignment, precise glyph widths) for hardware telemetry, terminal execution, metrics, and code references.

### 2.1 Font Families
- **Display & Body**: `var(--font-sans)`, `Geist`, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.
- **Telemetry & Technical**: `var(--font-mono)`, `Geist Mono`, ui-monospace, SFMono-Regular, Menlo, Monaco, monospace.

### 2.2 Scale & Hierarchy
| Level | Font | Size | Weight | Tracking | Line Height | Usage |
|---|---|---|---|---|---|---|
| **Display H1** | Geist Sans | `3.5rem` – `4.5rem` (56–72px) | Bold (`700`) | `-0.035em` | `1.05` | Hero name headline |
| **Section H2** | Geist Sans | `2rem` – `2.75rem` (32–44px) | Bold (`700`) | `-0.03em` | `1.15` | Section titles |
| **Card H3** | Geist Sans | `1.25rem` – `1.5rem` (20–24px) | SemiBold (`600`) | `-0.02em` | `1.25` | Project & module titles |
| **Body Large** | Geist Sans | `1.125rem` (18px) | Regular (`400`) | `-0.01em` | `1.6` | Hero value proposition |
| **Body Base** | Geist Sans | `0.875rem` – `1rem` (14–16px) | Regular (`400`) | `0` | `1.6` | Project & academic descriptions |
| **Telemetry / Data** | Geist Mono | `0.75rem` – `0.8125rem` (12–13px) | Medium (`500`) | `0.02em` | `1.4` | Server metrics, timestamps, tags |
| **Micro Caption** | Geist Mono | `0.6875rem` (11px) | Medium (`500`) | `0.04em` | `1.3` | Status beacons, category tags |

### 2.3 Strict Typography Rules (Craft Floor)
- Numerical data **must** use `tabular-nums` for rock-solid horizontal stability during real-time counters and timers.
- No decorative kicker or eyebrow text stacked above headings (per `/impeccable/reference/craft-floor.md`). Headings carry their own weight.
- Body measure strictly bounded between `60ch` and `72ch` for optimal reading ergonomics.

---

## 3. Three-Layer Token Architecture

### 3.1 Layer 1: Primitive Tokens (Raw Colors & Scales)
```css
/* Primitives */
--color-obsidian-950: oklch(0.08 0.01 255); /* #050507 */
--color-obsidian-900: oklch(0.12 0.015 255); /* #09090b */
--color-obsidian-850: oklch(0.15 0.018 255); /* #10131a */
--color-obsidian-800: oklch(0.18 0.02 255); /* #161b26 */
--color-obsidian-700: oklch(0.24 0.02 255); /* #222938 */

--color-sky-400: oklch(0.75 0.14 215); /* #38bdf8 */
--color-sky-500: oklch(0.68 0.16 220); /* #0ea5e9 */
--color-indigo-400: oklch(0.72 0.15 275); /* #818cf8 */
--color-emerald-400: oklch(0.78 0.17 155); /* #34d399 */
--color-amber-400: oklch(0.82 0.16 85); /* #fbbf24 */
--color-rose-400: oklch(0.72 0.19 25); /* #f87171 */

--color-zinc-100: oklch(0.98 0 0); /* #f4f4f5 */
--color-zinc-300: oklch(0.85 0.01 250); /* #d4d4d8 */
--color-zinc-400: oklch(0.72 0.01 250); /* #a1a1aa */
--color-zinc-500: oklch(0.55 0.01 250); /* #71717a */
```

### 3.2 Layer 2: Semantic Tokens (Design Intent)
```css
--bg-canvas: var(--color-obsidian-900);
--bg-subtle: var(--color-obsidian-950);
--bg-surface: var(--color-obsidian-850);
--bg-surface-elevated: var(--color-obsidian-800);

--text-primary: var(--color-zinc-100);
--text-secondary: var(--color-zinc-300);
--text-muted: var(--color-zinc-400);
--text-faint: var(--color-zinc-500);

--accent-systems: var(--color-sky-400);
--accent-ai: var(--color-indigo-400);
--accent-live: var(--color-emerald-400);
--accent-alert: var(--color-rose-400);

--border-subtle: rgba(255, 255, 255, 0.06);
--border-medium: rgba(255, 255, 255, 0.10);
--border-highlight: rgba(56, 189, 248, 0.35);

--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### 3.3 Layer 3: Component Tokens
- **Pill Nav Container**: `bg-obsidian-900/80 backdrop-blur-md border border-white/[0.08] shadow-2xl`
- **Flagship Project Card**: `bg-obsidian-850/90 border border-white/10 hover:border-sky-500/30 transition-all duration-300`
- **Bento Grid Cell**: `bg-obsidian-850/60 border border-white/[0.07] hover:border-white/20 hover:bg-obsidian-800/80`
- **Telemetry Pill**: `bg-emerald-500/10 border border-emerald-500/25 text-emerald-400`
- **Terminal Shell**: `bg-[#0a0d14] border border-white/10 font-mono text-xs shadow-2xl`

---

## 4. Elimination of AI Slop (Impeccable Directives)

This portfolio adheres strictly to `/impeccable` craft-floor principles to guarantee authentic engineering representation:

| Common AI Slop Pattern | Why It Fails | Replacement in Rishav's Portfolio |
|---|---|---|
| **Fake Progress Bars** ("Python: 95%") | Means nothing; arbitrary percentage fabricated to fill space. | **Contextual Application Badges**: Concrete project references (e.g. "FastAPI backends, PyTorch Whisper, Z-score audio processing"). |
| **Eyebrow / Kicker Labels** ("// MY JOURNEY //") | Visual clutter that undermines the primary heading. | **Clean, Direct Headings**: "Technical Arsenal", "Academic Foundation", "Projects". |
| **Purposeless Rainbow Blobs** | Gaudy decoration that slows render and distracts. | **Localized Optical Glows**: Sky and indigo depth cues tethered to active components (live server monitor, virality scrubber). |
| **Dead CTA Buttons** | Misleads visitor with non-interactive mockups. | **Working Interactive Controls**: Real calculator arithmetic, live terminal execution, interactive tab switching, instant clipboard copy with tactile notification. |
| **Un-themed Browser Surfaces** | Default blue text selection and ugly gray scrollbars reveal lack of craft. | **Themed Surfaces**: Custom sky-blue text selection (`::selection`), slim dark scrollbars, and focused keyboard rings (`:focus-visible`). |
| **Same-Size Generic Cards** | Monotonous grid that gives equal visual weight to tiny and flagship works. | **Visual Hierarchy**: Flagship projects receive expansive interactive bay cards; standard projects sit in a rich categorized Bento grid with live filter tabs. |
| **Excluded Content** | Any trace of excluded client review portals violates instructions. | **Zero Occurrences**: Rigorously audited and permanently purged. |

---

## 5. Component Guidelines

### 5.1 Floating Pill Navigation (`Navigation.tsx`)
- **Structure**: Centered floating frosted-glass pill (`max-w-4xl`) with 12px blur and 1px border.
- **Monogram**: Rishav Roy `[RR]` square glyph with subtle cyan glow.
- **Quick Links**: `Projects`, `Interactive Lab`, `Skills`, `Education`, `Contact`.
- **Status Beacon**: Pulsing emerald beacon labeled `"Available for AI/ML & Systems"`.
- **Active Spy**: Uses IntersectionObserver or scroll position to highlight the active section with a spring pill (`layoutId="activeNav"`).
- **Mobile Menu**: Fullscreen slide-down drawer with zero horizontal overflow, quick-access social links, and touch-target sizes ≥ 44px.

### 5.2 Hero & Telemetry Strip (`Hero.tsx`)
- **Headline**: High-contrast, mathematically spaced: *"Rishav Roy — AI/ML Engineer & Systems Builder"*.
- **Live Telemetry Strip**:
  1. **Local Time**: Live digital clock showing Kolkata Time (`UTC +5:30`) updating every second.
  2. **PhoneCloud Server Status**: Operational status pill (`184d uptime • AC Bypass • 37°C`).
  3. **Core Engineering**: Full-Stack & Systems focus badge.
- **Action Bay**:
  - Primary: `"Launch Interactive Lab"` (smooth scrolls to `#interactive-lab`).
  - Secondary: `"Explore Projects"` (scrolls to `#projects`).
  - Tertiary: Tactile `"Copy Email"` button with copy feedback (`"Copied rishavroy2006@gmail.com"`).

### 5.3 Interactive Demo Lab (`InteractiveLab.tsx`)
- **Container**: Tabbed obsidian workstation housing 4 playable simulations:
  1. **Stealth Calculator (`SoS-Mobile-App`)**: Arithmetic calculator that morphs into a covert SOS dashboard upon typing `9119=`.
  2. **Edge Terminal (`PhoneCloud`)**: Linux/Termux shell with command history and executable commands (`status`, `ping`, `bench`, `ai-ask`, `ls`).
  3. **Virality Radar (`ClipIt Studio`)**: Audio excitement waveform scrubber with layout switcher and kinetic subtitle preview.
  4. **Airfare Anomaly Inspector (`Udaan-Metrics`)**: Real-time airfare monitor with interactive IQR outlier rejection filter.
- **Inter-Component Linking**: Flagship project cards in the Projects section feature `"Test Interactive Demo"` buttons that scroll to the demo lab and activate the corresponding tab.

### 5.4 Flagship Project Bay & Categorized Bento Grid (`Projects.tsx`)
- **Category Filter Tabs**: `All`, `AI & Machine Learning`, `Systems & Edge`, `Personal Safety & Mobile`, `Web Platform`, `Civic Tech`.
- **Flagship Spotlight (Top 4)**:
  - `ClipIt Studio`: Local GPU acceleration, 24/7 Live Stream Sentinel, audio Z-score detection.
  - `Udaan Metrics`: Real-time airfare price index, self-healing scrapers, statistical anomaly detection.
  - `Stealth Calculator`: Dual-identity mobile safety app, 0-latency emergency dispatch.
  - `PhoneCloud`: Low-power private cloud running on Android hardware.
- **Curated Bento Grid (Remaining 6)**:
  - `CartWise` (Groq/Gemini multi-agent commerce + Agent Trace)
  - `NeuroSync` (EEG brainwave telemetry + HRV breathing)
  - `AquaNest` (React 19 + Tailwind v4 aquatic store)
  - `StudyHall` (AI-ML Timetable Manager)
  - `Swapnacharon` (Editorial photography portfolio with Google Sheets CMS)
  - `UIDAI Aadhaar Data Console` (Civic demographic analytics)

### 5.5 Technical Arsenal (`Skills.tsx`)
- **Engineering Domains**:
  1. *AI & Machine Learning*: LLM Agents (Groq/Gemini), FFmpeg Media Pipeline, Prophet Forecasting, SeleniumBase Stealth Scraping, NumPy/Pandas IQR Filtering.
  2. *Systems, Edge & Hardware*: Android/Termux Server Hosting, Linux CLI & Shell Scripting, Cloudflare Workers & OpenNext, SQLite (WAL mode).
  3. *Full-Stack Architecture*: Next.js 16 (Turbopack), React 19, FastAPI, WebSockets & SSE, Tailwind CSS v4.
  4. *Mobile & Native Bridging*: Capacitor Android/iOS runtime, Geolocation API, Web Audio API, Framer Motion.
  5. *Core Engineering*: Python, TypeScript, C++, C, Java, Git CI/CD.
- **Rule**: Every skill card shows concrete real-world usage context from Rishav's projects—no fake percentage sliders.

### 5.6 Academic Journey (`Education.tsx`)
- **Institution**: Narula Institute of Technology, Kolkata.
- **Degree**: B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning), 2024–2028.
- **Performance**: CGPA 8.2 / 10.0 (High Distinction).
- **Core Coursework**: Data Structures & Algorithms, Operating Systems, Computer Networks, Neural Networks & Deep Learning, Database Management Systems.
- **Beyond Code**: Open-source systems engineering, hardware repurposing experiments, competitive coding.

### 5.7 Contact Bay & Direct Channels (`Contact.tsx`)
- **Terminal Design**: Dual-column engineering card.
- **Left Column**: One-click email copy button (`rishavroy2006@gmail.com`), Kolkata timezone indicator (`UTC +5:30`), and verified social links (`GitHub`, `LinkedIn`, `Instagram`).
- **Right Column**: Interactive message form with client-side validation, loading indicator, and response feedback banner.

### 5.8 Engineering Footer (`Footer.tsx`)
- Deployed on **Cloudflare Workers** with `@opennextjs/cloudflare`.
- Built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**.
- Smooth scroll-to-top button with keyboard accessibility.

---

## 6. Mobile Web Compliance (iOS Safari Zoom-on-Refresh Rules)

To eliminate iOS Safari auto-zoom caused by viewport overflow:
1. **Viewport Meta Tag** in `<head>`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no" />
   ```
2. **CSS Root Layout Enforcement** in `app/globals.css`:
   ```css
   html {
     overflow-x: hidden;
     max-width: 100%;
   }
   body {
     overflow-x: hidden;
   }
   ```
3. **Section Wrappers**: Every page section wrapper enforces `max-w-full overflow-x: clip` or `overflow-hidden` so that absolute glows and decorative elements never trigger horizontal layout blowout.
