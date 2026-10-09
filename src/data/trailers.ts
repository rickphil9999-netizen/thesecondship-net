export type Trailer = {
  id: string;
  title: string;
  series: string;
  youtubeId?: string;
  videoSrc?: string;
  poster?: string;
  vertical?: boolean;
  copy: string;
  relatedSlugs: string[];
};

export const TRAILERS: Trailer[] = [
  {
    id: "unpunished",
    title: "Unpunished",
    series: "Rho Agenda Singularity, Book Two (first look)",
    videoSrc: "/video/unpunished-first-look-loop.mp4",
    poster: "/video/unpunished-first-look-poster.jpg",
    vertical: true,
    copy: "The storm has a name. A first look at the cover art for the sequel to The Ripper's Son, brought to life. Early art, still a work in progress. Richard is writing Unpunished now and aims to finish it by the new year.",
    relatedSlugs: ["unpunished", "the-rippers-son"],
  },
  {
    id: "once-dead",
    title: "Once Dead",
    series: "A Jack “the Ripper” Gregory novel",
    youtubeId: "Im_HFvmxZpE",
    copy: "When Jack “the Ripper” Gregory, an ex-CIA assassin, bleeds out in a Calcutta slum and revives on an operating table believing he is infected by an alien mind, all hell breaks loose.",
    relatedSlugs: ["once-dead", "dead-wrong", "dead-shift"],
  },
  {
    id: "rho-agenda",
    title: "The Rho Agenda",
    series: "The original trilogy",
    youtubeId: "c8jX7t-3sEA",
    copy: "Three teens are drawn to a crashed starship, altered by its onboard AI, and set upon a dark path. Millions will die. Humanity will not come back unchanged.",
    relatedSlugs: ["the-second-ship", "immune", "wormhole"],
  },
  {
    id: "endarian",
    title: "The Endarian Prophecy",
    series: "Epic fantasy",
    youtubeId: "YoJY7hrs_vw",
    copy: "Richard Phillips introduces the six-book epic fantasy that sits beside the Rho saga: a mark of fire, a shattered trident, and a prophecy with a cost.",
    relatedSlugs: ["mark-of-fire", "prophecys-end"],
  },
];

export const AUTHOR_VIDEO_ID = "vw3ec02xd30";
