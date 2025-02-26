import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <div className="game-container">
      <h1 className="text-4xl font-bold text-green-600">Success!</h1>
      <p className="mt-4 text-lg text-gray-700">
        You have successfully authenticated. Please wait to be redirected.
      </p>
    </div>
  );
};
export default Success;
