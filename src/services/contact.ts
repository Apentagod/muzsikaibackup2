
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export const contactService = {
  async sendMessage(data: Omit<ContactMessage, "createdAt">) {
    try {
      const docRef = await addDoc(collection(db, "contact_messages"), {
        ...data,
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error sending message:", error);
      return { success: false, error };
    }
  }
};
