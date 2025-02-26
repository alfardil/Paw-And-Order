import { useQuery } from "@tanstack/react-query";
import superjson from "superjson";

async function fetchAuth(): Promise<any> {
  const res = await fetch("/api/auth/v1/validate", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Not authenticated.")
  }
  const parsed = superjson.parse(await res.text());
  return parsed;
}

export const useFetchAuthQuery = () => {
    const {data, error, isLoading, } = useQuery<any>({
        queryKey: ["auth", "validate"],
        queryFn: fetchAuth,
    });

    return {data, error, isLoading, refetch: () => fetchAuth()};
}
