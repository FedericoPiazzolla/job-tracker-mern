const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users-routes");
const jobsRoutes = require("./routes/jobs-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/jobs", jobsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

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
