export type Speaker = "host" | "scientist" | "dramatic";

export type TrioHead = {
  id: Speaker;
  position: string;
  role: string;
  color: string;
  border: string;
  blurb: string;
};

/** T.R.I.O. — The Robotic Interplanetary Observer: one robot, three heads, three jobs. */
export const trioHeads: TrioHead[] = [
  {
    id: "host",
    position: "Center Head",
    role: "The Enthusiastic Host",
    color: "text-primary",
    border: "border-primary/40",
    blurb: "Big goofy grin, always winking, and leading the tour with all the energy in the solar system.",
  },
  {
    id: "scientist",
    position: "Left Head",
    role: "The Curious Scientist",
    color: "text-moon",
    border: "border-moon/40",
    blurb: "Wide-eyed and focused, with antennas that pick up space signals and explain how all the tech works.",
  },
  {
    id: "dramatic",
    position: "Right Head",
    role: "The Dramatic Sidekick",
    color: "text-mars",
    border: "border-mars/50",
    blurb: "Expressive, easily amazed, and occasionally very dramatic about the dangers of space.",
  },
];

export const speakerMeta: Record<Speaker, TrioHead> = trioHeads.reduce(
  (acc, head) => ({ ...acc, [head.id]: head }),
  {} as Record<Speaker, TrioHead>,
);
