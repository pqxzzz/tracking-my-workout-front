import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartConfig } from "../ui/chart";
import { ChartContainer } from "../ui/chart";

const mockUserWeights = [
  {
    date: "2025-05-20",
    weight: 65
  },
  {
    date: "2025-06-20",
    weight: 69
  },
  {
    date: "2025-07-20",
    weight: 63
  },
  {
    date: "2025-08-20",
    weight: 65
  },
  {
    date: "2025-09-20",
    weight: 74
  }
];

const chartConfig = {
  weight: {
    label: "Weight",
    color: "var(--border-success)"
  }
} satisfies ChartConfig;

const minWeight = Math.min(...mockUserWeights.map((d) => d.weight));
const maxWeight = Math.max(...mockUserWeights.map((d) => d.weight));

export const WeightProgressChart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] max-h-[600px] max-w-[600px] bg-red-400 w-full card"
    >
      <LineChart
        accessibilityLayer
        data={mockUserWeights}
        margin={{
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
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
