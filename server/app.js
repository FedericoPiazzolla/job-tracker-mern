const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);

mongoose
  .connect(
    "MONGODB_URI_REMOVED"
  )
  .then(() => {
    app.listen(5010);
  })
  .catch((err) => {
    console.log(err);
  });
