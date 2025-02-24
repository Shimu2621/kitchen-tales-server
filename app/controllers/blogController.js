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
  const { category, search } = req.query; // Use `req.query` for query parameters
  console.log(category);

  const filter = {}; // Initialize filter object
  console.log("Filter object:", filter);

  // Filter by search (title, case-insensitive)
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  try {
    const blogs = await Blog.find(filter)
      .populate("author_id", "fullName userPhoto") // Populate author details
      .populate("comments.commenterId", "fullName userPhoto") // Populate commenter details
      .sort({ postedDate: -1 }); // Sort by latest posted date
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
    const result = await Blog.findById(id).populate("author_id");

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

// Get all blogs by author ID
const getBlogsByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const blogs = await Blog.find({ author_id: authorId }).populate(
      "author_id",
      "fullName userPhoto"
    );

    if (!blogs.length) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "No blogs found for this author"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve all blogs by this author successfully",
          blogs
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when retrieving all blog by author id",
          error.message
        )
      );
  }
};
// Update blog by id
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updatedBlog = req.body;

  try {
    const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
    });

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Blog not updated"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Updated a single blog by id successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when updating a single blog",
          error.message
        )
      );
  }
};

// Delete  a single blog by id
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Blog not deleted successfully"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Deleted a single blog by id successfully",
          result
        )
      );
  } catch (error) {}
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Blog not found"
          )
        );
    }

    const comment = req.body;
    blog.comments.push(comment);

    const updatedBlog = await blog.save(); // Save the updated recipe

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "New comment added successfully",
          updatedBlog
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occurred when adding a new comment",
          error.message
        )
      );
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  singleBlogById,
  getBlogsByAuthorId,
  updateBlog,
  deleteBlog,
  addComment,
};
