import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Button } from "../ui/button";
import { postWorkoutLog, WorkoutLogType } from "@/services/workout_logs.service";
import { getUserWorkoutSets } from "@/hooks/useGetWorkoutSets";
import { Skeleton } from "../ui/skeleton";
import { WorkoutType } from "@/services/workoutSet";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function NewDayForm({
  lastWorkout,
  closeModal
}: {
  lastWorkout: WorkoutLogType;
  closeModal: () => void;
}) {
  const workoutSet = getUserWorkoutSets();
  const queryClient = useQueryClient();

  const newWorkoutLogMutation = useMutation({
    mutationFn: (workoutId: string) => postWorkoutLog(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workoutLogs"] });
      closeModal();
    }
  });

  console.log(workoutSet.data);

  if (!workoutSet.data || workoutSet.isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" /> {/* Para o título */}
        <div className="flex flex-row justify-between">
          <Skeleton className="h-5 w-1/2" /> {/* Para o texto do próximo treino */}
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Para o botão de skip */}
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-40 rounded-md" /> {/* Para o botão principal */}
        </div>
      </div>
    );
  }

  const indexOfLastWorkout = workoutSet.data.workouts.findIndex(
    (workout) => workout.id === lastWorkout.workoutId
  );

  const indexOfNextWorkout = (indexOfLastWorkout + 1) % workoutSet.data.workouts.length;

  const nextWorkout: WorkoutType = workoutSet.data.workouts[indexOfNextWorkout];

  const handleSkipWorkout = () => {
    console.log("skipping workout");
  };

  const handleCompleteWorkout = () => {
    if (!nextWorkout?.id) return;
    newWorkoutLogMutation.mutate(nextWorkout.id);

    // newWorkoutLogMutation.mutate
    //fechar modal no onsuccess?
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1>
          Your last workout was: <span>{lastWorkout.workout.name}</span>
        </h1>
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-lg">
          Your next workout is supposed to be: <span>{nextWorkout.name}</span>
        </h1>
        <Button variant="outline" className="w-fit" onClick={handleSkipWorkout}>
          <p> ⏩ </p>
        </Button>
      </div>
      <div className="flex justify-center">
        <Button className="w-fit" onClick={handleCompleteWorkout}>
          Complete workout!
        </Button>
      </div>
    </div>
  );
}
