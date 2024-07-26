import { dispatchRequest } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const accountDetailsQueryKey = ["account_details"] as const;

export interface AccountDetails {
  account_id: number,
  account_name: string,
  auto_be_level: number,
  balance: number,
  commissions: [
    {
      asset_class: string,
      price_per_lot: number
    },
    {
      asset_class: string,
      price_per_lot: number
    }
  ],
  daily_loss_limit: number,
  equity: number,
  exchange: string,
  leverage: number,
  max_lot_sizes: [], // add type
  one_click: true,
  risk: number,
  show_leaderboard: false,
  starting_balance: number,
  status: "success",
  symbol_mappings: [
    {
      mapping: string,
      symbol: string
    }
  ],
  take_profit_level: number
}

export function useAccountSettingsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: accountDetailsQueryKey,
    async queryFn() {
      const response = await dispatchRequest<AccountDetails>(
        "/account_details"
      );

      return response.data;
    },
  });
}
