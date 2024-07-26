import { useSuspenseQuery } from "@tanstack/react-query";
import { dispatchRequest } from "../lib/api";

export interface OpenPosition {
  account_id: number;
  balance: number;
  entry: number;
  equity: number;
  exit: number;
  exit_time: string;
  fees: number;
  open_time: string;
  order_id: string;
  pl: number;
  position_type: string;
  quantity: number;
  roi: number;
  sl: number;
  status: string;
  symbol: string;
  tp: number;
}

export interface OpenPositionsQueryData {
  open_trades: Array<OpenPosition>;
  status: "success";
}

export const openPositionsQueryKey = ["open-positions"] as const;

export function useOpenPositionsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: openPositionsQueryKey,
    async queryFn() {
      const response = await dispatchRequest<OpenPositionsQueryData>(
        "/open_positions"
      );

      return response.data;
    },
  });
}
