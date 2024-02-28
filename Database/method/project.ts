import mongoose from "mongoose";
import { Visitor } from "./visitor";
import User from "../schema/userSchema";
import Project from "../schema/projectSchema";
import EpicStory from "../schema/epicStorySchema";
import UserStory from "../schema/userStorySchema";

export class ObjectClass implements Visitor {
  async createObject(projectData) {
    try {
      // Crea una nuova istanza del modello User con i dati forniti
      const newProject = new Project(projectData);

      // Salva il nuovo utente nel database
      await newProject.save();

      console.log("Progect created successfully:", newProject);
      return newProject;
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  }

  findObject(projectId) {
    const project = Project.findById(projectId);

    if (!project) {
      console.error("Project not found");
      return;
    }
    return project;
  }

  async delateObject(projectId) {
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

  async delateFirstObject() {
    const project = await Project.findOne();
    if (project) {
      console.log(project._id);
      await this.delateObject(project._id);
    }
  }
}
