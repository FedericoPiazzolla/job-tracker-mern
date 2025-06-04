const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const Job = require("../models/job");
const User = require("../models/user");
const mongoose = require("mongoose");

const getJobById = async (req, res, next) => {
  const jobId = req.params.jid;
  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    const error = new HttpError(
      "Fetching job failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!job) {
    const error = new HttpError(
      "Could not find a job for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ job: job.toObject({ getters: true }) });
};

exports.getJobById = getJobById;
