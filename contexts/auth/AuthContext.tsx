import { LoginResponse } from "@/types/auth";
import { createContext } from "react";

export type AuthContextType = {
  signIn: (phone: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (phone: string, password: string) => Promise<void>;
  resetPassword: (phone: string) => Promise<void>;
  changePassword: (phone: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  user: LoginResponse["user"] | null;
  loading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
