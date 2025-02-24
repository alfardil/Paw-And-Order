import { useQuery } from "@tanstack/react-query";

export const useFetchAllPartiesQuery = () => {
    return useQuery({
        queryKey: ["party", "fetch"],
        queryFn: fetchParties,
    });
}

export async function fetchParties() {
    const res = await fetch("/api/party/fetch", {method: "GET"});

    if (!res.ok) {
        throw new Error("Failed to fetch all parties");
    }

    const json = await res.json();
    return json;
}