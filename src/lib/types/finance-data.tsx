import { ProfileData } from "./profile-data";
import { TransactionData } from "./transaction-data";

export type FinanceData = {
  profile: ProfileData;
  transactions: TransactionData[];
};
