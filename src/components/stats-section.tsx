import { IconMinusLine } from "./icons/icon-minus-line";
import { OpenPositions } from "./open-positions";
import { Button } from "./ui/button";
import { Chip } from "./ui/chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const tabs = {
  openPositions: "openPositions",
  openOrders: "openOrders",
  orderHistory: "orderHistory",
} as const;

export function StatsSection() {
  return (
    <Tabs defaultValue={tabs.openPositions}>
      <div className="flex justify-between">
        <TabsList className="flex gap-4 p-0">
          <TabsTrigger value={tabs.openPositions} variant="underline">
            Open Positions
            <Chip value={3} />
          </TabsTrigger>
          <TabsTrigger value={tabs.openOrders} variant="underline">
            Open Orders
            <Chip value={3} />
          </TabsTrigger>
          <TabsTrigger value={tabs.orderHistory} variant="underline">
            Order History
            <Chip value={3} />
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center">
          <div className="w-full h-full flex items-center space-x-2">
            <Button size="xs" variant="success-outline">
              Sync Open Trades
            </Button>
            <Button size="xs" variant="success-outline">
              Close Profits
            </Button>
            <Button size="xs" variant="destructive-outline">
              Close Losses
            </Button>
            <Button size="xs" variant="destructive-outline">
              Close All
            </Button>
          </div>
          <div className="w-px h-[21px] bg-gray-500 mx-4" />
          <IconMinusLine className="text-gray-300" />
        </div>
      </div>
      <TabsContent value={tabs.openPositions}>
        <OpenPositions />
      </TabsContent>
      <TabsContent value={tabs.openOrders}>
        {/* No design here yet. */}
      </TabsContent>
      <TabsContent value={tabs.orderHistory}>
        {/* No design here yet. */}
      </TabsContent>
    </Tabs>
  );
}
