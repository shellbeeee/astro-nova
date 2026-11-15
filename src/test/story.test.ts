import { describe, expect, it } from "vitest";
import { chapters, characterStories, equipmentAge, storyTitle } from "@/lib/story";
import { explorers } from "@/lib/explorers";

describe("Story structure and character ages", () => {
  it("keeps the requested four chapters in plot order", () => {
    expect(chapters.map(c => c.id)).toEqual(["launch", "moon", "mars", "starovia"]);
    expect(chapters.map(c => c.number)).toEqual([1, 2, 3, 4]);
  });
  it("uses the requested story title", () => {
    expect(storyTitle).toBe("Lost Among the Stars, Found by Us");
  });
  it("gives all ten equipment characters an age without discarding mission data", () => {
    expect(explorers).toHaveLength(10);
    for (const explorer of explorers) expect(characterStories[explorer.id]).toBeDefined();
    expect(equipmentAge("surveyor", 2026)).toBe(59);
    expect(equipmentAge("insight", 2026)).toBe(8);
    expect(equipmentAge("surveyor", 2026)).toBeGreaterThan(equipmentAge("insight", 2026) ?? 0);
  });
});