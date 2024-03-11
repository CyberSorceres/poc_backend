import mongoose from "mongoose";
import { Database } from "./database";
import User from "./schema/userSchema";
import Project from "./schema/projectSchema";
import EpicStory from "./schema/epicStorySchema";
import UserStory from "./schema/userStorySchema";
type ObjectId = mongoose.Types.ObjectId;

export class MongoDB implements Database {
  async connect() {
    const dbURI =
      "mongodb+srv://cybersorcerers23:" +
      process.env.PASSWORD_DB +
      "@cybersorcerersdb.oletifm.mongodb.net/cybersorcerersDB?retryWrites=true&w=majority";

    await mongoose.connect(dbURI);
  }

  disconnect() {
    try {
      if (mongoose.connection.readyState === 1) {
        mongoose.disconnect();
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Metodi per il prgetto
  async createProject(projectData) {
    try {
      // Crea una nuova istanza del modello User con i dati forniti
      const newProject = new Project(projectData);

      // Salva il nuovo utente nel database
      await newProject.save();
      return newProject;
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  }

  async findProjectByID(projectId: ObjectId) {
    const project = await Project.findById(projectId);

    if (!project) {
      console.error("Project not found");
      return null;
    }
    return project;
  }

  async deleteProject(projectId: ObjectId) {
    try {
      // Trova l'utente con l'ID specificato e elimina il documento
      return await Project.deleteOne({ _id: projectId });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async setEndDate(projectId: ObjectId) {
    try {
      const result = await Project.updateOne(
        { _id: projectId },
        { endDate: Date.now },
      );
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async setValidated(projectId: ObjectId) {
    const project = await this.findProjectByID(projectId);
    if (project) {
      if (!project.validate) {
        await Project.updateOne({ _id: projectId }, { validate: true });
        return await this.setEndDate(projectId);
      } else {
        return null;
      }
    }
  }

  async getEpicStory(epicStoryId: ObjectId) {
    const epicStory = await EpicStory.findById(epicStoryId);
    // @ts-ignore
    epicStory.userStory = await Promise.all(
      // @ts-ignore
      epicStory.userStory?.map((id) => this.getUserStory(id)),
    );
    return epicStory;
  }

  async getUserStory(userStoryId: ObjectId) {
    const userStory = await UserStory.findById(userStoryId);
    // @ts-ignore
    userStory.user = await Promise.all(
      // @ts-ignore
      userStory.user.map((id) => this.getUser(id)),
    );
    return userStory;
  }

  async getUser(userId: ObjectId) {
    return await User.findById(userId);
  }

  async getProject(projectId: ObjectId) {
    try {
      const project = await Project.findById(projectId);
      project.epicStory = (await Promise.all(
        project?.epicStory?.map((id) => this.getEpicStory(id)),
      )) as any;
      // @ts-ignore
      project.user = await Promise.all(
        // @ts-ignore
        project?.user?.map((id) => this.getUser(id)),
      );
      return project;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getProjects(user) {
    try {
      const projects = await Project.find({});
      return projects;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addUserToProject(projectId: ObjectId, userId: ObjectId) {
    // Trova l'utente con l'ID specificato
    const project = await Project.findById(projectId);
    if (!project) {
      return null;
    }
    if (await this.checkIfUserExists(userId)) {
      // Aggiungi il progetto all'array dei progetti dell'utente
      project.user.push(userId);
      return await project.save();
    } else {
      return null;
    }
  }

  async deleteUserToProject(projectId: ObjectId, userId: ObjectId) {
    try {
      // Trova il progetto con l'ID specificato
      const project = await Project.findById(projectId);

      if (!project) {
        console.error("Progetto non trovato");
        return;
      }

      // Rimuovi l'utente dall'array degli utente del progetto
      project.user = project.user.filter(
        (user) => user.toString() !== userId.toString(),
      );

      // Salva le modifiche
      await project.save();

      console.log("Utente rimosso con successo dal progetto:", project);
    } catch (error) {
      console.error(
        "Errore durante la rimozione dell'utente dal progetto:",
        error,
      );
    }
  }

  //Metodi User
  async createUser(userData) {
    try {
      // Crea una nuova istanza del modello User con i dati forniti
      const newUser = new User(userData);

      // Salva il nuovo utente nel database
      await newUser.save();

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error.message);
      return null;
    }
  }

  async findUserByID(userId: ObjectId) {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }
    return user;
  }

  async deleteUser(idUser: ObjectId) {
    try {
      return await User.deleteOne({ _id: idUser });
    } catch (error) {
      console.error(error);
    }
  }

  async checkIfUserExists(userId: ObjectId) {
    try {
      // Cerca un progetto con l'ID specificato nel database
      const user = await User.findById(userId);
      return !!user;
    } catch (error) {
      return false;
    }
  }

  //Method Epic Story
  async createEpicStory(epicStoryData: any) {
    try {
      // Crea una nuova istanza del modello Epic Story con i dati forniti
      const newEpicStory = new EpicStory(epicStoryData);

      // Salva la nuova epic story nel database
      await newEpicStory.save();

      console.log("Epic Story created successfully:", newEpicStory);
      return newEpicStory;
    } catch (error) {
      console.error("Error creating epic story:", error.message);
    }
  }

  async deleteEpicStory(epicStoryId: ObjectId) {
    try {
      // Trova l'utente con l'ID specificato e elimina il documento
      return await EpicStory.deleteOne({ _id: epicStoryId });
    } catch (error) {
      console.error(error);
    }
  }

  async createUserStory(userStoryData) {
    try {
      // Crea una nuova istanza del modello Epic Story con i dati forniti
      const newUserStory = new UserStory(userStoryData);

      // Salva la nuova epic story nel database
      await newUserStory.save();

      console.log("User Story created successfully:", newUserStory);
      return newUserStory;
    } catch (error) {
      console.error("Error creating user story:", error.message);
    }
  }

  async addFeedback(text: string, user: ObjectId, userStoryId: ObjectId) {
    const userStory = await UserStory.findById(userStoryId);
    if (!userStory) {
      throw new Error("invalid user story");
    }
    // @ts-ignore
    userStory.feedback.push({ text, user });
    await userStory.save();
    return userStory;
  }

  async setState(state: string, userStoryId: ObjectId) {
    return await UserStory.updateOne({ _id: userStoryId }, { state });
  }

  async addDev(devId: ObjectId, userStoryId: ObjectId) {
    return await UserStory.updateOne(
      { _id: userStoryId },
      {
        $push: { user: devId },
      },
    );
  }

  async removeDev(devId: ObjectId, userStoryId: ObjectId) {
    return await UserStory.updateOne(
      { _id: userStoryId },
      {
        $pull: { user: devId },
      },
    );
  }
}
