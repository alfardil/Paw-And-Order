import { useMutation, useQueryClient } from "@tanstack/react-query";

async function postCreateParty(partyData: any) {
  const response = await fetch("/api/partyCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partyData),
  });
    console.log("Response", response)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create party");
  }
  const json = await response.json();
  return { success: json.success, message: json.message };
}

export function useCreateParty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateParty,
    onSuccess: () => {
        queryClient.invalidateQueries();
    }
  });
}