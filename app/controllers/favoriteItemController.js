const Favorite = require("../models/FavoriteItemModel");
const status = require("http-status");
const response = require("../utils/response");

const createFavoriteItem = async (req, res) => {
  try {
    const newFavoriteItem = new Favorite(req.body);
    const result = await newFavoriteItem.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Favorite item created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating a new favorite item",
          error.message
        )
      );
  }
};

module.exports = {
  createFavoriteItem,
};
