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
    return next(
      new HttpError("Fetching jobs failed, please try again later.", 500)
    );
  }
  if (!userWithJobs) {
    return next(new HttpError("Could not find user for the provided id.", 404));
  }
  // Se l'utente esiste ma non ha jobs, restituisci array vuoto
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

const updateJobById = async (req, res, next) => {
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
  const jobId = req.params.jid;

  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update job.",
      500
    );
    return next(error);
  }

  if (job.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this job.", 401);
    return next(error);
  }
  job.title = title;
  job.description = description;
  job.website = website;
  job.company = company;
  job.location = location;
  job.status = status;
  job.date = new Date(date);
  job.salary = salary;
  try {
    await job.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update job.",
      500
    );
    return next(error);
  }
  res.status(200).json({ job: job.toObject({ getters: true }) });
};

const deleteJob = async (req, res, next) => {
  const jobId = req.params.jid;
  let job;
  try {
    job = await Job.findById(jobId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete job.",
      500
    );
    return next(error);
  }

  if (!job) {
    const error = new HttpError("Could not find job for this id.", 404);
    return next(error);
  }

  if (job.creator.id !== req.userData.userId) {
    const error = new HttpError("You are not allowed to delete this job.", 401);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await job.remove({ session: sess });
    job.creator.jobs.pull(job);
    await job.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete job.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted job." });
};
exports.getJobById = getJobById;
exports.getJobsByUserId = getJobsByUserId;
exports.createJob = createJob;
exports.updateJobById = updateJobById;
exports.deleteJob = deleteJob;
