"use client";

import { MostRecentWorkoutDay } from "@/components/MostRecentWorkoutDay/MostRecentWorkoutDay";
import { NewDay } from "@/components/NewDay/NewDay";
import { StreakDays } from "@/components/StreakDays/StreakDays";
import { WeightInfo } from "@/components/Weight/WeightInfo";
import { TodayWorkoutInfo } from "@/components/Workout/TodayWorkoutInfo";

import { AuthContext } from "@/context/AuthContext";
import { useGetUser } from "@/hooks/useAuth";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext);
  const data = useGetUser({ enabled: true });

  if (!context) {
    return <div className="alert">No context</div>;
  }

  return (
    <div className="px-10 pb-50">
      <TodayWorkoutInfo />
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center">
        <NewDay />
        {/* <div className="flex gap-5"> */}
        <MostRecentWorkoutDay />
        <StreakDays />
      </div>
      {/* </div> */}
      {/* --- */}
      <div>
        <WeightInfo />
      </div>
    </div>
  );
}
