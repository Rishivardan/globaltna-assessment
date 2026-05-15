const express = require('express');

const {
    getJobs,
    getSingleJob,
    createJob,
    updateJobStatus,
    deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

// Get all jobs
router.get("/", getJobs);

// CREATE a new job
router.post("/", createJob);

//get single job
router.get("/:id", getSingleJob);

// Update job status
router.patch("/:id", updateJobStatus);

// Delete a job
router.delete("/:id", deleteJob);

module.exports = router;
    