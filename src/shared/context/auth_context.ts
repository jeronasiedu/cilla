import { createContext } from "react";
import { AppUser } from "@/shared/entities/app_user";

export type AuthContextProps = {
  user?: AppUser;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<void>;
  continueWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
