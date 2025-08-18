"use client";
import { ChangeWorkout } from "@/components/ChangeWorkouts/ChangeWorkout";
import { WorkoutSetTable } from "@/components/Profile/WorkoutSetTable";
import { Skeleton } from "@/components/ui/skeleton";
import { WeightProgressChart } from "@/components/Weight/WeightProgressChart";
import { AuthContext } from "@/context/AuthContext";
import { getUserWorkoutSets } from "@/hooks/useGetWorkoutSets";
import { User, Weight } from "lucide-react";
import { useContext } from "react";

export default function ProfilePage() {
  const context = useContext(AuthContext);

  console.log(context);

  const workoutSetInfo = getUserWorkoutSets();

  console.log("WORKOUTSET INFO:", workoutSetInfo.data);

  return (
    <div className="px-5 lg:px-10 flex flex-col gap-5 pb-50">
      <div className="w-full flex gap-5">
        <div className="card center flex-col w-fit">
          <div className="rounded-full mb-5 center w-16 h-16 border border-zinc-300 bg-zinc-950">
            <User />
          </div>
          <h1 className="">{context?.user?.username}</h1>
          <h1>{Number(context?.user?.height) / 100} m</h1>
          <h1>{context?.user?.birthDate}</h1>
        </div>
        {/* <WeightProgressChart /> */}
      </div>
      {workoutSetInfo.isPending && (
        // TODO: trocar para skeleton
        <div className="card flex items-start w-1/2 flex-col gap-5">
          <div className="h-5 w-40 bg-zinc-700 animate-pulse rounded" />
          <div className="h-5 w-24 bg-zinc-700 animate-pulse rounded" />
          <div className="h-5 w-32 bg-zinc-700 animate-pulse rounded" />
        </div>
      )}

      {workoutSetInfo && workoutSetInfo.data && (
        <WorkoutSetTable WorkoutSet={workoutSetInfo.data} />
      )}

      <div className="border-t pt-10 border-t-neutral-400">
        <ChangeWorkout />
      </div>
    </div>
  );
}
