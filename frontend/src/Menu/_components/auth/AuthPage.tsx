import { Link } from "react-router-dom";
import { useFetchAuthQuery } from "./hooks";

function Auth() {
  const { data, error, isLoading, refetch } = useFetchAuthQuery();
  console.log(data);
  console.log(error);
  console.log(isLoading);

  if (error) {
    return (
      <div>
        <h2>Error: {(error as Error).message}</h2>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!isLoading) {
    return <div>isLoading...</div>;
  }

  const isAuthenticated = data?.success && data.data?.user ? true : false;
  const user = data?.data?.user;

  return (
    <div style={{ padding: 20 }}>
      <h1>Google Authentication</h1>
      {isAuthenticated && user ? (
        <div>
          <p>
            Welcome, <strong>{user.email || user.uuid}</strong>
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
