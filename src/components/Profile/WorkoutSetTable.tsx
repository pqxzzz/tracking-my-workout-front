import { WorkoutSetType } from "@/services/workoutSet";
import { WorkoutTable } from "./WorkoutTable";

export function WorkoutSetTable({
  WorkoutSet
}: {
  WorkoutSet: WorkoutSetType;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">
            Workout Set:{" "}
            <span className="text-foreground font-semibold">
              {WorkoutSet.name}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            {WorkoutSet.workouts.length} workout
            {WorkoutSet.workouts.length !== 1 ? "s" : ""} in this set
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {WorkoutSet.workouts.map((workout) => (
          <WorkoutTable key={workout.id} Workout={workout} />
        ))}
      </div>
    </div>
  );
}
