interface User {
  uuid: string;
  firstName: string;
}

interface TranscriptionDisplayProps {
  players: User[];
  transcription: string[];
  numPlayers: number;
}

function TranscriptionDisplay({
  players,
  transcription,
  numPlayers,
}: TranscriptionDisplayProps) {
  return (
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
          <strong>{user.firstName}:</strong> {transcription[index + numPlayers]}
        </p>
      ))}
    </div>
  );
}

export default TranscriptionDisplay;
