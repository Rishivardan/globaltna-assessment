const mongoose = require("mongoose");
const validator = require("validator");

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  category: {
    type: String,
    enum: ["Plumbing", "Electrical", "Painting", "Joinery"],
    default: "Plumbing",
  },

  location: {
    type: String,
    required: true,
  },

  contactName: {
    type: String,
    required: true,
  },

  contactEmail: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobRequest", jobRequestSchema);