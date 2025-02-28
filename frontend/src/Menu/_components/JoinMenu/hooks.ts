import { useQuery } from "@tanstack/react-query";
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

    const parsed = superjson.parse(await res.text()) as ApiResponse<{
        parties: Party[];
    }>;
    return parsed;
}


export const useFindPartyQuery = (partyId: string) => {
    return useQuery<Party>({
        queryKey: ["party", "find", partyId],
        queryFn: () => findParty(partyId),
    });
}


export async function findParty(partyId: string) {
    const res = await fetch(`/api/party/fetch/${partyId}`, {method: "GET"});

    if (!res.ok) {
        throw new Error("Failed to find party");
    }

    const json = await res.json();
    return json;
}
