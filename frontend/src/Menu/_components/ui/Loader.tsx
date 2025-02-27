import { RotateLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div style={{ zIndex: "1" }}>
      <RotateLoader color="#9844fc" />
    </div>
  );
};
