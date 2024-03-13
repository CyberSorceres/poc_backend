import { expect, describe, it, beforeEach, vi } from "vitest";
import { MockDb } from "../../Database/mockDb";
import { handler as addUserStory } from "./Lambda/addUserStory";
import { handler as setDev } from "./Lambda/setDev";

vi.mock("../../Database/mongoDB", async () => {
  const { MockDb } = await import("../../Database/mockDb");
  return {
    MongoDB: MockDb,
  };
});

describe("user story tests", () => {
  beforeEach(() => {
    MockDb.reset();
    const db = new MockDb();
    db.createProject({
      name: "Progetto",
      epicStories: [
        {
          _id: MockDb.id++,
          name: "Epic",
          userStories: [],
        },
      ],
    });
  });
  it("creates user story", async () => {
    expect(
      JSON.parse(
        (
          await addUserStory({
            body: JSON.stringify({
              name: "UserStory 1",
              epicStory: 1,
            }),
          })
        ).body,
      ),
    ).toBe(2);
  });
  it("sets dev correctly", async () => {
    expect(
      JSON.parse(
        (
          await addUserStory({
            body: JSON.stringify({
              name: "UserStory 1",
              epicStory: 1,
            }),
          })
        ).body,
      ),
    ).toBe(2);
    await setDev({
      body: JSON.stringify({
        userStoryId: 2,
        devId: 10,
      }),
    });
    const db = new MockDb();
    expect((await db.getUserStory(2)).dev).toBe(10);
  });
});
