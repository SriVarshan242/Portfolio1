export const PROFILE = {
  name: "Sri Varshan B",
  firstName: "SRI VARSHAN",
  role: "Full Stack Developer",
  email: "varshansri0123@gmail.com",
  phone: "+91 8778017360",
  phoneHref: "tel:+918778017360",
  location: "Coimbatore, India",
  resumeSummary: "Computer Science Engineering student with a strong foundation in C++, Java, Data Structures and Algorithms, and full-stack development. Experienced in developing web applications and AI-powered solutions using React, Node.js, Express.js, MongoDB, and Machine Learning. Passionate about problem-solving, learning emerging technologies, and building scalable applications that address real-world challenges.",
  github: "https://github.com/SriVarshan242",
  linkedin: "http://www.linkedin.com/in/sri-varshan-606595284",
  resumePath: "/resume.pdf"
};

export const NAV = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "work" },
  { label: "Certifications", id: "certifications" },
  { label: "Experience", id: "experience" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" }
];

export const SKILL_GROUPS = [
  {
    family: "Languages",
    skills: [
      { name: "HTML", symbol: "Ht", number: 1, family: "Languages" },
      { name: "CSS", symbol: "Cs", number: 2, family: "Languages" },
      { name: "JavaScript", symbol: "Js", number: 3, family: "Languages" },
      { name: "C++", symbol: "Cp", number: 4, family: "Languages" },
      { name: "Java", symbol: "Jv", number: 5, family: "Languages" }
    ]
  },
  {
    family: "Frontend",
    skills: [
      { name: "React", symbol: "Re", number: 6, family: "Frontend" }
    ]
  },
  {
    family: "Backend",
    skills: [
      { name: "Spring Boot", symbol: "Sb", number: 7, family: "Backend" },
      { name: "Node.js", symbol: "No", number: 8, family: "Backend" } // Inferred from projects
    ]
  },
  {
    family: "Databases",
    skills: [
      { name: "MySQL", symbol: "My", number: 9, family: "Databases" },
      { name: "MongoDB", symbol: "Mo", number: 10, family: "Databases" }
    ]
  },
  {
    family: "Tools",
    skills: [
      { name: "Git", symbol: "Gi", number: 11, family: "Tools" },
      { name: "GitHub", symbol: "Gh", number: 12, family: "Tools" },
      { name: "AWS Cloud", symbol: "Aw", number: 13, family: "Tools" },
      { name: "VS Code", symbol: "Vs", number: 14, family: "Tools" },
      { name: "Figma", symbol: "Fi", number: 15, family: "Tools" },
      { name: "Jupyter Notebook", symbol: "Ju", number: 16, family: "Tools" }
    ]
  },
  {
    family: "Concepts",
    skills: [
      { name: "REST API", symbol: "Ra", number: 17, family: "Concepts" },
      { name: "Machine Learning", symbol: "Ml", number: 18, family: "Concepts" } // Inferred from projects
    ]
  }
];

export const EXPERIENCE = [
  {
    year: "June 2025 – July 2025",
    title: "UI/UX Designer Intern",
    place: "Qwat Innovations Private Limited",
    detail: "Contributed to the design of Quatrill, a CRM platform, focusing on desktop website design using Figma and applying user-centered design principles."
  }
];

export const EDUCATION = [
  {
    year: "2027",
    title: "Bachelor of Engineering in Computer Science",
    place: "Sri Krishna College of Engineering and Technology, Coimbatore, India",
    detail: "CGPA: 8.31"
  },
  {
    year: "2023",
    title: "Class XII",
    place: "Bharathi Vidya Bhavan Matric Hr. Sec. School, Erode, India",
    detail: "Percentage: 95.5%"
  }
];

export const PROJECTS = [
  {
    id: "proj-1",
    index: "01",
    title: "AI-Powered Skill Gap Analysis",
    kicker: "Career Recommendation System",
    description: "Developed a full-stack system to analyze user skills and recommend suitable career paths. Implemented skill gap identification and suggested relevant learning resources.",
    features: [
      "Skill gap identification",
      "Learning resources suggestion",
      "Machine learning recommendation logic"
    ],
    tech: ["React", "Node.js", "MongoDB", "Machine Learning"],
    github: "https://github.com/SriVarshan242/Skill-Gap-Analysis.git"
  },
  {
    id: "proj-2",
    index: "02",
    title: "Comprehensive Healthcare Management",
    kicker: "System",
    description: "Built a system to manage patients, doctors, appointments, and prescriptions. Implemented CRUD operations and REST APIs for backend services.",
    features: [
      "Manage patients and doctors",
      "Appointments and prescriptions",
      "REST APIs for backend services"
    ],
    tech: ["Spring Boot", "MySQL Workbench"],
    github: "https://github.com/SriVarshan242/Healthcare-Management.git"
  },
  {
    id: "proj-3",
    index: "03",
    title: "Food Management Platform",
    kicker: "Platform",
    description: "Developed a platform to manage food donations and reduce wastage. Implemented real-time tracking and data handling features.",
    features: [
      "Food donation management",
      "Real-time tracking",
      "Data handling features"
    ],
    tech: ["React", "Spring Boot", "MySQL"],
    github: "https://github.com/Yuvi-97/food-management.git"
  },
  {
    id: "proj-4",
    index: "04",
    title: "Dance Instructor Management System",
    kicker: "System",
    description: "Developing a system to manage classes, enrollments, and schedules. Implemented features for tracking student progress and payments.",
    features: [
      "Manage classes and enrollments",
      "Student progress tracking",
      "Payment tracking"
    ],
    tech: ["React", "Spring Boot", "MySQL"],
    github: "" // Missing
  }
];

export const ACHIEVEMENTS = [
  {
    title: "LeetCode Problem-Solving",
    detail: "102-day streak, 7 badges",
    logo: "LeetCode",
    number: "337"
  },
  {
    title: "Finalist",
    detail: "GDGC Hackathon 2025",
    logo: "GDGC",
    number: "1"
  }
];

export const CERTIFICATIONS = [
  { title: "Artificial Intelligence Primer", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_0134898743771545602_shared" },
  { title: "AI-Accelerated Machine Learning Techniques", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_014493256429469696119669" },
  { title: "Introduction to Deep Learning", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_012782105116811264219_shared" },
  { title: "Introduction to Natural Language Processing", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_012776556362055680278_shared" },
  { title: "Computer Vision 101", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_012952007096016896334_shared" },
  { title: "Introduction to Data Science", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_12666306402263577000_shared" },
  { title: "AWS Certified Developer – Associate", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_0132945814110699529124_shared" },
  { title: "Spring 5 Basics with Spring Boot", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_01296689056211763272_shared" },
  { title: "Hibernate Framework – Basics", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_3351877365166293000_shared" },
  { title: "Graph Data Structures: Understanding Graphs", issuer: "Infosys Springboard", link: "https://infyspringboard.onwingspan.com/app/toc/lex_auth_01350159577912934413159" },
];
