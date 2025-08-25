// src/pages/Dashboard.jsx
import React from "react";
import Aurora from "../components/Aurora";
import SplitText from "../components/SplitText";
import AnimatedContent from "../components/AnimatedContent";
import "./Pages.css";
import "../styles/responsive.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page relative min-h-screen">
      {/* Aurora background (fixed to viewport) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Aurora
          colorStops={["#1338BE", "#1F456E", "#52B2BF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Page content */}
      <div className="page-wrap">
        {/* HERO: keeps title + chat bar aligned and centered */}
        <section className="dashboard-hero">
          <h1 className="chatgpt-title hero-title">
            <SplitText
              as="span"
              text="How can I help You?"
              duration={0.6}
              stagger={0.04}
              delay={0.05}
              animateFrom="up"
            />
          </h1>

          <AnimatedContent delay={0.5} duration={0.6} animateFrom="down">
            <div className="chatgpt-input-wrap hero-input">
              <button className="chip chip-plus" aria-label="new chat">+</button>

              <input
                className="chatgpt-input"
                type="text"
                placeholder="Ask anything"
                aria-label="Ask anything"
              />

              <button className="chip chip-icon" aria-label="voice input">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zM5 11a7 7 0 0 0 14 0h-2a5 5 0 0 1-10 0H5zm6 7v3h2v-3h-2z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <button className="chip chip-icon" aria-label="audio level">
                <svg width="18" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 4h2v16H5zM11 9h2v11h-2zM17 6h2v14h-2z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </AnimatedContent>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
