export const profile = {
  name: "Mochammad Fulvian Dafa Pranaja",
  university: "Universitas Pendidikan Indonesia",
  // Add the real file, then use /images/profile-portrait.png here.
  portrait: {
    src: null as string | null,
    alt: "Portrait of Fulvian",
    objectPosition: "center bottom",
    scale: 1,
  },
  cv: null as string | null,
  linkedIn: null as string | null,
  github: "https://github.com/FulvianDafa/fulvian-portfolio",
  emails: [
    { label: "Personal email", address: "fulviandafa23@gmail.com" },
    { label: "Academic email", address: "fulvian.dafa23@upi.edu" },
  ],
};

export const focusAreas = [
  {
    title: "Requirements & Systems Analysis",
    short: "Understand the problem.",
    description:
      "Turn stakeholder conversations into requirements and a clearer picture of how the system should work.",
  },
  {
    title: "Software Development",
    short: "Build with purpose.",
    description:
      "Translate requirements into usable interfaces and web systems, with contributions grounded in each project’s scope.",
  },
  {
    title: "Quality Engineering",
    short: "Question. Test. Refine.",
    description:
      "Check behavior through manual testing, automation, and research. Treat test results as evidence to investigate.",
  },
  {
    title: "Project Coordination",
    short: "Keep the work connected.",
    description:
      "Connect stakeholders and development teams, communicate progress, and coordinate revisions through delivery.",
  },
];

export const skillGroups = [
  {
    title: "Quality Engineering",
    skills: [
      "Manual testing",
      "Test automation",
      "Playwright",
      "Katalon Studio",
      "Selenium WebDriver",
      "UAT & QA documentation",
    ],
  },
  {
    title: "Analysis & Delivery",
    skills: [
      "Requirement analysis",
      "System analysis",
      "Project coordination",
      "Stakeholder communication",
      "Client communication",
    ],
  },
  {
    title: "Web Development",
    skills: [
      "Laravel",
      "Vue.js",
      "React.js",
      "Frontend development",
      "Full-stack development",
      "Deployment",
    ],
  },
  {
    title: "Research & Tools",
    skills: [
      "Java 21",
      "Apache Maven",
      "Similarity matching",
      "Experiment logging",
      "CSV analysis",
      "Design Research Methodology",
    ],
  },
];
