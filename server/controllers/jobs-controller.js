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

const getJobsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithJobs;
  try {
    userWithJobs = await User.findById(userId).populate("jobs");
  } catch (err) {
    const error = new HttpError(
      "Fetching jobs failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!userWithJobs || userWithJobs.jobs.length === 0) {
    return next(
      new HttpError("Could not find jobs for the provided user id.", 404)
    );
  }
  res.json({
    jobs: userWithJobs.jobs.map((job) => job.toObject({ getters: true })),
  });
};

const createJob = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    description,
    website,
    company,
    location,
    status,
    date,
    salary,
  } = req.body;

  const createdJob = new Job({
    title,
    description,
    website,
    company,
    location,
    status,
    date: new Date(date),
    salary,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating job failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdJob.save({ session: sess });
    user.jobs.push(createdJob);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating job failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ job: createdJob });
};

exports.getJobById = getJobById;
exports.getJobsByUserId = getJobsByUserId;
exports.createJob = createJob;
