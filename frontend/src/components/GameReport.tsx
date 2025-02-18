import { useLocation } from "react-router-dom";
import { Party } from "../mockData";

function GameReport() {
  const location = useLocation();
  const party: Party = location.state?.party;
  const transcription: string[] = location.state?.transcription;

  return (
    <div>
      <h1>Game Report</h1>
      <p>This is the game report.</p>
    </div>
  );
}

export default GameReport;
