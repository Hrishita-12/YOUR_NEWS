import React, { useState, useEffect } from "react";
import "./Register.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const newsCategories = [
    "Politics",
    "Sports",
    "Technology",
    "Entertainment",
    "Business",
    "Health",
    "Science",
  ];

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          setName(data.name || "");
          setEmail(data.email || "");
          setLanguage(data.language || "English");
          setCategories(data.categories || []);
        } else {
          setError(data.message || "Failed to fetch profile.");
        }
      } catch (error) {
        setError("An error occurred while fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form submission (update user profile)
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, language, categories }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleCategoryChange = (category) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Edit Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">Profile updated successfully!</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <button className="rounded-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
