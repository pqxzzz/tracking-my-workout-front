"use client";
import { ChangeWorkout } from "@/components/ChangeWorkouts/ChangeWorkout";
import { WorkoutSetTable } from "@/components/Profile/WorkoutSetTable";
import { Skeleton } from "@/components/ui/skeleton";
import { WeightProgressChart } from "@/components/Weight/WeightProgressChart";
import { AuthContext } from "@/context/AuthContext";
import { useGetUser } from "@/hooks/useAuth";
import { getUserWorkoutSets } from "@/hooks/useGetWorkoutSets";
import { User, Weight } from "lucide-react";
import { useContext } from "react";

export default function ProfilePage() {
  const workoutSetInfo = getUserWorkoutSets();

  const userData = useGetUser({ enabled: true });

  if (!userData.data || userData.isPending || workoutSetInfo.isPending) {
    return (
      <div className="px-5 lg:px-10 flex flex-col gap-5 pb-50">
        <div className="w-full flex gap-5">
          <div className="card center flex-col w-fit">
            <Skeleton className="rounded-full mb-5 w-16 h-16" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          {/* <WeightProgressChart /> */}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-full" />
        </div>

        <div className="border-t pt-10 border-t-neutral-400">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-10 flex flex-col gap-5 pb-50">
      <div className="w-full flex gap-5">
        <div className="card center flex-col w-fit">
          <div className="rounded-full mb-5 center w-16 h-16 border border-zinc-300 bg-zinc-950">
            <User />
          </div>
          <h1 className="">{userData.data.username}</h1>
          <h1>{Number(userData.data.height) / 100} m</h1>
          <h1>{userData.data.birthDate}</h1>
        </div>
        {/* <WeightProgressChart /> */}
      </div>

      {workoutSetInfo.data && <WorkoutSetTable WorkoutSet={workoutSetInfo.data} />}

      <div className="border-t pt-10 border-t-neutral-400">
        <ChangeWorkout />
      </div>
    </div>
  );
}
