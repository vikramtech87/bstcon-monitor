import { Timestamp } from "firebase-admin/firestore";

export type TransactionData = {
  amount: number;
  authId?: string;
  bankId?: string;
  createdAt: Timestamp;
  mode: string;
  registrationNumber: string;
  result?: string;
  transactionId: string;
  transactionStatus: "SUCCESS" | "FAILURE";
  updatedAt: Timestamp;
  userId: string;
};
