import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateParty } from "./hooks";
import { partySchema } from "../../../validation/party.schema";
import { useFetchAuthQuery } from "../auth/hooks";
import { Loader } from "../ui/Loader";

function CreateGame() {
  const [prompt, setPrompt] = useState("");
  const [courtName, setCourtName] = useState("");
  const [err, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: createParty } = useCreateParty();
  const { data: json, error, isPending, refetch } = useFetchAuthQuery();

  if (isPending) return <Loader />;
  if (!json?.success) {
    return (
      <div>
        <h2>Error: {(error as Error).message}</h2>
      </div>
    );
  }

  const user = json.data.user;

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourtName(e.target.value);
  };

  const handleGeneratePrompt = () => {
    // TODO: Implement AI prompt generation
    setPrompt("Should we close down schools?");
  };

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const payload = {
      id: crypto.randomUUID(),
      name: courtName,
      prompt,
      createdAt: new Date(),

      users: user.uuid ? [user.uuid] : [],

      roomCode: Math.floor(10000 + Math.random() * 90000).toString(),
      maxPlayers: 2,
      started: false,
      ended: false,
      isFull: false,

      reports: undefined,
      feedbacks: undefined,
    };

    const parseResult = partySchema.safeParse(payload);

    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message ?? "Validation error";
      setError(`Client-side validation failed: ${firstErrorMessage}`);
      return;
    }
    createParty(parseResult.data, {
      onSuccess: () => {
        navigate(`/party/find/${payload.id}`);
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

          {err && <div className="error-message">{err}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateGame;
