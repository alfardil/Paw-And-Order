import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../ui/Loader";

export const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <div className="game-container">
      <h2>Success!</h2>
      <p>You have successfully authenticated. Please wait to be redirected.</p>
      <Loader />
    </div>
  );
};
export default Success;
