const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/users", userController.allUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUsersRole);
router.get("/authors", userController.allAuthors);

module.exports = router;
