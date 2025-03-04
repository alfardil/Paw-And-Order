import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Party } from "../../../validation/party.schema";

interface StartGameProps {
  party: Party;
}

const StartGame = ({ party }: StartGameProps) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const playerCount = party.users.length;

  const handleStartGame = () => {
    navigate(`/play/game/${party.id}`, { state: { party } });
  };

  useEffect(() => {
    if (playerCount >= 2) {
      setCountdown(5);
    } else {
      setCountdown(null);
    }
  }, [playerCount]);

  useEffect(() => {
    if (countdown === 0) {
      handleStartGame();
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev ? prev - 1 : prev));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  if (playerCount < 2) {
    return <p>Waiting for players to join...</p>;
  }

  return (
    <div>
      {countdown && countdown > 0 ? (
        <p>Game starting in {countdown}...</p>
      ) : (
        <p>Starting game...</p>
      )}
    </div>
  );
};

export default StartGame;
