import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: [
      "CS",
      "CSAI",
      "CSAIML",
      "IT",
      "AIDS",
      "ME",
      "ENTC",
      "CHEM",
      "INSTRU",
    ],
  },
  year: {
    type: String,
    required: true,
    enum: ["First", "Second", "Third", "Fourth"],
  },
  division: {
    type: String,
    enum: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
    ],
  },
  batch: {
    type: Number,
    enum: [1, 2, 3, 4],
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
    enum: ["Tutorial", "Theory", "Lab"],
  },
  lastReadMessageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
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
