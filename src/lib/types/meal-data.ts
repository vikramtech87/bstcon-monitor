import { Timestamp } from "firebase-admin/firestore";

export type MealData = {
  userId: string;
  createdAt: Timestamp;
  preference: "veg" | "non-veg";
  updatedAt: Timestamp;
};
