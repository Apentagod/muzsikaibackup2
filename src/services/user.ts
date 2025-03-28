
import { db, storage, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  credits: number;
  subscription: {
    type: "basic" | "pro";
    validUntil: Date;
  };
}

export interface GeneratedLyric {
  id: string;
  title: string;
  artist: string;
  content: string;
  createdAt: Date;
}

export interface BillingHistory {
  id: string;
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  createdAt: Date;
}

export const userService = {
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const userRef = doc(db, "users", userId);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) return null;
    return snapshot.data() as UserProfile;
  },

  async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
  },

  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const storageRef = ref(storage, `users/${userId}/profile.jpg`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async getLyricsHistory(userId: string): Promise<GeneratedLyric[]> {
    const lyricsRef = collection(db, "users", userId, "lyrics");
    const q = query(lyricsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedLyric));
  },

  async getBillingHistory(userId: string): Promise<BillingHistory[]> {
    const billingRef = collection(db, "users", userId, "billing");
    const q = query(billingRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BillingHistory));
  },

  async logout(): Promise<void> {
    await signOut(auth);
  }
};
