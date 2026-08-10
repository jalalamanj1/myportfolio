import { Product, SkillCategory, ExperienceItem, EducationItem, CertificationItem, LanguageItem, ServiceCategory } from '../types';

import bgImage from '../assets/images/background.webp';
import profileImage from '../assets/images/profile-portrait.webp';

import appOmniPulseImg from '../assets/images/app_omnipulse_desktop_1785494849235.webp';
import appNovaStudioImg from '../assets/images/app_novastudio_ide_1785494863797.webp';
import appQuantumTraceImg from '../assets/images/app_quantumtrace_security_1785494875469.webp';
import appHyperFlowImg from '../assets/images/app_hyperflow_cad_1785494890939.webp';

export const HERO_DATA = {
  name: "JALAL AMANJ",
  title: "",
  description: "",
  tagline: "TECH DESKTOP APPS & SERVICES • PORTFOLIO 2026",
  bgImage: bgImage,
};

export const ABOUT_DATA = {
  profileImage: profileImage,
  title: "About Me",
  subtitle: "",
  bio: [],
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

export const SERVICE_CATEGORIES: ServiceCategory[] = [];


export const CONTACT_DATA = {
  title: "Contact Me.",
  subtitle: "Available for desktop app engineering, technical consulting, system architecture, and tech services.",
  email: "jalaldev001@yahoo.com",
  instagram: "https://instagram.com/jalalamanj1",
  linkedin: "https://linkedin.com/in/jalalamanj",
  github: "https://github.com/jalalamanj",
  location: "Global / Remote",
  socials: [
    { name: "Email", href: "mailto:jalaldev001@yahoo.com", icon: "Mail" },
    { name: "Instagram", href: "https://instagram.com/jalalamanj1", icon: "Instagram" }
  ]
};


