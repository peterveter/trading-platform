import { useAccountSettingsSuspenseQuery } from "@/hooks/use-account-settings-query";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check } from "lucide-react";
import React, { Suspense } from "react";
import { IconBook } from "./icons/icon-book";
import { IconChart } from "./icons/icon-chart";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

import {
  CurrencyPair,
  CurrentPrice,
  CurrentPrices,
  useCurrentPricesSuspenseQuery,
} from "@/hooks/use-current-prices-query";
import { IconChevronUp } from "./icons/icon-chevron-up";
import { IconCogOutline } from "./icons/icon-cog-outline";
import { IconEdit } from "./icons/icon-edit";
import { IconEyeOut } from "./icons/icon-eye-out";
import { IconInfoOutline } from "./icons/icon-info-outline";
import { IconMinusLine } from "./icons/icon-minus-line";
import { IconPlus } from "./icons/icon-plus";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { FlagPair } from "./ui/flag";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  TabsContent as TabsContentVertical,
  TabsList as TabsListVertical,
  TabsTrigger as TabsTriggerVertical,
  Tabs as TabsVertical,
} from "./ui/tabs-vertical";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { IconCalendar } from "./icons/icon-calendar";

const tabs = {
  chart: "chart",
  book: "book",
  calendar: "calendar",
} as const;

const chartTabs = {
  limit: "limit",
  market: "market",
} as const;

const limitTabs = {
  bySlots: "bySlots",
  bySl: "bySl",
} as const;

const PairSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    prices: CurrentPrice;
  }
>(({ className, prices, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default hover:bg-gray-600 select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-white" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>
      <div className="flex items-center justify-between w-72">
        <div className="flex space-x-2 items-center">
          <FlagPair currencyPair={props.value as CurrencyPair} />
          <span className="leading-none text-base font-semibold text-white">
            {props.value}
          </span>
        </div>
        <p className="text-white leading-none font-medium">
          {prices[props.value as CurrencyPair].toString()}
        </p>
      </div>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

PairSelectItem.displayName = "PairSelectItem";

function CurrencyPairSelect(props: { currentPrices: CurrentPrices }) {
  const prices = props.currentPrices.prices?.length
    ? props.currentPrices.prices[0]
    : ({} as CurrentPrice);

  const firstKey = Object.keys(prices)[0];

  return (
    <div className="border-b-2 border-gray-600">
      <Select defaultValue={firstKey}>
        <SelectTrigger
          className="w-full border-0 rounded-none bg-gray-900 p-6"
          chevronClass="h-5 w-5"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(prices).length &&
            Object.keys(prices).map((currencyPair) => (
              <PairSelectItem
                key={currencyPair}
                value={currencyPair as CurrencyPair as string}
                prices={prices}
              />
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function StepInput(props: { title: string; description?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs text-white">
        <p className="font-medium">{props.title}</p>
        {props.description && (
          <p className="font-normal">{props.description}</p>
        )}
      </div>
      <div className="relative">
        <button className="absolute w-12 left-0 top-0 h-full flex justify-center items-center text-xl text-gray-300">
          <IconMinusLine className="w-4 h-4" />
        </button>
        <Input value="0.00" className="text-center" onChange={() => {}} />
        <button className="absolute w-12 right-0 top-0 h-full flex justify-center items-center text-xl text-gray-300">
          <IconPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function LimitTabContent() {
  const { data: accountSettings } = useAccountSettingsSuspenseQuery();

  return (
    <Tabs className="w-full" defaultValue={limitTabs.bySlots}>
      <TabsList className="mb-5 px-0 block">
        <TabsTrigger className="h-[30px] w-1/2" value={limitTabs.bySlots}>
          Open by Lots
        </TabsTrigger>
        <TabsTrigger className="h-[30px] w-1/2" value={limitTabs.bySl}>
          Open by SL
        </TabsTrigger>
      </TabsList>
      <TabsContent className="space-y-5 min-h-96" value={limitTabs.bySlots}>
        <StepInput title="Limit Price" />
        <StepInput
          title="Quantity"
          description={`$${accountSettings.equity}`}
        />
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center space-x-2">
            <Checkbox />
            <span className="text-xs font-normal text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Add Set TP
            </span>
            <span className="text-xs font-normal text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              (Optional)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox />
            <span className="text-xs font-normal text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Add TP
            </span>
            <span className="text-xs font-normal text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              (Optional)
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between rounded-md h-10 bg-gray-600 px-4 py-3">
            {/* hardcoded no value in api */}
            <div className="flex-1 text-center text-xs text-green-500">
              1.06915
            </div>
            <Separator orientation="vertical" className="h-5 bg-gray-500" />
            {/* hardcoded no value in api */}
            <div className="flex-1 text-center text-xs text-red-500">
              1.06939
            </div>
          </div>
          <div className="space-x-2 flex w-full">
            <Button variant="success" className="flex-1 h-10">
              Buy / Long
            </Button>
            <Button variant="destructive" className="flex-1 h-10">
              Sell / Short
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value={limitTabs.bySl}>{/* no design */}</TabsContent>
    </Tabs>
  );
}

function InfoItem(props: { label: string; value: string; tooltip?: string }) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex space-x-1">
        {props.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-3 w-3">
                  <IconInfoOutline className="text-gray-300 w-3 h-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="bg-gray-500 rounded p-2">
                  <p className="text-white">{props.tooltip}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <p className="text-gray-300 text-xs font-normal">{props.label}:</p>
      </div>
      <p className="text-white text-xs font-medium">{props.value}</p>
    </div>
  );
}

function AccountInfo() {
  const { data: accountSettings } = useAccountSettingsSuspenseQuery();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="p-6">
        <div className="flex w-full justify-between items-center mb-4">
          <div className="flex space-x-2 items-center">
            <span className="text-white leading-none text-base font-semibold">
              Account Info
            </span>
            <span>
              <IconEyeOut className="text-gray-300 w-4 h-4" />
            </span>
          </div>
          <div className="flex space-x-2 items-center -mr-2">
            <Button className="bg-transparent hover:bg-gray-700 p-2">
              <IconCogOutline className="text-gray-300 w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-5 bg-gray-500" />
            <CollapsibleTrigger asChild>
              <Button className="bg-transparent hover:bg-gray-700 p-2">
                {isOpen ? (
                  <IconMinusLine className="text-gray-300 w-3.5 h-3.5" />
                ) : (
                  <IconChevronUp className="text-gray-300 w-3.5 h-3.5" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <div className="space-y-1">
          <InfoItem label="Name" value={accountSettings.account_name} />
          <InfoItem label="Balance" value={`$${accountSettings.balance}`} />
          <InfoItem label="Equity" value={`$${accountSettings.equity}`} />
          <div className="flex w-full justify-between items-center ">
            <p className="text-gray-300 text-xs font-normal">Exchange:</p>
            <p className="flex items-center space-x-2 text-white text-xs font-medium">
              <Avatar className="w-4 h-4">
                <AvatarImage
                  src="src/images/profile-placeholder.png"
                  alt="profile"
                />
                <AvatarFallback>EI</AvatarFallback>
              </Avatar>
              <span>{`${accountSettings.exchange}`}</span>
            </p>
          </div>
        </div>
        <CollapsibleContent>
          <Separator className="w-full bg-gray-500 my-4" />
          <div className="space-y-1">
            <InfoItem label="Leverage" value={`${accountSettings.leverage}x`} />
            <InfoItem
              label="Risk"
              value={`${accountSettings.risk}%`}
              tooltip="Risk toolitp"
            />
            <InfoItem
              label="Daily Loss Limit"
              value={`${accountSettings.daily_loss_limit}%`}
              tooltip="Daily Loss Limit toolitp"
            />
            <InfoItem
              label="Take Profit (RR)"
              value={`${accountSettings.take_profit_level}`}
              tooltip="Take Profit (RR) toolitp"
            />
            <InfoItem
              label="Auto BE Level (RR)"
              value={`${accountSettings.auto_be_level}`}
              tooltip="Auto BE Level (RR): toolitp"
            />
          </div>
          <Separator className="w-full bg-gray-500 my-4" />
          <div className="flex w-full justify-between items-center">
            <div className="flex space-x-1">
              <p className="text-gray-300 text-xs font-normal">
                One Click Trade:
              </p>
            </div>
            <Switch id="one-click-trade" />
          </div>
          <Separator className="w-full bg-gray-500 my-4" />
          <div className="flex w-full justify-between items-center">
            <div className="flex space-x-1">
              <p className="text-gray-300 text-xs font-normal">
                Show Account on Leaderboard:
              </p>
            </div>
            <Switch id="show-account" />
          </div>
          <Separator className="w-full bg-gray-500 my-4" />
          <div className="space-y-1">
            <div className="flex w-full justify-between items-center">
              <div className="flex space-x-1">
                <p className="text-gray-300 text-xs font-normal">
                  Max Lot Sizes:
                </p>
              </div>
              <Button variant="primary-outline" className="p-0.5 h-5 w-5">
                <IconPlus className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex space-x-1">
                <p className="text-gray-300 text-xs font-normal">
                  Account Commissions:
                </p>
              </div>
              <div className="flex space-x-1.5">
                <Badge>
                  <span className="space-x-1">
                    <span className="text-primary-500">
                      {accountSettings.commissions.length}
                    </span>
                    <span>Rules</span>
                  </span>
                </Badge>
                <Button variant="outline" className="w-5 h-5 p-0.5">
                  <IconEdit className="w-3 h-3 text-white" />
                </Button>
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex space-x-1">
                <p className="text-gray-300 text-xs font-normal">
                  Symbol Mappings:
                </p>
              </div>
              <div className="flex space-x-1.5">
                <Badge>
                  <span className="space-x-1">
                    <span className="text-primary-500">
                      {accountSettings.symbol_mappings.length}
                    </span>
                    <span>Rules</span>
                  </span>
                </Badge>
                <Button variant="outline" className="w-5 h-5 p-0.5">
                  <IconEdit className="w-3 h-3 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function OrderEntryPanel() {
  const { data: currentPrices } = useCurrentPricesSuspenseQuery();

  return (
    <TabsVertical className="flex-row-reverse" defaultValue={tabs.chart}>
      <TabsListVertical className="space-y-1 border-l-2 border-gray-600 rounded-none">
        <TabsTriggerVertical className="h-[30px]" value={tabs.chart}>
          <IconChart className="min-w-4 h-4" />
        </TabsTriggerVertical>
        <TabsTriggerVertical className="h-[30px]" value={tabs.book}>
          <IconBook className="min-w-4 h-4" />
        </TabsTriggerVertical>
        <Separator className="w-5 bg-gray-500" />
        <TabsTriggerVertical className="h-[30px]" value={tabs.calendar}>
          <IconCalendar className="min-w-4 h-4" />
        </TabsTriggerVertical>
      </TabsListVertical>
      <TabsContentVertical className="w-full bg-gray-900" value={tabs.chart}>
        <CurrencyPairSelect currentPrices={currentPrices} />
        <div className="flex px-5 pt-4 border-b-2 border-gray-600">
          <Tabs className="w-full" defaultValue={chartTabs.limit}>
            <TabsList className="mb-2 px-0 space-x-2 relative block">
              <TabsTrigger
                variant="text"
                className="h-[30px] p-0"
                value={chartTabs.limit}
              >
                Limit
              </TabsTrigger>
              <TabsTrigger
                variant="text"
                className="h-[30px] p-0"
                value={chartTabs.market}
              >
                Market
              </TabsTrigger>
              <Button
                className="mt-1 absolute p-1 h-4.5 right-0"
                variant="text"
              >
                Calculator
              </Button>
            </TabsList>
            <TabsContent value={chartTabs.limit}>
              <LimitTabContent />
            </TabsContent>
            <TabsContent value={chartTabs.market}>
              {/* no design */}
            </TabsContent>
          </Tabs>
        </div>
        <AccountInfo />
      </TabsContentVertical>
      <TabsContentVertical value={tabs.book}>
        {/* no design */}
      </TabsContentVertical>
      <TabsContentVertical value={tabs.calendar}>
        {/* no design */}
      </TabsContentVertical>
    </TabsVertical>
  );
}

export function OrderEntryPanelSection() {
  return (
    <div className="w-[402px]">
      <Suspense fallback={<Skeleton className="h-[45rem] mt-4" />}>
        <OrderEntryPanel />
      </Suspense>
    </div>
  );
}
