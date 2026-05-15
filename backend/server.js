const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully" });
});

// Routes
app.use("/api/jobs", jobRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

