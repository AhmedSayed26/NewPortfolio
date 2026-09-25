export const experienceMeta = {
  eyebrow: "Experience",
  title: "Building production software.",
  subtitle:
    "Real-world experience developing scalable web applications used by businesses and teams.",
};

export const experiences = [
  {
    id: "icss-perform-ai",
    role: "Frontend Developer",
    company: "ICSS — Perform AI",
    url: "https://performai.icsstech.io/",
    period: "Oct 2025 – Present",
    location: "Remote, Saudi Arabia",
    type: "Full Time",
    summary:
      "Developing production-grade frontend for an enterprise SaaS performance management platform with multi-tenant architecture and AI integrations.",
    contributions: [
      {
        title: "Production Apps",
        description:
          "Built and maintained production-ready SaaS modules used in real business environments.",
      },
      {
        title: "Scalable Frontend",
        description:
          "Created reusable UI kits, TanStack Query layers, and Zustand stores for multi-tenant delivery.",
      },
      {
        title: "Real-Time UX",
        description:
          "Integrated SSE streaming chat, WebSocket notifications, and drag-and-drop dashboard builders.",
      },
      {
        title: "AI Integration",
        description:
          "Shipped AI agent interfaces and conversational workflows connected to backend AI services.",
      },
    ],
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "React Flow",
      "SSE",
      "WebSockets",
    ],
    highlights: [
      "Production Ready Applications",
      "Multi-Tenant Architecture",
      "AI Integrated Interfaces",
      "Performance Optimized UI",
    ],
  },
  {
    id: "icss-marketing",
    role: "Frontend Developer",
    company: "ICSS — Marketing Website",
    url: "https://icsstech.io/",
    period: "Oct 2025 – Present",
    location: "Remote, Saudi Arabia",
    type: "Full Time",
    summary:
      "Built a SEO-first bilingual marketing website with Next.js — SSR, metadata, and structured content optimized for top search rankings.",
    contributions: [
      {
        title: "SEO & Next.js",
        description:
          "Built with Next.js for SSR, metadata, and semantic HTML — optimized to appear in top search results.",
      },
      {
        title: "Bilingual Delivery",
        description:
          "Developed EN/AR RTL/LTR experiences with i18next and polished marketing UX across all breakpoints.",
      },
      {
        title: "Interactive UI",
        description:
          "Integrated Radix UI, Chart.js, and interactive charts for modular content sections.",
      },
      {
        title: "Component Architecture",
        description:
          "Structured reusable layout and section components for easy content updates and scalability.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "i18next",
      "Chart.js",
      "Radix UI",
    ],
    highlights: [
      "SEO Optimized",
      "Bilingual RTL / LTR",
      "Interactive Data Charts",
      "Modular Architecture",
    ],
  },
];

const techIconMap = {
  React: "react",
  "Next.js": "nextjs",
  "Tailwind CSS": "tailwind",
  Zustand: "zustand",
  "TanStack Query": "tanstack",
  "React Flow": "reactflow",
  SSE: "websocket",
  WebSockets: "websocket",
  i18next: "i18next",
  "Chart.js": "chartjs",
  "Radix UI": "radix",
};

export function getTechIcon(tech) {
  const slug = techIconMap[tech];
  return slug ? `/icons/tech/${slug}.svg` : null;
}
