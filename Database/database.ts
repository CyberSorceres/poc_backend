import mongoose from "mongoose";

export interface Database {
  disconnect(): void;
  connect(): Promise<void>;
  //Comuni
  createProject(projectData): Promise<any>;
  findProjectByID(projectId: mongoose.Types.ObjectId): any;
  delateProject(projectId: mongoose.Types.ObjectId): Promise<void>;
  delateFirstProject(): Promise<void>;
  getProject(projectId: mongoose.Types.ObjectId): Promise<any>;

  //Progetto
  updateNameProject(
    projectId: mongoose.Types.ObjectId,
    newNameProject: mongoose.Types.ObjectId,
  ): Promise<void>;
  setEndDate(projectId: mongoose.Types.ObjectId): Promise<void>;
  setValidated(projectId: mongoose.Types.ObjectId): Promise<void>;
  addUserToProject(
    projectId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ): Promise<void>;
  delateUserToProject(
    projectId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ): Promise<void>;
  addEpicStoryToProject(
    projectId: mongoose.Types.ObjectId,
    epicStoryId: mongoose.Types.ObjectId,
  ): Promise<void>;
  delateEpicStoryToProject(
    projectId: mongoose.Types.ObjectId,
    epicStoryId: mongoose.Types.ObjectId,
  ): Promise<void>;

  //User
  updateNameUser(
    idUser: mongoose.Types.ObjectId,
    newNameUser: String,
  ): Promise<void>;
  updateEmailUser(
    idUser: mongoose.Types.ObjectId,
    newMailUser: String,
  ): Promise<void>;
  updatPasswordUser(
    idUser: mongoose.Types.ObjectId,
    newPasswordUser: String,
  ): Promise<void>;
  updatRoleUser(
    idUser: mongoose.Types.ObjectId,
    newRoleUser: String,
  ): Promise<void>;
  addProjectToUser(
    userId: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
  ): Promise<void>;
  addUserStoryToUser(
    userId: mongoose.Types.ObjectId,
    userStoryId: mongoose.Types.ObjectId,
  ): Promise<void>;
  delateProjectToUser(
    userId: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
  ): Promise<void>;
  delateUserStoryToUser(
    userId: mongoose.Types.ObjectId,
    userStoryId: mongoose.Types.ObjectId,
  ): Promise<void>;

  //epic story
  updateTitleEpicStory(
    epicStoryId: mongoose.Types.ObjectId,
    newTitle: String,
  ): Promise<void>;
  updatedescriptionEpicStory(
    epicStoryId: mongoose.Types.ObjectId,
    newDespription: String,
  ): Promise<void>;
  addProjectToEpicStory(
    epicStoryId: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
  ): Promise<void>;
  delateProjectToEpicStory(epicStoryId: mongoose.Types.ObjectId): Promise<void>;
  addUserStoryToEpicStory(
    epicStoryId: mongoose.Types.ObjectId,
    userStoryId: mongoose.Types.ObjectId,
  ): Promise<void>;
  delateUserStoryToEpicStory(
    epicStoryId: mongoose.Types.ObjectId,
    userStoryId: mongoose.Types.ObjectId,
  ): Promise<void>;
}
