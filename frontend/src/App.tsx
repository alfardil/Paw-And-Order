import { Route, Routes } from "react-router-dom";
import ChooseRoom from "./components/ChooseRoom";
import JoinGame from "./components/JoinGame";
import Lobby from "./components/Lobby";
import CreateGame from "./components/CreateGame";
import PlayGame from "./components/PlayGame";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChooseRoom />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/create" element={<CreateGame />} />
      <Route path="/game/:partyId" element={<PlayGame />} />
      <Route path="/room/:joinedPartyId" element={<Lobby />} />
    </Routes>
  );
}

export default AppRoutes;
