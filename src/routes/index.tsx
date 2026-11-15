import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import trio from "@/assets/trio-narrator.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { explorers, type Explorer } from "@/lib/explorers";
import { speakerMeta, trioHeads, type Speaker } from "@/lib/narrator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Lonely Explorers — A Space Story for Kids" },
      { name: "description", content: "Meet the NASA robots and instruments left behind on the Moon and Mars, told by T.R.I.O., the three-headed Robotic Interplanetary Observer." },
      { property: "og:title", content: "The Lonely Explorers — A Space Story for Kids" },
      { property: "og:description", content: "Meet the NASA robots and instruments left behind on the Moon and Mars, guided by T.R.I.O." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const moonFriends = explorers.filter((f) => f.location === "moon");
const marsFriends = explorers.filter((f) => f.location === "mars");
const spaceFriends = explorers.filter((f) => f.location === "space");
const RoverViewer = lazy(() => import("@/components/RoverViewer"));

function Narrator({ children, speaker = "host" }: { children: React.ReactNode; speaker?: Speaker }) {
  const head = speakerMeta[speaker];
  return (
    <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-3xl border border-primary/30 bg-card/70 p-5 backdrop-blur">
      <img src={trio} alt="T.R.I.O., the three-headed robot narrator" width={1024} height={1024} loading="lazy" className="h-16 w-16 shrink-0 rounded-full border-2 border-primary object-cover object-top" />
      <div>
        <p className={`font-display text-sm font-semibold ${head.color}`}>{head.position} · {head.role} says…</p>
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
          <img src={f.image} alt={f.equipment} width={768} height={824} loading="lazy" className="mx-auto h-44 w-full object-contain" />
          <span className={`mt-2 font-display text-2xl font-bold ${color}`}>{f.name}</span>
          <span className="text-sm text-muted-foreground">{f.equipment}</span>
          <span className={`font-display text-base ${color}`}>{f.personality}</span>
          <span className="mt-3 text-lg italic leading-relaxed">“{f.dialogue}”</span>
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-3xl border-primary/40 bg-card p-6 sm:p-8 ${f.model ? "sm:max-w-4xl" : ""}`}>
        {f.model && <div className="grid min-w-0 items-center gap-4 pt-3 sm:grid-cols-2">
          <img src={f.image} alt={f.equipment} width={768} height={824} className="h-52 w-full object-contain sm:h-80" />
          <ClientOnly fallback={<div className="h-64 bg-muted sm:h-80" />}>
            <Suspense fallback={<div className="flex h-64 items-center justify-center bg-muted text-muted-foreground sm:h-80" role="status">Loading rover…</div>}>
              <RoverViewer url={f.model} name={f.name} />
            </Suspense>
          </ClientOnly>
        </div>}
        <DialogHeader className="pr-5 text-left">
          {!f.model && <img src={f.image} alt={f.equipment} width={768} height={824} className="mx-auto h-52 w-full object-contain sm:h-64" />}
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

function EquipmentLineup({ friends }: { friends: Explorer[] }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-6 border-y border-border py-8 sm:gap-x-6">
      {friends.map((friend) => (
        <figure key={friend.id} className="w-[calc(50%-1rem)] min-w-0 sm:w-36 lg:w-44">
          <img src={friend.image} alt={friend.equipment} width={768} height={824} loading="lazy" className="h-40 w-full object-contain lg:h-48" />
          <figcaption className="mt-2 text-center font-display text-lg">{friend.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Index() {
  return (
    <main className="stars min-h-screen pb-24">
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 md:grid-cols-2">
        <div>
          <p className="font-display text-primary">A bedtime story from space</p>
          <h1 className="mt-2 text-5xl font-bold leading-tight md:text-7xl">The Lonely Explorers</h1>
          <p className="mt-5 text-xl text-muted-foreground">Far, far away, brave little robots are still waiting where we left them. T.R.I.O. is ready to introduce them.</p>
          <Button asChild className="mt-8 h-auto rounded-full px-7 py-3 font-display text-lg font-semibold"><a href="#moon">Start the story</a></Button>
        </div>
        <img src={trio} alt="T.R.I.O., the three-headed Robotic Interplanetary Observer, floating in space" width={1024} height={1024} className="animate-floaty mx-auto w-full max-w-md rounded-[2.5rem] border-4 border-primary/40" />
      </header>

      <section className="mt-20 px-6">
        <Narrator speaker="host">Beep-boop! I'm T.R.I.O. — the Robotic Interplanetary Observer! One robot, three heads, and every single one of them has an opinion. Long ago, people sent amazing machines to the Moon and to Mars. When their jobs were done, they stayed behind. Some are still working today! Let's fly up and say hello.</Narrator>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">Meet your guides</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">T.R.I.O. never travels alone. Each head has a job, and they all talk at once.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {trioHeads.map((head) => (
            <div key={head.id} className={`rounded-3xl border-2 bg-card p-6 ${head.border}`}>
              <p className={`mt-2 font-display text-xl font-bold ${head.color}`}>{head.position}</p>
              <p className="font-display text-base text-primary">{head.role}</p>
              <p className="mt-3 leading-relaxed">{head.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="moon" className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-moon md:text-5xl">Chapter 1: Friends on the Moon</h2>
        <EquipmentLineup friends={moonFriends} />
        <div className="mt-8"><Narrator speaker="scientist">Left head reporting in! The Moon is quiet and has no wind, so footprints and wheel tracks stay for millions of years. Our first friends arrived with the Apollo astronauts!</Narrator></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">{moonFriends.map((f) => <FriendCard key={f.id} f={f} tone="moon" />)}</div>
      </section>

      <section className="mt-24 px-6">
        <Narrator speaker="dramatic">Now buckle up, because Mars is much farther — the trip takes about seven months. And nobody — nobody! — has ever visited Mars in person. The robots went all by themselves. Alone. In the dust. *gasp*</Narrator>
      </section>

      <section id="mars" className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-mars md:text-5xl">Chapter 2: Friends on Mars</h2>
        <EquipmentLineup friends={marsFriends} />
        <div className="mt-8"><Narrator speaker="scientist">Here is the clever part: these robots had to drive themselves. A radio message from Earth can take up to twenty minutes to arrive, so by the time we say "stop," a rover has already rolled twice!</Narrator></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">{marsFriends.map((f) => <FriendCard key={f.name} f={f} tone="mars" />)}</div>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-6 text-center">
        <h2 className="text-center text-4xl font-bold text-primary md:text-5xl">Chapter 3: Among the Stars</h2>
        <div className="mt-8"><Narrator speaker="host">One more friend is waiting! Kepler isn't on Mars or the Moon. This dreamy telescope travels around the Sun, trailing behind Earth, with a story about faraway planets.</Narrator></div>
        <div className="mt-10">{spaceFriends.map((f) => <FriendCard key={f.id} f={f} tone="space" />)}</div>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold text-primary">The End… for now</h2>
        <div className="mt-8"><Narrator speaker="dramatic">Right head here, wiping away a tear. Our explorers aren't really lonely. Every time you look up at the night sky, you're saying hello to them.</Narrator></div>
        <div className="mt-6"><Narrator speaker="host">And maybe one day, YOU'LL be the astronaut who visits them! Goodnight, space friends. Beep… boop… hoo-hoo!</Narrator></div>
      </section>
    </main>
  );
}
