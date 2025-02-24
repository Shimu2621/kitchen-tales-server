const express = require("express");
const router = express.Router();
const teamMemberController = require("../controllers/teamMemberController");

router.post("/create-member", teamMemberController.createMember);
router.get("/members", teamMemberController.getAllMembers);
router.get(
  "/members/category/:position",
  teamMemberController.getMembersByCategory
);

module.exports = router;
