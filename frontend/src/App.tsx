import { Route, Routes } from "react-router-dom";
import JoinGame from "./Menu/_components/JoinMenu/JoinGame";
import Lobby from "./Menu/_components/JoinMenu/Lobby";
import CreateGame from "./Menu/_components/CreateMenu/CreateGame";
import PlayGame from "./Play/PlayGame";
import NotFound from "./components/NotFound";
import GameReport from "./components/GameReport";
import Success from "./Menu/_components/auth/success/Success";
import LogoutPage from "./Menu/_components/auth/logout/Logout";
import { Home } from "./Menu/_components/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
      <Route path="/logout" element={<LogoutPage />} />

      <Route path="/join" element={<JoinGame />} />
      <Route path="/party/create" element={<CreateGame />} />
      <Route path="/play/game/:partyId" element={<PlayGame />} />
      <Route path="/party/find/:joinedPartyId" element={<Lobby />} />
      <Route path="/gameReport" element={<GameReport />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
