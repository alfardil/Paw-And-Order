interface PhaseIndicatorProps {
  phase: "response" | "refutation";
  currentPlayerName: string | null;
}

function PhaseIndicator({ phase, currentPlayerName }: PhaseIndicatorProps) {
  return (
    <div className="phase-indicator">
      {phase === "response"
        ? `🗣️ ${currentPlayerName} is responding!`
        : `💬 ${currentPlayerName} is refuting!`}
    </div>
  );
}

export default PhaseIndicator;
