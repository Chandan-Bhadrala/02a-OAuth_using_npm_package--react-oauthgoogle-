import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  },
);

// To create a model to interact w/ the mongoose.
// We've called a mongoose.model function with two arguments.
// One is the name of the collection "users" and other is the schema that goes into that collection.
// And we receive back a model, which we store in the User variable.
export const User = mongoose.model("users", UserSchema);

/**
A version for the NextJS.
// Use "mongoose.models.User" to check if the model exists before creating a new one.
// This prevents the "Cannot overwrite model once compiled" error.
const User = mongoose.models.User || mongoose.model("User", UserSchema);
*/
