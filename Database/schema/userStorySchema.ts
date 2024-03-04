import mongoose, { Schema, Document } from "mongoose";

export interface UserStory extends Document {
  title: string;
  descript: string;
  state: string;
  epicStory: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId[];
}
const userStorySchema: Schema<UserStory> = new Schema({
  title: {
    type: String,
    require: true,
  },
  descript: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    default: "To Do",
    enum: ["To Do", "Doing", "Done"],
    description: "indica lo stato dell'user story: To Do, Doing o Done",
  },
  epicStory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "epicStory",
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  feedback: [
    {
      text: String,
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const UserStoryModel = mongoose.model<UserStory>("userStory", userStorySchema);

export default UserStoryModel;
