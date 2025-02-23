import { Route, Routes } from "react-router-dom";
import ChooseRoom from "./components/ChooseRoom";
import JoinGame from "./components/JoinGame";
import Lobby from "./components/Lobby";
import CreateGame from "./game/_components/CreateGame";
import PlayGame from "./components/PlayGame";
import NotFound from "./components/NotFound";
import GameReport from "./components/GameReport";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChooseRoom />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/createGame" element={<CreateGame />} />
      <Route path="/game/:partyId" element={<PlayGame />} />
      <Route path="/room/:joinedPartyId" element={<Lobby />} />
      <Route path="/gameReport" element={<GameReport />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
