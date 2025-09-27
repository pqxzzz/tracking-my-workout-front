import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Skeleton } from "../ui/skeleton";
import * as dateFns from "date-fns";
import { Clock, Calendar, Dumbbell } from "lucide-react";

export function MostRecentWorkoutDay() {
  const workoutLog = useGetUserWorkoutLogs(1, 1);

  if (workoutLog.isPending) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
          <Skeleton className="h-6 w-48 mx-auto mb-4 rounded-md" />
          <Skeleton className="h-5 w-32 mx-auto rounded-md" />
        </div>
      </div>
    );
  }

  if (!workoutLog.data || !workoutLog.data.data.length) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-foreground">
              No Workouts Found
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Start logging workouts to see your most recent activity here.
          </p>
        </div>
      </div>
    );
  }

  const isToday =
    dateFns.format(workoutLog.data.data[0].date, "dd/MM/yyyy") ===
    dateFns.format(new Date(), "dd/MM/yyyy");

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-center shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-foreground">
            Last Workout
          </h2>
        </div>

        <div className="space-y-3">
          <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
            <p className="text-sm text-muted-foreground mb-1">Workout</p>
            <p className="text-lg font-bold text-foreground break-words">
              {workoutLog.data?.data[0].workout.name}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4 text-orange-400" />
            <span
              className={`text-sm font-medium ${
                isToday ? "text-green-400" : "text-foreground/80"
              }`}
            >
              {isToday
                ? "Today!"
                : dateFns.format(workoutLog.data.data[0].date, "dd/MM/yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
