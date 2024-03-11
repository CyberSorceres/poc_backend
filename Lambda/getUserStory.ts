import { MongoDB } from "../Database/mongoDB";

export const handler = async (event) => {
  const { id } = event.queryStringParameters;
  const db = new MongoDB();
  await db.connect();
  try {
    const userStory = await db.getUserStory(id);
    return {
      statusCode: 200,
      body: JSON.stringify(userStory),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Project not found" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }
};
