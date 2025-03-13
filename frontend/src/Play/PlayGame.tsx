import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { useFetchAuthQuery } from "../Menu/_components/auth/hooks";
import { Loader } from "../Menu/_components/ui/Loader";
import { Party } from "../validation/party.schema";
import PhaseIndicator from "./components/PhaseIndicator";
import CountdownTimer from "./components/CountdownTimer";
import MicrophoneButton from "./components/MicrophoneButton";
import TranscriptionDisplay from "./components/TranscriptionDisplay";
import GamePrompt from "./components/GamePrompt";
import useGameTurnManager from "./hooks/useGameTurnManager";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

function PlayGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const party: Party = location.state?.party;

  const [currentTurn, setCurrentTurn] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [phase, setPhase] = useState<"response" | "refutation">("response");
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string[]>(
    Array(party?.users.length * 2).fill("")
  );

  const { data: json, error, isPending, refetch } = useFetchAuthQuery();

  const handleTranscriptionUpdate = (index: number, text: string) => {
    setTranscription((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] || "") + text;
      return updated;
    });
  };

  useGameTurnManager({
    party,
    countdown,
    setCountdown,
    currentTurn,
    setCurrentTurn,
    phase,
    setPhase,
    transcription,
    navigate,
  });

  useSpeechRecognition({
    isListening,
    currentTurn,
    numPlayers: party?.users.length || 0,
    phase,
    onTranscriptionUpdate: handleTranscriptionUpdate,
  });

  if (isPending) return <Loader />;

  if (error || !json?.success)
    return (
      <div>
        <h2>Error:</h2>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

  if (!party) {
    return <div>No party data available</div>;
  }

  const thisPlayer = json.data.user;
  const players = party.users;
  const numPlayers = players.length;

  const currentPlayer = players[currentTurn % numPlayers];
  const currentPlayerName = currentPlayer
    ? currentPlayer.firstName
    : "Unknown Player";
  const isCurrentUserTurn = thisPlayer.uuid === currentPlayer.uuid;

  return (
    <div className="game-container">
      <div className="game-background">
        <div className="bg-grid" />
        <div className="bg-overlay" />
      </div>

      <GamePrompt prompt={party.prompt} />
      <PhaseIndicator phase={phase} currentPlayerName={currentPlayerName} />
      <CountdownTimer countdown={countdown} />

      {isCurrentUserTurn && (
        <MicrophoneButton
          isListening={isListening}
          toggleListening={() => setIsListening(!isListening)}
        />
      )}

      <TranscriptionDisplay
        players={players}
        transcription={transcription}
        numPlayers={numPlayers}
      />
    </div>
  );
}

export default PlayGame;
