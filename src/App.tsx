import { Route, Routes } from "react-router-dom";
import ChooseRoom from "./components/ChooseRoom";
import JoinCourtPage from "./components/JoinGame";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChooseRoom />} />
      <Route path="/join" element={<JoinCourtPage />} />
    </Routes>
  );
}

export default AppRoutes;
