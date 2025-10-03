"use client";
import { ChangeWorkout } from "@/components/ChangeWorkouts/ChangeWorkout";
import { WorkoutSetTable } from "@/components/Profile/WorkoutSetTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUser } from "@/hooks/useAuth";
import { useGetUserActiveWorkoutSet } from "@/hooks/useGetWorkoutSets";
import { User, Weight, Calendar, Ruler, Trophy, Dumbbell } from "lucide-react";

export default function ProfilePage() {
  const workoutSetInfo = useGetUserActiveWorkoutSet();
  const userData = useGetUser({ enabled: true });

  if (!userData.data || userData.isPending || workoutSetInfo.isPending) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Profile Header Skeleton */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </div>

          {/* Workout Sets Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          </div>

          {/* Change Workout Skeleton */}
          <div className="border-t border-border pt-8">
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <User className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {userData.data.username}
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Ruler className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-semibold">
                        {(Number(userData.data.height) / 100).toFixed(2)} m
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Birth Date
                      </p>
                      <p className="font-semibold">
                        {new Date(
                          userData.data.birthDate ?? ""
                        ).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Member Since
                      </p>
                      <p className="font-semibold">2025*</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Sets Section */}
        {/* TODO: decidir oq fazer para quando nao tem workoutSetInfo */}
        {workoutSetInfo.data && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-foreground">
                Your Workout Sets
              </h2>
            </div>
            <WorkoutSetTable WorkoutSet={workoutSetInfo.data} />
          </div>
        )}

        {!workoutSetInfo.data && (
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              No Active Workout Set
            </h2>
            <p className="text-muted-foreground mb-6">
              You don't have an active workout set. Please create one to start
              tracking your workouts.
            </p>
          </div>
        )}

        {/* Change Workout Section */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center gap-3 mb-6">
            <Weight className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-foreground">
              Manage Workouts
            </h2>
          </div>
          <ChangeWorkout />
        </div>
      </div>
    </div>
  );
}
