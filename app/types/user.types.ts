// src/types/employee.types.ts
export type UserRole = 'ADMIN' | 'USER' | 'MODERATOR';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string; 
}

export interface UserPage {
  content: User[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  numberOfElements: number; 
}

export interface UserRequest {
  username: string;
  name: string;
  email: string;
  roleId: string;
}


export interface UserProfile {
  displayEmail?: string;
  displayPhone?: string;
  headline?: string;
  currentDesignation?: string;
  designation?: string;
  profilePictureUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  introduction?: string;
}

//   "email": "test@gmail.com",
//   "phone": "0329829483484",
//   "headline": "This is testing in dev",
//   "currentDesignation": "Nothing Important",
//   "profilePictureUrl": "no pro",
//   "introduction": "What to say about?",
//   "openToWork": true,
//   "linkedinUrl": "string",
//   "githubUrl": "string",