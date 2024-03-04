import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  password: string;
  role: string;
  mail: string;
  userStory: mongoose.Types.ObjectId[];
  project: mongoose.Types.ObjectId[];
}
const userSchema: Schema<User> = new Schema({
  name: {
    type: String,
    maxlength: 30,
    description: "Inserire il proprio nome o quello dell'azienda",
    required: true,
  },
  password: {
    type: String,
    description: "La password deve essere almeno di 8 caratteri e non più di 1",
    minLength: 8,
    maxLength: 15,
    required: true,
  },
  role: {
    type: String,
    enum: ["pm", "dev", "user"],
    description:
      "Si inserisca uno dei seguenti ruoli di appartenenza: project manager, sviluppatore o cliente",
    default: "user",
  },
  mail: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    description: "Deve essere un indirizzo email valido",
    required: true,
  },
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  userStory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userStory",
    },
  ],
});

const UserModel = mongoose.model<User>("user", userSchema);

export default UserModel;
