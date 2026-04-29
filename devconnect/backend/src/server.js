require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

// ENV variables
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

// DB connect + server start
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });