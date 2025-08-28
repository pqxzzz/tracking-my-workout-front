import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Skeleton } from "../ui/skeleton";
import * as dateFns from "date-fns";

export function MostRecentWorkoutDay() {
  const MockRecentWorkoutDay = {
    day: "31/07/2025",
    workout: "Back and Biceps - x"
  };

  const workoutLog = useGetUserWorkoutLogs(1, 1);

  console.log("--->", workoutLog.data);

  if (workoutLog.isPending || !workoutLog.data) {
    return (
      <div className="card text-center md:h-[200px] flex flex-col items-center justify-center gap-5 p-4">
        <Skeleton className="h-6 w-64 rounded-md" /> {/* título */}
        <Skeleton className="h-5 w-48 rounded-md" /> {/* data */}
      </div>
    );
  }

  return (
    <div className="card text-center md:h-[200px] transition-all flex flex-col items-center justify-center gap-5 text-xl">
      <h1 className="break-all">
        Your last workout:
        <span> {workoutLog.data?.data[0].workout.name}</span>
      </h1>
      <h1>
        date: <span>{dateFns.format(workoutLog.data.data[0].date, "dd/MM/yyyy")}</span>
      </h1>
    </div>
  );
}
