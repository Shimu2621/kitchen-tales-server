const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for a recipe
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true, // URL of the recipe image
    },
    description: {
      type: String, // A brief description of the recipe
      required: true,
    },
    method: {
      type: [String], // Array of steps for preparing the recipe
      required: true,
    },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String }, // Optional field for quantity (e.g., "1 cup")
      },
    ],
    servings: {
      type: Number,
      required: true, // Number of servings
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: { type: Number, default: 0 }, // Add rating field
    postedDate: { type: Date, default: Date.now },
    reviews: [
      {
        reviewer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5, // Star rating between 1 and 5
        },
        reviewText: { type: String, required: true },
        date: { type: Date, default: Date.now }, // Review submission date
      },
    ],
    category: {
      type: String,
      required: true, // Ensure each recipe has at least one category
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Compile the schema into a model
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
