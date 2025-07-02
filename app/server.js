const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectionToDB = require("./db/connectionDb");
const serverless = require("serverless-http"); // 👈 Add this
const app = express();

const userRouter = require("./router/userRouter");
const recipeRouter = require("./router/recipeRouter");
const blogRouter = require("./router/blogRouter");
const becomeAnAuthorRouter = require("./router/becomeAnAuthorRouter");
const favoriteItemRouter = require("./router/favoriteItemRouter");
const teamMemberRouter = require("./router/teamMemberRouter");

const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Connect to DB
connectionToDB();

// Routes
app.use("/api", userRouter);
app.use("/api", recipeRouter);
app.use("/api", blogRouter);
app.use("/api", becomeAnAuthorRouter);
app.use("/api", favoriteItemRouter);
app.use("/api", teamMemberRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Only run locally
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = serverless(app); // ✅ This is the correct single export for Vercel
