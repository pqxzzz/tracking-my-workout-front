"use client";
import { ChangeWorkout } from "@/components/ChangeWorkouts/ChangeWorkout";
import { MostRecentWorkoutDay } from "@/components/MostRecentWorkoutDay/MostRecentWorkoutDay";
import { NewDay } from "@/components/NewDay/NewDay";
import { StreakDays } from "@/components/StreakDays/StreakDays";
import { AuthContext } from "@/context/AuthContext";
import { useGetUser } from "@/hooks/useAuth";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext);
  const data = useGetUser({ enabled: true });

  console.log("DATA: ", data.data);

  if (!context) {
    return <div className="alert">Nao tem context</div>;
  }

  return (
    <div className="px-10">
      <NewDay />
      <StreakDays />
      <MostRecentWorkoutDay />
      <ChangeWorkout />
    </div>
  );
}
