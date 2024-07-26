import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

import { useMetricsSuspenseQuery } from "@/hooks/use-metrics-query";
import { AreaChart } from "./charts/area-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const tabs = {
  balance: "balance",
  dailyPl: "dailyPl",
} as const;

function MetricsCharts() {
  const { data } = useMetricsSuspenseQuery();

  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <Tabs defaultValue={tabs.balance}>
            <TabsList className="pb-8">
              <TabsTrigger className="h-[30px]" value={tabs.balance}>
                Balance
              </TabsTrigger>
              <TabsTrigger className="h-[30px]" value={tabs.dailyPl}>
                Daily PL
              </TabsTrigger>
            </TabsList>
            <TabsContent value={tabs.balance}>
              <AreaChart
                label="Balance"
                data={data.daily_summary}
                dataKey="total_profit"
              />
            </TabsContent>
            <TabsContent value={tabs.dailyPl}>
              <AreaChart
                label="Daily PL"
                data={data.daily_summary}
                dataKey="num_trades"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export function MetricsChartsSection() {
  return (
    <Suspense fallback={<Skeleton className="h-full" />}>
      <MetricsCharts />
    </Suspense>
  );
}
