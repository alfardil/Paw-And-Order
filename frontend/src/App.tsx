import { Route, Routes } from "react-router-dom";
import ChooseRoom from "./Menu/_components/Menu";
import JoinGame from "./Menu/_components/JoinMenu/JoinGame";
import Lobby from "./Menu/_components/JoinMenu/Lobby";
import CreateGame from "./Menu/_components/CreateMenu/CreateGame";
import PlayGame from "./components/PlayGame";
import NotFound from "./components/NotFound";
import GameReport from "./components/GameReport";
import AuthPage from "./Menu/_components/auth/AuthPage";
import Success from "./Menu/_components/auth/success/Success";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/chooseRoom" element={<ChooseRoom />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/party/create" element={<CreateGame />} />
      <Route path="/game/:partyId" element={<PlayGame />} />
      <Route path="/party/find/:joinedPartyId" element={<Lobby />} />
      <Route path="/gameReport" element={<GameReport />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
