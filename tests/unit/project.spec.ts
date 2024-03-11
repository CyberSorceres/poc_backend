import { expect, describe, it, beforeEach, vi } from "vitest";
import { handler as addProgetto } from "./Lambda/addProgetto";
import { handler as getProgetto } from "./Lambda/getProgetto";
//import mockify from '@jazim/mock-mongoose';

vi.mock("../../Database/mongoDB", async () => {
  const { MockDb } = await import("../../Database/mockDb");
  return {
    MongoDB: MockDb,
  };
});

describe("Project tests", () => {
  it("creates project successfully", async () => {
    expect(
      (
        await addProgetto({
          body: JSON.stringify({ name: "Progetto 1" }),
        })
      ).body,
    ).toBe(0);
    expect(
      JSON.parse(
        (
          await getProgetto({
            queryStringParameters: {
              id: 0,
            },
          })
        ).body,
      ),
    ).toStrictEqual({
      project: {
        _id: 0,
        name: "Progetto 1",
      },
    });
  });
});
