import { MongoDB } from "../Database/mongoDB";

export const handler = async (event) => {
  const db = new MongoDB();
  const { userStoryId, devId } = JSON.parse(event.body);
  await db.connect();
  const userStory = await db.setDev(devId, userStoryId);
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
