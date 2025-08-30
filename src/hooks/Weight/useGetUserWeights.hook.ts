import { getUserWeights } from "@/services/weight.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUserWeights() {
  return useQuery({
    queryKey: ["userWeights"],
    queryFn: () => getUserWeights()
  });
}
