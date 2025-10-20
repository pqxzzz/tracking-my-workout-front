"use client";
import { StreakCheck } from "./StreakCheck";
import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Skeleton } from "../ui/skeleton";
import { isSameDay, subDays } from "date-fns";
import { Flame, Target } from "lucide-react";

export function StreakDays() {
  const workoutLog = useGetUserWorkoutLogs(1, 7);

  if (workoutLog.isPending || !workoutLog.data) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6 h-full flex flex-col justify-center">
          <div className="flex justify-center gap-3">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  const last7Days = [...Array(7)].map((_, i) => subDays(today, 6 - i));

  const streakLast7Days = last7Days.map((day) => {
    const didWorkout = workoutLog.data.data.some((log) =>
      isSameDay(new Date(log.date), day)
    );
    return {
      date: day,
      isCheck: didWorkout
    };
  });

  const currentStreak = streakLast7Days.filter((day) => day.isCheck).length;

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6 shadow-lg h-full flex flex-col justify-center">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="h-5 w-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-foreground">Week Streak</h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Target className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {currentStreak}/7 days completed
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {streakLast7Days.map((day, index) => (
            <StreakCheck
              key={index}
              isCheck={day.isCheck}
              date={day.date}
              className="transition-all duration-300 hover:scale-110 hover:shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
