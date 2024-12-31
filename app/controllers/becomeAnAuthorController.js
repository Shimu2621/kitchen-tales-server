const Author = require("../models/BecomeAnAuthorModel");
const status = require("http-status");
const response = require("../utils/response");

const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const result = await newAuthor.save();

    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Author created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating a new author",
          error.message
        )
      );
  }
};

module.exports = {
  createAuthor,
};
