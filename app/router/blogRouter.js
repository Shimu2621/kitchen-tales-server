const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create-blog", blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.singleBlogById);
router.get("/blogs/author/:authorId", blogController.getBlogsByAuthorId);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);
router.patch("/blog/add-comment/:id", blogController.addComment);

module.exports = router;
