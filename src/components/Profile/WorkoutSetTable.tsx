import { WorkoutSetType } from "@/services/workoutSet";
import { WorkoutTable } from "./WorkoutTable";

export function WorkoutSetTable({ WorkoutSet }: { WorkoutSet: WorkoutSetType }) {
  return (
    <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 space-y-5 gap-5 lg:gap-5">
      {WorkoutSet.workouts.map((workout) => (
        <WorkoutTable key={workout.id} Workout={workout} />
      ))}
    </div>
  );
}
