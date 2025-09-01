import { getUserWorkoutSets } from "@/hooks/useGetWorkoutSets";
import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { WorkoutType } from "@/services/workoutSet";
import Link from "next/link";

export const TodayWorkoutInfo = () => {
  const workoutLog = useGetUserWorkoutLogs(1, 1);

  const workoutSet = getUserWorkoutSets();

  console.log("workoutLogData", workoutLog.data);

  if (!workoutLog.data || !workoutSet.data) {
    return <p>loading</p>;
  }

  const indexOfLastWorkout = workoutSet.data.workouts.findIndex(
    (workout) => workout.id === workoutLog.data.data[0].workoutId
  );

  const indexOfNextWorkout = (indexOfLastWorkout + 1) % workoutSet.data.workouts.length;

  const nextWorkout: WorkoutType = workoutSet.data.workouts[indexOfNextWorkout];

  return (
    <div className="rounded-lg border border-white">
      <Link href={`./workout/${nextWorkout.id}`} className="flex items-center justify-center py-2">
        <p>Next workout</p>
      </Link>
    </div>
  );
};
