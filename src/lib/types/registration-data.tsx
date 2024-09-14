import { MealData } from "./meal-data";
import { ProfileData } from "./profile-data";
import { TransactionData } from "./transaction-data";
import { WorkshopData } from "./workshop-data";

export type RegistrationData = {
  profile: ProfileData;
  meal?: MealData["preference"];
  workshop?: WorkshopData["workshopId"];
  transactions: TransactionData[];
};
