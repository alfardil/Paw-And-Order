import { useState } from "react";

function CreateGame() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleGeneratePrompt = () => {
    setPrompt("AI GENERATED PROMPT");
  };

  const handleCreateGame = () => {
    if (prompt.trim() === "") {
      setError("Provide a prompt or generate one with AI.");
      return;
    }
    setError("");
    console.log("Creating game with prompt:", prompt);
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
            <input
              type="text"
              className="court-input"
              placeholder="Enter your prompt (max 100 chars)"
              value={prompt}
              onChange={handlePromptChange}
              maxLength={100}
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
