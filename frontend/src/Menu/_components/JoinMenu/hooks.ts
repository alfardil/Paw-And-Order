import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Party } from "../../../validation/party.schema";
import { ApiResponse } from "../../../lib/apiResponse";
import superjson from "superjson";

export const useFetchAllPartiesQuery = () => {
    const query = useQuery({
        queryKey: ["party", "fetch"],
        queryFn: fetchParties,
    });

    return query;
}

export async function fetchParties() {
    const res = await fetch("/api/party/fetch/all", {method: "GET"});

    if (!res.ok) {
        throw new Error("Failed to fetch all parties");
    }

    const parsed = superjson.parse(await res.text()) as ApiResponse<Party[]>;
    return parsed;
}


export const useFindPartyQuery = (partyId: string) => {
    return useQuery({
        queryKey: ["party", "fetch", partyId],
        queryFn: () => findParty(partyId),
    });
}


export async function findParty(partyId: string) {
    const res = await fetch(`/api/party/fetch/${partyId}`);

    if (!res.ok) {
        throw new Error("Failed to find party");
    }

    const parsed = superjson.parse(await res.text()) as ApiResponse<Party>;
    return parsed;
}
export const useUpdatePartyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (partyId: string) => updateParty(partyId),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ["parties"] });
            }
        }
    });
}
export async function updateParty(partyId: string) {
    const res = await fetch(`/api/party/join/${partyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error("Failed to update party");
    }

    const parsed = superjson.parse(await res.text()) as ApiResponse<Party>;
    return parsed;
}