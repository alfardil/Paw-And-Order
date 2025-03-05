import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import { useFetchAuthQuery } from "../Menu/_components/auth/hooks";
import { Loader } from "../Menu/_components/ui/Loader";
import { Party } from "../validation/party.schema";

function PlayGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const party: Party = location.state?.party;
  const { data: json, error, isPending, refetch } = useFetchAuthQuery();

  if (isPending) return <Loader />;
  if (error || !json?.success)
    return (
      <div>
        <h2>Error:</h2>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

  const thisPlayer = json.data.user;
  const players = party.users;
  const numPlayers = players.length;

  const [currentTurn, setCurrentTurn] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [phase, setPhase] = useState<"response" | "refutation">("response");
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string[]>(
    Array(numPlayers * 2).fill("")
  );

  const isListeningRef = useRef(isListening);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  const currentPlayer = players[currentTurn % numPlayers];
  const currentPlayerName = currentPlayer
    ? currentPlayer.firstName
    : "Unknown Player";
  const isCurrentUserTurn = thisPlayer.uuid === currentPlayer.uuid;

  useEffect(() => {
    if (countdown <= 0) {
      if (phase === "response" && currentTurn === numPlayers - 1) {
        setPhase("refutation");
        setCurrentTurn(0);
      } else if (phase === "refutation" && currentTurn === numPlayers - 1) {
        navigate("/gameReport", { state: { party, transcription } });
        return;
      } else {
        setCurrentTurn((prevTurn) => prevTurn + 1);
      }

      setCountdown(30);
    }

    const timer = setInterval(
      () => setCountdown((prev) => Math.max(prev - 1, 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [
    countdown,
    currentTurn,
    phase,
    navigate,
    party,
    transcription,
    numPlayers,
  ]);

  // speech recog
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let interimTranscript = "";
    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    recognition.onresult = (event: any) => {
      let finalSegment = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalSegment += transcriptSegment + " ";
          interimTranscript = "";
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      if (finalSegment) {
        const indexOffset = phase === "refutation" ? numPlayers : 0;
        setTranscription((prev) => {
          const updated = [...prev];
          updated[currentTurn + indexOffset] =
            (updated[currentTurn + indexOffset] || "") + finalSegment;
          return updated;
        });
      }
    };

    recognition.onend = () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      if (isListeningRef.current) {
        debounceTimeout = setTimeout(() => {
          if (isListeningRef.current) {
            try {
              recognition.start();
            } catch (err) {
              console.error("Error restarting recognition:", err);
            }
          }
        }, 500); // debounce
      }
    };

    if (isListening) recognition.start();
    else recognition.stop();

    return () => recognition.abort();
  }, [isListening, currentTurn, numPlayers, phase]);

  return (
    <div className="game-container">
      <div className="game-background">
        <div className="bg-grid" />
        <div className="bg-overlay" />
      </div>

      <div className="prompt-section">
        <h1 className="prompt-content">{party.prompt}</h1>
      </div>

      <div className="phase-indicator">
        {phase === "response"
          ? `🗣️ ${currentPlayerName} is responding!`
          : `💬 ${currentPlayerName} is refuting!`}
      </div>

      <div className="countdown-display">{countdown}</div>

      {isCurrentUserTurn && (
        <button
          className="microphone-button"
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? "🎙️ Stop Listening" : "🎤 Start Speaking"}
        </button>
      )}

      <div className="transcription-container">
        <h3 className="response-title">💬 Responses:</h3>
        {players.map((user, index) => (
          <p key={user.uuid} className="opponent-response">
            <strong>{user.firstName}:</strong> {transcription[index]}
          </p>
        ))}

        <h3 className="response-title">🔄 Refutations:</h3>
        {players.map((user, index) => (
          <p key={user.uuid} className="opponent-response">
            <strong>{user.firstName}:</strong>{" "}
            {transcription[index + numPlayers]}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PlayGame;
