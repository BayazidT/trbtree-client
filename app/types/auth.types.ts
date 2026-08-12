export interface User {
    id: string;
    username: string;
    name?: string;
    roles: 'ADMIN' | 'USER' | 'MODERATOR';
    permissions: string[];
  }

export interface UserList {
  content: User[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isAuthenticated: boolean;
  
    login: (tokens: Tokens) => Promise<void>;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
  }

  export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}