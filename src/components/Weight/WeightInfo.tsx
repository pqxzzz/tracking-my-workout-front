import { useGetUserWeights } from "@/hooks/Weight/useGetUserWeights.hook";
import { WeightProgressChart } from "./WeightProgressChart";
import { Skeleton } from "../ui/skeleton";
import { TrendingUp, Scale } from "lucide-react";

export const WeightInfo = () => {
  const weightInfo = useGetUserWeights();

  if (weightInfo.isPending || !weightInfo.data) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-48 mx-auto rounded-md mb-2" />
          <Skeleton className="h-5 w-64 mx-auto rounded-md" />
        </div>
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scale className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-foreground">
            Weight Progress
          </h2>
        </div>
        <p className="text-muted-foreground">
          Track your fitness journey with detailed weight analytics
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl p-6 shadow-lg">
        <WeightProgressChart weightInfo={weightInfo.data} />
      </div>
    </div>
  );
};
