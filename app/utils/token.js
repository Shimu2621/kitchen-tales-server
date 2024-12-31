const jwt = require("jsonwebtoken");
require("dotenv").config();

// A JWT is a compact, secure way to encode user data for authentication. Contains the user data to encode into the token
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      userPhoto: user.userPhoto,
      email: user.email,
      userPhone: user.userPhone,
      createdAt: user.createdAt,
      role: user.role,
    },
    process.env.TOKEN,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );

  return token;
};

module.exports = generateToken;
