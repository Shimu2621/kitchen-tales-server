const jwt = require("jsonwebtoken");
require("dotenv").config();

// A JWT is a compact, secure way to encode user data for authentication. Contains the user data to encode into the token
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      userPhoto: user.userPhoto,
      email: user.email,
      address: user.address,
      createdAt: user.createdAt,
      role: user.role,
    },
    process.env.TOKEN,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );

  return token;
};

module.exports = generateToken;
