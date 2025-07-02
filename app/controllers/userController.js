const User = require("../models/UserModel");
const status = require("http-status");
const response = require("../utils/response");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/token");

// Signup route function
const signup = async (req, res) => {
  try {
    // const { fullName, email, userPhoto, address, password, confirmPassword } = req.body;
    const newUser = new User(req.body);

    const result = await newUser.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "User created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating an user",
          error.message
        )
      );
  }
};

// Signin route function
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    const user = await User.findOne({ email });
    console.log("User Object:", user);

    if (user) {
      console.log("User Name:", user.fullName);
      console.log("Email:", user.email);
      console.log("Role:", user.role);
    }

    if (!user) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(status.status.UNAUTHORIZED)
        .send(
          response.createUnAuthorizedResponse(
            status.status.UNAUTHORIZED,
            "Credential is not matched"
          )
        );
    }

    const token = generateToken(user);
    console.log("Generated Token:", token); // Check if a valid token is printed

    res.cookie("accessToken", token, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    // Check user role
    const isAdmin = user.role === "admin";
    res.status(status.status.OK).send(
      response.createSuccessResponse(
        status.status.OK,
        "User logged in successfully",
        { user, token }, // Include token in the response
        isAdmin
      ) //include isAdmin in response
    );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating an user",
          error.message
        )
      );
  }
};

// Retrieving all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving all users successfully",
          users
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving all users",
          error.message
        )
      );
  }
};

// Retrieve user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving a Single User Successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving a single user",
          error
        )
      );
  }
};

// Update the user role by id
const updateUsersRole = async (req, res) => {
  const { id } = req.params;
  const updatedRole = req.body;
  // console.log(updatedRole);
  try {
    const result = await User.findByIdAndUpdate(id, updatedRole, { new: true });
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User role not updated"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "User role updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the update users role",
          error
        )
      );
  }
};

// Get All Authors
const allAuthors = async (req, res) => {
  try {
    const search = req.query.search || "";

    // Initialize filter object
    const filter = {
      role: "author",
      fullName: { $regex: search, $options: "i" },
    };

    const authors = await User.find(filter).select("fullName userPhoto");
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving all authors successfully",
          authors
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving all authors",
          error.message
        )
      );
  }
};

module.exports = {
  signup,
  signin,
  allUsers,
  getUserById,
  updateUsersRole,
  allAuthors,
};
