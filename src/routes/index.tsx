import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowDown, RotateCcw, Rocket } from "lucide-react";
import launchBackdrop from "@/assets/story-launch.jpg";
import staroviaBackdrop from "@/assets/story-starovia.jpg";
import rocket from "@/assets/story-rocket.png";
import jetpack from "@/assets/story-jetpack.png";
import { ScrollScene, StoryNavigation } from "@/components/ScrollScene";
import { storyTitle, launchBeats, endingBeats, characterStories, equipmentAge } from "@/lib/story";
import trio from "@/assets/trio-narrator.png";
import moonBackdrop from "@/assets/moon-chapter.jpg";
import marsBackdrop from "@/assets/mars-chapter.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { explorers, type Explorer } from "@/lib/explorers";
import { speakerMeta, trioHeads, type Speaker } from "@/lib/narrator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lost Among the Stars, Found by Us — T.R.I.O.’s Adventure" },
      { name: "description", content: "A scrolling storybook adventure with T.R.I.O.: launch into space, meet NASA equipment on the Moon and Mars, and find a happy fictional home in Starovia." },
      { property: "og:title", content: "Lost Among the Stars, Found by Us — T.R.I.O.’s Adventure" },
      { property: "og:description", content: "Launch with T.R.I.O., meet the Moon and Mars explorers, and journey together to Starovia." },
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
    <div className="narrator-voice mx-auto flex max-w-3xl items-start gap-4">
      <img src={trio} alt="T.R.I.O., the three-headed robot narrator" width={1024} height={1024} loading="lazy" className="h-16 w-16 shrink-0 rounded-full border-2 border-primary object-cover object-top" />
      <div>
        <p className={`font-display text-sm font-semibold ${head.color}`}>{head.position} · {head.role} says…</p>
        <p className="mt-1 text-lg leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export function FriendCard({ f, tone }: { f: Explorer; tone: "moon" | "mars" | "space" }) {
  const story = characterStories[f.id];
  const color = tone === "moon" ? "text-moon" : tone === "mars" ? "text-mars" : "text-primary";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label={`Meet ${f.name}`} className={`h-full w-full flex-col items-start justify-start whitespace-normal rounded-3xl border-2 bg-card p-6 text-left text-foreground hover:bg-secondary motion-safe:hover:-translate-y-1 ${tone === "moon" ? "border-moon/40" : tone === "mars" ? "border-mars/50" : "border-primary/40"}`}>
          <img src={f.image} alt={f.equipment} width={768} height={824} loading="lazy" className="mx-auto h-44 w-full object-contain" />
          <span className={`mt-2 font-display text-2xl font-bold ${color}`}>{f.name}</span>
          <span className="text-sm text-muted-foreground">{f.equipment}</span>
          {story && <span className="mt-2 text-sm text-primary">{story.familyRole} · {equipmentAge(f.id, 2026)} years since arrival</span>}
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
        {story && <p className="text-sm text-muted-foreground">Story role: {story.familyRole} · Arrived {story.arrivalYear} · {equipmentAge(f.id, 2026)} years as of 2026</p>}
        <p className="font-display text-lg text-primary">“{f.greeting}”</p>
        <p className="text-lg leading-relaxed">{f.information}</p>
        <DialogClose asChild><Button className="mt-2 font-display text-base">Back to the story</Button></DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function ChapterHeading({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return <header className="chapter-heading mx-auto max-w-4xl px-6 text-center">
    <p className="font-display text-sm uppercase text-primary">Chapter {number} / 04</p>
    <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">{title}</h2>
    <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{subtitle}</p>
  </header>;
}

function Encounters({ friends, tone }: { friends: Explorer[]; tone: "moon" | "mars" }) {
  return <div className="mx-auto max-w-5xl px-6">{friends.map((friend, index) => {
    const story = characterStories[friend.id];
    return <article key={friend.id} className="encounter grid items-center gap-8 md:grid-cols-2 md:gap-16">
      <div className={index % 2 ? "md:order-2" : ""}>
        <p className="font-display text-sm text-primary">{String(index + 1).padStart(2, "0")} · {story?.familyRole}</p>
        <h3 className={`mt-3 text-3xl font-semibold ${tone === "moon" ? "text-moon" : "text-mars"}`}>{friend.name} has a story.</h3>
        <p className="mt-5 text-xl italic leading-relaxed">“{story?.feeling}”</p>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{index === 0 ? "T.R.I.O. settles beside the explorer. For the first time in a long while, someone is here to listen." : "Another hello. Another memory. With each new friend, the quiet feels a little less lonely."}</p>
      </div>
      <FriendCard f={friend} tone={tone} />
    </article>;
  })}</div>;
}

function Index() {
  return <main className="story-book stars">
    <StoryNavigation />
    <ScrollScene id="launch" label="Chapter 1: Introduction and launch into space" className="launch-scene" visual={<>
      <img src={launchBackdrop} alt="" width={1536} height={1024} className="scene-backdrop launch-landscape" />
      <div className="rocket-flight"><img src={rocket} alt="" width={768} height={1024} className="rocket-art" /><img src={trio} alt="" width={1024} height={1024} className="rocket-passenger" /></div>
    </>}>
      <header className="story-cover px-6">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-display text-sm uppercase text-primary">A space story with T.R.I.O. · Chapter 01</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight md:text-7xl">Lost Among the Stars,<br /><span className="text-primary">Found by Us</span></h1>
          <p className="mt-6 max-w-md text-xl leading-relaxed">Far from Earth, some extraordinary explorers are waiting. Tonight, we’re going to find them.</p>
          <Button asChild className="mt-8 h-12 rounded-full px-6 font-display text-base"><a href="#countdown">Begin the adventure <ArrowDown /></a></Button>
        </div>
      </header>
      <div id="countdown" className="mx-auto max-w-6xl px-6">{launchBeats.map((beat, i) => <div key={beat.heading} className="launch-beat story-beat">
        <p className="font-display text-sm text-primary">{i === 0 ? "Meet your captain" : i === 1 ? "Ready for departure" : "Leaving Earth"}</p>
        <h2 className="mb-7 mt-3 text-3xl font-semibold leading-tight md:text-5xl">{beat.heading}</h2>
        <Narrator speaker={beat.speaker}>{beat.text}</Narrator>
      </div>)}</div>
      <div className="mx-auto max-w-5xl px-6 pb-20"><div className="grid gap-8 md:grid-cols-3">{trioHeads.map(head => <div key={head.id} className="border-t border-border pt-5"><p className={`font-display text-xl ${head.color}`}>{head.position}</p><p className="mt-1 font-display">{head.role}</p><p className="mt-3 text-muted-foreground">{head.blurb}</p></div>)}</div></div>
    </ScrollScene>

    <ScrollScene id="moon" label="Chapter 2: Meeting the friends on the Moon" className="planet-scene moon-scene" visual={<img src={moonBackdrop} alt="" width={1536} height={1024} loading="lazy" className="scene-backdrop planet-backdrop" />}>
      <ChapterHeading number={2} title="Friends on the Moon" subtitle="Silver dust. Silent footprints. And some very old friends with stories to tell." />
      <div className="mx-auto max-w-3xl px-6 pb-12"><Narrator speaker="scientist">The Moon has no wind to blow these tracks away. Some of our oldest friends have been here since the 1960s—like the grandparents of our space family. But even proud pioneers can miss their people.</Narrator></div>
      <Encounters friends={moonFriends} tone="moon" />
      <div className="mx-auto max-w-3xl px-6 pb-24"><Narrator speaker="host">You’re not forgotten. We’ve heard your stories, and we’re keeping them with us. Wait right here, friends—there are more explorers to meet on Mars!</Narrator></div>
    </ScrollScene>

    <div className="chapter-bridge mx-auto max-w-3xl px-6 py-24"><Rocket className="mx-auto mb-8 size-10 text-primary" /><Narrator speaker="dramatic">Next stop, Mars! It takes about seven months to get there in real life. Nobody has ever visited in person. The robots went all by themselves. Oh, we simply MUST say hello!</Narrator></div>

    <ScrollScene id="mars" label="Chapter 3: Meeting the friends on Mars" className="planet-scene mars-scene" visual={<img src={marsBackdrop} alt="" width={1536} height={1024} loading="lazy" className="scene-backdrop planet-backdrop" />}>
      <ChapterHeading number={3} title="Friends on Mars" subtitle="Across the red dunes, a younger generation of explorers is waiting for a friendly hello." />
      <div className="mx-auto max-w-3xl px-6 pb-12"><Narrator speaker="scientist">Radio messages from Earth can take up to twenty minutes to arrive. These rovers needed clever ways to explore! Let’s meet the older siblings, the curious cousins, and our youngest listener.</Narrator></div>
      <Encounters friends={marsFriends} tone="mars" />
      <div className="mx-auto max-w-3xl px-6 pb-24"><Narrator speaker="host">So many discoveries. So many brave hearts. You deserve more than a goodbye. If only there were somewhere we could all be together…</Narrator></div>
    </ScrollScene>

    <ScrollScene id="starovia" label="Chapter 4: Rescue and a happy ending in Starovia" className="ending-scene" visual={<>
      <img src={staroviaBackdrop} alt="" width={1536} height={1024} loading="lazy" className="scene-backdrop starovia-backdrop" />
      <div className="rescue-flight"><img src={jetpack} alt="" width={768} height={1024} loading="lazy" className="jetpack-art" /><img src={trio} alt="" width={1024} height={1024} loading="lazy" className="rescue-trio" /></div>
    </>}>
      <ChapterHeading number={4} title="A place to belong" subtitle="Sometimes the end of one mission is the beginning of a beautiful new story." />
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 pb-20 md:grid-cols-2"><div><h3 className="mb-6 text-3xl font-semibold">A message from among the stars.</h3><Narrator speaker="scientist">Kepler isn’t on the Moon or Mars. This dreamy telescope travels around the Sun, trailing behind Earth. And in our adventure, our planet-spotting friend has an idea!</Narrator><p className="mt-6 text-lg italic leading-relaxed">“{characterStories.kepler.feeling}”</p></div>{spaceFriends.map(f => <FriendCard key={f.id} f={f} tone="space" />)}</div>
      <div className="mx-auto max-w-6xl px-6">{endingBeats.map((beat, i) => <div key={beat.heading} className={`story-beat ending-beat ${i === 3 ? "final-beat" : ""}`}>
        <p className="font-display text-sm text-primary">{["The rescue jetpack", "The great gathering", "A new civilization", "Happily ever after"][i]}</p>
        <h3 className="mb-7 mt-3 text-3xl font-semibold leading-tight md:text-5xl">{beat.heading}</h3>
        <Narrator speaker={beat.speaker}>{beat.text}</Narrator>
      </div>)}</div>
      <div className="starovia-family mx-auto max-w-6xl px-6 pb-20"><div className="grid grid-cols-2 gap-6 sm:grid-cols-5">{explorers.map(friend => <figure key={friend.id}><img src={friend.image} alt={friend.equipment} width={768} height={824} loading="lazy" className="h-28 w-full object-contain sm:h-36" /><figcaption className="mt-2 text-center font-display">{friend.name}</figcaption></figure>)}</div></div>
      <footer className="story-ending px-6 py-20 text-center"><p className="font-display text-sm text-primary">The end · A new beginning</p><h2 className="mt-4 text-4xl font-semibold">No longer lost. Never forgotten.</h2><p className="mx-auto mt-5 max-w-xl text-lg">Goodnight, space friends. Wherever your next adventure takes you, may you always find someone who listens.</p><Button asChild variant="outline" className="mt-8 h-12 rounded-full px-6 font-display"><a href="#launch"><RotateCcw /> Read it again</a></Button><p className="mx-auto mt-10 max-w-lg text-sm text-muted-foreground">Our equipment and their missions are real. Their feelings, the rescue jetpack, and Starovia are make-believe—a happy ending imagined just for them. Ages count years since arrival, as of 2026.</p></footer>
    </ScrollScene>
  </main>;
}
