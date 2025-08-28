"use client";
import { Check } from "lucide-react";
import { StreakCheck } from "./StreakCheck";
import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Skeleton } from "../ui/skeleton";
import { isMatch, isSameDay, subDays } from "date-fns";

export function StreakDays() {
  const workoutLog = useGetUserWorkoutLogs(1, 7);

  if (workoutLog.isPending || !workoutLog.data) {
    // Render Skeleton enquanto os dados carregam
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Skeleton className="h-6 w-32" /> {/* título */}
        <div className="card p-10 flex items-center justify-center">
          <div className="flex gap-5">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  const today = new Date();
  const last7Days = [...Array(7)].map((_, i) => subDays(today, 6 - i)); // 6 dias atrás até hoje

  let streakLast7Days = last7Days.map((day) => {
    const didWorkout = workoutLog.data.data.some((log) => isSameDay(new Date(log.date), day));

    return {
      date: day,
      isCheck: didWorkout
    };
  });

  return (
    <div className="flex flex-col items-center justify-center gap-1 mt-10">
      <h1 className="text-xl font-bold text-neutral-300">Week Streak!</h1>
      <div className="card p-8 flex items-center justify-center bg-neutral-800 shadow-md rounded-xl">
        <div className="flex gap-4">
          {streakLast7Days.map((day, index) => (
            <StreakCheck
              key={index}
              isCheck={day.isCheck}
              date={day.date}
              className="transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
