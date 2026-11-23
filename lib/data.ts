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
      { name: "Python", context: "Data manipulation, ML scripts, Flask backends" },
      { name: "C", context: "Low-level system programming & memory fundamentals" },
      { name: "C++", context: "Object-oriented programming & DSA implementation" },
      { name: "Java", context: "Enterprise OOP patterns & academic coursework" },
      { name: "JavaScript", context: "ES6+, DOM manipulation & dynamic web logic" },
      { name: "TypeScript", context: "Type-safe full-stack web development" },
    ],
  },
  {
    id: "web",
    title: "Web & Full Stack",
    description: "Modern frameworks and architectures for responsive applications",
    skills: [
      { name: "React", context: "Component lifecycles, state management, hooks" },
      { name: "Next.js", context: "App router, SSR/SSG, serverless API routes" },
      { name: "Tailwind CSS", context: "Modern responsive utility styling & design systems" },
      { name: "HTML5 / CSS3", context: "Semantic web standards & accessible layouts" },
      { name: "REST APIs", context: "Endpoint design, integration, and HTTP lifecycle" },
    ],
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Theoretical fundamentals and applied machine learning tools",
    skills: [
      { name: "ML Fundamentals", context: "Supervised & unsupervised learning models" },
      { name: "NumPy & Pandas", context: "High-performance vector operations & tabular data" },
      { name: "Scikit-Learn", context: "Model training, evaluation metrics & pipelines" },
      { name: "Data Visualization", context: "Exploratory data analysis & statistical charts" },
    ],
  },
  {
    id: "tools",
    title: "Systems, Tools & DevOps",
    description: "Environment, version control, and production hosting platforms",
    skills: [
      { name: "Linux / Termux", context: "CLI navigation, shell scripts & Android server hosting" },
      { name: "Git & GitHub", context: "Branching, PRs, semantic commits & code reviews" },
      { name: "Cloudflare Workers", context: "Edge compute, OpenNext adapter & serverless deployment" },
      { name: "Vercel", context: "CI/CD automation, serverless routing & preview staging" },
      { name: "VS Code", context: "Customized workspace, debugger tooling & linting" },
    ],
  },
];

export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  featured?: boolean;
  category: "Systems & Cloud" | "Web Application" | "Academic Tool" | "Analytics";
  stats?: string;
}

export const projects: Project[] = [
  {
    title: "PhoneCloud",
    tagline: "Repurposed Android smartphone as a dedicated private cloud server",
    description: "Engineered a local cloud server running directly on a repurposed Android device via Termux. Features multi-user role authentication, isolated per-user storage, full-text document search, real-time file updates over WebSockets, and an on-device AI chat assistant for querying uploaded documents.",
    tech: ["Python", "Flask", "Flask-SocketIO", "WebSockets", "Termux", "Edge Server"],
    link: "https://phonecloud.serveousercontent.com/",
    github: "https://github.com/Rishavroy-2006",
    featured: true,
    category: "Systems & Cloud",
    stats: "Low-power 24/7 private server",
  },
  {
    title: "AI-ML Timetable Manager",
    tagline: "Interactive academic schedule management application",
    description: "A high-performance schedule dashboard built for computer science students to manage class schedules, lab allocations, and room locations with instantaneous search and responsive breakpoints.",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    link: "https://aiml2a-time-table.vercel.app/",
    github: "https://github.com/Rishavroy-2006",
    category: "Academic Tool",
  },
  {
    title: "Swapnacharon",
    tagline: "High-resolution photography portfolio and visual exhibition",
    description: "A showcase portfolio platform for photography projects, engineered with clean visual rhythm, performance-optimized image delivery, and modular gallery views.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    link: "https://rishavroy-2006.github.io/Swapnacharon/",
    github: "https://github.com/RishavRoy-2006/Swapnacharon",
    category: "Web Application",
  },
  {
    title: "UIDAI Aadhaar Data Console",
    tagline: "Civic identity analytics and demographic data exploration console",
    description: "Conceptual government data console designed to visualize demographic data points, issuance patterns, and geographical distributions with accessible charts.",
    tech: ["React", "Next.js", "Data Visualization", "Tailwind CSS"],
    link: "https://uidia-aadhar-data-console.vercel.app/",
    github: "https://github.com/Rishavroy-2006",
    category: "Analytics",
  },
  {
    title: "Raj Mahal Review Portal",
    tagline: "Community hospitality rating and testimonial platform",
    description: "A dedicated review and rating platform for guests to explore venue capacities, read verified reviews, and submit qualitative event testimonials.",
    tech: ["React", "Next.js", "Vercel", "Tailwind CSS"],
    link: "https://v0-raj-mahaal-review-portal-755qq9zl8.vercel.app/",
    github: "https://github.com/Rishavroy-2006",
    category: "Web Application",
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
    title: "Data Structures & Algorithms",
    focus: "Tree traversals, graph algorithms, dynamic programming, and complexity optimization in C++ and Python.",
  },
  {
    title: "Distributed Edge Computing",
    focus: "Deploying lightweight Node.js/Python microservices and Next.js applications on Cloudflare Workers and edge runtimes.",
  },
  {
    title: "Applied AI Workflows",
    focus: "Integrating small local LLMs and embeddings into utility software (e.g., document Q&A in PhoneCloud).",
  },
];

export const beyondCode = [
  {
    title: "Hardware Repurposing",
    description: "Turning decommissioned smartphones and mini-PCs into energy-efficient self-hosted local servers.",
  },
  {
    title: "Creative UI Engineering",
    description: "Designing tactile, high-contrast web interfaces that prioritize usability over generic AI fluff.",
  },
  {
    title: "Gaming & Tech Analysis",
    description: "Exploring game engine rendering techniques, PC hardware architectures, and Linux customization.",
  },
];

export const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];
