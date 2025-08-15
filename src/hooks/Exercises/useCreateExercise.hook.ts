import { createExercise } from "@/services/exercise";
import { ExerciseType } from "@/services/workoutSet";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExercise = () => {
  return useMutation({
    mutationFn: ({ exerciseBody }: { exerciseBody: Omit<ExerciseType, "id"> }) =>
      createExercise(exerciseBody)
  });
};
