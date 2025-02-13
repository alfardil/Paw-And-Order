import { Route, Routes } from "react-router-dom";
import ChooseRoom from "./components/ChooseRoom";
import JoinCourtPage from "./components/JoinGame";
import Lobby from "./components/Lobby";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChooseRoom />} />
      <Route path="/join" element={<JoinCourtPage />} />
      <Route path="/room/:roomId" element={<Lobby />} />{" "}
    </Routes>
  );
}

export default AppRoutes;
