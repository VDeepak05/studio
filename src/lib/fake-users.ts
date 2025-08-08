
export interface FakeUser {
  id: number;
  username: string;
  avatar: string;
  bio: string;
  traits: string[];
}

export const fakeUsers: FakeUser[] = [
  {
    id: 1,
    username: "Cosmic_Carol",
    avatar: "https://placehold.co/128x128.png",
    bio: "Astrology isn't just a hobby, it's my entire personality. Fluent in Mercury retrograde.",
    traits: ["Believes in aliens", "Always late", "Has a crystal for everything"],
  },
  {
    id: 2,
    username: "GaryThePigeon",
    avatar: "https://placehold.co/128x128.png",
    bio: "Just a man looking for breadcrumbs. Coo.",
    traits: ["Good at finding statues", "Distrusts cats", "Will steal your fries"],
  },
  {
    id: 3,
    username: "TacoTuesday4Ever",
    avatar: "https://placehold.co/128x128.png",
    bio: "Seeking someone to join my quest for the perfect taco. It's a serious commitment.",
    traits: ["Owns 12 kinds of hot sauce", "Will judge your tortilla choice", "Thinks cilantro is essential"],
  },
  {
    id: 4,
    username: "Sentient_Sock",
    avatar: "https://placehold.co/128x128.png",
    bio: "Lost my other half in the great wash of '22. Still searching for my sole-mate.",
    traits: ["Slightly damp", "Existential dread", "Hates dryers"],
  },
  {
    id: 5,
    username: "DJ_Naptime",
    avatar: "https://placehold.co/128x128.png",
    bio: "My beats are sick and my naps are legendary. Mostly the naps.",
    traits: ["Can sleep anywhere", "Wears sunglasses indoors", "Vibes are immaculate"],
  },
  {
    id: 6,
    username: "Probably_A_Vampire",
    avatar: "https://placehold.co/128x128.png",
    bio: "Night owl. Very pale. Hates garlic bread. What's not to love?",
    traits: ["Works the night shift", "Avoids the sun", "Weirdly formal"],
  }
];
