import { useMutation } from "@tanstack/react-query";
import superjson from "superjson";
import { ApiResponse } from "../../../../lib/apiResponse";
import { Link } from "react-router-dom";
import { Loader } from "../../ui/Loader";

export default function Logout() {
  const { status, mutate, error } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/v1/logout", {
        method: "POST",
      });

      if (!res.ok) {
        return { success: false };
      }

      const data = superjson.parse(await res.text()) as ApiResponse<unknown>;

      return { success: data.success };
    },
  });

  if (error) {
    return (
      <div>
        <h2>Error: {(error as Error).message}</h2>
        <button onClick={() => mutate()}>Retry</button>
      </div>
    );
  }

  if (status === "pending") {
    return <Loader />;
  }

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {},
    });
  };

  return (
    <div style={{ zIndex: "1" }}>
      <Link to={"/"} reloadDocument>
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  );
}
