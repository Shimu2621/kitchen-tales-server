const mongoose = require("mongoose");
require("dotenv").config();

const connectionToDB = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() =>
      console.log(
        "Pinged your development. You successfully connected to MongoDB!"
      )
    )
    .catch((error) => console.log(error));
};

module.exports = connectionToDB;
