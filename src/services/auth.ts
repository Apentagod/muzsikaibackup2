
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  sendEmailVerification
} from "firebase/auth";

export interface RegisterData {
  email: string;
  password: string;
  acceptedTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

const authService = {
  async register({ email, password, acceptedTerms }: RegisterData) {
    if (!acceptedTerms) {
      throw new Error("El kell fogadnod az ÁSZF-et és az Adatvédelmi tájékoztatót");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  },

  async login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  async logout() {
    return signOut(auth);
  },

  async resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  },

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(callback);
  }
};

export default authService;
