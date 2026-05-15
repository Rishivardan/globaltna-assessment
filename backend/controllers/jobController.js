const mongoose = require("mongoose");
const JobRequest = require("../models/JobRequest");

// @desc Get all jobs
// @route GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const filter = {};

    // Optional category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Optional status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const jobs = await JobRequest.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Get single job
// @route GET /api/jobs/:id
const getSingleJob = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid job id",
      });
    }

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Create new job
// @route POST /api/jobs
const createJob = async (req, res) => {
  try {
    const job = await JobRequest.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @desc Update job status
// @route PATCH /api/jobs/:id
const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid job id",
      });
    }

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    job.status = status || job.status;

    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @desc Delete job
// @route DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid job id",
      });
    }

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  updateJobStatus,
  deleteJob,
};