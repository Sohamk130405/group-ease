import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  type: {
    type: String,
    enum: ["Tutorial", "Theory", "Lab", "General"],
  },
  notifications: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      lastReadMessageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);
