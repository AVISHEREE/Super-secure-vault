import mongoose from "mongoose";

const VaultEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["password", "note", "image", "other"],
    default: "other",
  },
  encryptedData: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
  starred: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  vault: [VaultEntrySchema],
});

export default mongoose.model("User", UserSchema);
