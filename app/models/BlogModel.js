const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }, // Includes author name and optional profile link
  content: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      commentText: String,
      submittedDate: { type: Date, default: Date.now },
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
