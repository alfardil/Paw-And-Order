interface MicrophoneButtonProps {
  isListening: boolean;
  toggleListening: () => void;
}

function MicrophoneButton({
  isListening,
  toggleListening,
}: MicrophoneButtonProps) {
  return (
    <button className="microphone-button" onClick={toggleListening}>
      {isListening ? "🎙️ Stop Listening" : "🎤 Start Speaking"}
    </button>
  );
}

export default MicrophoneButton;
