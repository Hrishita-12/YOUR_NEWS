
import React, { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // Rating state (0-5 stars)
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback || rating === 0) {
      setMessage("Please provide both feedback and a rating.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ feedback, rating }),
      });

      if (res.ok) {
        setMessage("Thank you for your feedback!");
        setFeedback(""); // Clear input after submission
        setRating(0); // Reset rating
      } else {
        setMessage("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-box">
        <h2>Feedback</h2>
        <div className="rating-section">
          <p>Rate your experience:</p>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index + 1 <= rating ? "active" : ""}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="rounded-button" onClick={handleSubmit}>
          Submit
        </button>
        {message && <p className="feedback-message">{message}</p>}
      </div>
    </div>
  );
};

export default Feedback;