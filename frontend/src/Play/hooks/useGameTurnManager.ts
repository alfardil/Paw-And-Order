import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { Party } from "../../validation/party.schema";

interface GameTurnManagerProps {
  party: Party;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  currentTurn: number;
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
  phase: "response" | "refutation";
  setPhase: React.Dispatch<React.SetStateAction<"response" | "refutation">>;
  transcription: string[];
  navigate: NavigateFunction;
}

function useGameTurnManager({
  party,
  countdown,
  setCountdown,
  currentTurn,
  setCurrentTurn,
  phase,
  setPhase,
  transcription,
  navigate
}: GameTurnManagerProps) {
  useEffect(() => {
    if (!party) return;
    
    const numPlayers = party.users.length;
    
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
    setCountdown,
    setCurrentTurn,
    setPhase
  ]);
}

export default useGameTurnManager;
