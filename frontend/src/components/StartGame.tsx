import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StartGameProps {
  playerCount: number;
}

const StartGame = ({ playerCount }: StartGameProps) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  useEffect(() => {
    if (playerCount >= 2) {
      setCountdown(5);
    } else {
      setCountdown(null);
    }
  }, [playerCount]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev ? prev - 1 : prev));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      handleStartGame();
    }
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
