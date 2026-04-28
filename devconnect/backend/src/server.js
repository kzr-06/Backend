require('dotenv').config(); // MUST BE FIRST
const mongoose = require("mongoose");
const app=require('./app');


console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch((err) => console.log(err));