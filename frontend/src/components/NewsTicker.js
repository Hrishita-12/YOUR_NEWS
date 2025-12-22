import React, { useState, useEffect } from "react";
import "./NewsTicker.css";

const NewsTicker = ({ news }) => {
  const [showHeadlines, setShowHeadlines] = useState(true);

  useEffect(() => {
    // Show "HEADLINES" for 3 seconds before scrolling starts
    const timer = setTimeout(() => setShowHeadlines(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        <div className="ticker-content" id="ticker-content">
          {showHeadlines ? (
            <span className="headline-text">HEADLINES</span>
          ) : (
            [...news, ...news].map((article, index) => (
              <span key={index} className="ticker-item">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;