import { useMutation } from "@tanstack/react-query";
import superjson from "superjson";
import { ApiResponse } from "../../../../lib/apiResponse";

export default function LogoutPage() {
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

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        // show success msg.
        // 2 seconds later, redirect.
      },
    });
  };

  return <button onClick={handleLogout}>bye bye dont come back</button>;
}
