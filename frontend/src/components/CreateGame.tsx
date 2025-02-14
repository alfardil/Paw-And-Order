import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Party, mockParties, currentUser } from "../mockData";

function CreateGame() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleGeneratePrompt = () => {
    // TO DO: actually implement the AI stuff later! :D
    setPrompt("Should we close down schools?");
  };

  const handleCreateGame = () => {
    if (prompt.trim() === "") {
      setError("Provide a prompt or generate one with AI.");
      return;
    }
    setError("");

    const newPartyId = mockParties.length + 1;
    const randomRoomCode = Math.floor(10000 + Math.random() * 90000);

    const newParty: Party = {
      id: newPartyId,
      name: prompt,
      created: new Date().toISOString(),
      started: false,
      ended: false,
      userIds: [currentUser.userId],
      roomCode: randomRoomCode,
      maxPlayers: 2,
      get isFull() {
        return this.userIds.length >= this.maxPlayers;
      },
    };

    mockParties.push(newParty);
    navigate(`/room/${newPartyId}`);
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="card-header">
          <h2 className="menu-title">CREATE GAME</h2>
          <div className="menu-divider">
            <div className="divider-line" />
            <div className="divider-diamond" />
            <div className="divider-line" />
          </div>
        </div>

        <div className="menu-options">
          <div className="input-container">
            <textarea
              className="court-input"
              placeholder="Enter your prompt (max 100 chars)"
              value={prompt}
              onChange={handlePromptChange}
              maxLength={100}
              rows={7}
              style={{
                fontSize: "10px",
                minHeight: "150px",
                width: "100%",
                resize: "vertical",
                padding: "10px",
              }}
            />
            <div className="input-line" />
          </div>

          <button className="menu-button" onClick={handleGeneratePrompt}>
            <div className="button-content">
              <span className="button-text">Generate AI Prompt</span>
            </div>
            <div className="button-glow" />
          </button>

          <button className="menu-button primary" onClick={handleCreateGame}>
            <div className="button-content">
              <span className="button-text">Create Game</span>
            </div>
            <div className="button-glow" />
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default CreateGame;
