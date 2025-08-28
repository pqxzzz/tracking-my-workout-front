import { getWorkoutLogs } from "@/services/workout_logs.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUserWorkoutLogs(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ["workoutLogs", page, limit],
    queryFn: () => getWorkoutLogs(page, limit)
  });
}
