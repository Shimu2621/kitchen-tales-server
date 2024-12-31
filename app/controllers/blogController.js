const status = require("http-status");
const response = require("../utils/response");
const Blog = require("../models/BlogModel");

// Create a New Blog
const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const result = await newBlog.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New blog created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating a new blog",
          error.message
        )
      );
  }
};

// Retrieving All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve all blogs successfully",
          blogs
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when retrieving all blogs",
          error.message
        )
      );
  }
};

// Retrieving a Single blog by id
const singleBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findById(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Blog not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve a single blog successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when retrieving a blog by id",
          error.message
        )
      );
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  singleBlogById,
};
