import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty"],
      default: "student",
    },
    prn: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    branch: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    year: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    division: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    batch: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    sem: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
