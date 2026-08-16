import { create } from "zustand";
import type { UserProfile } from "../types/auth.types";

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
    loadUser: async () => {
    try {
      set({ loading: true });

      const response = await fetch('/auth/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        set({
          user: null,
          initialized: true,
        });
        return;
      }

      const text = await response.text();

      if (!text) {
        set({
          user: null,
          initialized: true,
        });
        return;
      }

      const user = JSON.parse(text);

      set({
        user,
        initialized: true,
      });
    } catch (error) {
      console.error('loadUser error:', error);

      set({
        user: null,
        initialized: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } finally {
      set({
        user: null,
        loading: false,
      });
    }
  },
}));