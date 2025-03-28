
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export interface CreditSettings {
  initialCredits: number;
  basicGenerationCost: number;
  specialGenerationCost: number;
}

export interface LyricsRequest {
  type: "basic" | "special";
  prompt: string;
  contextLength: number;
}

export const getCreditSettings = async (): Promise<CreditSettings> => {
  const settingsRef = doc(db, "config", "creditSettings");
  const snapshot = await getDoc(settingsRef);
  const data = snapshot.data() as CreditSettings;
  
  return {
    initialCredits: data?.initialCredits ?? 1000,
    basicGenerationCost: data?.basicGenerationCost ?? 10,
    specialGenerationCost: data?.specialGenerationCost ?? 15
  };
};

export const calculateCreditCost = (request: LyricsRequest, settings: CreditSettings): number => {
  return request.type === "basic" ? settings.basicGenerationCost : settings.specialGenerationCost;
};

export const updateUserCredits = async (userId: string, newCredits: number): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { credits: newCredits });
};
