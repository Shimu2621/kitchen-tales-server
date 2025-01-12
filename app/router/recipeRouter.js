const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const recipeController = require("../controllers/recipeController");

router.post("/create-recipe", recipeController.createRecipe);
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:id", recipeController.getSingleRecipeById);
router.get(
  "/recipes/category/:category",
  recipeController.getRecipesByCategory
);
router.get("/recipes/author/:authorId", recipeController.getRecipesByAuthorId);
router.put("/recipes/:id", recipeController.updateSingleRecipe);
router.delete("/recipes/:id", recipeController.deleteRecipe);
router.patch("/recipe/add-review/:id", recipeController.addReview);

module.exports = router;
