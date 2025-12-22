import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("English");
  const [categories, setCategories] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const newsCategories = ["Politics", "Sports", "Technology", "Entertainment", "Business", "Health", "Science"];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? "" : "Invalid email format");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    setPasswordError(passwordRegex.test(password) ? "" : "Password must be at least 8 characters with 1 number & 1 special character");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (emailError || passwordError || password !== confirmPassword) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, language, categories }),
      });

      const data = await res.json();
      console.log("Registration response:", data); // Log the response

      if (res.ok) {
        alert("Registration successful");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Error during registration:", err); // Log the error
      alert("An error occurred. Please try again.");
    }
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category) // Remove if already selected
        : [...prevCategories, category] // Add if not selected
    );
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        {emailError && <p className="error">{emailError}</p>}

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}

        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        <label>Preferred Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Assamese">Assamese</option>
          <option value="Bengali">Bengali</option>
          <option value="Gujarati">Gujarati</option>
          <option value="Marathi">Marathi</option>
          <option value="Marwadi">Marwadi</option>
        </select>

        <label>Select News Categories:</label>
        <div className="checkbox-group">
          {newsCategories.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                value={category}
                checked={categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>

        <input type="text" value={categories.join(", ")} readOnly className="selected-categories" placeholder="Selected categories will appear here" />

        <button className="rounded-button" onClick={handleRegister}>Sign Up</button>
      </div>
    </div>
  );
};

export default Register;