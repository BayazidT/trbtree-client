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
    maritalStatus?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    bloodGroup?: string;
    fatherName: string;
    motherName: string;
    religion: string;
    presentAddress: string;
    permanentAddress: string;
    height?: string;
    weight?: string;
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
    bride: string;
    educationPreference?: string;
    professionPreference?: string;
    locationPreference?: string;
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
  '/bio_pics/brandenburg.jpg',
  '/bio_pics/bts1.jpg',
  '/bio_pics/parkin.jpg',
  '/bio_pics/bts2.jpg',
]
,
  personalInfo: {
    fatherName: "Md A Satter",
    motherName: "Rokeya Begum",
    religion: "Islam",
    maritalStatus: "Unmarried/Never Married",
    dateOfBirth: "September 5, 1995",
    placeOfBirth: "Bertala, Sarail, Brahmanbaria",
    bloodGroup: "A(+)",
    height: "5 feet 5 inches",
    weight: "70 kg (154 lbs)",
    presentAddress: "Berlin, Germany",
    permanentAddress: "Brahmanbaria, Chittagong, Bangladesh",
    siblings: {
      brothers: 6,
      sisters: 3,
      notes: "All elder siblings are married and living separately.",
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
    currentFamilySetup: "Currently living in Germany as an international student. Previously worked as a Software Engineer in Bangladesh. Family follows strong joint family values with emphasis on religious observance and unity."// The youngest three brothers currently together as a joint family with mother.",
  },
  education: [
     {
      degree: "Engineering for Sustainability",
      institution: "Rhine-Waal University of Applied Sciences, Germany",
      year: "Ongoing",
    },
    {
      degree: "Computer Science & Engineering",
      institution: "North South University, Dhaka",
      year: "June 2017 - May 2021",
    },
    {
      degree: "Higher Secondary Certificate (HSC) - 2015",
      institution: "Milestone College, Dhaka",
      year: "July 2013 - May 2015",
    },
    // {
    //   degree: "Secondary School Certificate (SSC) - 2013",
    //   institution: "Kamaura Shaheed Smrity High School, Brahmanbaria",
    //   year: "January 2008 - March 2013",
    // },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Penta Global Limited, Dhaka",
      duration: "August 2023 - March 2025",
      description: [

      ],
    },
    {
      role: "Junior Software Engineer",
      company: "Praava Health, Dhaka",
      duration: "August 2022 - July 2023",
      description: [
      ],
    },
    {
      role: "Junior Officer - ICT",
      company: "GPH Ispat, Dhaka",
      duration: "January 2022 - July 2022",
      description: [
      ],
    },
  ],
  hobbies: ["Traveling", "Writing", "Research"],
  expectations: {
    bride:"Non-smoker and non-alcoholic, Values family unity and religious observance",
    educationPreference: "Bachelor's degree complete/running preferred but not mandatory",
    professionPreference: "Not mandatory.",
    willingToShiftAbroad: true,
    locationPreference: "Any district in Bangladesh",
    agePreference: "Compatible with groom's age",
  },
  additionalInfo: [
    "Non-smoker, Non-alcoholic",
    "Values family unity and religious observance.",
  ],
};
