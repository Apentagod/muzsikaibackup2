
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export interface Artist {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  context: string;
}

export const getArtists = async (): Promise<Artist[]> => {
  const artistsRef = collection(db, "artists");
  const snapshot = await getDocs(artistsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().artistName,
    genre: doc.data().genre,
    imageUrl: doc.data().imageUrl,
    context: doc.data().context
  }));
};

export const getArtistContext = async (artistId: string): Promise<string> => {
  const artistRef = doc(db, "artists", artistId);
  const snapshot = await getDoc(artistRef);
  const data = snapshot.data();
  return data?.context || "";
};
