const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");

const Job = require("../models/job");
const User = require("../models/user");

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
  if (!jobId || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError("Invalid job id.", 400));
  }

  let job;
  try {
    job = await Job.findById(jobId).select("creator");
  } catch (err) {
    console.error("Delete lookup error:", err);
    return next(new HttpError("Delete failed while loading job.", 500));
  }

  if (!job) {
    return next(new HttpError("Could not find job for this id.", 404));
  }

  if (job.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed to delete this job.", 401));
  }

  try {
    await Job.deleteOne({ _id: jobId });
  } catch (err) {
    console.error("Delete execution error:", err);
    return next(new HttpError("Delete failed while removing job.", 500));
  }

  try {
    await User.findByIdAndUpdate(req.userData.userId, {
      $pull: { jobs: jobId },
    });
  } catch (pullErr) {
    console.error("User cleanup after delete failed:", pullErr);
  }

  return res.status(200).json({ message: "Deleted job." });
};
exports.getJobById = getJobById;
exports.getJobsByUserId = getJobsByUserId;
exports.createJob = createJob;
exports.updateJobById = updateJobById;
exports.deleteJob = deleteJob;
