import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a name"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: {
      salt: String,
      hash: String,
    },
    required: [true, "Please enter a password"],
  },
});

const User = mongoose.model("user", userSchema);

export default User;
