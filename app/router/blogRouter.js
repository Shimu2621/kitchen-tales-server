const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create-blog", blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.singleBlogById);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;
