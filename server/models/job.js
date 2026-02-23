const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  company: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["applied", "interviewing", "offer", "rejected"],
  },
  date: { type: Date, required: true },
  salary: { type: String }, // può essere un range o un valore singolo
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  // un place può essere creato solo da un utente
});

module.exports = mongoose.model("Job", JobSchema);
