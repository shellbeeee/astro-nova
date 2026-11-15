import type { Speaker } from "@/lib/narrator";

export const storyTitle = "Lost Among the Stars, Found by Us";
export const chapters = [
  { id: "launch", number: 1, label: "The launch" },
  { id: "moon", number: 2, label: "The Moon" },
  { id: "mars", number: 3, label: "Mars" },
  { id: "starovia", number: 4, label: "Starovia" },
] as const;

export type CharacterStory = { arrivalYear: number; familyRole: string; feeling: string };
// Family roles are fictional, age-inspired character voices, not mission facts.
export const characterStories: Record<string, CharacterStory> = {
  "surveyor": { arrivalYear: 1967, familyRole: "Grandpa Scout", feeling: "I checked the ground before the astronauts came. Now it’s so quiet… I miss having someone to tell my stories to." },
  "lunar-module": { arrivalYear: 1969, familyRole: "Grandma Eagle", feeling: "I helped my astronauts get home. I’m proud of that… but sometimes I wish someone would come back to say hello." },
  "alsep": { arrivalYear: 1969, familyRole: "Grandpa AL", feeling: "For years, I listened to the Moon. These days, I wish someone would listen to me, too." },
  "moon-buggy": { arrivalYear: 1971, familyRole: "Uncle Rex", feeling: "I used to carry astronauts over these hills. Adventures aren’t quite the same without a friend beside you." },
  "sojourner": { arrivalYear: 1997, familyRole: "Auntie Sojourner", feeling: "I was the first little rover to drive here. I’m brave, but even brave explorers can feel lonely." },
  "spirit": { arrivalYear: 2004, familyRole: "The determined older sibling", feeling: "I kept exploring for years. Now my wheels are still… I wonder if anyone remembers all the places I went." },
  "opportunity": { arrivalYear: 2004, familyRole: "The cheerful older sibling", feeling: "I drove farther than a marathon! But after the dust storm, everything went quiet. I miss my team." },
  "phoenix": { arrivalYear: 2008, familyRole: "The curious younger cousin", feeling: "I found ice beneath the soil! I wish I had someone here to share that sparkling discovery with." },
  "kepler": { arrivalYear: 2009, familyRole: "The dreamy younger cousin", feeling: "I found so many faraway worlds. Maybe somewhere out there is a place where we could all belong." },
  "insight": { arrivalYear: 2018, familyRole: "The youngest listener", feeling: "I heard Mars rumble more than 1,300 times. Now I’m listening for something else… a friendly hello." },
};

export function equipmentAge(id: string, year: number) {
  const story = characterStories[id];
  return story ? Math.max(0, year - story.arrivalYear) : undefined;
}

export type StoryBeat = { heading: string; speaker: Speaker; text: string };
export const launchBeats: StoryBeat[] = [
  { heading: "One robot. Three heads. One big adventure.", speaker: "host", text: "Hello, star explorers! I’m T.R.I.O., the Robotic Interplanetary Observer. Some wonderful machines are waiting a very long way from home. Let’s go meet them!" },
  { heading: "All systems ready.", speaker: "scientist", text: "Rocket fuel? Check. Navigation? Check. Three heads safely aboard? Check, check, check! First stop: the Moon." },
  { heading: "Three… two… one…", speaker: "dramatic", text: "BLAST OFF! Goodbye, Earth! Oh my circuits, we’re really flying! I hope somebody remembered to pack a snack." },
];
export const endingBeats: StoryBeat[] = [
  { heading: "A little spark of hope.", speaker: "scientist", text: "Kepler has spotted something wonderful in our story: Starovia, a whole civilization of equipment! And this extraordinary rescue jetpack has room to carry every one of our friends." },
  { heading: "Nobody gets left behind.", speaker: "host", text: "First we gather our Moon friends. Then our Mars friends. Kepler, you’re coming too! Grandparents, cousins, little listeners—everyone aboard. Next stop: a place to belong!" },
  { heading: "Welcome to Starovia.", speaker: "dramatic", text: "Look! The lights are on, the neighbors are waving, and nobody is alone. Those are happy tears, I promise. Our friends have found a new home!" },
  { heading: "Found by us. Together at last.", speaker: "host", text: "Grandpa Scout tells his stories. Uncle Rex races down new paths. InSight listens to new friends, and Kepler dreams up tomorrow’s adventures. They lived happily ever after—not because their old journeys were forgotten, but because their next one began together." },
];