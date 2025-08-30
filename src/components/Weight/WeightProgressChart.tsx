import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { ChartContainer } from "../ui/chart";
import { WeightType } from "@/services/weight.service";

const chartConfig = {
  weight: {
    label: "Weight",
    color: "var(--border-success)"
  }
} satisfies ChartConfig;

export const WeightProgressChart = ({ weightInfo }: { weightInfo: WeightType[] }) => {
  const sortedData = [...weightInfo].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const minWeight = Math.min(...weightInfo.map((d) => d.weight));
  const maxWeight = Math.max(...weightInfo.map((d) => d.weight));

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] max-h-[600px] max-w-[600px w-full card"
    >
      <LineChart
        accessibilityLayer
        data={sortedData}
        margin={{
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="createdAt"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("pt-BR", {
              month: "numeric",
              day: "numeric",
              year: "numeric"
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              labelFormatter={(_, payload) => {
                if (!payload?.length) return "";
                const isoDate = payload[0].payload.createdAt; // pega do backend
                const date = new Date(isoDate);
                return date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                });
              }}
            />
          }
        />
        <YAxis
          dataKey={"weight"}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => `${value} kg`}
          domain={[
            minWeight - 2, // margem inferior
            maxWeight + 2 // margem superior
          ]}
        />
        {/* TODO: Colocar tooltip */}
        <Line
          type="monotone"
          dataKey={"weight"}
          stroke={chartConfig.weight.color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};
