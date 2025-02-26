import { useQuery } from "@tanstack/react-query";
import superjson from "superjson";
import type { User, Session } from "shared/db";

async function fetchAuth() {
  const res = await fetch("/api/auth/v1/validate", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Not authenticated.");
  }
  const parsed = superjson.parse(await res.text()) as {
    user: User;
    session: Session;
  };
  return parsed;
}

export const useFetchAuthQuery = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["auth", "validate"],
    queryFn: fetchAuth,
  });

  return { data, error, isLoading, refetch: () => fetchAuth() };
};
