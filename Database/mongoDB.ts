import mongoose from "mongoose";
import { Database } from "./database";
import User from "./schema/userSchema";
import Project from "./schema/projectSchema";
import EpicStory from "./schema/epicStorySchema";
import UserStory from "./schema/userStorySchema";
import { ObjectId } from "mongoose";

export class MongoDB implements Database {
  async connect() {
    const dbURI =
      "mongodb+srv://cybersorcerers23:" +
      process.env.PASSWORD_DB +
      "@cybersorcerersdb.oletifm.mongodb.net/cybersorcerersDB?retryWrites=true&w=majority";

    await mongoose
      .connect(dbURI)
      .then(() => {
        console.log("Connesso");
      })
      .catch((error) => {
        console.error("Errore durante la connessione", error);
      });
  }

  disconnect() {
    try {
      if (mongoose.connection.readyState === 1) {
        mongoose.disconnect();
        console.log("Disconnesso ");
      } else {
        console.log("Non sei connesso al database");
      }
    } catch (error) {
      console.error("Errore durante la disconnessione:", error);
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

  findProjectByID(projectId) {
    const project = Project.findById(projectId);

    if (!project) {
      console.error("Project not found");
      return;
    }
    return project;
  }

  async delateProject(projectId) {
    try {
      // Trova l'utente con l'ID specificato e elimina il documento
      const result = await Project.deleteOne({ _id: projectId });

      if (result.deletedCount === 1) {
        console.log("Progetto cancellato con successo");
      } else {
        console.error("Nessun progetto trovato con l'ID specificato");
      }
    } catch (error) {
      console.error("Errore durante la cancellazione del progetto:", error);
    }
  }

  async updateNameProject(projectId, newNameProject) {
    try {
      const result = await Project.updateOne(
        { _id: projectId },
        { name: newNameProject },
      );
      console.log("Nome modificato con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica del nome del progetto:" + projectId,
        err,
      );
    }
  }

  async setEndDate(projectId) {
    try {
      const result = await Project.updateOne(
        { _id: projectId },
        { endDate: Date.now },
      );
      console.log("Aggiunta data di fine: ", result);
    } catch (err) {
      console.error(
        "Errore durante l'aggiunta della data di fine:" + projectId,
        err,
      );
    }
  }

  async setValidated(projectId) {
    const project = await this.findProjectByID(projectId);
    if (project) {
      if (!project.validate) {
        Project.updateOne({ _id: projectId }, { validate: true });
        this.setEndDate(projectId);
        console.log(
          "Il Progetto è stato validato in data: " + project.endDate,
          project,
        );
      } else {
        console.log(
          "Il Progetto è gia stato validato in data: " + project.endDate,
        );
      }
    }
  }

  async getEpicStory(epicStoryId: ObjectId) {
    const epicStory = await EpicStory.findById(epicStoryId);
    epicStory.userStory = await Promise.all(
      epicStory.userStory.map((id) => this.getUserStory(id)),
    );
    return epicStory;
  }

  async getUserStory(userStoryId: ObjectId) {
    const userStory = await UserStory.findById(userStoryId);
    userStory.user = await Promise.all(
      userStory.user.map((id) => this.getUser(id)),
    );
    return userStory;
  }

  async getUser(userId: ObjectId) {
    return await User.findById(userId);
  }

  async getProject(projectId) {
    try {
      const project = await Project.findById(projectId);
      project?.epicStory = await Promise.all(
        project?.epicStory?.map((id) => this.getEpicStory(id)),
      );
      project?.user = await Promise.all(
        project?.user?.map((id) => this.getUser(id)),
      );
      return project;
    } catch (error) {
      return null;
    }
  }

  getProjects(user) {
    try {
      const projects = Project.find({});
      return projects;
    } catch (error) {
      return null;
    }
  }

  async addUserToProject(projectId, userId) {
    // Trova l'utente con l'ID specificato
    const project = await Project.findById(projectId);
    if (!project) {
      console.error("Progetto non trovato");
      return;
    }
    if (this.checkIfUserExists(userId)) {
      // Aggiungi il progetto all'array dei progetti dell'utente
      project.user.push(userId);
      //popolate('project').exe() per popolare un progetto ed usare i suoi campi
      await project.save();
      console.log("Utente aggiunto con successo al progetto:", project);
    } else {
      console.error(
        "L'utente specificato non esiste nel database o si è verificato un errore durante la ricerca.",
      );
    }
  }

  async delateUserToProject(projectId, userId) {
    try {
      // Trova il progetto con l'ID specificato
      const project = await Project.findById(projectId);

      if (!project) {
        console.error("Progetto non trovato");
        return;
      }

      // Rimuovi l'utente dall'array degli utente del progetto
      project.user = project.user.filter((user) => user.toString() !== userId);

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

  async delateEpicStoryToProject(projectId, epicStoryId) {
    try {
      // Trova il progetto con l'ID specificato
      const project = await Project.findById(projectId);

      if (!project) {
        console.error("Progetto non trovato");
        return;
      }

      // Rimuovi l'utente dall'array degli utente del progetto
      project.epicStory = project.epicStory.filter(
        (epicStory) => epicStory.toString() !== epicStoryId,
      );

      // Salva le modifiche
      await project.save();

      console.log(
        "L'epic story e' stata rimossa con successo dal progetto:",
        project,
      );
    } catch (error) {
      console.error(
        "Errore durante la rimozione dell'epic story dal progetto:",
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

      console.log("User created successfully:", newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }

  findUserByID(userId) {
    const user = User.findById(userId);

    if (!user) {
      console.error("Utente non trovato");
      return;
    }
    return user;
  }

  async delateUser(idUser) {
    try {
      // Trova l'utente con l'ID specificato e elimina il documento
      const result = await User.deleteOne({ _id: idUser });

      if (result.deletedCount === 1) {
        console.log("Utente cancellato con successo");
      } else {
        console.error("Nessun utente trovato con l'ID specificato");
      }
    } catch (error) {
      console.error("Errore durante la cancellazione dell'utente:", error);
    }
  }

  async delateFirstUser() {
    const utente = await User.findOne();
    if (utente) {
      console.log(utente._id);
      await this.delateUser(utente._id);
    }
  }

  async updateNameUser(idUser, newNameUser) {
    try {
      const result = User.updateOne({ _id: idUser }, { name: newNameUser });
      console.log("Nome modificato con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica del nome dell'utente:" + idUser,
        err,
      );
    }
  }

  async updateEmailUser(idUser, newEmailUser) {
    try {
      const result = await User.updateOne(
        { _id: idUser },
        { mail: newEmailUser },
      );
      console.log("Mail modificata con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica della mail dell'utente:" + idUser,
        err,
      );
    }
  }

  async updatPasswordUser(idUser, newPasswordUser) {
    try {
      const result = await User.updateOne(
        { _id: idUser },
        { password: newPasswordUser },
      );
      console.log("Password modificato con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica della password dell'utente:" + idUser,
        err,
      );
    }
  }

  async updatRoleUser(idUser, newRoleUser) {
    try {
      const result = await User.updateOne(
        { _id: idUser },
        { role: newRoleUser },
      );
      console.log("Ruolo modificato con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica del ruolo dell'utente:" + idUser,
        err,
      );
    }
  }

  checkIfUserExists(userId) {
    try {
      // Cerca un progetto con l'ID specificato nel database
      const user = User.findById(userId);
      if (user != null) {
        console.log("L'utente esiste nel database:", userId);
        return true;
      } else {
        console.log("L'utente non esiste nel database");
        return false;
      }
    } catch (error) {
      console.error(
        "Errore durante la verifica dell'esistenza del'utente:",
        error,
      );
      return false;
    }
  }

  async addProjectToUser(userId, projectId) {
    // Trova l'utente con l'ID specificato
    const user = await User.findById(userId);
    if (!user) {
      console.error("Utente non trovato");
      return;
    }
    if (this.getProject(projectId)) {
      // Aggiungi il progetto all'array dei progetti dell'utente

      user.project.push(projectId);
      //popolate('project').exe() per popolare un progetto ed usare i suoi campi
      await user.save();
      console.log("Progetto aggiunto con successo all'utente:", user);
    } else {
      console.error(
        "Il progetto specificato non esiste nel database o si è verificato un errore durante la ricerca.",
      );
    }
  }

  async addUserStoryToUser(userId, userStoryId) {
    // Trova l'utente con l'ID specificato
    const user = await User.findById(userId);
    if (!user) {
      console.error("Utente non trovato");
      return;
    }
    if (this.checkIfUserStoryExists(userStoryId)) {
      // Aggiungi il progetto all'array dei progetti dell'utente

      user.userStory.push(userStoryId);
      //popolate('project').exe() per popolare un progetto ed usare i suoi campi
      await user.save();
      console.log("Progetto aggiunto con successo all'utente:", user);
    } else {
      console.error(
        "Il progetto specificato non esiste nel database o si è verificato un errore durante la ricerca.",
      );
    }
  }

  async delateProjectToUser(userId, projectId) {
    try {
      // Trova l'utente con l'ID specificato
      const user = await User.findById(userId);

      if (!user) {
        console.error("Utente non trovato");
        return;
      }

      // Rimuovi il progetto dall'array dei progetti dell'utente
      user.project = user.project.filter(
        (project) => project.toString() !== projectId,
      );

      // Salva le modifiche all'utente
      await user.save();

      console.log("Progetto rimosso con successo dall'utente:", user);
    } catch (error) {
      console.error(
        "Errore durante la rimozione del progetto dall'utente:",
        error,
      );
    }
  }

  async delateUserStoryToUser(userId, userStoryId) {
    try {
      // Trova l'utente con l'ID specificato
      const user = await User.findById(userId);

      if (!user) {
        console.error("Utente non trovato");
        return;
      }

      // Rimuovi il progetto dall'array dei progetti dell'utente
      user.userStory = user.userStory.filter(
        (userStory) => userStory.toString() !== userStoryId,
      );

      // Salva le modifiche all'utente
      await user.save();

      console.log("Progetto rimosso con successo dall'utente:", user);
    } catch (error) {
      console.error(
        "Errore durante la rimozione del progetto dall'utente:",
        error,
      );
    }
  }

  //Method Epic Story
  async createEpicStory(epicStoryData) {
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

  findEpicStoryByID(epicStoryId) {
    const epicStory = Project.findById(epicStoryId);

    if (!epicStory) {
      console.error("Epic Story not found");
      return;
    }
    return epicStory;
  }

  async delateEpicStory(epicStoryId) {
    try {
      // Trova l'utente con l'ID specificato e elimina il documento
      const result = await EpicStory.deleteOne({ _id: epicStoryId });

      if (result.deletedCount === 1) {
        console.log("Epic Story cancellato con successo");
      } else {
        console.error("Nessuna Epic Story trovato con l'ID specificato");
      }
    } catch (error) {
      console.error("Errore durante la cancellazione del'epic story:", error);
    }
  }

  async delateFirstEpicStory() {
    const epicStory = await EpicStory.findOne();
    if (epicStory) {
      console.log(epicStory._id);
      await this.delateEpicStory(epicStory._id);
    }
  }

  async updateTitleEpicStory(epicStoryId, newTitle) {
    try {
      const result = EpicStory.updateOne(
        { _id: epicStoryId },
        { title: newTitle },
      );
      console.log("Titolo modificato con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica del titolo dell'epic story:" + epicStoryId,
        err,
      );
    }
  }

  async updatedescriptionEpicStory(epicStoryId, newDespription) {
    try {
      const result = EpicStory.updateOne(
        { _id: epicStoryId },
        { descript: newDespription },
      );
      console.log("Descrizione modificato con successo:", result);
    } catch (err) {
      console.error(
        "Errore durante la modifica della descrizione dell'epic story:" +
          epicStoryId,
        err,
      );
    }
  }

  checkIfEpicStoryExists(epicStoryId) {
    try {
      // Cerca un progetto con l'ID specificato nel database
      const epicStory = EpicStory.findById(epicStoryId);

      if (epicStory) {
        console.log("L'epic story esiste nel database:", epicStory);
        return true;
      } else {
        console.log("L'epic story non esiste nel database");
        return false;
      }
    } catch (error) {
      console.error(
        "Errore durante la verifica dell'esistenza del'epic story:",
        error,
      );
      return false;
    }
  }

  async addProjectToEpicStory(epicStoryId, projectId) {
    try {
      // Trova l'epic story con l'ID specificato
      const epicStory = await EpicStory.findByIdAndUpdate(
        epicStoryId,
        // Aggiorna l'epic story inserendo il nuovo progetto
        { $set: { project: projectId } },
        // Opzioni per restituire il documento aggiornato
        //{ new: true }
      );

      if (!epicStory) {
        console.error("Epic Story non trovata");
        return;
      }

      console.log("Progetto aggiunto con successo all'epic story:", epicStory);
    } catch (error) {
      console.error(
        "Errore durante l'aggiunta del progetto all'epic story:",
        error,
      );
    }
  }
  async delateProjectToEpicStory(epicStoryId) {
    try {
      // Trova il progetto con l'ID specificato
      const epicStory = await EpicStory.findByIdAndUpdate(
        epicStoryId,
        // Aggiorna l'epic story inserendo il nuovo progetto
        { $set: { project: null } },
        // Opzioni per restituire il documento aggiornato
        { new: true },
      );

      console.log("Progetto rimosso con successo dall'epic story:", epicStory);
    } catch (error) {
      console.error(
        "Errore durante la rimozione del progetto dall'epic story:",
        error,
      );
    }
  }

  async delateUserStoryToEpicStory(epicStoryId, userStoryId) {
    try {
      // Trova il progetto con l'ID specificato
      const epicStory = await EpicStory.findById(epicStoryId);

      if (!epicStory) {
        console.error("Epic Story non trovato");
        return;
      }

      // Rimuovi l'utente dall'array degli utente del progetto
      epicStory.userStory = epicStory.userStory.filter(
        (userStory) => userStory.toString() !== userStoryId,
      );

      // Salva le modifiche
      await epicStory.save();

      console.log(
        "L'user story e' stata rimossa con successo dall'epic story:",
        epicStory,
      );
    } catch (error) {
      console.error(
        "Errore durante la rimozione dell'user story dall'epic story:",
        error,
      );
    }
  }
  //Method User story

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

  async addUserStoryToEpicStory(userStoryData) {
    // Trova l'utente con l'ID specificato
    const epicStory = await EpicStory.findById(userStoryData.epicStory);
    const userStory = new UserStory(userStoryData);
    if (!epicStory) {
      throw new Error("Epic Story non trovato");
    }
    epicStory.userStory.push(userStory._id);
    await epicStory.save();
    await userStory.save();
    return userStory;
  }

  async addUserToUserStory(userStoryId, userId) {
    // Trova l'utente con l'ID specificato
    const userStory = await UserStory.findById(userStoryId);
    if (!userStory) {
      console.error("Epic Story non trovata");
      return;
    }
    if (this.checkIfUserExists(userId)) {
      // Aggiungi il progetto all'array dei progetti dell'utente
      userStory.user.push(userId);
      //popolate('project').exe() per popolare un progetto ed usare i suoi campi
      await userStory.save();
      console.log(
        "User story aggiunto con successo all'epic story:",
        userStory,
      );
    } else {
      console.error(
        "L'user story specificato non esiste nel database o si è verificato un errore durante la ricerca.",
      );
    }
  }

  async addFeedback(text: string, user: string, userStoryId: string) {
    const userStory = await UserStory.findById(userStoryId);
    if (!userStory) {
      throw new Error("invalid user story");
    }
    userStory.feedback.push({ text, user });
    await userStory.save();
    return userStory;
  }

  async setState(state: string, userStoryId: string) {
    return await UserStory.updateOne({ _id: userStoryId }, { state });
  }

  async setDev(devId: string, userStoryId: string) {
    return await UserStory.updateOne({ _id: userStoryId }, { user: devId });
  }

  checkIfUserStoryExists(userStoryId) {
    try {
      // Cerca un progetto con l'ID specificato nel database
      const userStory = UserStory.findById(userStoryId);

      if (userStory) {
        console.log("L'user story esiste nel database:", userStory);
        return true;
      } else {
        console.log("L'user story non esiste nel database");
        return false;
      }
    } catch (error) {
      console.error(
        "Errore durante la verifica dell'esistenza del'user story:",
        error,
      );
      return false;
    }
  }
}
