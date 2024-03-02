import mongoose, { Schema, Document } from "mongoose";

export interface EpicStory extends Document {
  title: string;
  descript: string;
  project: mongoose.Types.ObjectId;
  userStory: mongoose.Types.ObjectId[];
}

const epicStorySchema: Schema<EpicStory> = new Schema({
  title: {
    type: String,
    require: true,
  },
  descript: {
    type: String,
    require: true,
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: false,
  },
  userStory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userStory",
    },
  ],
});

const EpicStoryModel = mongoose.model<EpicStory>("epicStory", epicStorySchema);

export default EpicStoryModel;
