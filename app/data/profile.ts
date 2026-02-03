// data/profile.ts
export interface ProfileData {
  username: string;
  name: string;
  designation: string;
  profilePic: string; // URL or /public/... path
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  introduction: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    link?: string;
    tech: string[];
  }>;
  skills: string[];
}

export const myProfile: ProfileData = {
  username: "bayazid",
  name: "Bayazid",
  designation: "Full-Stack Developer & Blogger",
  profilePic: "/hero-mobile.png", // Put your photo in public/ folder
  contact: {
    email: "bayazid@example.com",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
    twitter: "https://x.com/yourhandle",
    website: "https://yourdomain.com",
  },
  introduction: `Hi, I'm Bayazid from Berlin. Passionate about building modern web apps with Next.js, Tailwind, and Spring Boot. I write about tech, code, and life on this blog. Always learning, always shipping.`,
  education: [
    {
      degree: "M.Sc. in Computer Science",
      institution: "Technical University of Berlin",
      year: "2020 – 2022",
      details: "Focus on Web Technologies & AI",
    },
    {
      degree: "B.Sc. in Software Engineering",
      institution: "University of Dhaka",
      year: "2015 – 2019",
    },
  ],
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "Tech Startup XYZ",
      duration: "2023 – Present",
      description: "Leading UI/UX development with React/Next.js, optimizing performance and accessibility.",
    },
    {
      role: "Full-Stack Engineer",
      company: "Freelance / Various Projects",
      duration: "2020 – 2023",
      description: "Built scalable apps with Node.js, Spring Boot, PostgreSQL, and modern frontends.",
    },
  ],
  projects: [
    {
      title: "This Blog Platform",
      description: "Next.js App Router blog with MDX, Contentlayer, Tailwind, and static generation.",
      link: "https://github.com/yourusername/trbtree",
      tech: ["Next.js", "Tailwind CSS", "MDX", "TypeScript"],
    },
    {
      title: "Task Management SaaS (upcoming)",
      description: "Full-stack app with Spring Boot backend, Next.js frontend, auth & real-time features.",
      tech: ["Spring Boot", "Next.js", "PostgreSQL", "Tailwind"],
    },
  ],
  skills: [
    "JavaScript / TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "Spring Boot / Java",
    "PostgreSQL / MongoDB",
    "Git / GitHub",
    "Docker / CI/CD",
  ],
};