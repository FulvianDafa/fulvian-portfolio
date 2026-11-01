import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "01",
    roleDescription:
      "My work centered on requirements, system analysis, project coordination, and quality assurance. Frontend and backend development were coordinated with the team, with occasional technical contributions from me.",
    slug: "lims",
    approach:
      "Start with stakeholder requirements, translate them into a system scope, coordinate implementation, and validate behavior through manual and automated testing.",
    status:
      "Stakeholder review and feedback-driven revisions are documented. A final release status and production impact have not been documented.",
    title: "Laboratory Information Management System (LIMS)",
    category: "Delivery & quality",
    disciplines: ["Delivery", "Quality"],
    context: "Laboratory system",
    role: "Project Manager & QA",
    summary:
      "A system for laboratory document tracking and management, shaped through stakeholder requirements, team coordination, and testing.",
    tags: [
      "Requirement analysis",
      "System analysis",
      "Manual testing",
      "Playwright",
    ],
    problem: "The laboratory needed a system to track and manage documents.",
    contribution: [
      "Discussed and gathered requirements with stakeholders, then performed system analysis.",
      "Coordinated frontend and backend development, project progress, and direct stakeholder communication; occasionally contributed to technical work.",
      "Performed manual testing and built test automation using Playwright.",
      "Presented project progress in Jakarta to 11 stakeholders, including division leadership, and coordinated revisions based on their feedback.",
    ],
    outcome:
      "Project progress was presented to stakeholders, and revisions were coordinated from their feedback.",
  },
  {
    id: "02",
    roleDescription:
      "I managed the project and built the client-facing Vue.js frontend in a two-person team. Laravel was used for the backend/admin; that project technology is separate from my frontend contribution.",
    slug: "sapi-berkah-amanah",
    approach:
      "Clarify the catalog and ordering needs with the client, coordinate a two-person team, and build the client-facing Vue.js experience around a WhatsApp ordering handoff.",
    status:
      "The catalog and WhatsApp ordering flow are implemented. The savings/payment-plan feature remains a roadmap item.",
    title: "Sapi Berkah Amanah",
    category: "Client project",
    disciplines: ["Delivery", "Development"],
    context: "Client project",
    role: "Project Manager & Frontend Developer",
    team: "2 people",
    website: "https://sapiberkahamanah.com",
    roadmap:
      "A savings/payment-plan style feature for future sacrificial animal purchases is planned.",
    summary:
      "A client-facing cattle and sacrificial animal catalog, with orders continued through WhatsApp.",
    tags: ["Vue.js", "Laravel backend/admin", "Project coordination"],
    problem:
      "The client needed a website where customers could browse animals and continue an order conversation.",
    contribution: [
      "Discussed the client's business needs and requirements.",
      "Planned features and coordinated development as Project Manager in a two-person team.",
      "Developed the client-facing frontend using Vue.js; the backend/admin uses Laravel.",
    ],
    outcome:
      "Customers can browse the animal catalog and continue the ordering process through WhatsApp.",
  },
  {
    id: "03",
    roleDescription:
      "I independently handled requirement understanding, UI/design, frontend and backend implementation, and deployment.",
    slug: "digital-archive",
    approach:
      "Carry the internal document-management need through requirement understanding, UI design, Laravel implementation, and deployment.",
    status:
      "The system was implemented and deployed. Interest from another section is documented; adoption counts and performance metrics are not available.",
    title: "Digital Archive System",
    category: "Full-stack development",
    disciplines: ["Development", "Delivery"],
    context: "Internal system",
    role: "Full-Stack Developer",
    summary:
      "An independently developed Laravel system for internal document management and archival needs.",
    tags: ["Laravel", "UI/design", "Full-stack development", "Deployment"],
    problem: "An internal team needed a way to manage and archive documents.",
    contribution: [
      "Independently handled requirement understanding and UI/design.",
      "Built the frontend and backend using Laravel, then handled deployment.",
    ],
    outcome:
      "After implementation, personnel from another section expressed interest in a similar system for their area.",
  },
  {
    id: "04",
    roleDescription:
      "I implemented and evaluated the self-healing WebDriver wrapper and developed the primary Anugrah Jaya system under test. Two QA practitioners provided validation feedback.",
    slug: "self-healing-selenium",
    approach:
      "Wrap WebDriver lookups with compatible-candidate filtering and weighted similarity matching, then evaluate locator recovery through controlled DOM changes and CSV logs.",
    status:
      "Implemented and evaluated as academic research. Results are limited to the evaluated dataset and scenarios; recovery does not guarantee correct element selection.",
    title: "Self-Healing Selenium Research",
    role: "Research / Quality Engineering",
    category: "Research",
    disciplines: ["Research", "Quality"],
    context: "Implemented & evaluated",
    summary:
      "Recovering broken DOM locators with similarity matching, inside the Selenium workflow.",
    tags: ["Java 21", "Selenium", "Maven", "Similarity matching"],
    problem:
      "A changed element ID or DOM structure can break an automated test even when the application's behavior stays the same.",
    contribution: [
      "Built a WebDriver wrapper with candidate filtering and weighted text, locator, and position similarity.",
      "Implemented element profiles, DOM mutation scenarios, and CSV logging for recovery outcomes.",
      "Evaluated 104 healing attempts across 23 systems under test and collected feedback from two QA practitioners.",
    ],
    outcome:
      "96 of 104 attempts recovered (92.31% HSR). The 96 accepted recoveries included 11 false positives, giving an FPR of 11.46%.",
    note: "Academic research. Results describe the evaluated dataset, not guaranteed performance on every website.",
  },
];

export const filters = [
  "All",
  "Delivery",
  "Development",
  "Quality",
  "Research",
] as const;
