import { format } from "date-fns";
import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import tailwindConfig from "../../../tailwind.config.js";

const NUMBER_OF_TICKS_Y_AXIS = 5; // Adjust this number based on the number of desired ticks

export function AreaChart<TData>(props: {
  data: Array<TData>;
  dataKey: keyof TData;
  label: string;
}) {
  const chartData = props.data;
  const totalBalance = chartData.map((item) => item[props.dataKey] as number);

  // Find min and max balance values
  const minTotalBalance = Math.min(...totalBalance);
  const maxTotalBalance = Math.max(...totalBalance);

  // Calculate the range and interval
  const range = Math.abs(minTotalBalance - maxTotalBalance);
  const interval = Math.round(range / NUMBER_OF_TICKS_Y_AXIS);
  const extendedMax = (NUMBER_OF_TICKS_Y_AXIS + 1) * interval;
  const yAxisDomain = [minTotalBalance, extendedMax];

  return (
    <ChartContainer
      className="min-h-40"
      config={{
        [props.dataKey]: {
          label: props.label,
        },
      }}
    >
      <RechartsAreaChart accessibilityLayer data={chartData}>
        <CartesianGrid
          vertical={false}
          stroke="#1A1819"
          strokeDasharray="5 5"
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value: string) => format(new Date(value), "LLL d")}
          interval="preserveStartEnd"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={20}
          type="number"
          domain={yAxisDomain}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillChart" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={tailwindConfig.theme.extend.colors.primary[500]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={tailwindConfig.theme.extend.colors.primary[500]}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey={props.dataKey.toString()}
          type="natural"
          fill="url(#fillChart)"
          fillOpacity={0.4}
          stroke={tailwindConfig.theme.extend.colors.primary[600]}
          stackId="a"
        />
      </RechartsAreaChart>
    </ChartContainer>
  );
}
