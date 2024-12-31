const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.post("/create-recipe", recipeController.createRecipe);
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:id", recipeController.getSingleRecipeById);
router.put("/recipes/:id", recipeController.updateSingleRecipe);
router.delete("/recipes/:id", recipeController.deleteRecipe);

module.exports = router;
