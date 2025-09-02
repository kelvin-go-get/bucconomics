import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Community", communitySchema);
