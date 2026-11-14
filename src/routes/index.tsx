import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import narrator from "@/assets/narrator.jpg";
import moon from "@/assets/moon-friends.jpg";
import mars from "@/assets/mars-friends.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Lonely Explorers — A Space Story for Kids" },
      { name: "description", content: "Meet the NASA robots and instruments left behind on the Moon and Mars, told by Professor Hoot." },
      { property: "og:title", content: "The Lonely Explorers — A Space Story for Kids" },
      { property: "og:description", content: "Meet the NASA robots and instruments left behind on the Moon and Mars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Friend = { name: string; real: string; year: string; emoji: string; says: string; fact: string };

const moonFriends: Friend[] = [
  { name: "Mirror Mia", real: "Laser Ranging Retroreflector", year: "Apollo 11 · 1969", emoji: "🪞",
    says: "Scientists on Earth shine lasers at me, and I bounce them right back! That's how they know how far away the Moon is.",
    fact: "Thanks to Mia, we know the Moon drifts about 3.8 cm farther from Earth every year — that's how fast your fingernails grow!" },
  { name: "Wobbles", real: "Passive Seismic Experiment", year: "Apollo 11 · 1969", emoji: "📡",
    says: "I listen very, very carefully. When the Moon shakes, I feel it in my toes — I discovered moonquakes!",
    fact: "Moonquakes can last over an hour, because the Moon is dry and rings like a bell." },
  { name: "Rover Rex", real: "Lunar Roving Vehicle", year: "Apollo 15, 16 & 17 · 1971–72", emoji: "🚙",
    says: "Vroom! I gave astronauts rides across craters. There are three of me, still parked where we said goodbye.",
    fact: "Rex's tires were made of woven wire mesh, because rubber would crack in the Moon's cold." },
];

const marsFriends: Friend[] = [
  { name: "Little Sojo", real: "Sojourner Rover", year: "Mars Pathfinder · 1997", emoji: "🤖",
    says: "I'm small — about the size of a microwave — but I was the very first rover ever to roll on Mars!",
    fact: "Sojourner was planned to work for 7 days. It kept going for 83!" },
  { name: "Spirit & Oppy", real: "Spirit and Opportunity Rovers", year: "Landed 2004", emoji: "👯",
    says: "We're twins on opposite sides of Mars! We found clues that water once flowed here long, long ago.",
    fact: "Opportunity was meant to drive for 90 days. It explored for almost 15 years and drove over a marathon!" },
  { name: "Thumpy", real: "InSight Lander", year: "Landed 2018", emoji: "💓",
    says: "I put my ear to the ground and listened to Mars's heartbeat — over 1,300 marsquakes!",
    fact: "InSight's final message in 2022 was: \"Don't worry about me.\"" },
  { name: "Ginny", real: "Ingenuity Helicopter", year: "Flew 2021–2024", emoji: "🚁",
    says: "Whirrr! I was the first machine ever to fly on another planet. Everyone said one flight — I did 72!",
    fact: "Ginny carries a tiny piece of fabric from the Wright brothers' first airplane." },
];

function Narrator({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-3xl border border-primary/30 bg-card/70 p-5 backdrop-blur">
      <img src={narrator} alt="Professor Hoot the owl" width={1024} height={1024} loading="lazy" className="h-16 w-16 shrink-0 rounded-full border-2 border-primary object-cover" />
      <div>
        <p className="font-display text-sm font-semibold text-primary">Professor Hoot says…</p>
        <p className="mt-1 text-lg leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function FriendCard({ f, tone }: { f: Friend; tone: "moon" | "mars" }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`rounded-3xl border-2 bg-card p-6 transition-transform hover:-translate-y-1 ${tone === "moon" ? "border-moon/40" : "border-mars/50"}`}>
      <div className="text-5xl">{f.emoji}</div>
      <h3 className={`mt-3 text-2xl font-bold ${tone === "moon" ? "text-moon" : "text-mars"}`}>{f.name}</h3>
      <p className="text-sm text-muted-foreground">{f.real} · {f.year}</p>
      <p className="mt-4 rounded-2xl bg-secondary p-4 text-base italic">“{f.says}”</p>
      <button onClick={() => setOpen(!open)} className="mt-4 rounded-full bg-primary px-4 py-2 font-display font-semibold text-primary-foreground">
        {open ? "Hide fun fact" : "✨ Fun fact!"}
      </button>
      {open && <p className="mt-3 text-base">{f.fact}</p>}
    </article>
  );
}

function Index() {
  return (
    <main className="stars min-h-screen pb-24">
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 md:grid-cols-2">
        <div>
          <p className="font-display text-primary">A bedtime story from space</p>
          <h1 className="mt-2 text-5xl font-bold leading-tight md:text-7xl">The Lonely Explorers</h1>
          <p className="mt-5 text-xl text-muted-foreground">Far, far away, brave little robots are still waiting where we left them. Want to meet them?</p>
          <a href="#moon" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-display text-lg font-semibold text-primary-foreground">Start the story 🚀</a>
        </div>
        <img src={narrator} alt="Professor Hoot, an owl astronaut reading a storybook" width={1024} height={1024} className="animate-floaty mx-auto w-full max-w-md rounded-[2.5rem] border-4 border-primary/40" />
      </header>

      <section className="mt-20 px-6">
        <Narrator>Hoo-hoo! I'm Professor Hoot. Long ago, people sent amazing machines to the Moon and to Mars. When their jobs were done, they stayed behind. Some are still working today! Let's fly up and say hello.</Narrator>
      </section>

      <section id="moon" className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-moon md:text-5xl">🌙 Chapter 1: Friends on the Moon</h2>
        <img src={moon} alt="Cute Moon instruments smiling on the lunar surface" width={1536} height={1024} loading="lazy" className="mt-8 w-full rounded-[2rem] border-4 border-moon/30" />
        <div className="mt-8"><Narrator>The Moon is quiet and has no wind, so footprints and wheel tracks stay for millions of years. Our first friends arrived with the Apollo astronauts!</Narrator></div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{moonFriends.map((f) => <FriendCard key={f.name} f={f} tone="moon" />)}</div>
      </section>

      <section className="mt-24 px-6">
        <Narrator>Now buckle up! Mars is much farther — the trip takes about seven months. Nobody has ever visited Mars in person, so robots went all by themselves.</Narrator>
      </section>

      <section id="mars" className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-mars md:text-5xl">🔴 Chapter 2: Friends on Mars</h2>
        <img src={mars} alt="Cute Mars rovers, lander and helicopter waving" width={1536} height={1024} loading="lazy" className="mt-8 w-full rounded-[2rem] border-4 border-mars/40" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">{marsFriends.map((f) => <FriendCard key={f.name} f={f} tone="mars" />)}</div>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold text-primary">The End… for now ⭐</h2>
        <div className="mt-8"><Narrator>Our explorers aren't really lonely. Every time you look up at the night sky, you're saying hello to them. And maybe one day, you'll be the astronaut who visits them! Goodnight, space friends. Hoo-hoo!</Narrator></div>
      </section>
    </main>
  );
}
