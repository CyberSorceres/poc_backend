import { MongoDB } from "../Database/mongoDB";

export const handler = async (event) => {
  const db = new MongoDB();
  const { userStoryId, state } = JSON.parse(event.body);
  await db.connect();
  const userStory = await db.setState(state, userStoryId);
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
