import { useState } from "react";
import { mockParties } from "../mockData";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function JoinGame() {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    setError("");

    const roomCode = parseInt(joinCode, 10);
    if (isNaN(roomCode)) {
      setError("Invalid court code");
      return;
    }

    const matchingParty = mockParties.find(
      (party) => party.roomCode === roomCode
    );

    if (matchingParty) {
      if (!matchingParty.isFull && !matchingParty.started) {
        navigate(`/room/${matchingParty.id}`);
      } else {
        setError("Court is full or already started");
      }
    } else {
      setError("Court not found");
    }
  };

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
          <button className="menu-button primary" onClick={handleJoin}>
            <div className="button-content">
              <div className="button-diamond"></div>
              <span className="button-text">ENTER COURT</span>
            </div>
            <div className="button-glow"></div>
          </button>
          {error}
          <div className="menu-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="join-content">
          Available Rooms:
          {mockParties
            .filter((party) => !party.isFull && !party.started)
            .map((party) => {
              return (
                <button
                  key={party.id}
                  className="menu-button"
                  onClick={() => navigate(`/room/${party.id}`)}
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

export default JoinGame;
