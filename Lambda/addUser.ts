import { MongoDB } from "../Database/mongoDB";

export const handler = async () => {
  const db = new MongoDB();
  await db.connect();
  const newname = "Sabrina";
  const newpassword = "12345678";
  const newmail = "sabrina@prova.com";
  const newrole = "sviluppatore";
  await db.createUser({
    name: newname,
    password: newpassword,
    mail: newmail,
    role: newrole,
  });
  db.disconnect();
};
