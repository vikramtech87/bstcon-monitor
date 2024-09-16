import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TransactionData } from "./types/transaction-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function summarize(transactions: TransactionData[]): {
  success: number;
  failure: number;
} {
  let success = 0;
  let failure = 0;
  for (const transaction of transactions) {
    if (transaction.transactionStatus === "SUCCESS") {
      success += 1;
    } else {
      failure += 1;
    }
  }

  return {
    success,
    failure,
  };
}

export const toAmount = (value: number) =>
  value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
