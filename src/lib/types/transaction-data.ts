import { Timestamp } from "firebase-admin/firestore";

export type TransactionData = {
  amount: number;
  authId?: string;
  bankId?: string;
  createdAt: Timestamp;
  mode: "HDFC" | "PAYU";
  registrationNumber: string;
  result?: string;
  transactionId: string;
  transactionStatus: "SUCCESS" | "FAILURE" | "INITIATED";
  updatedAt: Timestamp;
  userId: string;
};
