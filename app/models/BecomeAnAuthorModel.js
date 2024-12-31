const mongoose = require("mongoose");
const { Schema } = mongoose;

const becomeAnAuthorSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    reason: {
      type: String, // The reason the user wants to become an author
      required: true,
      maxlength: 500, // Limit the reason to 500 characters
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // Allowed statuses
      default: "pending", // Default status
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", becomeAnAuthorSchema);

module.exports = Author;
