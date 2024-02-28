import { MongoDB } from "../Database/mongoDB";
import Project from "../Database/schema/projectSchema";

export const handler = async () => {
  const db = new MongoDB();
  await db.connect();
  const idProject = await Project.findOne();
  await db.delateProject(idProject);
  db.disconnect();
};
