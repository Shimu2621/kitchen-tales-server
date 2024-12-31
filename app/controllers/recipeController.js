const status = require("http-status");
const response = require("../utils/response");
const Recipe = require("../models/RecipeModel");

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
  const { categories, search, sort } = req.query;

  // Initialize filter object
  const filter = {};

  // Filter by categories
  if (categories) {
    filter.categories = { $in: categories.split(",") };
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
      .populate("author_id", "fullName");
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
    const result = await Recipe.findById(id).populate("author_id");

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

module.exports = {
  createRecipe,
  getAllRecipes,
  getSingleRecipeById,
  updateSingleRecipe,
  deleteRecipe,
};
