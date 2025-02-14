import { Route, Routes } from "react-router-dom";
import ChooseRoom from "./components/ChooseRoom";
import JoinGame from "./components/JoinGame";
import Lobby from "./components/Lobby";
import CreateGame from "./components/CreateGame";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChooseRoom />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/create" element={<CreateGame />} />
      <Route path="/room/:roomId" element={<Lobby />} />{" "}
    </Routes>
  );
}

export default AppRoutes;
