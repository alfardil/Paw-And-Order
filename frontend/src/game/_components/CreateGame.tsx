import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentUser } from "../../mockData";
import { useCreateParty } from "../hooks";
import { createPartySchema } from "../../validation/party.schema";

function CreateGame() {
  const [prompt, setPrompt] = useState("");
  const [courtName, setCourtName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: createParty } = useCreateParty();

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourtName(e.target.value);
  };

  const handleGeneratePrompt = () => {
    setPrompt("Should we close down schools?");
  };

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Provide a prompt or generate one with AI.");
      return;
    }
    setError("");

    const payload = {
      id: crypto.randomUUID(),
      name: courtName || "Untitled Court",
      prompt,
      createdAt: new Date(),

      users: currentUser ? [currentUser.userId.toString()] : [],

      roomCode: Math.floor(10000 + Math.random() * 90000).toString(),
      maxPlayers: 2,
      started: false,
      ended: false,
      isFull: false,

      reports: [
        {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          message: "Test Report",
          userUuid: currentUser?.userId.toString() || "unknown",
        },
      ],
      feedbacks: [],
    };

    const parseResult = createPartySchema.safeParse(payload);
    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message ?? "Validation error";
      setError(`Client-side validation failed: ${firstErrorMessage}`);
      return;
    }

    console.log("Validated payload:", parseResult.data);

    createParty(parseResult.data, {
      onSuccess: () => {
        navigate(`/room/${payload.id}`);
      },
      onError: (err: Error) => {
        setError(err.message || "Failed to create party");
      },
    });
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

      <div className="game-card">
        <div className="card-header">
          <h2 className="menu-title">CREATE GAME</h2>
          <div className="menu-divider">
            <div className="divider-line" />
            <div className="divider-diamond" />
            <div className="divider-line" />
          </div>
        </div>

        <form onSubmit={handleCreateGame}>
          <div className="menu-options">
            <div className="input-label">
              <input
                className="court-input"
                placeholder="Enter Court Name"
                value={courtName}
                onChange={handleNameChange}
                maxLength={20}
                style={{ fontSize: "10px", width: "100%" }}
                required
              />
            </div>
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
                required
              />
              <div className="input-line" />
            </div>

            <button
              className="menu-button"
              type="button"
              onClick={handleGeneratePrompt}
            >
              <div className="button-content">
                <span className="button-text">Generate AI Prompt</span>
              </div>
              <div className="button-glow" />
            </button>

            <button className="menu-button primary" type="submit">
              <div className="button-content">
                <span className="button-text">Create Game</span>
              </div>
              <div className="button-glow" />
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateGame;
