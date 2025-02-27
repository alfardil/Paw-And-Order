import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";

export const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <div className="game-container">
      <h1>Success!</h1>
      <p>You have successfully authenticated. Please wait to be redirected.</p>
      <RotateLoader color="#9844fc" />
    </div>
  );
};
export default Success;
