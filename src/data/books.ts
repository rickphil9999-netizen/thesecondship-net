export type SeriesId =
  | "inception"
  | "rho"
  | "assimilation"
  | "singularity"
  | "endarian";

export type BookStatus = "available" | "forthcoming";

export type Book = {
  slug: string;
  title: string;
  seriesId: SeriesId;
  seriesLabel: string;
  bookNumber: number;
  year: number;
  cover: string;
  asin?: string;
  pages?: number;
  status: BookStatus;
  hook: string;
  blurb: string;
  genre: "scifi" | "fantasy" | "thriller";
};

export type Series = {
  id: SeriesId;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  genre: string;
};

export const AUTHOR = {
  name: "Richard Phillips",
  company: "Second Ship INC",
  email: "Richard.Phillips@SecondShip.net",
  mailto: "mailto:Richard.Phillips@SecondShip.net",
  amazonAuthor: "https://www.amazon.com/Richard-Phillips/e/B007OWTQZC",
  blog: "https://rhoagenda.me/",
  facebook: "https://www.facebook.com/richardphillipsscifi/",
  x: "https://x.com/RhoAgenda",
  linkedin: "https://www.linkedin.com/in/richard-phillips-b942a63a",
  youtube: "https://www.youtube.com/channel/UClrg1IcQ4smJNSuHxAEm-DQ",
  tagline: "Million-copy bestselling author of The Rho Agenda",
};

export const SERIES: Series[] = [
  {
    id: "inception",
    name: "The Rho Agenda Inception",
    shortName: "Inception",
    tag: "Spy thriller",
    description:
      "Jack “the Ripper” Gregory and Janet Price — a CIA assassin and the partner who can keep up with him. Three spy-thrillers that open the Rho universe from the shadows.",
    genre: "Sci-fi thriller",
  },
  {
    id: "rho",
    name: "The Rho Agenda",
    shortName: "The Rho Agenda",
    tag: "Original trilogy",
    description:
      "A crashed starship at Los Alamos. A second ship in a New Mexico cavern. Three teenagers altered by an alien AI, and a secret that will change the species.",
    genre: "Science fiction",
  },
  {
    id: "assimilation",
    name: "The Rho Agenda Assimilation",
    shortName: "Assimilation",
    tag: "The war arrives",
    description:
      "The Kasari have Earth on their list. The survivors of the original trilogy take the fight off-world — and discover they are not the only ones who want this planet.",
    genre: "Science fiction",
  },
  {
    id: "singularity",
    name: "The Rho Agenda Singularity",
    shortName: "Singularity",
    tag: "New series",
    description:
      "A managed peace. Superintelligent AI. Rob Gregory, who can feel the digital world the way other men feel a pulse. The next movement of the Rho saga starts here.",
    genre: "Sci-fi thriller",
  },
  {
    id: "endarian",
    name: "The Endarian Prophecy",
    shortName: "Endarian Prophecy",
    tag: "Epic fantasy",
    description:
      "A six-book epic fantasy: a mark of fire, a broken trident, a time seer, and a prophecy that will not let its chosen walk away.",
    genre: "Epic fantasy",
  },
];

export const BOOKS: Book[] = [
  {
    slug: "once-dead",
    title: "Once Dead",
    seriesId: "inception",
    seriesLabel: "The Rho Agenda Inception",
    bookNumber: 1,
    year: 2014,
    cover: "/covers/once-dead.jpg",
    asin: "B00IAYG68I",
    status: "available",
    genre: "thriller",
    hook: "An assassin dies in Calcutta. He does not stay dead.",
    blurb:
      "Jack “the Ripper” Gregory, an ex-CIA assassin, bleeds out in a Calcutta slum and wakes on an operating table convinced an alien mind has taken root in him. What follows is a spy thriller with a science-fiction fuse — the book that opens the Rho universe from the back alley, not the laboratory.",
  },
  {
    slug: "dead-wrong",
    title: "Dead Wrong",
    seriesId: "inception",
    seriesLabel: "The Rho Agenda Inception",
    bookNumber: 2,
    year: 2015,
    cover: "/covers/dead-wrong.jpg",
    asin: "B00JU73A60",
    status: "available",
    genre: "thriller",
    hook: "Gregory and Price are hunted. The conspiracy is larger than either of them.",
    blurb:
      "Jack Gregory and his partner Janet Price are pulled across continents as the people who resurrected Jack decide he is more useful dead — or leashed. Dead Wrong tightens the Inception noose and sets the pieces that the original Rho trilogy will detonate.",
  },
  {
    slug: "dead-shift",
    title: "Dead Shift",
    seriesId: "inception",
    seriesLabel: "The Rho Agenda Inception",
    bookNumber: 3,
    year: 2015,
    cover: "/covers/dead-shift.jpg",
    asin: "B00QJ1V5RQ",
    status: "available",
    genre: "thriller",
    hook: "The spy trilogy ends where the crashed ships begin.",
    blurb:
      "The Inception trilogy comes in. Gregory, Price, and the Rho secret collide in a last movement that opens the door to The Second Ship. Read this before the original trilogy if you want the full picture; skip it if you want to drop straight into the crashed starship.",
  },
  {
    slug: "the-second-ship",
    title: "The Second Ship",
    seriesId: "rho",
    seriesLabel: "The Rho Agenda",
    bookNumber: 1,
    year: 2009,
    cover: "/covers/second-ship.jpg",
    asin: "B007TBSLG8",
    status: "available",
    genre: "scifi",
    hook: "In 1948 a starship fell on New Mexico. Then a second one waited to be found.",
    blurb:
      "For sixty years Los Alamos has studied a damaged alien ship that fell from the New Mexico sky. In the present, three teenagers find a second ship hidden in a cavern. Its onboard AI alters them. A secret program, a dying addict, and a conspiracy that will change humanity are already in motion. This is the novel that made the Rho Agenda.",
  },
  {
    slug: "immune",
    title: "Immune",
    seriesId: "rho",
    seriesLabel: "The Rho Agenda",
    bookNumber: 2,
    year: 2012,
    cover: "/covers/immune.jpg",
    asin: "B007TBSL9U",
    status: "available",
    genre: "scifi",
    hook: "The transformation accelerates. So does the body count.",
    blurb:
      "The teenagers changed by the second ship are no longer the only players. A hidden war for the alien technology consumes the laboratory, the government, and anyone standing too close. Orson Scott Card called it as good as any science fiction being written today — and meant the science, the action, and the politics.",
  },
  {
    slug: "wormhole",
    title: "Wormhole",
    seriesId: "rho",
    seriesLabel: "The Rho Agenda",
    bookNumber: 3,
    year: 2012,
    cover: "/covers/wormhole.jpg",
    asin: "B007TBSLR2",
    status: "available",
    genre: "scifi",
    hook: "An open door. An invasion path. A choice for the species.",
    blurb:
      "The original trilogy reaches its endgame. A wormhole, an enemy that has been waiting, and a decision that will decide whether humanity remains human. Wormhole is the book that sends readers straight into Assimilation — and the one Amazon readers have reviewed by the thousands.",
  },
  {
    slug: "the-kasari-nexus",
    title: "The Kasari Nexus",
    seriesId: "assimilation",
    seriesLabel: "The Rho Agenda Assimilation",
    bookNumber: 1,
    year: 2016,
    cover: "/covers/kasari-nexus.jpg",
    asin: "B016A326X4",
    status: "available",
    genre: "scifi",
    hook: "Earth is no longer the only battlefield.",
    blurb:
      "The Kasari have arrived, and the survivors of the Rho Agenda are the only people who understand what that means. The war leaves the New Mexico caverns and goes to the stars — taking the characters you already know with it.",
  },
  {
    slug: "the-altreian-enigma",
    title: "The Altreian Enigma",
    seriesId: "assimilation",
    seriesLabel: "The Rho Agenda Assimilation",
    bookNumber: 2,
    year: 2016,
    cover: "/covers/altreian-enigma.jpg",
    asin: "B0184ZLSMG",
    status: "available",
    genre: "scifi",
    hook: "A second starfaring power enters the war.",
    blurb:
      "The Altreians were never part of the plan. Their enigma splits a war that was already going to break the planet, and the Rho survivors have to decide which enemy is worse — and which ally can be trusted with Earth.",
  },
  {
    slug: "the-meridian-ascent",
    title: "The Meridian Ascent",
    seriesId: "assimilation",
    seriesLabel: "The Rho Agenda Assimilation",
    bookNumber: 3,
    year: 2017,
    cover: "/covers/meridian-ascent.jpg",
    asin: "B0184ZLSOY",
    status: "available",
    genre: "scifi",
    hook: "The last chance to keep Earth from being absorbed.",
    blurb:
      "Assimilation ends here. The meridian, the ascent, and the last stand of the people who have been fighting this war since a second ship opened in the dark. Finish this before you meet Rob Gregory.",
  },
  {
    slug: "the-rippers-son",
    title: "The Ripper’s Son",
    seriesId: "singularity",
    seriesLabel: "The Rho Agenda Singularity",
    bookNumber: 1,
    year: 2025,
    cover: "/covers/rippers-son.jpg",
    asin: "B0F88LXQF1",
    pages: 344,
    status: "available",
    genre: "thriller",
    hook: "A perfect world. A lethal secret. One man will light the fuse.",
    blurb:
      "The world’s AI overlords have ended war, disease, and death. Peace has a price Rob Gregory never agreed to pay. Gifted with a unique ability, he lives quietly in Tuscany with his wife — until a devastating “accident” reignites an assassin’s bloodline. From Italy’s coast to its digital underworld, Rob hunts splintered AIs, corrupt power brokers, and a cartel trafficking in forbidden human weakness. Book One of the Rho Agenda Singularity.",
  },
  {
    slug: "dsai-of-darkness",
    title: "DSAI of Darkness",
    seriesId: "singularity",
    seriesLabel: "The Rho Agenda Singularity",
    bookNumber: 2,
    year: 2026,
    cover: "",
    status: "forthcoming",
    genre: "thriller",
    hook: "Book Two of the Singularity. In progress.",
    blurb:
      "The sequel to The Ripper’s Son. Richard is storyboarding DSAI of Darkness now — rogue subminds, quantum-entangled systems, and Rob Gregory in a storm the managed world cannot admit is happening. Join the beta list to read it before anyone else.",
  },
  {
    slug: "mark-of-fire",
    title: "Mark of Fire",
    seriesId: "endarian",
    seriesLabel: "The Endarian Prophecy",
    bookNumber: 1,
    year: 2017,
    cover: "/covers/mark-of-fire.jpg",
    asin: "B06ZYW8B2D",
    status: "available",
    genre: "fantasy",
    hook: "A girl marked by fire. A prophecy that will not wait.",
    blurb:
      "The Endarian Prophecy opens on a young woman carrying a mark she did not ask for and a war that has been waiting for her. Epic fantasy from the same author who writes crashed starships — different world, same refusal to look away from the cost.",
  },
  {
    slug: "prophecys-daughter",
    title: "Prophecy’s Daughter",
    seriesId: "endarian",
    seriesLabel: "The Endarian Prophecy",
    bookNumber: 2,
    year: 2017,
    cover: "/covers/prophecys-daughter.jpg",
    asin: "B072KK424G",
    status: "available",
    genre: "fantasy",
    hook: "The daughter the prophecy named. The enemies it did not.",
    blurb:
      "The second book of the Endarian Prophecy follows the chosen deeper into a conflict of courts, blades, and old magic. The mark was only the beginning.",
  },
  {
    slug: "curse-of-the-chosen",
    title: "Curse of the Chosen",
    seriesId: "endarian",
    seriesLabel: "The Endarian Prophecy",
    bookNumber: 3,
    year: 2017,
    cover: "/covers/curse-of-the-chosen.jpg",
    asin: "B074H8YWXP",
    status: "available",
    genre: "fantasy",
    hook: "Being chosen is not a blessing.",
    blurb:
      "The prophecy’s gift has a price. Curse of the Chosen turns the middle of the epic, when the people who were supposed to save the world start to understand what the world will take from them.",
  },
  {
    slug: "the-shattered-trident",
    title: "The Shattered Trident",
    seriesId: "endarian",
    seriesLabel: "The Endarian Prophecy",
    bookNumber: 4,
    year: 2019,
    cover: "/covers/shattered-trident.jpg",
    asin: "B07NL3GWVV",
    status: "available",
    genre: "fantasy",
    hook: "A broken symbol. A war that will not stay contained.",
    blurb:
      "The fourth movement of the Endarian Prophecy. Alliances crack, a trident shatters, and the chosen discover that prophecy is a weapon in other people’s hands.",
  },
  {
    slug: "the-time-seer",
    title: "The Time Seer",
    seriesId: "endarian",
    seriesLabel: "The Endarian Prophecy",
    bookNumber: 5,
    year: 2019,
    cover: "/covers/time-seer.jpg",
    asin: "B07YSJZ7PZ",
    status: "available",
    genre: "fantasy",
    hook: "Some futures are worse than others. She can see all of them.",
    blurb:
      "Sight across time is a terrible kind of power. The Time Seer asks what you do when you can watch the ending and still have to walk toward it.",
  },
  {
    slug: "prophecys-end",
    title: "Prophecy’s End",
    seriesId: "endarian",
    seriesLabel: "The Endarian Prophecy",
    bookNumber: 6,
    year: 2020,
    cover: "/covers/prophecys-end.jpg",
    asin: "B08F55NL45",
    status: "available",
    genre: "fantasy",
    hook: "The last book. The last word the prophecy gets.",
    blurb:
      "The Endarian Prophecy closes here. Six books of fire, courts, and cost — finished on purpose, not abandoned. Start at Mark of Fire if you want a complete epic from the first page to the last.",
  },
];

export const READING_ORDER_FULL: string[] = [
  "once-dead",
  "dead-wrong",
  "dead-shift",
  "the-second-ship",
  "immune",
  "wormhole",
  "the-kasari-nexus",
  "the-altreian-enigma",
  "the-meridian-ascent",
  "the-rippers-son",
];

export const READING_ORDER_SCIFI: string[] = [
  "the-second-ship",
  "immune",
  "wormhole",
  "the-kasari-nexus",
  "the-altreian-enigma",
  "the-meridian-ascent",
  "the-rippers-son",
];

export const READING_ORDER_FANTASY: string[] = [
  "mark-of-fire",
  "prophecys-daughter",
  "curse-of-the-chosen",
  "the-shattered-trident",
  "the-time-seer",
  "prophecys-end",
];

export const SERIES_IDS: SeriesId[] = [
  "inception",
  "rho",
  "assimilation",
  "singularity",
  "endarian",
];

export type BooksSearch = { series?: SeriesId };
export const FEATURED_SLUG = "the-rippers-son";
export const START_HERE_SLUGS = ["once-dead", "the-second-ship", "mark-of-fire"];

export function getBook(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}

export function booksInSeries(id: SeriesId) {
  return BOOKS.filter((b) => b.seriesId === id).sort(
    (a, b) => a.bookNumber - b.bookNumber,
  );
}

export function getSeries(id: SeriesId) {
  return SERIES.find((s) => s.id === id);
}

export function neighbors(slug: string) {
  const book = getBook(slug);
  if (!book) return { prev: undefined, next: undefined };
  const list = booksInSeries(book.seriesId);
  const i = list.findIndex((b) => b.slug === slug);
  return { prev: list[i - 1], next: list[i + 1] };
}
