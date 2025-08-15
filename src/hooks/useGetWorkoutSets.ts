import { getUserActiveWorkoutSet } from "@/services/workoutSet";
import { useQuery } from "@tanstack/react-query";

export function getUserWorkoutSets() {
  return useQuery({
    queryKey: ["activeWorkoutSet"],
    queryFn: () => getUserActiveWorkoutSet()
    // enabled
  });
}
