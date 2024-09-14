import { Timestamp } from "firebase-admin/firestore";

export type WorkshopData = {
  userId: string;
  confirmed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  workshopId: "ws-pcr" | "ws-fish" | "ws-none";
};
