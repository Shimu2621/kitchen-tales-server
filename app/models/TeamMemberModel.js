const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamMemberSchema = new Schema({
  name: { type: String, required: true },
  position: {
    type: String,
    required: true,
    enum: ["Management", "Production", "Marketing", "Sales", "Operations"],
  },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  socialLinks: {
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
