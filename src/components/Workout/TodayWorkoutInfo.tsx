import { useGetUserActiveWorkoutSet } from "@/hooks/useGetWorkoutSets";
import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { WorkoutType } from "@/services/workoutSet";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ArrowRight, Dumbbell } from "lucide-react";

export const TodayWorkoutInfo = () => {
  const workoutLog = useGetUserWorkoutLogs(1, 1);
  const workoutSet = useGetUserActiveWorkoutSet();

  if (workoutLog.isPending || workoutSet.isPending) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  }

  if (!workoutSet.data) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Dumbbell className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                No Workout Set
              </p>
              <p className="text-lg font-semibold text-foreground">
                Create a workout set to start
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!workoutLog.data) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  }

  const indexOfLastWorkout = workoutSet.data.workouts.findIndex(
    (workout) => workout.id === workoutLog.data.data[0].workoutId
  );

  const indexOfNextWorkout =
    (indexOfLastWorkout + 1) % workoutSet.data.workouts.length;
  const nextWorkout: WorkoutType = workoutSet.data.workouts[indexOfNextWorkout];

  return (
    <div className="w-full max-w-md mx-auto">
      <Link
        href={`./workout/${nextWorkout.id}`}
        className="group block bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
              <Dumbbell className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Next Workout
              </p>
              <p className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                {nextWorkout.name}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
};
