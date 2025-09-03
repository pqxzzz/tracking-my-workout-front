import { getUserActiveWorkoutSet } from "@/services/workoutSet";
import { useQuery } from "@tanstack/react-query";

export const useGetUserActiveWorkoutSet = () => {
  return useQuery({
    queryKey: ["activeWorkoutSet"],
    queryFn: () => getUserActiveWorkoutSet()
    // enabled
  });
};
