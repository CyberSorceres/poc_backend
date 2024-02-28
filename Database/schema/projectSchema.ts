import mongoose, { Schema, Document } from "mongoose";
//const epicStory=require("./epicStorySchema");

interface Project extends Document {
  name: string;
  validation: boolean;
  startDate: Date;
  endDate: Date;
  epicStory: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId[];
}

const projectSchema: Schema<Project> = new Schema({
  name: {
    type: String,
    description: "Inserire il nome del progetto",
    required: true,
  },
  validation: {
    type: Boolean,
    description: "Inserire se il progetto è stato validato o no",
    required: true,
    default: false,
  },
  startDate: {
    type: Date,
    description: "Inserire la data di inizio del progetto",
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    description: "Inserire la data di fine del progetto",
    default: null,
  },
  epicStory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "epicStory",
    },
  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const ProjectModel = mongoose.model<Project>("project", projectSchema);

export default ProjectModel;
