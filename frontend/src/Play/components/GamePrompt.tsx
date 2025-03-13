interface GamePromptProps {
  prompt: string;
}

function GamePrompt({ prompt }: GamePromptProps) {
  return (
    <div className="prompt-section">
      <h1 className="prompt-content">{prompt}</h1>
    </div>
  );
}

export default GamePrompt;
