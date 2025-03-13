import { useLocation } from "react-router-dom";
import { Party } from "../validation/party.schema";

function GameReport() {
  const location = useLocation();
  const party: Party = location.state?.party;
  const transcription: string[] = location.state?.transcription;

  return (
    <div className="game-container">
      <h1>Game Report</h1>
      <p>This is the game report.</p>

      <h2>{party.name}</h2>
      <p>{transcription}</p>
    </div>
  );
}

export default GameReport;
