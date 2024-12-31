const express = require("express");
const router = express.Router();
const becomeAnAuthorController = require("../controllers/becomeAnAuthorController");

router.post("/create-author", becomeAnAuthorController.createAuthor);

module.exports = router;
