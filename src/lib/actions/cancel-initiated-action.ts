"use server";

import { cancelInitiatedTransaction } from "@/firebase/db";
import { revalidatePath } from "next/cache";

export async function cancelInitiatedAction(transactionId: string) {
  "use server";
  await cancelInitiatedTransaction(transactionId);
  revalidatePath("/finance/verify-failed");
}
