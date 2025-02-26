import { Link } from "react-router-dom";
import { useFetchAuthQuery } from "./hooks";
import { RotateLoader } from "react-spinners";

function Auth() {
  const { data: json, error, isPending, refetch } = useFetchAuthQuery();
  if (error) {
    return (
      <div>
        <h2>Error: {(error as Error).message}</h2>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="game-container">
        <RotateLoader color="#9844fc" />
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Google Authentication</h1>
      {json.success ? (
        <div>
          <p>
            Welcome,{" "}
            <strong>{json.data.user.email || json.data.user.uuid}</strong>
          </p>
          <Link to={"api/auth/v1/logout"} reloadDocument>
            <button>Logout</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to={"api/auth/v1/google"} reloadDocument>
            <button>Sign in with Google</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Auth;
