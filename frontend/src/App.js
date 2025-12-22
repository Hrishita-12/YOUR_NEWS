import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import UserDashboard from "./components/userDashboard"; // Ensure correct import
import Profile from "./components/profile";
import Feedback from "./components/feedback";
import InfoPage from './components/InfoPage';
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
/*import QuizPage from "./components/QuizPage";*/

function App() {
  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        console.log("Backend Response:", response.data);
      } catch (error) {
        console.error("Error connecting to backend:", error.message);
      }
    };

    fetchBackend();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/*<Route path="/quizpage" element={<QuizPage />} />{" "}*/}
          {/* ✅ Added Quiz Page Route */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;