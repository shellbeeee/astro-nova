import lunarModule from "@/assets/lunar-module.png.asset.json";
import moonBuggy from "@/assets/moon-buggy.png.asset.json";
import alsep from "@/assets/alsep.png.asset.json";
import surveyor from "@/assets/surveyor.png.asset.json";
import sojourner from "@/assets/sojourner.png.asset.json";
import spirit from "@/assets/spirit.png.asset.json";
import opportunity from "@/assets/opportunity.png.asset.json";
import phoenix from "@/assets/phoenix.png.asset.json";
import insight from "@/assets/insight.png.asset.json";
import kepler from "@/assets/kepler.png.asset.json";

export type Explorer = { id: string; equipment: string; name: string; personality: string; image: string; location: "moon" | "mars" | "space"; greeting: string; dialogue: string; information: string };

export const explorers: Explorer[] = [
  {
    "id": "lunar-module",
    "equipment": "Apollo Lunar Modules",
    "name": "Eagle",
    "personality": "The caring captain",
    "image": lunarModule.url,
    "location": "moon",
    "greeting": "Steady now, little astronauts. I’ll help you get home!",
    "dialogue": "Hi! I’m a Lunar Module. My bottom half stayed here on the Moon and worked as a launch pad, so my top half could blast the astronauts back to space!",
    "information": "Lunar Modules were the spacecraft that carried astronauts from space down to the Moon. Each one had two parts: a bottom half with landing legs and a top half where the astronauts rode. Six missions landed between 1969 and 1972, so six bottom halves are still on the Moon today, including Apollo 11’s Eagle at Tranquility Base."
  },
  {
    "id": "moon-buggy",
    "equipment": "Lunar Roving Vehicles",
    "name": "Rover Rex",
    "personality": "The playful speedster",
    "image": moonBuggy.url,
    "location": "moon",
    "greeting": "Last one to the crater is a moon rock!",
    "dialogue": "Beep beep! I’m a moon buggy! My wheels are made of woven wire, not rubber, and they have no air inside!",
    "information": "Three moon buggies were driven on Apollo 15, 16 and 17 (1971-1972). They folded up flat to fit inside the Lunar Module, and each one ran on batteries. They carried two astronauts, their tools and moon rocks. On Apollo 17, a fender broke and the astronauts fixed it with duct tape and maps!"
  },
  {
    "id": "alsep",
    "equipment": "ALSEP Science Stations",
    "name": "Professor AL",
    "personality": "The patient scientist",
    "image": alsep.url,
    "location": "moon",
    "greeting": "A little patience and a lot of listening—that’s science!",
    "dialogue": "I’m a science station! I measured moonquakes and sent messages to Earth for years, until NASA switched me off in 1977.",
    "information": "ALSEPs were sets of science tools left by the Apollo 12, 14, 15, 16 and 17 crews. They measured moonquakes, heat coming from inside the Moon, and magnetic fields. They ran on a small nuclear power source, because solar panels can’t last through the Moon’s two-week-long night. Laser mirrors left nearby by Apollo 11, 14 and 15 are still used today to measure the distance to the Moon."
  },
  {
    "id": "surveyor",
    "equipment": "Surveyor Landers",
    "name": "Scout Surveyor",
    "personality": "The brave trailblazer",
    "image": surveyor.url,
    "location": "moon",
    "greeting": "I’ll go first! There’s a whole new world to discover.",
    "dialogue": "I’m Surveyor 3, a robot scout! I landed on the Moon before any astronaut, to check that the ground was strong enough to land on!",
    "information": "NASA sent seven Surveyor robots to the Moon in the 1960s, and five landed safely. They took photos and scooped up soil with a robotic arm. In 1969, Apollo 12 astronauts walked to Surveyor 3 and brought home its camera, so scientists could study how it aged on the Moon."
  },
  {
    "id": "sojourner",
    "equipment": "Sojourner Rover",
    "name": "Sojourner",
    "personality": "The tiny, fearless adventurer",
    "image": sojourner.url,
    "location": "mars",
    "greeting": "Small wheels, big dreams!",
    "dialogue": "I’m Sojourner, the first rover to ever drive on Mars! A 12-year-old girl named Valerie Ambroise helped name me, after a hero named Sojourner Truth!",
    "information": "Sojourner landed on July 4, 1997, riding with the Pathfinder lander. It was about the size of a microwave oven, had six wheels and ran on solar power. It was built to work for one week but lasted about 83 days. It studied rocks with funny names like “Yogi” and “Barnacle Bill.”"
  },
  {
    "id": "spirit",
    "equipment": "Spirit Rover",
    "name": "Spirit",
    "personality": "The determined explorer",
    "image": spirit.url,
    "location": "mars",
    "greeting": "One more rock, one more discovery. I never give up!",
    "dialogue": "I’m Spirit! I was only supposed to work for 3 months, but I explored Mars for about 6 years!",
    "information": "These twin rovers landed in January 2004 and found proof that liquid water once existed on Mars. Spirit got stuck in soft sand in 2009. Opportunity kept going until a giant dust storm blocked its sunlight in 2018, and NASA ended its mission in 2019."
  },
  {
    "id": "opportunity",
    "equipment": "Opportunity Rover",
    "name": "Opportunity",
    "personality": "The cheerful marathoner",
    "image": opportunity.url,
    "location": "mars",
    "greeting": "Another mile? Oh, goody! Let’s see what’s over that hill.",
    "dialogue": "I’m Opportunity! I drove more than 28 miles on Mars, which is farther than a marathon!",
    "information": "These twin rovers landed in January 2004 and found proof that liquid water once existed on Mars. Spirit got stuck in soft sand in 2009. Opportunity kept going until a giant dust storm blocked its sunlight in 2018, and NASA ended its mission in 2019."
  },
  {
    "id": "phoenix",
    "equipment": "Phoenix Lander",
    "name": "Phoenix",
    "personality": "The curious ice detective",
    "image": phoenix.url,
    "location": "mars",
    "greeting": "Something sparkly under the soil? Time to investigate!",
    "dialogue": "I’m Phoenix! I dug into the ground near the Mars north pole and found real water ice!",
    "information": "Phoenix and InSight are landers, so they stay in one spot and can’t drive. Phoenix landed in 2008 and stopped working about five months later, when the dark Martian winter took its sunlight. InSight landed in 2018, and its solar panels got covered in dust in 2022. Its marsquake data helped scientists learn about the inside of Mars."
  },
  {
    "id": "insight",
    "equipment": "InSight Lander",
    "name": "InSight",
    "personality": "The gentle, thoughtful listener",
    "image": insight.url,
    "location": "mars",
    "greeting": "Shhh… every little rumble has a story.",
    "dialogue": "I’m InSight! I listened to Mars and heard more than 1,300 marsquakes!",
    "information": "Phoenix and InSight are landers, so they stay in one spot and can’t drive. Phoenix landed in 2008 and stopped working about five months later, when the dark Martian winter took its sunlight. InSight landed in 2018, and its solar panels got covered in dust in 2022. Its marsquake data helped scientists learn about the inside of Mars."
  },
  {
    "id": "kepler",
    "equipment": "Kepler Space Telescope",
    "name": "Kepler",
    "personality": "The dreamy planet spotter",
    "image": kepler.url,
    "location": "space",
    "greeting": "I wonder who else is out there among those twinkling stars…",
    "dialogue": "I’m Kepler, a space telescope! I stared at one little patch of sky and helped find thousands of planets around other stars!",
    "information": "Kepler launched in 2009 and found over 2,600 confirmed planets by watching for tiny dips in starlight when a planet passes in front of its star. In 2018 it ran out of fuel and couldn’t point at Earth anymore, so NASA retired it. It still floats around the Sun, trailing behind Earth."
  }
];
