import { Product, SkillCategory, ExperienceItem, EducationItem, CertificationItem, LanguageItem, ServiceCategory } from '../types';

import bgImage from '../../background.png';
import profileImage from '../../profile portrait.png';

import appOmniPulseImg from '../assets/images/app_omnipulse_desktop_1785494849235.jpg';
import appNovaStudioImg from '../assets/images/app_novastudio_ide_1785494863797.jpg';
import appQuantumTraceImg from '../assets/images/app_quantumtrace_security_1785494875469.jpg';
import appHyperFlowImg from '../assets/images/app_hyperflow_cad_1785494890939.jpg';

export const HERO_DATA = {
  name: "JALAL AMANJ",
  title: "DREAMER... ACHIEVER...",
  description: "Building high-performance cross-platform desktop applications, native hardware engines & bespoke tech services.",
  tagline: "TECH DESKTOP APPS & SERVICES • PORTFOLIO 2026",
  bgImage: bgImage,
};

export const ABOUT_DATA = {
  profileImage: profileImage,
  title: "About Me",
  subtitle: "Inspiration is Allah's gift. Everything that follows is your responsibility.",
  bio: [
    "I am a psychologist, AI-assisted product creator, and digital designer with a passion for building practical solutions that improve how people work and interact with technology.",
    "My background in psychology gives me a human-centered perspective, allowing me to design products that are intuitive, purposeful, and focused on real user needs. Rather than writing software from scratch, I specialize in transforming ideas into fully realized digital products by combining strategic thinking, product design, and the capabilities of modern artificial intelligence.",
    "I use AI as a development partner to prototype, build, refine, and launch applications, websites, workflows, and digital experiences. My role is to define the vision, architect the solution, guide the implementation, and ensure every detail aligns with the product's goals and user experience.",
    "Beyond product development, I have a strong interest in branding, UI/UX design, visual identity, and emerging AI technologies. I believe that great products are created through curiosity, continuous learning, thoughtful design, and the ability to connect technology with human needs.",
    "I enjoy turning ambitious ideas into polished, functional products that solve meaningful problems and create lasting value."
  ],
  stats: [
    { label: "Desktop Apps Built", value: "5+" },
  ],
  skills: [
    {
      title: "Desktop App Engineering",
      skills: ["Tauri & Rust Architecture", "Electron & Node.js Native", "C++ / Qt Frameworks", "WebGPU & OpenGL Graphics"]
    },
    {
      title: "Systems & Intelligence",
      skills: ["Local LLM & ONNX Runtime", "Low Latency IPC Protocols", "Multi-threaded Memory Pools", "Cross-Platform Packaging"]
    },
    {
      title: "Tech Services & APIs",
      skills: ["RESTful & gRPC Services", "Cloud Infrastructure (GCP/AWS)", "Database Optimization", "Security & Code Auditing"]
    }
  ] as SkillCategory[],
  technologies: [
    "Tauri", "Rust", "C++20", "Electron", "TypeScript", "React 19", "Node.js", 
    "WebGPU", "Vulkan", "Python", "GCP", "Docker", "PostgreSQL", "Tailwind CSS", 
    "eBPF", "ONNX Runtime", "gRPC", "GraphQL", "WebAssembly"
  ],
  experiences: [
    {
      year: "2023 — Present",
      role: "Lead Desktop Systems Architect",
      company: "Amanj Tech Systems",
      description: "Architecting high-performance Tauri and Electron desktop applications for audio synthesis, developer tooling, and AI workflow integration."
    },
    {
      year: "2020 — 2023",
      role: "Senior Software Engineer",
      company: "Apex Desktop Labs",
      description: "Spearheaded C++ native graphics optimization and Rust IPC bindings for enterprise CAD and network monitoring software."
    },
    {
      year: "2018 — 2020",
      role: "Full-Stack Tech Services Consultant",
      company: "CoreTech Solutions",
      description: "Delivered scalable cloud API services, desktop wrapper integrations, and automated deployment pipelines for global clients."
    }
  ] as ExperienceItem[],
  education: [
    {
      year: "2019 — 2023",
      degree: "B.Ed in Educational and Psychological Sciences",
      institution: "University of Kirkuk",
      description: "GPA: 3.2"
    }
  ] as EducationItem[],
  certifications: [
    {
      name: "Tauri & Rust Systems Developer Specialist",
      issuer: "Rust Foundation / Open Desktop Standards",
      year: "2024",
      credentialId: "CERT-RUST-9942"
    },
    {
      name: "AWS Certified Solutions Architect — Professional",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-PSA-88102"
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud Platform",
      year: "2023",
      credentialId: "GCP-PCA-40912"
    },
    {
      name: "Certified Information Systems Security Professional (CISSP)",
      issuer: "(ISC)²",
      year: "2022",
      credentialId: "CISSP-883910"
    }
  ] as CertificationItem[],
  languages: [
    { language: "English", level: "Native / Full Professional" },
    { language: "Kurdish", level: "Native" },
    { language: "German", level: "Professional Working Proficiency" },
    { language: "Arabic", level: "Conversational" }
  ] as LanguageItem[]
};

export const PRODUCTS: Product[] = [
  {
    id: "omnipulse-daw",
    title: "OmniPulse Audio Engine",
    category: "Desktop Application",
    year: "2026",
    shortDescription: "Real-time audio synthesis and spectral DSP desktop software.",
    fullDescription: "OmniPulse is a professional cross-platform desktop digital audio workstation built with Rust, C++, and a hardware-accelerated WebGPU UI. It provides sub-2ms audio latency processing, VST3 plugin host support, and real-time 3D spectral FFT audio visualization for sound designers and producers.",
    image: appOmniPulseImg,
    client: "Amanj Tech Systems",
    specs: [
      { label: "Tech Stack", value: "Rust, C++ Audio Core, WebGPU, React" },
      { label: "Audio Latency", value: "< 1.8 ms ASIO / CoreAudio" },
      { label: "Platform", value: "macOS, Windows, Linux" },
      { label: "Memory Footprint", value: "< 120 MB idle RAM" }
    ],
    tags: ["Desktop App", "Rust", "C++", "Audio Engineering", "Tauri"],
    downloadUrl: appOmniPulseImg
  },
  {
    id: "novastudio-ide",
    title: "NovaStudio Local AI IDE",
    category: "Developer Tooling",
    year: "2025",
    shortDescription: "Ultra-fast code editor with integrated local LLM inference.",
    fullDescription: "NovaStudio is a modern lightweight desktop code editor designed for privacy-first developers. Powered by local GGUF/Ollama inference models running directly on GPU via WebGPU/DirectML, it provides real-time code completion, AST semantic searching, and zero cloud dependency.",
    image: appNovaStudioImg,
    client: "Open Source Tech Initiative",
    specs: [
      { label: "Tech Stack", value: "Electron, TypeScript, WebGPU, ONNX" },
      { label: "Inference Speed", value: "65+ tokens/sec on local GPU" },
      { label: "Platform", value: "macOS, Windows, Linux" },
      { label: "Features", value: "AST Parsing, Local AI, Git Graph" }
    ],
    tags: ["IDE", "Local AI", "TypeScript", "Electron", "Developer Tools"],
    downloadUrl: appNovaStudioImg
  },
  {
    id: "quantumtrace-security",
    title: "QuantumTrace Suite",
    category: "Enterprise Security",
    year: "2026",
    shortDescription: "Network packet diagnostic & threat detection desktop software.",
    fullDescription: "QuantumTrace is an enterprise network security desktop application built for SOC analysts and system admins. It monitors high-throughput network interfaces in real time, visualizes live packet topology maps, and runs heuristic anomaly detection routines directly on client hardware.",
    image: appQuantumTraceImg,
    client: "CyberShield Security",
    specs: [
      { label: "Tech Stack", value: "Tauri, Rust eBPF, D3.js, Tailwind" },
      { label: "Throughput", value: "10 Gbps packet capture" },
      { label: "Platform", value: "Windows Enterprise, Linux" },
      { label: "Security", value: "Encrypted Vault & Hardened IPC" }
    ],
    tags: ["Cybersecurity", "Network Diagnostics", "Rust", "Desktop App"],
    downloadUrl: appQuantumTraceImg
  },
  {
    id: "hyperflow-cad",
    title: "HyperFlow 3D Simulator",
    category: "CAD & Engineering",
    year: "2025",
    shortDescription: "Hardware-accelerated 3D physics and structural CAD software.",
    fullDescription: "HyperFlow is a desktop spatial CAD software designed for structural and fluid dynamics modeling. Utilizing custom Vulkan graphics pipelines and Rust multithreading, engineers can render millions of parametric polygons with real-time stress test calculations.",
    image: appHyperFlowImg,
    client: "Precision Engineering Corp",
    specs: [
      { label: "Tech Stack", value: "C++20, Vulkan API, Qt, Rust IPC" },
      { label: "Render Target", value: "60 FPS @ 4K 10M Polygons" },
      { label: "Platform", value: "macOS Metal, Windows DirectX12" },
      { label: "Use Case", value: "Structural & Thermal Simulation" }
    ],
    tags: ["3D Simulation", "CAD", "Graphics", "Desktop Software"],
    downloadUrl: appHyperFlowImg
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "technology",
    title: "Technology Services",
    subtitle: "High-performance desktop apps, cloud architectures, database design & native integrations.",
    description: "End-to-end technical engineering for high-demand desktop software, modern web applications, scalable API microservices, and local AI solutions.",
    iconName: "Laptop",
    services: [
      {
        id: "desktop-apps",
        title: "Desktop Applications",
        category: "technology",
        iconName: "Monitor",
        description: "Cross-platform native desktop apps built with Rust, Tauri, Electron, or C++ with zero-lag interfaces and low memory overhead.",
        deliverables: ["macOS / Windows / Linux Installers", "Hardware Acceleration", "Local Storage & IPC"]
      },
      {
        id: "mobile-apps",
        title: "Mobile Applications",
        category: "technology",
        iconName: "Smartphone",
        description: "Bespoke iOS and Android mobile software engineered for fluid 120Hz performance, offline synchronization, and biometrics.",
        deliverables: ["Native iOS/Android Builds", "Offline Sync Engine", "Push Notifications & Auth"]
      },
      {
        id: "web-apps",
        title: "Web Applications",
        category: "technology",
        iconName: "Globe",
        description: "High-throughput real-time single page & full-stack web applications built with React 19, TypeScript, and Node microservices.",
        deliverables: ["Responsive Dashboard UI", "WebSockets & SSE", "Edge Deployment"]
      },
      {
        id: "websites",
        title: "Websites",
        category: "technology",
        iconName: "Layout",
        description: "Editorial luxury websites, portfolio platforms, and corporate landing experiences crafted with modern glassmorphism and motion design.",
        deliverables: ["Glassmorphic Styling", "SEO & Performance 100", "Custom Domain & SSL"]
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        category: "technology",
        iconName: "Figma",
        description: "User interface & experience architecture, design systems, interactive prototypes, and ergonomic desktop app navigation flows.",
        deliverables: ["Figma Design Systems", "Interactive Prototypes", "Accessibility Compliance"]
      },
      {
        id: "database-design",
        title: "Database Design",
        category: "technology",
        iconName: "Database",
        description: "Optimized relational (PostgreSQL, SQLite) & NoSQL schemas, query indexing, migration scripts, and real-time data replication.",
        deliverables: ["Normalized Schema Architecture", "Query Optimization", "Automated Backups"]
      },
      {
        id: "api-development",
        title: "API Development",
        category: "technology",
        iconName: "Server",
        description: "High-concurrency RESTful, gRPC, and GraphQL APIs engineered in Rust, Go, or Node.js with strict validation and security.",
        deliverables: ["Swagger / OpenAPI Docs", "JWT / OAuth Auth", "Rate Limiting & Caching"]
      },
      {
        id: "ai-integration",
        title: "AI Integration",
        category: "technology",
        iconName: "Cpu",
        description: "On-device local LLM deployment (Ollama/ONNX), RAG vector search pipelines, and seamless cloud Gemini API integrations.",
        deliverables: ["Local Inference Engine", "Vector Database Indexing", "Function Calling Agents"]
      },
      {
        id: "software-maintenance",
        title: "Software Maintenance",
        category: "technology",
        iconName: "Wrench",
        description: "Legacy desktop code refactoring, dependency upgrades, memory leak profiling, and long-term security patching.",
        deliverables: ["Memory Leak Profiling", "Dependency Audit", "Code Quality Refactoring"]
      },
      {
        id: "automation-solutions",
        title: "Automation Solutions",
        category: "technology",
        iconName: "Zap",
        description: "Custom desktop robotic process automation (RPA), data scraping pipelines, and automated CI/CD deployment bots.",
        deliverables: ["Headless Scrapers", "Automated Workflows", "CI/CD Deployment Pipelines"]
      },
      {
        id: "system-architecture",
        title: "System Architecture",
        category: "technology",
        iconName: "Layers",
        description: "Enterprise system topological mapping, microservice decoupling, low-latency IPC design, and zero-trust security foundations.",
        deliverables: ["Architecture Blueprint", "IPC & Protocol Spec", "Fault-Tolerant Topology"]
      },
      {
        id: "technical-consultation",
        title: "Technical Consultation",
        category: "technology",
        iconName: "HelpCircle",
        description: "Expert engineering audits, tech stack evaluation, performance bottleneck analysis, and strategic roadmap planning.",
        deliverables: ["Detailed Audit Report", "Tech Stack Recommendations", "Cost & Speed Optimization"]
      }
    ]
  },
  {
    id: "creative",
    title: "Creative Services",
    subtitle: "Luxury brand identities, visual design, 3D product renders & digital art assets.",
    description: "Bespoke aesthetic design services elevating digital software products, corporate identities, and editorial visual presentations.",
    iconName: "Palette",
    services: [
      {
        id: "brand-identity",
        title: "Brand Identity",
        category: "creative",
        iconName: "Sparkles",
        description: "Complete visual identity design including typography systems, color theory guidelines, and luxury brand strategy manuals.",
        deliverables: ["Brand Style Guide", "Typography Palette", "Vector Assets Package"]
      },
      {
        id: "logo-design",
        title: "Logo Design",
        category: "creative",
        iconName: "Pentagon",
        description: "Modern minimalist vector logo marks, monograms, and scalable app icon assets designed for high-resolution displays.",
        deliverables: ["Vector Formats (SVG/EPS)", "App Icon Sizes", "Monogram Variants"]
      },
      {
        id: "poster-design",
        title: "Poster Design",
        category: "creative",
        iconName: "Image",
        description: "High-impact editorial print & digital posters for tech product launches, keynotes, and exhibition displays.",
        deliverables: ["Print-Ready PDF", "Ultra-HD Digital Assets", "Mockup Previews"]
      },
      {
        id: "social-media-design",
        title: "Social Media Design",
        category: "creative",
        iconName: "Share2",
        description: "Cohesive aesthetic social media kits, LinkedIn headers, X/Twitter banners, and promotional story graphics.",
        deliverables: ["Social Media Template Kit", "Banner Assets", "Story Layouts"]
      },
      {
        id: "marketing-materials",
        title: "Marketing Materials",
        category: "creative",
        iconName: "FileText",
        description: "Executive pitch deck presentations, digital product brochures, media kits, and investor one-pagers.",
        deliverables: ["Interactive Pitch Deck", "PDF Product Specs", "Vector Graphics"]
      },
      {
        id: "product-mockups",
        title: "Product Mockups",
        category: "creative",
        iconName: "Box",
        description: "Photorealistic 3D glassmorphic software mockups, workstation renders, and product presentation scenes.",
        deliverables: ["8K Studio Renders", "Transparent PNG Overlays", "3D Scene Files"]
      },
      {
        id: "ui-graphics",
        title: "UI Graphics",
        category: "creative",
        iconName: "Component",
        description: "Bespoke vector icon sets, illustrated app banners, splash screens, and glowing UI decorative components.",
        deliverables: ["Custom SVG Icon Set", "Splash Screen Artwork", "UI Accent Elements"]
      },
      {
        id: "photo-editing",
        title: "Photo Editing",
        category: "creative",
        iconName: "Camera",
        description: "Editorial photography color grading, high-contrast black & white tuning, and professional portrait retouching.",
        deliverables: ["Color Graded RAW", "High-Res Export", "Web Optimized Formats"]
      },
      {
        id: "image-enhancement",
        title: "Image Enhancement",
        category: "creative",
        iconName: "Maximize2",
        description: "AI-assisted image upscaling, noise reduction, detail sharpening, and resolution enhancement for press releases.",
        deliverables: ["Super-Resolution Upscale", "Artifact Removal", "Press Quality Files"]
      },
      {
        id: "digital-art",
        title: "Digital Art",
        category: "creative",
        iconName: "Brush",
        description: "Abstract luxury digital artwork, dark architectural render wallpapers, and generative ambient visual assets.",
        deliverables: ["High-Res Wallpaper Pack", "Generative Code Assets", "Vector Wall Art"]
      }
    ]
  },
  {
    id: "other",
    title: "Other Services",
    subtitle: "Advisory, team workshops, research whitepapers & strategic project execution.",
    description: "Expandable advisory and specialized non-engineering services tailored for enterprise teams, founders, and research labs.",
    iconName: "Sparkles",
    services: [
      {
        id: "consultation",
        title: "Consultation",
        category: "other",
        iconName: "MessageSquare",
        description: "Strategic one-on-one technology planning sessions, architecture reviews, and product strategy alignment.",
        deliverables: ["1-on-1 Advisory Session", "Summary Action Plan", "Tech Recommendations"]
      },
      {
        id: "training",
        title: "Training & Workshops",
        category: "other",
        iconName: "BookOpen",
        description: "Hands-on corporate developer training in Tauri, Rust desktop app engineering, and WebGPU graphics development.",
        deliverables: ["Live Workshop Sessions", "Code Repositories & Guides", "Q&A & Code Reviews"]
      },
      {
        id: "documentation",
        title: "Documentation",
        category: "other",
        iconName: "FileCode",
        description: "Comprehensive technical writing, API reference specifications, system setup guides, and architectural whitepapers.",
        deliverables: ["OpenAPI Specs", "Developer Onboarding Wiki", "Architecture Whitepaper"]
      },
      {
        id: "research",
        title: "Research & Benchmarking",
        category: "other",
        iconName: "Search",
        description: "Rigorous technical feasibility research, algorithm benchmarking, hardware profiling, and competitor tech analysis.",
        deliverables: ["Comparative Benchmark Report", "Algorithm Analysis", "Feasibility Prototype"]
      },
      {
        id: "project-planning",
        title: "Project Planning",
        category: "other",
        iconName: "Calendar",
        description: "Agile sprint breakdown, milestone mapping, dependency risk assessment, and technical task estimation.",
        deliverables: ["Agile Roadmap & Gantt", "Technical Task Estimation", "Risk Mitigation Strategy"]
      }
    ]
  }
];

export const CONTACT_DATA = {
  title: "Contact Me.",
  subtitle: "Available for desktop app engineering, technical consulting, system architecture, and tech services.",
  email: "inquieryjalalamanj@proton.me",
  instagram: "https://instagram.com/jalalamanj1",
  linkedin: "https://linkedin.com/in/jalalamanj",
  github: "https://github.com/jalalamanj",
  location: "Global / Remote",
  socials: [
    { name: "Email", href: "mailto:inquieryjalalamanj@proton.me", icon: "Mail" },
    { name: "Instagram", href: "https://instagram.com/jalalamanj1", icon: "Instagram" }
  ]
};


