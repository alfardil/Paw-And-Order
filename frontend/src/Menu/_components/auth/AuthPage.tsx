import { useNavigate } from "react-router-dom";
import { useFetchAuthQuery } from "./hooks";

function Auth() {
  const { data, error, isLoading, refetch } = useFetchAuthQuery();
  const navigate = useNavigate();

  if (!isLoading) {
    return <div>isLoading...</div>;
  }
  if (error) {
    return (
      <div>
        <h2>Error: {(error as Error).message}</h2>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  const isAuthenticated = data?.success && data.data?.user ? true : false;
  const user = data?.data?.user;

  const handleSignIn = () => {
    navigate("/auth/v1/google");
  };

  const handleLogout = () => {
    navigate("/auth/v1/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Google Authentication</h1>
      {isAuthenticated && user ? (
        <div>
          <p>
            Welcome, <strong>{user.email || user.uuid}</strong>
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default Auth;
