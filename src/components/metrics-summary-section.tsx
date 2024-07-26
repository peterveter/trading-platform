import { useMetricsSuspenseQuery } from "@/hooks/use-metrics-query";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, Suspense, useState } from "react";
import { IconPlus } from "./icons/icon-plus";
import { IconRotate } from "./icons/icon-rotate";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";
import { IconDollar } from "./icons/icon-dollar";
import { IconChart } from "./icons/icon-chart";
import { formatPL } from "@/lib/utils";
import { IconWallet } from "./icons/icon-wallet";
import { IconScaleBalanced } from "./icons/icon-scale-balanced";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const timeframes = {
  week: "week",
  month: "month",
  day: "day",
} as const;

type Timeframe = keyof typeof timeframes;

const statsItemVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-white",
      "success-outline": "text-green-400",
      "destructive-outline": "text-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function StatsItem(
  props: { title: string; children: ReactNode } & VariantProps<
    typeof statsItemVariants
  >
) {
  return (
    <div>
      <p className="text-xs font-normal text-gray-300">{props.title}</p>
      <p className={statsItemVariants(props)}>{props.children}</p>
    </div>
  );
}

function StatsCard(props: {
  title: string;
  icon: ReactNode;
  value: string;
  percentage: number;
}) {
  return (
    <Card className="shadow-xs">
      <CardContent className="flex space-x-3">
        <div className="w-6 h-6 p-1.5 bg-primary-900 rounded-md">
          {props.icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-normal text-gray-300">{props.title}</p>
          <p className="text-sm font-normal text-gray-300 space-x-2">
            <span className="text-lg font-semibold text-white">
              {props.value}
            </span>
            <span
              className={
                props.percentage < 0 ? "text-red-500" : "text-green-400"
              }
            >
              ({props.percentage}%)
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfitLossBar(props: { averageProfit: number; averageLoss: number }) {
  const total = Math.abs(props.averageProfit) + Math.abs(props.averageLoss);
  const profitPercentage = (Math.abs(props.averageProfit) / total) * 100;
  const lossPercentage = (Math.abs(props.averageLoss) / total) * 100;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        width: "100%",
      }}
    >
      <div
        style={{
          flexGrow: profitPercentage,
        }}
      >
        <Progress value={100} className="bg-green-400 h-1.5" />
      </div>
      <div
        style={{
          flexGrow: lossPercentage,
        }}
      >
        <Progress value={100} className="bg-red-500 h-1.5" />
      </div>
    </div>
  );
}

function MetricsSummary() {
  const [timeframeFilter, setTimeframeFilter] = useState<Timeframe>(
    timeframes.month
  );

  const { data } = useMetricsSuspenseQuery();

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src="src/images/profile-placeholder.png"
                alt="profile"
              />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <div className="text-white text-lg font-semibold">
                Secondary Account
              </div>
              <div className="text-xs font-normal text-gray-300">
                Account ID: 127417370745
              </div>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-500 mx-8" />
          <div className="flex space-x-6">
            <StatsItem title="Trading Days">{data.trading_days}</StatsItem>
            <StatsItem title="Daily DD">{data.daily_dd}</StatsItem>
            <StatsItem
              title="Max Daily DD"
              variant={
                data.max_daily_dd < 0
                  ? "destructive-outline"
                  : "success-outline"
              }
            >
              {data.max_daily_dd}%
            </StatsItem>
            <StatsItem
              title="Max DD"
              variant={
                data.max_dd < 0 ? "destructive-outline" : "success-outline"
              }
            >
              {data.max_dd}%
            </StatsItem>
            <StatsItem
              title="Profit Target"
              variant={
                data.profit_target < 0
                  ? "destructive-outline"
                  : "success-outline"
              }
            >
              {data.profit_target}%
            </StatsItem>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Select
            value={timeframeFilter}
            onValueChange={(value: Timeframe) => {
              setTimeframeFilter(value);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={timeframes.month}>This month</SelectItem>
              <SelectItem value={timeframes.week}>This week</SelectItem>
              <SelectItem value={timeframes.day}>Today</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="primary">
            <IconPlus className="mr-2" />
            <span>Import trades</span>
          </Button>
          <Button size="sm" variant="primary">
            <IconRotate className="mr-2" />
            <span>Update objectives</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <StatsCard
          title="Balance"
          icon={<IconDollar className="text-primary-500" />}
          value={`$${data.balance}`}
          percentage={9.85} // hardcoded, unsure what is the value in the api response
        />
        <StatsCard
          title="Net P&L"
          icon={<IconChart className="text-primary-500" />}
          value={formatPL(data.net_pl)}
          percentage={-29.85} // hardcoded, unsure what is the value in the api response
        />
        <StatsCard
          title="Equity"
          icon={<IconWallet className="text-primary-500" />}
          value={`$${data.equity}`}
          percentage={-0.85} // hardcoded, unsure what is the value in the api response
        />

        <Card className="bg-gray-800 border-0 shadow-xs">
          <CardContent className="flex space-x-3">
            <div className="w-6 h-6 p-1.5 bg-primary-900 rounded-md">
              <IconScaleBalanced className="text-primary-500" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm font-normal text-gray-300">
                Avg Win / Loss
              </p>
              <div className="space-y-1">
                <ProfitLossBar
                  averageProfit={data.average_profit}
                  averageLoss={data.average_loss}
                />
                <div className="flex justify-between text-xs font-normal">
                  <p className="text-green-400">${data.average_profit}</p>
                  <p className="text-red-500">${Math.abs(data.average_loss)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-0 shadow-xs">
          <CardContent className="flex items-center justify-center">
            <div className="space-y-1 flex flex-col items-center justify-center w-20">
              <p className="text-sm font-normal text-gray-300">Win Rate</p>
              <p className="text-lg font-semibold text-green-400">
                {data.win_rate}%
              </p>
            </div>
            <div className="mx-3 w-px h-[21px] bg-gray-500" />
            <div className="space-y-1 flex flex-col items-center justify-center w-20">
              <p className="text-sm font-normal text-gray-300">Profit Factor</p>
              <p className="text-lg font-semibold text-white">
                {data.profit_factor}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function MetricsSummarySection() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4">
          <div className="grid grid-cols-12 gap-4">
            <Skeleton className="h-12 col-span-6" />
            <Skeleton className="h-12 col-end-11" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      }
    >
      <MetricsSummary />
    </Suspense>
  );
}
