import { dispatchRequest } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface DailySummary {
  date: string;
  num_losing_trades: number;
  num_trades: number;
  num_winning_trades: number;
  total_fees: number;
  total_loss: number;
  total_lots: number;
  total_pl: number;
  total_profit: number;
  total_roi: number;
}

export interface Metrics {
  account_id: number;
  average_loss: number;
  average_pl: number;
  average_profit: number;
  balance: number;
  daily_dd: number;
  daily_summary: DailySummary[];
  equity: number;
  losing_days: number;
  losing_trades: number;
  max_daily_dd: number;
  max_dd: number;
  max_loss: number;
  max_win: number;
  min_trading_days: number;
  net_pl: number;
  profit_factor: number;
  profit_target: number;
  starting_balance: number;
  status: "success";
  total_dd: number;
  total_fees: number;
  total_trades: number;
  trade_expectancy: number;
  trading_days: number;
  win_rate: number;
  winning_days: number;
  winning_trades: number;
}

export const metricsQuerykey = ["metrics"] as const;

export function useMetricsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: metricsQuerykey,
    async queryFn() {
      const response = await dispatchRequest<Metrics>(
        "/fetch_metrics"
      );

      return response.data;
    },
  });
}
