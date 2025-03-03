import { RotateLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="game-container" style={{ zIndex: "1" }}>
      <RotateLoader color="#9844fc" />
    </div>
  );
};
