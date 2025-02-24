const status = require("http-status");
const response = require("../utils/response");
const TeamMember = require("../models/TeamMemberModel");

// Create a new team member
const createMember = async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    const result = await newMember.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Team member created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating a new team member",
          error.message
        )
      );
  }
};

// Retrieve all team member
const getAllMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving all team members successfully",
          members
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving all team members",
          error.message
        )
      );
  }
};

// Get team members by position category
const getMembersByCategory = async (req, res) => {
  try {
    const { position } = req.params;
    const members = await TeamMember.find({ position });

    if (!members) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Team member not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving a Single User Successfully",
          members
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving all team members",
          error.message
        )
      );
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMembersByCategory,
};
