import { useLocation } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import { Party, mockUsers } from "../mockData";

function PlayGame() {
  const location = useLocation();
  const party: Party = location.state?.party;

  const [currentTurn, setCurrentTurn] = useState(0);
  const [countdown, setCountdown] = useState(30);

  const players = party.userIds;
  const currentUser = mockUsers.find(
    (user) => user.userId === players[currentTurn]
  );
  const currentPlayerName = currentUser ? currentUser.name : "Unknown Player";

  useEffect(() => {
    if (countdown <= 0) {
      setCurrentTurn((prevTurn) => (prevTurn + 1) % players.length);
      setCountdown(30);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, players.length]);

  return (
    <div className="game-container">
      <div className="game-background">
        <div className="bg-grid" />
        <div className="bg-overlay" />
      </div>

      <div className="prompt-section">
        <h1 className="prompt-content">{party.prompt}</h1>
      </div>

      <div className="highlight">It is {currentPlayerName}'s Turn!</div>
      <div>{countdown}</div>

      <div className="player-container">
        {players.map((playerId, index) => {
          const player = mockUsers.find((user) => user.userId === playerId);
          return (
            <div
              key={playerId}
              className={`player-box ${currentTurn === index ? "active" : ""}`}
            >
              <div className="player-name">{player?.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayGame;
