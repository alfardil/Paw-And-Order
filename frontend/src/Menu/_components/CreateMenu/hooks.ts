import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Party } from "../../../validation/party.schema";

async function postCreateParty(partyData: Party) {
  console.log("partyData: ", partyData);
  const res = await fetch("/api/party/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partyData),
  });
  console.log(res);
  console.log("Response status:", res.status, res.statusText);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create party");
  }
  
  const json = await res.json();
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