import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FriendCard } from "@/routes/index";
import { explorers } from "@/lib/explorers";

afterEach(cleanup);

describe("Explorer information dialogs", () => {
  for (const explorer of explorers) {
    it(`opens and closes information for ${explorer.name}`, () => {
      render(<FriendCard f={explorer} tone={explorer.location} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: `Meet ${explorer.name}` }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText(explorer.information)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Back to the story" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  }
});