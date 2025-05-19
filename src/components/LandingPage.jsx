import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="landing">
      <nav className="landing-nav">
        <div className="landing-logo" onClick={() => navigate("/")}>
          CryptoTrack
        </div>
        <button className="btn-login" onClick={() => navigate("/coins")}>
          Get Started
        </button>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-title">
            Track Cryptocurrency Prices <br /> Effortlessly.
          </h1>
          <p className="landing-subtitle">
            Stay ahead of the market with real-time updates and detailed insights.
          </p>
          <button className="btn-primary" onClick={() => navigate("/coins")}>
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
