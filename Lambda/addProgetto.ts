import { MongoDB } from "../Database/mongoDB";

export const handler = async (event) => {
  const db = new MongoDB();
  const projectData = JSON.parse(event.body);
  await db.connect();
  const project = await db.createProject(projectData);
  db.disconnect();
  return {
    statusCode: 200,
    body: project?._id,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
