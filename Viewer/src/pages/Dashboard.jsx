import React from 'react';
import './Pages.css';



const Dashboard = () => {
  return (
    <div className="chatgpt-landing">
      <h1 className="chatgpt-title">How can I help You?</h1>

      <div className="chatgpt-input-wrap">
        <button className="chip chip-plus" aria-label="new chat">+</button>

        <input
          className="chatgpt-input"
          type="text"
          placeholder="Ask anything"
          aria-label="Ask anything"
        />
        

        <button className="chip chip-icon" aria-label="voice input">
          {/* mic icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zM5 11a7 7 0 0 0 14 0h-2a5 5 0 0 1-10 0H5zm6 7v3h2v-3h-2z" fill="currentColor"/>
          </svg>
        </button>

        <button className="chip chip-icon" aria-label="audio level">
          {/* equalizer icon */}
          <svg width="18" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 4h2v16H5zM11 9h2v11h-2zM17 6h2v14h-2z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
