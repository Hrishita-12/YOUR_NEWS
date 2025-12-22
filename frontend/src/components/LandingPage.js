import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutMessage, setShowLogoutMessage] = React.useState(false);

  React.useEffect(() => {
    if (location.state?.logoutSuccess) {
      setShowLogoutMessage(true);
      const timer = setTimeout(() => {
        setShowLogoutMessage(false);
        // Clear the state so refreshing doesn't show the message again
        navigate('.', { replace: true, state: {} });
      }, 3000); // Message will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  return (
    <div className="landing-container">
      <div className="landing-box">
        <h1 className="title">Welcome to Your News</h1>
        {showLogoutMessage && (
          <div className="logout-success-message">
            You have been successfully logged out.
          </div>
        )}
        <p className="subtitle">Choose how you'd like to proceed:</p>
        <div className="button-group">
          <button className="btn login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="btn register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="btn guest-btn"
            onClick={() => {
              localStorage.setItem("guest", "true");
              navigate("/home");
            }}
          >
            Browse as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;