import { expect, describe, it, beforeEach, vi } from "vitest";
import { MockDb } from "../../Database/mockDb";
import { handler as addEpicStory } from "./Lambda/addEpicStory";

vi.mock("../../Database/mongoDB", async () => {
  const { MockDb } = await import("../../Database/mockDb");
  return {
    MongoDB: MockDb,
  };
});

describe("epic stories tests", () => {
  beforeEach(() => {
    MockDb.reset();
    const db = new MockDb();
    db.createProject({
      name: "Progetto",
      epicStories: [],
    });
  });
  it("creates epic story", async () => {
    expect(
      JSON.parse(
        (
          await addEpicStory({
            body: JSON.stringify({
              name: "Epic story 1",
              project: 0,
            }),
          })
        ).body,
      ),
    ).toBe(1);
  });
});
