
import { Artist } from "./artists";

export const generateLyrics = (type: "basic" | "special", artist: Artist): string => {
  return `Ez egy teszt válasz a Softgen-től, az előadó: ${artist.name}`;
};
