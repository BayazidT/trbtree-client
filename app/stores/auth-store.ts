import { create } from "zustand";
import type { UserProfile } from "../types/auth.types";

interface AuthState {
  user: UserProfile | null;
  loading: boolean;

  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  loadUser: async () => {
    try {
      const response = await fetch("auth/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        set({
          user: null,
          loading: false,
        });

        return;
      }

      const user: UserProfile = await response.json();

      set({
        user,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to load user:", error);

      set({
        user: null,
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      set({
        user: null,
        loading: false,
      });
    }
  },
}));