import mongoose from "mongoose";

export interface Visitor {
  createObject(projectData): Promise<any>;
  findObject(projectId: mongoose.Types.ObjectId): any;
  delateObject(projectId: mongoose.Types.ObjectId): Promise<void>;
  delateFirstObject(): Promise<void>;
}
