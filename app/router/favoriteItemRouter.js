const express = require("express");
const router = express.Router();
const favoriteItemController = require("../controllers/favoriteItemController");

router.post("/create-favorite", favoriteItemController.createFavoriteItem);

module.exports = router;
