import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  provider: {
    type: String,
    required: true,
    default: 'local'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for OAuth IDs
UserSchema.index({ googleId: 1, githubId: 1 }, { unique: true, sparse: true });


// Check if model exists before creating
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
