// data/profile.ts

export interface BioData {
  username: string;
  name: string;
  age: number;
  profilePic?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
  latestDesignation?: string;
  latestDegree?: string;
  personalInfo: {
    fatherName: string;
    motherName: string;
    religion: string;
    address: string;
    siblings: {
      brothers: number;
      sisters: number;
      notes?: string;
    };
    siblingsDetails?: Array<{
      name?: string;
      age?: number;
      occupation?: string;
      maritalStatus?: string;
      remarks?: string;
    }>;
    birthOrder: string;
    currentFamilySetup: string;
    familyDetails?: {
      fatherOccupation?: string;
      motherOccupation?: string;
    };
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  gallery?: string[];
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description?: string[];
  }>;
  hobbies?: string[];
  expectations: {
    bride: string[];
    preferredLocation: string;
    agePreference?: string;
    willingToShiftAbroad: boolean;
  };
  additionalInfo?: string[];
}

export const myBio: BioData = {
  username: "bayazid",
  name: "Bayazid Talukder",
  age: 30,
  profilePic: "/profile-pic.jpg",
  contact: {
    phone: "+49 15755862692",
    email: "bayazidtr@gmail.com",
  },
  latestDesignation: "Former Software Engineer",
  latestDegree: "BSc-Computer Science & Engineering",
  gallery: [
  '/profile-pic.jpg',
  '/profile-pic.jpg',
  '/profile-pic.jpg',
]
,
  personalInfo: {
    fatherName: "Md A Satter",
    motherName: "Rokeya Begum",
    religion: "Islam",
    address: "Bertala, Sarail, Brahmanbaria",
    siblings: {
      brothers: 6,
      sisters: 3,
      notes: "Groom is 8th among siblings; all elders are married and living separately. The youngest three brothers currently live with parents.",
    },
    siblingsDetails: [
      {
        name: "Elder Brother",
        age: 32,
        occupation: "Businessman",
        maritalStatus: "Married",
        remarks: "Lives in Sharjah, UAE.",
      },
      {
        name: "Younger Brother",
        age: 26,
        occupation: "Newly Graduated",
        maritalStatus: "Unmarried",
        remarks: "Resides in Sharjah, UAE.",
      }],
    birthOrder: "8th child",
    currentFamilySetup: "Currently living in Germany; youngest three brothers were with parents until recently but have moved out for work and education. Parents are now living alone in Bangladesh.",
  },
  education: [
    {
      degree: "BSc-Computer Science & Engineering",
      institution: "North South University, Dhaka",
      year: "June 2017 - May 2021",
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
      ],
    },
  ],
  expectations: {
    bride: [
      "Loyal",
      "Modest",
      "Well-educated",
      "Proper religious belief and prayers",
    ],
    
    preferredLocation: "Any district in Bangladesh",
    agePreference: "Up to 26",
    willingToShiftAbroad: true,
  },
  additionalInfo: [
    "Groom currently resides in Germany.",
    "Values family unity and religious observance.",
    "Enjoys traveling, writing, and research."
  ],
};
