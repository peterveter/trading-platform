import {
  CurrencyCode,
  currencyCodes,
  CurrencyPair,
} from "@/hooks/use-current-prices-query";
import { FlagEur } from "../flags/flag-eur";
import { FlagUsd } from "../flags/flag-usd";
import { FlagAud } from "../flags/flag-aud";
import { FlagGbp } from "../flags/flag-gbp";
import { FlagJpy } from "../flags/flag-jpy";
import { FlagCad } from "../flags/flag-cad";
import { FlagChf } from "../flags/flag-chf";
import { FlagNzd } from "../flags/flag-nzd";

function getFlagIconByCurrencyCode(currencyCode: CurrencyCode) {
  switch (currencyCode) {
    case currencyCodes.EUR:
      return <FlagEur />;
    case currencyCodes.USD:
      return <FlagUsd />;
    case currencyCodes.AUD:
      return <FlagAud />;
    case currencyCodes.GBP:
      return <FlagGbp />;
    case currencyCodes.JPY:
      return <FlagJpy />;
    case currencyCodes.CAD:
      return <FlagCad />;
    case currencyCodes.NZD:
      return <FlagNzd />;
    case currencyCodes.CHF:
      return <FlagChf />;
  }
}

function splitCurrencyPair(pair: CurrencyPair): {
  firstCurrency: CurrencyCode;
  secondCurrency: CurrencyCode;
} {
  const firstCurrency = pair.slice(0, 3) as CurrencyCode;
  const secondCurrency = pair.slice(3) as CurrencyCode;

  if (!currencyCodes[firstCurrency] || !currencyCodes[secondCurrency]) {
    throw new Error(`Invalid currency pair: ${pair}`);
  }

  return {
    firstCurrency,
    secondCurrency,
  };
}

export function Flag(props: { currencyCode: CurrencyCode }) {
  const flag = getFlagIconByCurrencyCode(props.currencyCode);
  return flag;
}

export function FlagPair(props: { currencyPair: CurrencyPair }) {
  const { firstCurrency, secondCurrency } = splitCurrencyPair(
    props.currencyPair
  );

  const firstFlag = getFlagIconByCurrencyCode(firstCurrency);
  const secondFlag = getFlagIconByCurrencyCode(secondCurrency);

  return (
    <div className="flex relative w-[44px]">
      <div>{firstFlag}</div>
      <div className="absolute ml-5">{secondFlag}</div>
    </div>
  );
}
