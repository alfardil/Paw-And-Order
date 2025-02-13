import { useState } from "react";
import { mockParties } from "../mockData";
import "../App.css";
import { Link } from "react-router-dom";

function JoinCourtPage() {
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="game-container">
      <Link to="/">
        <div
          className="back-button"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
          }}
        >
          <button
            className="menu-button"
            style={{
              fontSize: "1.5em",
              padding: "12px 24px",
              borderRadius: "8px",
            }}
          >
            Back
          </button>
        </div>
      </Link>
      <div className="game-background">
        <div className="bg-grid"></div>
        <div className="bg-overlay"></div>
      </div>

      <div className="game-card join-card">
        <div className="card-header">
          <h2 className="menu-title">Join a Court</h2>
          <div className="input-container">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="court-input"
              placeholder="XXXXX"
              maxLength={5}
            />
          </div>
          <div className="menu-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="join-content">
          {mockParties.map((party) => {
            return (
              <button
                key={party.id}
                className="menu-button"
                onClick={() => console.log(`Joining party #${party.id}...`)}
              >
                <div className="button-glow"></div>
                <div className="button-content">
                  <span className="button-text">{party.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default JoinCourtPage;
