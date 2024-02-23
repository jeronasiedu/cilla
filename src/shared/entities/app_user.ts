import { Timestamp } from "@firebase/firestore";

export type AppUser = {
  id: string;
  createdAt: Timestamp;
  email: string;
  authType: "email" | "google";
};
