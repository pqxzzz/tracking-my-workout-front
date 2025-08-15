"use client";
import { WorkoutSetTable } from "@/components/Profile/WorkoutSetTable";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext";
import { getUserWorkoutSets } from "@/hooks/useGetWorkoutSets";
import { useContext } from "react";

export default function ProfilePage() {
  const context = useContext(AuthContext);

  console.log(context);

  const workoutSetInfo = getUserWorkoutSets();

  console.log("WORKOUTSET INFO:", workoutSetInfo.data);

  return (
    <div className="px-5 lg:px-10 flex flex-col gap-5">
      <div className="bg-neutral-800 rounded-lg p-5 flex flex-col gap-2 border border-neutral-700 w-fit">
        <h1 className="">{context?.user?.username}</h1>
        <h1>{Number(context?.user?.height) / 100} m</h1>
        <h1>{context?.user?.birthDate}</h1>
      </div>

      {workoutSetInfo.isPending && (
        <div className="bg-neutral-800 rounded-lg p-5 flex flex-col gap-2 border border-neutral-700 w-fit">
          <div className="h-5 w-40 bg-neutral-700 animate-pulse rounded" />
          <div className="h-5 w-24 bg-neutral-700 animate-pulse rounded" />
          <div className="h-5 w-32 bg-neutral-700 animate-pulse rounded" />
        </div>
      )}

      {workoutSetInfo && workoutSetInfo.data && (
        // <div className="bg-neutral-800 rounded-lg p-5 flex flex-col gap-2 border border-green-400 w-fit">
        //   <h1 className="font-bold text-xl">{workoutSetInfo.data?.name}</h1>
        //   <div className="pl-5">
        //     {workoutSetInfo.data?.workouts.map((workout) => (
        //       <div key={workout.id}>
        //         <h1 className="text-lg"> {workout.name} </h1>
        //         <div className="pl-5">
        //           {workout.exercises.map((exercise) => (
        //             <div key={exercise.id} className="flex gap-2">
        //               <h1>{exercise.name.toLowerCase()}</h1>
        //               <p className="font-bold">{exercise.weight}</p>
        //               <h2>{exercise.series}</h2>
        //             </div>
        //           ))}
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        // </div>
        <WorkoutSetTable WorkoutSet={workoutSetInfo.data} />
      )}
    </div>
  );
}
