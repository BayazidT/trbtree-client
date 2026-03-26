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