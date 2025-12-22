import React, { useState, useEffect, useRef } from "react";
import { Search, User, MessageSquare, Mic, MessageCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Link } from 'react-router-dom';

const NEWSAPI_KEY = "";
const NEWSAPI_BASE_URL = "";
const OPENAI_API_KEY =
  "";

const YOUTUBE_API_KEY = "";
const YOUTUBE_API_URL = "";

const UserDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AI News Assistant. Ask me for the latest news on any topic.",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const handleLogout = () => {
    // Clear user session or tokens
    localStorage.removeItem('token'); // If you're using token-based auth
    localStorage.removeItem('guest'); // Clear guest session if exists
    
    // Redirect to landing page with logout message
    navigate('/', { state: { logoutSuccess: true }, replace: true });
  };
  

  const navigate = useNavigate();
  const recognition = useRef(null);


  const isSpeechSupported =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

  // Initialize speech recognition
  useEffect(() => {
    if (isSpeechSupported) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      return () => {
        recognition.current.stop();
      };
    }
  }, [isSpeechSupported]);

  const toggleListening = () => {
    if (!isSpeechSupported) {
      alert("Voice search is not supported in your browser");
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      try {
        recognition.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        setIsListening(false);
      }
    }
  };

  const fetchNews = async (query) => {
    try {
      console.log("Fetching news with query:", query);

      let url = query
        ? `${NEWSAPI_BASE_URL}?q=${encodeURIComponent(
            query
          )}&apiKey=${NEWSAPI_KEY}`
        : `${NEWSAPI_BASE_URL}?country=us&apiKey=${NEWSAPI_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("News API Error:", errorText);
        setFetchError(`Failed to fetch news: ${errorText}`);
        return [];
      }

      const data = await response.json();
      console.log("News API Response:", data);

      if (!data.articles || data.articles.length === 0) {
        console.warn("No articles found");
        setFetchError("No news articles found");
        return [];
      }

      return data.articles.map((article) => ({
        title: article.title,
        url: article.url,
        source: article.source?.name || "Unknown Source",
        urlToImage: article.urlToImage || "",
        description: article.description || "",
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      setFetchError(`Network error: ${error.message}`);
      return [];
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${YOUTUBE_API_URL}?part=snippet&q=latest+news&type=video&maxResults=6&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideos(
        data.items.map((video) => ({
          title: video.snippet.title,
          videoId: video.id.videoId,
          thumbnail: video.snippet.thumbnails.medium.url,
          channel: video.snippet.channelTitle,
        }))
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
      setFetchError(`Video fetch error: ${error.message}`);
    }
  };

  const fetchAIResponse = async (message) => {
    setIsLoading(true);
    try {
      const newsResults = await fetchNews(message);

      if (newsResults.length > 0) {
        const newsList = newsResults
          .slice(0, 3)
          .map(
            (n) =>
              `${n.title} - <a href="${n.url}" target="_blank" rel="noopener noreferrer">Read more</a>`
          )
          .join("\n\n");

        return {
          sender: "bot",
          text: `Here are the latest headlines about "${message}":\n\n${newsList}`,
        };
      }

      const response = await fetch(
        "https://aistudio.google.com/app/apikey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful news assistant. Provide concise answers about current news. If you don't know, say so.",
              },
              {
                role: "user",
                content: message,
              },
            ],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      return {
        sender: "bot",
        text: data.choices[0].message.content,
      };
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting to the news services right now.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const initialArticles = await fetchNews();
        setArticles(initialArticles);
        await fetchVideos();
      } catch (error) {
        console.error("Error loading initial data:", error);
        setFetchError("Failed to load initial news and videos");
      }
    };

    loadInitialData();
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newUserMessage = { sender: "user", text: userMessage };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserMessage("");

    const aiResponse = await fetchAIResponse(userMessage);
    setChatMessages((prev) => [...prev, aiResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleChatSubmit(e);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
       {/* Add logout confirmation modal */}
       {showLogoutConfirm && (
        <div className="logout-confirm-modal">
          <div className="logout-confirm-content">
            <p>Are you sure you want to logout?</p>
            <div className="logout-confirm-buttons">
              <button 
                className="logout-confirm-cancel"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="logout-confirm-proceed"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {fetchError && (
        <div className="error-banner text-red-500 p-4 bg-red-100">
          {fetchError}
        </div>
      )}

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-title">Your News</div>
          <div className="nav-buttons">
            <Search
              className="search-icon"
              size={24}
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <div className="search-box-container">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSpeechSupported && (
                  <Mic
                    className={`voice-search-icon ${
                      isListening ? "active" : ""
                    }`}
                    size={20}
                    onClick={toggleListening}
                  />
                )}
              </div>
            )}
            <User
              className="user-icon"
              size={24}
              onClick={() => navigate("/profile")}
            />
            <MessageSquare
              className="feedback-icon"
              size={24}
              onClick={() => navigate("/feedback")}
            />
            {/* Add Logout button */}
            <LogOut
              className="logout-icon"
              size={24}
              onClick={() => setShowLogoutConfirm(true)}
            />
          </div>
        </div>
      </nav>

      <header>
        <h1>Stay Informed with Your News</h1>
        <p>Your trusted source for the latest news.</p>
      </header>

      <main className="news-grid">
        {articles.map((news, index) => (
          <div key={index} className="news-card">
            {news.urlToImage && <img src={news.urlToImage} alt={news.title} />}
            <div className="news-card-content">
              <span className="text-sm text-gray-500">{news.source}</span>
              <h2>{news.title}</h2>
              <p>{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </main>

      <section className="video-section">
        <h2>Latest News Videos</h2>
        <div className="news-grid">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                frameBorder="0"
                allowFullScreen
                title={video.title}
              ></iframe>
              <div className="news-card-content">
                <h3>{video.title}</h3>
                <p>{video.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
  <div>
    <Link to="/info#about">About</Link>
    <Link to="/info#contact">Contact</Link>
    <Link to="/info#privacy">Privacy Policy</Link>
  </div>
</footer>

      <div className="chat-icon" onClick={() => setShowChat(!showChat)}>
        <MessageCircle size={24} />
      </div>

      {showChat && (
        <div className="chatbox">
          <div className="chat-header">AI News Assistant</div>
          <div className="chat-body">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <form className="chat-footer" onSubmit={handleChatSubmit}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for news..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
