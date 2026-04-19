export interface BioData {
  userId: string;

  // Basic Info
  gender: Gender;
  dateOfBirth?: string; // ISO date string
  height?: number;
  weight?: number;
  bloodGroup?: BloodGroup;
  maritalStatus: MaritalStatus;

  // Location
  presentAddress?: string;
  permanentAddress?: string;
  city?: string;
  state?: string;
  country?: string;

  // Personal Details
  religion?: string;
  highestEducation?: string;
  fieldOfStudy?: string;
  occupation?: string;
  companyName?: string;
  annualIncome?: number;
  currency?: string;

  // Family Info
  fatherOccupation?: string;
  fatherName?: string;
  motherName?: string;
  motherOccupation?: string;
  siblingsCount?: number;
  familyType?: string;
  familyDetails?: string;
  familyStatus?: string;

  // Lifestyle
  diet?: string;
  smoking?: boolean;
  drinking?: boolean;

  // Profile Content
  aboutMe?: string;
  partnerExpectation?: string;
  preferred_age?: string;
  preferred_education?: string;
  preferred_profession?: string;
  preferred_location?: string;
  shift_abroad?: boolean;

  // Media
  profilePictureUrl?: string;
  galleryUrls?: string[];

  // Privacy
  isPublic: boolean;
  showContact: boolean;
}

/* =========================
   ENUMS / UNION TYPES
========================= */

export type Gender = "male" | "female" | "other";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-"; // included because your data uses "A"

export type MaritalStatus =
  | "S"   // Single
  | "M"   // Married
  | "D"   // Divorced
  | "W";  // Widowed