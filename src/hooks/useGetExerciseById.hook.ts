import { getExerciseById } from "@/services/exercise";
import { useQuery } from "@tanstack/react-query";

export function useGetExerciseById(id: string) {
  return useQuery({
    queryKey: ["currentExercise", id],
    queryFn: () => getExerciseById(id)
  });
}
