const express = require("express");
const cors = require("cors");
const connectionToDB = require("./db/connectionDb");
const app = express();
const userRouter = require("./router/userRouter");
const recipeRouter = require("./router/recipeRouter");
const blogRouter = require("./router/blogRouter");
const becomeAnAuthorRouter = require("./router/becomeAnAuthorRouter");
const favoriteItemRouter = require("./router/favoriteItemRouter");
const teamMemberRouter = require("./router/teamMemberRouter");

const port = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true // Add your actual frontend URL
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

connectionToDB();

app.use("/api", userRouter);
app.use("/api", recipeRouter);
app.use("/api", blogRouter);
app.use("/api", becomeAnAuthorRouter);
app.use("/api", favoriteItemRouter);
app.use("/api", teamMemberRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Only start server locally, not on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// Export for Vercel
module.exports = app;
