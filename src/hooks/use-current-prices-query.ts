import { dispatchRequest } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const currentPricesQueryKey = ["current_prices"] as const;

export const currencyCodes = {
  EUR: "EUR",
  USD: "USD",
  AUD: "AUD",
  GBP: "GBP",
  NZD: "NZD",
  CAD: "CAD",
  CHF: "CHF",
  JPY: "JPY",
};

export type CurrencyCode = keyof typeof currencyCodes;


// Utility type to generate combinations of currency codes
export type CurrencyPair = `${CurrencyCode}${CurrencyCode}`;
export type CurrentPrice = Record<CurrencyPair, number>
export interface CurrentPrices {
  prices: CurrentPrice[];
  status: "success"
}

export function useCurrentPricesSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: currentPricesQueryKey,
    async queryFn() {
      const response = await dispatchRequest<CurrentPrices>(
        "/current_prices"
      );

      return response.data;
    },
  });
}
