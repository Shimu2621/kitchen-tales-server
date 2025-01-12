const status = require("http-status");
const response = require("../utils/response");
const Recipe = require("../models/RecipeModel");
const mongoose = require("mongoose");

// Create a New Recipe
const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const result = await newRecipe.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Recipe created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating a new recipe",
          error.message
        )
      );
  }
};

// Retrieve All Recipe with categories, search, and sorting
const getAllRecipes = async (req, res) => {
  const { category, search, sort } = req.query;
  console.log(category);

  // Initialize filter object
  const filter = {};

  // Filter by categories
  if (category && category !== "all") {
    filter.category = { $regex: category, $options: "i" }; // Case-insensitive regex match
  }
  // Filter by search
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  // Sorting logic
  const sortOptions = {
    HighToLow: { rating: -1 }, // Sort by rating descending
    LowToHigh: { rating: 1 }, // Sort by rating ascending
    Newest: { createdAt: -1 }, // Sort by creation date descending
  };
  const sortRating = sortOptions[sort] || { createdAt: -1 }; // Default to newest if no valid sort option provided

  try {
    const recipes = await Recipe.find(filter)
      .sort(sortRating)
      .populate("author_id", "fullName userPhoto")
      .populate({
        path: "reviews.reviewer_id", // Nested population
        select: "fullName", // Only retrieve the `fullName` field of the reviewer
        // .limit(8); // Limit to 8 recipes;
      });
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve all recipes successfully",
          recipes
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when retrieving all recipes",
          error.message
        )
      );
  }
};

// Get Single Recipe By Id
const getSingleRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipe.findById(id).populate("author_id").populate({
      path: "reviews.reviewer_id", // Nested population
      select: "fullName", // Only retrieve the `fullName` field of the reviewer
      // .limit(8); // Limit to 8 recipes;
    });

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Recipe not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve a single recipe by id successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when retrieving a single recipe",
          error.message
        )
      );
  }
};
//Get Recipes Filtered by category
const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const recipes = await Recipe.find({ category: category });
    if (!recipes) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Recipes not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve recipes by category successfully",
          recipes
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when getting recipes by category",
          error.message
        )
      );
  }
};

//Get all Recipes by authorId
const getRecipesByAuthorId = async (req, res) => {
  const { authorId } = req.params;
  console.log("Incoming Author ID:", req.params.authorId);

  // Validate authorId
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res
      .status(status.status.BAD_REQUEST)
      .send(
        response.createErrorResponse(
          status.status.BAD_REQUEST,
          "Invalid authorId format"
        )
      );
  }
  try {
    const recipes = await Recipe.find({
      author_id: new mongoose.Types.ObjectId(authorId),
    });
    console.log("Recipes found:", recipes);

    if (recipes.length === 0) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "No recipes found for this author."
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve recipes by authorId successfully",
          recipes
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when getting recipes by authorId",
          error.message
        )
      );
  }
};
// Update Recipe By Id
const updateSingleRecipe = async (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;

  try {
    const result = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
      new: true,
    });

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Recipe not updated"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Updated a single recipe by id successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when updating a single recipe",
          error.message
        )
      );
  }
};
// Delete Recipe By Id
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipe.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Recipe not deleted successfully"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Deleted a single recipe by id successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when deleting a single recipe",
          error.message
        )
      );
  }
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Recipe not found"
          )
        );
    }

    const review = req.body; // Assuming req.body contains the review object
    recipe.reviews.push(review); // Push the new review into the reviews array

    const updatedRecipe = await recipe.save(); // Save the updated recipe

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Review added successfully",
          updatedRecipe
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occurred when adding a review",
          error.message
        )
      );
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getSingleRecipeById,
  getRecipesByCategory,
  getRecipesByAuthorId,
  updateSingleRecipe,
  deleteRecipe,
  addReview,
};
