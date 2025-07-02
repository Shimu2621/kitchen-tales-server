const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userSchema = new Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    userPhoto: { type: String, default: "default.jpg" },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    address: { type: String },
    role: { type: String, enum: ["user", "admin", "author"], default: "user" },
  },
  { timestamps: true }
);

//This middleware(Pre-save Middleware) runs automatically before saving a user document
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error); //If hashing fails, it calls next(error) to handle the error.
  }
});

//Defines a method for the user schema to compare a plain-text password with the hashed password stored in the database:
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// check if a user is an admin
userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

const User = mongoose.model("User", userSchema);

module.exports = User;
