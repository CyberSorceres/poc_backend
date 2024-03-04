import { MongoDB } from "../Database/mongoDB";

export const handler = async (event) => {
  const db = new MongoDB();
  const { text, user, userStoryId } = JSON.parse(event.body);
  await db.connect();
  const userStory = await db.addFeedback(text, user, userStoryId);
  await db.disconnect();
  return {
    statusCode: 200,
    body: JSON.stringify(userStory),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
