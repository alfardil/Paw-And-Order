import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Party } from "../../../validation/party.schema";
import { ApiResponse } from "../../../lib/apiResponse";
import superjson from "superjson";

async function postCreateParty(partyData: Party) {
  const res = await fetch("/api/party/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: superjson.stringify(partyData),
  });

  if (!res.ok) {
    console.log("no good business");
   return {success: false}
  }
  
  const data = superjson.parse(await res.text()) as ApiResponse<Party>;
  return { success: data.success, data: data};
}

export function useCreateParty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateParty,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["parties"] });
      }
    }
    
  });
}
