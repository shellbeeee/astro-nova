import { createFileRoute } from "@tanstack/react-router";
import narrator from "@/assets/narrator.jpg";
import moon from "@/assets/moon-explorers.jpg";
import mars from "@/assets/mars-explorers.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { explorers, type Explorer } from "@/lib/explorers";

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

const moonFriends = explorers.filter((f) => f.location === "moon");
const marsFriends = explorers.filter((f) => f.location === "mars");
const spaceFriends = explorers.filter((f) => f.location === "space");

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

export function FriendCard({ f, tone }: { f: Explorer; tone: "moon" | "mars" | "space" }) {
  const color = tone === "moon" ? "text-moon" : tone === "mars" ? "text-mars" : "text-primary";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label={`Meet ${f.name}`} className={`h-full w-full flex-col items-start justify-start whitespace-normal rounded-3xl border-2 bg-card p-6 text-left text-foreground hover:bg-secondary motion-safe:hover:-translate-y-1 ${tone === "moon" ? "border-moon/40" : tone === "mars" ? "border-mars/50" : "border-primary/40"}`}>
          <span aria-hidden="true" className="text-5xl">{f.emoji}</span>
          <span className={`mt-2 font-display text-2xl font-bold ${color}`}>{f.name}</span>
          <span className="text-sm text-muted-foreground">{f.equipment}</span>
          <span className={`font-display text-base ${color}`}>{f.personality}</span>
          <span className="mt-3 text-lg italic leading-relaxed">“{f.dialogue}”</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-3xl border-primary/40 bg-card p-6 sm:p-8">
        <DialogHeader className="pr-5 text-left">
          <span aria-hidden="true" className="text-5xl">{f.emoji}</span>
          <DialogTitle className={`font-display text-3xl leading-tight tracking-normal ${color}`}>{f.name}</DialogTitle>
          <DialogDescription className="text-base">{f.equipment} · {f.personality}</DialogDescription>
        </DialogHeader>
        <p className="font-display text-lg text-primary">“{f.greeting}”</p>
        <p className="text-lg leading-relaxed">{f.information}</p>
        <DialogClose asChild><Button className="mt-2 font-display text-base">Back to the story</Button></DialogClose>
      </DialogContent>
    </Dialog>
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
          <Button asChild className="mt-8 h-auto rounded-full px-7 py-3 font-display text-lg font-semibold"><a href="#moon">Start the story 🚀</a></Button>
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
        <div className="mt-10 grid gap-6 md:grid-cols-2">{moonFriends.map((f) => <FriendCard key={f.id} f={f} tone="moon" />)}</div>
      </section>

      <section id="space" className="mx-auto mt-24 max-w-3xl px-6">
        <h2 className="text-center text-4xl font-bold text-primary md:text-5xl">🔭 Chapter 3: Among the Stars</h2>
        <div className="mt-8"><Narrator>One more friend is waiting! Kepler isn't on Mars or the Moon. This dreamy telescope travels around the Sun, trailing behind Earth, with a story about faraway planets.</Narrator></div>
        <div className="mt-10">{spaceFriends.map((f) => <FriendCard key={f.id} f={f} tone="space" />)}</div>
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
