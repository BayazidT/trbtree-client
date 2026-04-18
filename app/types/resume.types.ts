export interface ResumeData {
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  hobbies: Hobby[];
  languages: Language[];
  publications: Publication[];
}

/* =========================
   EDUCATION
========================= */
export interface Education {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  description?: string;
  startDate?: string; // ISO date string
  endDate?: string;
  startYear: number;
  endYear: number;
  displayOrder?: number;
  current: boolean;
}

/* =========================
   EXPERIENCE
========================= */
export interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  durationText?: string;
  responsibilities: string[];
}

/* =========================
   SKILL
========================= */
export type SkillCategory = "tools" | "languages" | "frameworks" | "other";
export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Pro";

export interface Skill {
  id: string;
  category: SkillCategory;
  skillName: string;
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
}

/* =========================
   CERTIFICATION
========================= */
export interface Certification {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

/* =========================
   PROJECT
========================= */
export interface Project {
  id: string;
  title: string;
  projectUrl?: string;
  startDate: string;
  endDate?: string;
  isOngoing: boolean;
  description: string[];
  technologies: string[];
}

/* =========================
   HOBBY
========================= */
export interface Hobby {
  id: string;
  name: string;
}

/* =========================
   LANGUAGE
========================= */
export interface Language {
  id: string;
  languageName: string;
  proficiency: string;
}

/* =========================
   PUBLICATION
========================= */
export interface Publication {
  id: string;
  title: string;
  publicationDate: string;
  publisher: string;
  url?: string;
  description?: string;
}