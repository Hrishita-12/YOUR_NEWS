const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");

// Route imports
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifyAdmin = require("./middleware/verifyAdmin"); // Import middleware

const app = express();

// Database connection
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

// Protected admin routes (note the order)
app.use("/api/admin", verifyAdmin); // Middleware first
app.use("/api/admin", adminRoutes); // Then routes

// Test route
app.get("/api/user/profile", (req, res) => {
  res.json({ message: "User profile route working!" });
});

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));