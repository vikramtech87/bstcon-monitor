import { ProfileData } from "@/lib/types/profile-data";
import { db } from "./server";
import { DocumentData } from "firebase-admin/firestore";
import { TransactionData } from "@/lib/types/transaction-data";
import { WorkshopData } from "@/lib/types/workshop-data";
import { MealData } from "@/lib/types/meal-data";
import { RegistrationData } from "@/lib/types/registration-data";
import { FinanceData } from "@/lib/types/finance-data";

async function getAllItems<T>(
  collectionName: string,
  dataParser: (data: DocumentData, id: string) => T
): Promise<T[]> {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  const items: T[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const item = dataParser(data, doc.id);
    items.push(item);
  });

  return items;
}

async function getProfiles() {
  const items = await getAllItems<ProfileData>("profile", (data, id) => {
    return {
      ...(data as Omit<ProfileData, "userId">),
      userId: id,
    };
  });
  return items;
}

async function getTransactions() {
  const items = await getAllItems<TransactionData>("transactions", (data) => {
    return data as TransactionData;
  });
  return items;
}

async function getWorkshops() {
  const items = await getAllItems<WorkshopData>("workshop", (data, id) => {
    return {
      ...(data as Omit<WorkshopData, "userId">),
      userId: id,
    };
  });
  return items;
}

async function getMeals() {
  const items = await getAllItems<MealData>("meal", (data, id) => {
    return {
      ...(data as Omit<MealData, "userId">),
      userId: id,
    };
  });
  return items;
}

export async function getRegistrations() {
  const registrations: Record<string, RegistrationData> = {};

  const profiles = await getProfiles();
  for (const profile of profiles) {
    registrations[profile.userId] = {
      profile,
      transactions: [],
    };
  }

  const meals = await getMeals();
  for (const meal of meals) {
    registrations[meal.userId].meal = meal.preference;
  }

  const workshops = await getWorkshops();
  for (const workshop of workshops) {
    registrations[workshop.userId].workshop = workshop.workshopId;
  }

  const transactions = await getTransactions();
  for (const transaction of transactions) {
    registrations[transaction.userId].transactions.push(transaction);
  }

  return registrations;
}

export async function getFinances() {
  const finances: Record<string, FinanceData> = {};

  const profiles = await getProfiles();
  for (const profile of profiles) {
    finances[profile.userId] = {
      profile,
      transactions: [],
    };
  }

  const transactions = await getTransactions();
  for (const transaction of transactions) {
    finances[transaction.userId].transactions.push(transaction);
  }

  return finances;
}
