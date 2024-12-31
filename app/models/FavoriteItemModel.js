const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for user favorites
const favoriteSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items_type: {
      type: String,
      required: true,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "items_type", // Dynamically reference based on items_type
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Compile the schema into a model
const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
