import { WorkoutSetType } from "@/services/workoutSet";
import {
  postNewWorkoutSet,
  workoutSetBody
} from "@/services/workoutSet.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";

export const usePostWorkoutSet = () => {
  const queryClient = useQueryClient();

  return useMutation<WorkoutSetType, Error, workoutSetBody>({
    mutationFn: (newWorkoutSet) => postNewWorkoutSet(newWorkoutSet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeWorkoutSet"] });
    }
  });
};
