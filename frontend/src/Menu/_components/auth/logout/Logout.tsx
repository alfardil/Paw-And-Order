import { useMutation } from "@tanstack/react-query";
import superjson from "superjson";
import { ApiResponse } from "../../../../lib/apiResponse";
import { Link } from "react-router-dom";
import { RotateLoader } from "react-spinners";

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

  if (status === "pending") {
    return (
      <div className="game-container">
        <RotateLoader color="#9844fc" />
      </div>
    );
  }

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        // 2 seconds later, redirect.
      },
    });
  };

  return (
    <Link to={"/"} reloadDocument>
      <button onClick={handleLogout}>bye bye dont come back</button>
    </Link>
  );
}
