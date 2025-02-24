import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchAllPartiesQuery } from "./hooks";

function JoinGame() {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: parties = [] } = useFetchAllPartiesQuery();
  console.log(parties);

  const handleJoinParty = async (id: string) => {
    setError("");

    const matchingParty = parties.find((party) => party.id === id);

    if (!matchingParty) {
      setError("Court not found");
      return;
    } else if (matchingParty.isFull) {
      setError("Court is full");
      return;
    } else if (matchingParty.started) {
      setError("Court is already started");
      return;
    }

    navigate(`/party/find/${matchingParty.id}`);
  };

  const handleJoin = () => {
    if (!joinCode.trim()) {
      setError("Invalid court code");
      return;
    }
    const matchingParty = parties.find((party) => party.roomCode === joinCode);

    if (!matchingParty) {
      setError("Court not found");
      return;
    }

    handleJoinParty(matchingParty.id);
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
          {parties
            .filter((party) => !party.isFull && !party.started)
            .map((party) => {
              return (
                <button
                  key={party.id}
                  className="menu-button"
                  onClick={() => handleJoinParty(party.id)}
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
