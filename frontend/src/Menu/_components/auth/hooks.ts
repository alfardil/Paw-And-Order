import { useQuery } from "@tanstack/react-query";
import { ValidationResponse } from "../../../validation/types";

async function fetchAuth(): Promise<ValidationResponse> {
  const res = await fetch("/api/auth/v1/validate", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Not authenticated.")
  }
  return res.json();
}

export const useFetchAuthQuery = () => {
    const {data, error, isLoading, } = useQuery<ValidationResponse>({
        queryKey: ["auth", "validate"],
        queryFn: fetchAuth,
    });

    return {data, error, isLoading, refetch: () => fetchAuth()};
}
