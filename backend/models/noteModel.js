import mongoose from "mongoose";

// 1️⃣ Create schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 2️⃣ Create model
const Note = mongoose.model("Note", noteSchema);

export default Note;
