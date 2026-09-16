// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH
// Every field below is extracted directly from Rahul Pandey's resume.
// The ONLY authorized addition not present in the resume is "PostgreSQL"
// in the databases skill category, per explicit instruction.
// Update this file to update the whole site.
// ---------------------------------------------------------------------------

export const personal = {
  name: "Rahul Pandey",
  location: "Satna, Madhya Pradesh, India",
  email: "rashupandey2003@gmail.com",
  phone: "9993134948",
  linkedin: "https://www.linkedin.com/in/rahulpandey4807",
  github: "https://github.com/rahulpandey4807",
  linkedinLabel: "linkedin.com/in/rahulpandey4807",
  githubLabel: "github.com/rahulpandey4807",
  role: "Information Technology Graduate",
  summary:
    "Motivated and detail-oriented Information Technology undergraduate with a strong foundation in database management, operating systems, and networking. Looking to contribute to a dynamic organization where I can apply my technical skills in UNIX/Linux, SQL and communication to solve real-world problems and grow as a software professional.",
  resumeFile: "/resume/Rahul_Pandey_Resume.pdf",
};

export const skillCategories = [
  {
    id: "programming",
    label: "Programming Languages",
    skills: ["Java", "JavaScript (Basics)"],
  },
  {
    id: "databases",
    label: "Databases",
    // PostgreSQL is the one explicitly authorized addition not in the resume.
    skills: [
      "SQL (DDL, DML, DCL, TCL, Joins)",
      "MySQL",
      "PostgreSQL",
      "Database Backup & Restore",
      "Indexing",
    ],
  },
  {
    id: "networking",
    label: "Networking",
    skills: [
      "OSI Model",
      "TCP/UDP",
      "HTTP/HTTPS",
      "SMTP",
      "DNS",
      "VPN",
      "Network Topology",
    ],
  },
  {
    id: "ai-tools",
    label: "AI & Tools",
    skills: [
      "Generative AI Basics",
      "Prompt Engineering",
      "ChatGPT",
      "AI-assisted Development",
    ],
  },
  {
    id: "tools",
    label: "Tools & Utilities",
    skills: ["XML", "OOPS", "SDLC", "Git"],
  },
  {
    id: "soft-skills",
    label: "Soft Skills",
    skills: [
      "Leadership and Team Collaboration",
      "Effective Communication",
      "Adaptability and Quick Learning",
      "Problem-Solving Mindset",
      "Time Management",
    ],
  },
];

export type ExperienceItem = {
  id: string;
  organization: string;
  position: string;
  duration: string;
  location?: string;
  type: "internship" | "training" | "employment";
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "grachiever",
    organization: "Grachiever",
    position: "Project Management Executive Intern",
    duration: "May 2024 – July 2024",
    type: "internship",
    points: [
      "Led a team in developing two projects — Web Connect and Property Pulse — focusing on project management, user experience optimization, and feature coordination.",
      "Utilized ClickUp for streamlined task tracking and team collaboration.",
    ],
  },
  {
    id: "indeyes",
    organization: "Indeyes InfoTech Private Limited",
    position: "Frontend Development Intern",
    duration: "Sept 2023 – Oct 2023",
    type: "internship",
    points: [
      "Used HTML and CSS to create responsive web pages.",
      "Collaborated with design teams, improved website speed, and ensured cross-browser compatibility.",
    ],
  },
  {
    id: "tcs-ilp",
    organization: "TCS (Tata Consultancy Services)",
    position: "TCS ILP (Initial Learning Program) — Java Development Training",
    duration: "2026",
    type: "training",
    points: [
      "Completed TCS's Initial Learning Program with core training in Java programming and object-oriented concepts.",
      "Covered enterprise application development and software development lifecycle (SDLC) practices.",
    ],
  },
];

export type EducationItem = {
  id: string;
  institution: string;
  credential: string;
  duration: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    id: "oist",
    institution: "Oriental Institute of Science and Technology",
    credential: "B.Tech in Information Technology",
    duration: "Sept 2021 – May 2025",
    detail: "GPA: 8.58 / 10",
  },
  {
    id: "school-12",
    institution: "Saraswati Hr. Sec. School, Krishna Nagar, Satna",
    credential: "Higher Secondary (Class 12)",
    duration: "March 2020",
    detail: "Percentage: 90.2%",
  },
  {
    id: "school-10",
    institution: "Saraswati Hr. Sec. School, Krishna Nagar, Satna",
    credential: "Secondary (Class 10)",
    duration: "March 2018",
    detail: "Percentage: 95.8%",
  },
];

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  points: string[];
  tools: string[];
  featured?: boolean;
};

export const projects: ProjectItem[] = [
  {
    id: "blockchain-voting",
    name: "Blockchain Based Voting System",
    description:
      "An online voting system built on blockchain technology for secure and transparent vote management.",
    points: [
      "Developed an online voting system using blockchain technology for secure and transparent vote management.",
    ],
    tools: ["Node.js", "Truffle", "JavaScript", "Solidity", "HTML", "SQL"],
    featured: true,
  },
  {
    id: "college-website",
    name: "College Website — Oriental Group of Institute",
    description:
      "A website for Oriental Group of Institute with interactive features and dynamic content.",
    points: [
      "Designed and developed a website with a user-friendly interface.",
      "Implemented interactive features and dynamic content.",
    ],
    tools: ["HTML", "CSS", "JavaScript"],
  },
];

// Combined, chronologically-aware timeline for the "Professional Journey" section.
// Sort key is an approximate start date used only for ordering.
export const journey = [
  {
    id: "school-10",
    date: "March 2018",
    title: "Completed Class 10",
    org: "Saraswati Hr. Sec. School, Krishna Nagar, Satna",
    description: "Secondary education completed with 95.8%.",
    kind: "education" as const,
  },
  {
    id: "school-12",
    date: "March 2020",
    title: "Completed Class 12",
    org: "Saraswati Hr. Sec. School, Krishna Nagar, Satna",
    description: "Higher secondary education completed with 90.2%.",
    kind: "education" as const,
  },
  {
    id: "oist",
    date: "Sept 2021 – May 2025",
    title: "B.Tech in Information Technology",
    org: "Oriental Institute of Science and Technology",
    description: "Graduated with a GPA of 8.58 / 10.",
    kind: "education" as const,
  },
  {
    id: "indeyes",
    date: "Sept 2023 – Oct 2023",
    title: "Frontend Development Intern",
    org: "Indeyes InfoTech Private Limited",
    description:
      "Built responsive web pages with HTML and CSS; improved site speed and cross-browser compatibility.",
    kind: "work" as const,
  },
  {
    id: "grachiever",
    date: "May 2024 – July 2024",
    title: "Project Management Executive Intern",
    org: "Grachiever",
    description:
      "Led a team building Web Connect and Property Pulse, coordinating features and UX with ClickUp.",
    kind: "work" as const,
  },
  {
    id: "tcs-ilp",
    date: "2026",
    title: "TCS ILP — Java Development Training",
    org: "TCS (Tata Consultancy Services)",
    description:
      "Core training in Java, OOP concepts, enterprise application development, and SDLC practices.",
    kind: "training" as const,
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Connect" },
];

export const siteConfig = {
  name: "Rahul Pandey",
  title: "Rahul Pandey — Information Technology Graduate",
  description:
    "Portfolio of Rahul Pandey, an Information Technology graduate with a foundation in databases, networking, and software development. Explore projects, experience, and ways to connect.",
  // Replace with the real production domain before deploying.
  url: "https://rahulpandey.dev",
  keywords: [
    "Rahul Pandey",
    "Rahul Pandey portfolio",
    "Rahul Pandey developer",
    "Rahul Pandey resume",
    "Rahul Pandey IT",
    "Rahul Pandey projects",
    "Information Technology graduate",
    "Oriental Institute of Science and Technology",
  ],
};
