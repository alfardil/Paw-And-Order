import { useQuery } from "@tanstack/react-query";
import superjson from "superjson";
import type { User, Session } from "shared/db";
import { ApiResponse } from "../../../lib/apiResponse";

async function fetchAuth() {
  const res = await fetch("/api/auth/v1/validate", {
    credentials: "include",
  });
  const parsed = superjson.parse(await res.text()) as ApiResponse<{
    user: User;
    session: Session;
  }>;
  return parsed;
}

export const useFetchAuthQuery = () => {
  const query = useQuery({
    queryKey: ["auth", "validate"],
    queryFn: fetchAuth,
  });

  return query;
};
