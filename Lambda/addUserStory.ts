import { MongoDB } from "../Database/mongoDB";
import { UserStory } from "../Database/schema/userStorySchema";

export const handler = async (event) => {
  const db = new MongoDB();
  await db.connect();
  const userStoryData = JSON.parse(event.body) as { epicStoryData: UserStory };
  const userStory = await db.createUserStory(userStoryData);
  db.disconnect();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: userStory?._id,
  };
};
