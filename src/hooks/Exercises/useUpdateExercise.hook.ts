import { patchExercise } from "@/services/exercise";
import { ExerciseType } from "@/services/workoutSet";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateExercise = () => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ExerciseType> }) =>
      patchExercise(id, data)
    //TODO: adc onError que trigga o toast
  });
};
