"use client";

import { MostRecentWorkoutDay } from "@/components/MostRecentWorkoutDay/MostRecentWorkoutDay";
import { NewDay } from "@/components/NewDay/NewDay";
import { StreakDays } from "@/components/StreakDays/StreakDays";
import { WeightInfo } from "@/components/Weight/WeightInfo";
import { TodayWorkoutInfo } from "@/components/Workout/TodayWorkoutInfo";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext);

  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive mb-2">
            Authentication Error
          </div>
          <div className="text-muted-foreground">Please log in to continue</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-16">
          <TodayWorkoutInfo />
        </div>

        {/* Main Grid Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row lg:flex-row gap-8 h-full">
            <NewDay />
            <MostRecentWorkoutDay />
            <StreakDays />
          </div>
        </div>

        {/* Weight Progress Section */}
        <div className="mb-12">
          <WeightInfo />
        </div>
      </div>
    </div>
  );
}
