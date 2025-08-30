import { useGetUserWeights } from "@/hooks/Weight/useGetUserWeights.hook";
import { WeightProgressChart } from "./WeightProgressChart";

export const WeightInfo = () => {
  const weightInfo = useGetUserWeights();

  if (weightInfo.isPending || !weightInfo.data) {
    return <div>carregando</div>;
  }

  return (
    <div className="mt-10">
      <WeightProgressChart weightInfo={weightInfo.data} />
    </div>
  );
};
