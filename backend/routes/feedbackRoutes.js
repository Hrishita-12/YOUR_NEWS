const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback"); // Feedback model

// Submit Feedback
router.post("/", async (req, res) => {
  const { feedback, rating } = req.body;

  if (!feedback || !rating) {
    return res.status(400).json({ error: "Feedback and rating are required." });
  }

  try {
    const newFeedback = new Feedback({
      feedback,
      rating,
    });

    await newFeedback.save(); // Save feedback to MongoDB
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Get All Feedback (Optional)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedback from MongoDB
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

module.exports = router;