const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create-blog", blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.singleBlogById);

module.exports = router;
