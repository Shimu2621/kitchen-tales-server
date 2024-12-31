const express = require("express");
const cors = require("cors");
const connectionToDB = require("./db/connectionDb");
const app = express();
const userRouter = require("./router/userRouter");
const recipeRouter = require("./router/recipeRouter");
const blogRouter = require("./router/blogRouter");
const becomeAnAuthorRouter = require("./router/becomeAnAuthorRouter");
const favoriteItemRouter = require("./router/favoriteItemRouter");

const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

connectionToDB();

app.use("/api", userRouter);
app.use("/api", recipeRouter);
app.use("/api", blogRouter);
app.use("/api", becomeAnAuthorRouter);
app.use("/api", favoriteItemRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
