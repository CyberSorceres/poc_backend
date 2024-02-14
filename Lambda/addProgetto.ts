import {MongoDB} from '../Database/MongoDB';

export const handler = async () => {
    const db = new MongoDB();
    await db.connect();
    await db.createProject({name:"Progetto 2"});
    db.disconnect();
}