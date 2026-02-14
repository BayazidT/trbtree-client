// data/profile.ts

export interface ProfileData {
  username: string;
  name: string;
  designation: string;
  profilePic: string;
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    phone?: string;
  };
  introduction: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description: string[]; // Changed to array for bullet points
  }>;
  projects: Array<{
    title: string;
    description: string[]; // Changed to array for bullet points
    tech: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    concepts: string[];
  }; // Grouped as in PDF
  languages: string[];
  certifications: Array<{
    title: string;
    date: string;
    description: string;
  }>;
  publications: Array<{
    title: string;
    date: string;
    description: string;
    link: string;
  }>;
  hobbies: string[];
}

export const myProfile: ProfileData = {
  username: "bayazid",
  name: "Bayazid Talukder",
  designation: "Software Engineer",
  profilePic: "/profile-pic.jpg", // Adjust as needed
  contact: {
    phone: "+49 15755862692",
    email: "bayazidtr@gmail.com",
    linkedin: "https://www.linkedin.com/in/bayazid-talukder/",
    github: "https://github.com/BayazidT",
  },
  introduction: "To contribute as a dedicated software engineer specializing in backend development, leveraging expertise in Java, Spring Boot, and best coding practices to deliver scalable, maintainable, and high-quality software solutions. Committed to utilizing strong analytical, problem-solving, leadership, and communication skills to drive success in collaborative development environments.",
  education: [
    {
      degree: "Engineering for Sustainability",
      institution: "Rhine-Waal University of Applied Sciences, Germany",
      year: "Ongoing",
    },
    {
      degree: "BSc-Computer Science & Engineering",
      institution: "North South University",
      year: "June 2017 - May 2021",
    },
    {
      degree: "HSC - Science",
      institution: "Milestone College, Dhaka",
      year: "June 2013 - May 2015",
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Penta Global Limited, Dhaka",
      duration: "August 2023 - March 2025",
      description: [
        "Developed backend services using Java Spring Boot with multi-module architecture.",
        "Implemented IAM servers for role-based access control and secure authentication.",
        "Conducted requirement analysis and system design for scalable applications.",
        "Applied design patterns to write efficient and maintainable code.",
        "Created scalable backend solutions using modern technologies.",
      ],
    },
    {
      role: "Junior Software Engineer",
      company: "Praava Health, Dhaka",
      duration: "August 2022 - July 2023",
      description: [
        "Led web application development initiatives.",
        "Developed REST APIs for third-party applications.",
        "Integrated payment gateways with existing systems.",
        "Implemented new features in existing applications.",
      ],
    },
    {
      role: "Junior Officer ICT",
      company: "GPH Ispat, Chittagong",
      duration: "June 2022 - August 2022",
      description: [
        "Handled software maintenance and feature development.",
        "Performed data analysis and visualization.",
        "Implemented and monitored network infrastructure alongside hardware maintenance.",
      ],
    },
  ],
  projects: [
    {
      title: "Request Management Service (RMS)",
      description: [
        "Developed a USA-based SaaS project for law enforcement agencies (LEA) in multiple countries, including various US states.",
        "Focused on API development for new features using Spring Boot.",
      ],
      tech: ["Java Spring Boot", "AngularJS", "JSP"],
    },
    {
      title: "ISP Router Operation & Billing Software",
      description: [
        "Created an ISP automation SaaS project enabling users to manage router pools, PPP profiles, PPP secrets, and billing systems.",
        "Handled router operations using CMD and API with Python FastAPI.",
        "Developed APIs for other services using Spring Boot.",
      ],
      tech: ["Java Spring Boot", "Python FastAPI", "TypeScript ReactJS"],
    },
    {
      title: "Automation Software for Anti-Corruption Commission (ACC)",
      description: [
        "Contributed to the development and implementation of automation software for the Anti-Corruption Commission (ACC).",
        "Deployed micro-services in Kubernetes cluster using Docker images, along with CI/CD in development.",
        "Developed RESTful APIs using Java Spring Boot.",
        "Implemented Workflow Engine Camunda (BPMN) for the approval flow.",
      ],
      tech: ["Java", "Spring Boot", "TypeScript", "React"],
    },
  ],
  skills: {
    languages: ["Java", "Python", "SQL"],
    frameworks: ["Spring Boot", "FastAPI"],
    tools: ["Git", "Docker", "Keycloak", "Jira"],
    concepts: ["RESTful APIs", "OAuth2", "CI/CD", "Microservices"],
  },
  languages: ["English (Fluent)", "Deutsch (A2 (CEFR))", "Bangla (Native)"],
  certifications: [
    {
      title: "Getting Started with DevOps on AWS",
      date: "01 May 2024",
      description: "Basics of DevOps with practical examples of software deployment automation using different AWS tools. Also theory related to the importance of automating the deployment and CI/CD implementation.",
    },
  ],
  publications: [
    {
      title: "Study on Convolutional Neural Network to Detect COVID-19 from Chest X-Rays",
      date: "11 September 2021",
      description: "This paper is based on deep learning which can be used to detect coronavirus infection from chest x ray.",
      link: "https://doi.org/10.1155/2021/3366057",
    },
  ],
  hobbies: ["Writing Travel Stories", "Research", "Traveling"],
};