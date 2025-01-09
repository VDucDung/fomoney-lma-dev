import { fetchRankings } from "@/services/user";
import { useUser } from "@/store/user";
import { RankingResponse } from "@/types/user";
import { AuthProvider } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useFetchRankings = () => {
  const user = useUser(); // Ensure `user` comes from a hook providing it

  return useQuery<RankingResponse, Error>({
    queryKey: ["rankings", user?.provider || AuthProvider.sonicx], // Include provider in queryKey for accurate caching
    queryFn: () => fetchRankings(user?.provider ?? AuthProvider.sonicx), // Use nullish coalescing for fallback
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });
};
