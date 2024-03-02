import { MongoDB } from "../Database/mongoDB";
import { EpicStory } from "../Database/schema/epicStorySchema.ts";

export const handler = async (event) => {
  const db = new MongoDB();
  await db.connect();
  const epicStoryData = JSON.parse(event.body) as { epicStoryData: EpicStory };
  const epicStory = await db.addEpicStoryToProject(epicStoryData);
  db.disconnect();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: epicStory._id,
  };
};
