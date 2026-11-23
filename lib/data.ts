export const personalInfo = {
  name: "Rishav Roy",
  initials: "RR",
  tagline: "Computer Science & Engineering (AI & ML) Student",
  bio: "Second-year B.Tech CSE student specializing in Artificial Intelligence and Machine Learning at Narula Institute of Technology. Focused on building pragmatic software, experimenting with distributed edge deployments, and repurposing hardware for cloud infrastructure.",
  email: "rishavroy2006@gmail.com",
  location: "Kolkata, India",
  availability: "Available for Summer 2025 / 2026 internships & project collaborations",
};

export const socialLinks = {
  github: "https://github.com/Rishavroy-2006",
  linkedin: "https://www.linkedin.com/in/rishav-roy2006",
  instagram: "https://instagram.com/rishav.royy",
};

export interface SkillItem {
  name: string;
  category: "language" | "web" | "aiml" | "tools";
  context?: string;
}

export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages used for systems, scripting, and application logic",
    skills: [
      { name: "Python", context: "Data manipulation, FastAPI backends, ML pipelines & scraping" },
      { name: "TypeScript", context: "Type-safe full-stack web and mobile application logic" },
      { name: "JavaScript", context: "ES6+, DOM manipulation & dynamic client runtimes" },
      { name: "C++", context: "Object-oriented programming & DSA implementation" },
      { name: "C", context: "Low-level system programming & memory fundamentals" },
      { name: "Java", context: "Enterprise OOP patterns & academic coursework" },
    ],
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Multi-agent LLM systems, time-series forecasting, and computer vision",
    skills: [
      { name: "LLM Agents (Groq & Gemini)", context: "Tool calling, multimodal vision, agent trace debugging" },
      { name: "FFmpeg Media Pipeline", context: "Hardware-accelerated encoding (Metal/NVENC), audio Z-scores" },
      { name: "Prophet & Forecasting", context: "Time-series macroeconomic and price trend projection" },
      { name: "SeleniumBase & Stealth Scraping", context: "Undetected browser automation & self-healing DOM selectors" },
      { name: "NumPy & Pandas", context: "Vectorized data manipulation & IQR statistical anomaly filtering" },
      { name: "Scikit-Learn", context: "Supervised & unsupervised learning models and evaluation metrics" },
    ],
  },
  {
    id: "web",
    title: "Web & Mobile Engineering",
    description: "Modern frameworks, reactive states, and native mobile containerization",
    skills: [
      { name: "React 19 / 18", context: "Modern component lifecycles, hooks & concurrent rendering" },
      { name: "Next.js 16 (App Router)", context: "SSR/SSG, serverless API routes & Turbopack architecture" },
      { name: "Tailwind CSS v4", context: "Modern responsive utility styling & design systems" },
      { name: "Capacitor", context: "Cross-platform mobile bridges for native Android/iOS APIs" },
      { name: "Framer Motion", context: "Buttery-smooth kinetic layout transitions & UI orchestration" },
      { name: "WebSockets & SSE", context: "Real-time bidirectional event streaming & telemetry sync" },
    ],
  },
  {
    id: "tools",
    title: "Systems, Edge & Cloud",
    description: "Hardware repurposing, edge runtimes, and production platforms",
    skills: [
      { name: "Linux / Termux", context: "CLI navigation, shell scripts & Android edge server hosting" },
      { name: "Cloudflare Workers", context: "Edge compute, OpenNext adapter & serverless deployment" },
      { name: "SQLite (WAL Mode)", context: "Embedded relational storage with atomic transactions" },
      { name: "Git & GitHub CI/CD", context: "Branching, semantic commits, automated workflows" },
      { name: "Vercel", context: "CI/CD automation, serverless routing & preview staging" },
      { name: "VS Code & Terminal", context: "Customized development workflow, debugger tooling & profiling" },
    ],
  },
];

export type ProjectCategory =
  | "AI / Machine Learning"
  | "Systems & Edge"
  | "Personal Safety & Mobile"
  | "Web Platform"
  | "Civic Tech"
  | "Systems & Cloud"
  | "Web Application"
  | "Academic Tool"
  | "Analytics";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  featured?: boolean;
  category: ProjectCategory | string;
  stats?: string;
  metrics?: string[];
  highlights?: string[];
  demoType?: "calculator" | "terminal" | "clipit" | "airfare" | "none";
}

export const projects: Project[] = [
  {
    id: "clipit",
    title: "ClipIt Studio",
    tagline: "Local-first AI video clipping engine with FFmpeg hardware encoding & Web Studio",
    description: "An autonomous AI video clipping engine and Web Studio that converts 2–12 hour gaming streams and long VODs into high-energy, ready-to-publish vertical 9:16 clips for YouTube Shorts, TikTok, and Instagram Reels. Engineered with a 24/7 Live Stream Sentinel that continuously chunks streams with a 5-minute lookback overlap, audio loudness Z-score spike detection, facecam tracking, kinetic ASS word-level subtitles, and microsecond-accurate PTS A/V synchronization via local FFmpeg (Metal/NVENC).",
    tech: ["Python", "FastAPI", "FFmpeg", "PyTorch", "Whisper", "Gemini 2.5 Flash", "SSE", "Hardware Encoding"],
    link: "https://github.com/Rishavroy-2006/ClipIt",
    github: "https://github.com/Rishavroy-2006/ClipIt",
    category: "AI / Machine Learning",
    featured: true,
    stats: "100% Local GPU/Metal Acceleration",
    metrics: ["3 Broadcast Layouts", "24/7 Live Stream Sentinel", "Zero Cloud Render Fees", "Audio Z-Score Detection"],
    highlights: [
      "Continuous 24/7 YouTube/Twitch live chunking with 5-min lookback overlap to prevent split highlights",
      "Audio loudness Z-score and vocal excitement spike detection algorithms",
      "3 automatic layout variants: Reaction Stacked, Blur-Fill 16:9, and Deframed 9:16",
      "Kinetic word-by-word subtitles with emoji triggers and zero cloud render fees",
    ],
    demoType: "clipit",
  },
  {
    id: "udaan-metrics",
    title: "Udaan Metrics",
    tagline: "Real-time airfare price index with AI self-healing scrapers & IQR anomaly detection",
    description: "Smart India Hackathon project modernising India's official airfare CPI inflation tracking. Scrapes live fare data across 4 major domestic carriers (IndiGo, Air India, SpiceJet, Akasa Air) and 2 major OTAs (MakeMyTrip, Goibibo) across 5 advance booking windows (T+1 to T+45). Features Gemini-powered self-healing DOM selectors that automatically adapt to layout changes, statistical IQR outlier rejection, DGCA-weighted composite index computation, Prophet time-series forecasting, and dual dashboards for government statisticians (MoSPI/RBI) and citizens.",
    tech: ["Python", "FastAPI", "React", "Vite", "SeleniumBase UC", "Prophet", "Gemini AI", "Pandas"],
    link: "https://udaan-metrics.vercel.app",
    github: "https://github.com/Rishavroy-2006/Udaan-Metrics",
    category: "AI / Machine Learning",
    featured: true,
    stats: "Smart India Hackathon Finalist • Live",
    metrics: ["4 Airlines + 2 OTAs", "5 Booking Horizons (T+1 to T+45)", "IQR Outlier Filtering", "Self-Healing Scrapers"],
    highlights: [
      "Resilient scraping engine with undetected browser profiles across 6 major Indian flight corridors",
      "Gemini LLM fallback parser that generates updated DOM selector registries on layout shift",
      "IQR-based statistical anomaly filtering to eliminate deceptive flash sales and glitches",
      "DGCA passenger-weighted composite index and real-time OTA Premium margin tracker",
    ],
    demoType: "airfare",
  },
  {
    id: "sos-mobile-app",
    title: "Stealth Calculator (Emergency SOS)",
    tagline: "Covert personal safety & emergency alert system disguised as a functional calculator",
    description: "A stealth personal safety mobile and web application engineered for individuals in coercive, abusive, or dangerous situations. Outwardly operates as an everyday, fully responsive arithmetic calculator; inputting secret PIN 9119= or long-pressing = immediately activates the hidden emergency command center. Integrates zero-latency one-tap SOS dispatch, background GPS location tracking, covert audio recording, and a configurable dead-man check-in safety countdown timer.",
    tech: ["React 18", "TypeScript", "Capacitor", "Tailwind CSS", "Framer Motion", "Geolocation API", "Web Audio"],
    link: "https://github.com/Rishavroy-2006/SoS-Mobile-App",
    github: "https://github.com/Rishavroy-2006/SoS-Mobile-App",
    category: "Personal Safety & Mobile",
    featured: true,
    stats: "Stealth Disguise • 0-Latency SOS",
    metrics: ["Secret PIN 9119= Unlock", "Dead-Man Safety Timer", "Silent Evidence Capture", "Ghost Mode Lock"],
    highlights: [
      "Fully functional arithmetic calculator disguise with zero suspicious visible indicators",
      "Secret PIN (9119=) and long-press trigger to reveal emergency command dashboard",
      "Dead-man switch safety check-in timer with automated emergency dispatch on timeout",
      "Capacitor native bridge for background SMS and real-time location telemetry",
    ],
    demoType: "calculator",
  },
  {
    id: "phonecloud",
    title: "PhoneCloud",
    tagline: "Repurposed Android smartphone as a dedicated 24/7 private edge cloud server",
    description: "Engineered a low-power, self-hosted cloud server running directly on a repurposed Android device via Termux. Implements multi-user role authentication, sandboxed per-user filesystem storage, full-text document indexing, real-time file synchronisation over WebSockets, and a lightweight on-device AI document chat assistant for querying uploaded documents locally with zero cloud subscription overhead.",
    tech: ["Python", "Flask", "Flask-SocketIO", "WebSockets", "Termux", "Edge Server", "Linux CLI"],
    link: "https://phonecloud.serveousercontent.com/",
    github: "https://github.com/Rishavroy-2006",
    category: "Systems & Edge",
    featured: true,
    stats: "Low-Power 24/7 Private Edge Cloud",
    metrics: ["On-Device AI Chat", "WebSocket Sync", "Zero Cloud Cost", "Termux Linux Runtime"],
    highlights: [
      "Runs 24/7 on repurposed consumer mobile hardware consuming under 5W of power",
      "Real-time bidirectional state and file transfer using Flask-SocketIO",
      "Isolated user sandboxes with cryptographic session authorization",
      "On-device lightweight NLP agent for querying private local documents",
    ],
    demoType: "terminal",
  },
  {
    id: "cartwise",
    title: "CartWise",
    tagline: "Autonomous agentic e-commerce platform with dual-agent LLM assistant & multimodal search",
    description: "An autonomous shopping platform built with Next.js and SQLite (WAL mode) featuring a multi-agent AI shopping assistant powered by Groq and Gemini. Integrates conversational semantic product discovery, multimodal visual image recognition (with simulated demo recognition for grocery products), real-time product comparison matrices, an atomic 3-step checkout engine, and an interactive Agent Trace inspector panel to review LLM intent parsing and executed SQL queries.",
    tech: ["Next.js", "TypeScript", "SQLite (better-sqlite3)", "Groq LLM", "Gemini Vision", "Tailwind CSS", "Vitest"],
    link: "https://github.com/Rishavroy-2006/CartWise",
    github: "https://github.com/Rishavroy-2006/CartWise",
    category: "AI / Machine Learning",
    featured: false,
    stats: "Dual-Agent LLM + Multimodal Search",
    metrics: ["SQLite WAL Mode", "Agent Trace Modal", "Multimodal Image Search", "Deterministic Mock/Real Engine"],
    highlights: [
      "Agent Trace inspector modal displaying LLM intent parsing, active filters, and raw SQL queries",
      "Multimodal visual search parsing uploaded images to identify product candidates",
      "Server-side cart management with atomic checkout transactions and zero-stock validation",
      "Comprehensive Vitest test suite validating shopping cart lifecycles and agent contracts",
    ],
    demoType: "none",
  },
  {
    id: "neurosync",
    title: "NeuroSync",
    tagline: "EEG smart earpiece telemetry dashboard & neural state tracking interface",
    description: "An interface demo for an advanced EEG-based smart earpiece designed to monitor cognitive states in real time. Features a 360-degree neural dashboard rendering live Alpha and Gamma brainwave simulations, real-time Focus scoring, Heart Rate Variability (HRV) stress tracking, an animated coherence breathing guide ('Breathe to Focus'), and 4-stage sleep architecture visualization (Awake, REM, Light, Deep).",
    tech: ["React", "TypeScript", "Capacitor", "Tailwind CSS", "Vite", "Lucide React", "Web Audio API"],
    link: "https://github.com/Rishavroy-2006/sentix",
    github: "https://github.com/Rishavroy-2006/sentix",
    category: "Personal Safety & Mobile",
    featured: false,
    stats: "Neural Telemetry & HRV Monitor",
    metrics: ["Alpha/Gamma Waveform Visualizer", "HRV Stress Tracking", "Coherence Breathing Tool", "Sleep Architecture"],
    highlights: [
      "Real-time Focus score calculation and simulated dual-band (Alpha/Gamma) neural wave rendering",
      "Guided cardiovascular coherence breathing tool with kinetic expanding visual feedback",
      "Nightly sleep staging breakdown tracking REM, light, and deep restorative intervals",
      "Capacitor configuration ready for cross-platform Android and iOS deployment",
    ],
    demoType: "none",
  },
  {
    id: "aquanest",
    title: "AquaNest",
    tagline: "Modern aquatic e-commerce platform built to ui-ux-pro-max design guidelines",
    description: "A modern e-commerce storefront for aquarium enthusiasts crafted adhering to ui-ux-pro-max design guidelines. Engineered with React 19, Tailwind CSS v4, and Framer Motion for scroll reveals and page transitions. Includes a multi-tier category catalog, grid/list view switcher, paginated product grid, dynamic filter drawer, slide-in cart, and responsive mobile navigation.",
    tech: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Vite", "React Router"],
    link: "https://aquanest-website.vercel.app",
    github: "https://github.com/Rishavroy-2006/Aquanest-website",
    category: "Web Platform",
    featured: false,
    stats: "Live Deployment • ui-ux-pro-max",
    metrics: ["React 19 + Tailwind v4", "Framer Motion Animations", "Full Responsive Drawer", "Context API Cart"],
    highlights: [
      "Implemented using modern UI/UX design specifications with smooth micro-interactions",
      "Dynamic product filtering, search, and view mode toggles with immediate state feedback",
      "Fluid slide-in cart drawer and persistent wishlist managed via React Context",
      "Optimized responsive layouts verified across mobile, tablet, and widescreen displays",
    ],
    demoType: "none",
  },
  {
    id: "timetable-manager",
    title: "StudyHall (AI-ML Timetable Manager)",
    tagline: "Interactive academic schedule management SPA for university departments",
    description: "A high-performance schedule management Single Page Application built for computer science and engineering students. Delivers instant search, dynamic day-by-day timetable views, lab batch allocation indicators, room navigation assistance, and automatic highlighting of active ongoing lectures based on current system time.",
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    link: "https://aiml2a-time-table.vercel.app/",
    github: "https://github.com/Rishavroy-2006/Class-Time-Table",
    category: "Web Platform",
    featured: false,
    stats: "Daily Active Academic Tool • Live",
    metrics: ["Real-Time Current Class Highlight", "Instant Subject Search", "Lab Batch Routing", "Mobile-First SPA"],
    highlights: [
      "Automatic time-aware detection highlighting currently ongoing lectures and lab sessions",
      "Instant multi-key search filtering by faculty name, subject code, or room number",
      "Lab batch routing separating AI/ML practical groups seamlessly",
      "Deployed and utilized daily by engineering peers at Narula Institute of Technology",
    ],
    demoType: "none",
  },
  {
    id: "swapnacharon",
    title: "Swapnacharon Photography",
    tagline: "Editorial wedding & portrait photography visual exhibition platform",
    description: "An editorial single-page photography exhibition and client acquisition platform engineered for professional photographer Dip Das. Developed with vanilla web standards for zero-bundle overhead, featuring dynamic PapaParse integration for Google Sheets headless content management, AOS scroll transitions, and direct client inquiry delivery via EmailJS.",
    tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "AOS", "PapaParse", "EmailJS"],
    link: "https://www.swapnacharon.in",
    github: "https://github.com/Rishavroy-2006/Swapnacharon",
    category: "Web Platform",
    featured: false,
    stats: "Production Client Deployment • Live",
    metrics: ["Google Sheets as Headless CMS", "Zero-Framework Vanilla JS", "EmailJS Form Delivery", "AOS Smooth Scroll"],
    highlights: [
      "Headless dynamic portfolio syncing with Google Sheets CSV via PapaParse with no build step",
      "Lightweight zero-dependency architecture ensuring near-instant mobile page load times",
      "Responsive full-bleed visual masonry layout optimized for high-res imagery",
      "Automated client booking enquiry pipeline connected directly to EmailJS",
    ],
    demoType: "none",
  },
  {
    id: "aadhaar-data-console",
    title: "UIDAI Aadhaar Data Console",
    tagline: "Civic identity demographic analytics & open data visualization console",
    description: "A conceptual civic data analytics dashboard designed to explore and visualize demographic datasets, enrolment trends, and geographical distribution metrics. Features interactive charts, density maps, anomaly filters, and accessible tabular data export mechanisms for public policy researchers.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Data Analytics"],
    link: "https://uidia-aadhar-data-console.vercel.app/",
    github: "https://github.com/Rishavroy-2006/app",
    category: "Civic Tech",
    featured: false,
    stats: "Open Data Analytics • Live",
    metrics: ["Interactive Recharts Visualizations", "Demographic Trend Analysis", "Regional Distribution Maps", "Accessible Table Views"],
    highlights: [
      "Interactive demographic distribution charts breaking down enrolment metrics",
      "Time-series trend analysis tracking regional data points and adoption rates",
      "Clean civic UI following accessibility standards for tabular and graphical reporting",
      "Client-side CSV data parsing and fast interactive filtering",
    ],
    demoType: "none",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Specialization in Artificial Intelligence & Machine Learning",
    institution: "Narula Institute of Technology",
    location: "Kolkata, West Bengal, India",
    period: "2024 — 2028",
    status: "2nd Year Undergraduate",
    cgpa: "8.2 / 10.0",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java/C++)",
      "Database Management Systems (DBMS)",
      "Machine Learning Fundamentals",
      "Web Technologies",
      "Software Engineering",
    ],
  },
  {
    degree: "Secondary & Higher Secondary Education",
    specialization: "Science Stream (Mathematics, Physics, Chemistry, Computer Science)",
    institution: "Adamas International School",
    location: "Kolkata, India",
    period: "2009 — 2024",
    status: "Completed (ICSE & ISC)",
  },
];

export const activeFocusAreas = [
  {
    title: "Autonomous Multi-Agent & Vision Systems",
    focus: "Engineering agentic LLM workflows with Groq and Gemini (CartWise) and automated self-healing scraping systems (Udaan Metrics).",
  },
  {
    title: "Distributed Edge & Hardware Repurposing",
    focus: "Repurposing mobile hardware into 24/7 private cloud nodes with Termux, Flask-SocketIO, and local AI (PhoneCloud).",
  },
  {
    title: "High-Throughput Media Pipelines",
    focus: "Accelerating video processing and live stream highlight extraction via local FFmpeg hardware encoding (ClipIt).",
  },
  {
    title: "Stealth Embedded & Mobile Security",
    focus: "Designing covert mobile safety tools with Capacitor, background geolocation tracking, and dead-man timer architectures (Stealth Calculator).",
  },
];

export const beyondCode = [
  {
    title: "Hardware Repurposing",
    description: "Turning decommissioned smartphones and mini-PCs into energy-efficient self-hosted local servers.",
  },
  {
    title: "Creative UI Engineering",
    description: "Designing tactile, high-contrast web interfaces that prioritize usability, speed, and real interactivity over AI slop.",
  },
  {
    title: "Gaming & Tech Analysis",
    description: "Exploring game engine rendering techniques, PC hardware architectures, and Linux customization.",
  },
];

export const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "Interactive Lab", href: "#interactive-lab" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];
