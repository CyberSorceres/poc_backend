import mongoose, { Schema, Document } from "mongoose";

interface Feedback extends Document {
  text: string;
  userStory: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const feedbackSchema: Schema<Feedback> = new Schema({
  text: {
    type: String,
    description: "Inserire il commento",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
  },
  userStory: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "userStory",
  },
});

const FeedbackModel = mongoose.model<Feedback>("feedback", feedbackSchema);

export default FeedbackModel;
