import { OpenPosition } from "@/hooks/use-open-positions-query";
import { cn, formatPL } from "@/lib/utils";
import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOpenPositionsSuspenseQuery } from "@/hooks/use-open-positions-query";
import { format } from "date-fns";
import { IconCameraPhoto } from "./icons/icon-camera-photo";
import { IconEdit } from "./icons/icon-edit";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

function OpenPositionsRows() {
  const { data } = useOpenPositionsSuspenseQuery();

  return data.open_trades.map((openPosition, index) => (
    <OpenPositionRow key={index} openPosition={openPosition} />
  ));
}

function OpenPositionRow(props: { openPosition: OpenPosition }) {
  return (
    <TableRow>
      <TableCell>
        <p>{format(new Date(props.openPosition.open_time), "yyyy/MM/dd")}</p>
        <p className="text-gray-300">
          {format(new Date(props.openPosition.open_time), "HH:mm:ss")}
        </p>
      </TableCell>
      <TableCell>{props.openPosition.symbol}</TableCell>
      <TableCell
        className={cn(
          "uppercase",
          props.openPosition.position_type === "long"
            ? "text-green-400"
            : "text-red-500"
        )}
      >
        {props.openPosition.position_type}
      </TableCell>
      <TableCell>{props.openPosition.entry}</TableCell>
      <TableCell>{props.openPosition.quantity}</TableCell>
      <TableCell>{props.openPosition.tp}</TableCell>
      <TableCell>{props.openPosition.sl}</TableCell>
      <TableCell>${Math.abs(props.openPosition.fees)}</TableCell>
      <TableCell
        className={
          props.openPosition.roi < 0 ? "text-red-500" : "text-green-400"
        }
      >
        {props.openPosition.roi}%
      </TableCell>
      <TableCell
        className={
          props.openPosition.pl < 0 ? "text-red-500" : "text-green-400"
        }
      >
        {formatPL(props.openPosition.pl)}
      </TableCell>
      <TableCell>
        <div className="flex space-x-1">
          <Button variant="outline" className="w-7">
            <IconEdit className="min-w-4 text-white" />
          </Button>
          <Button variant="outline" className="w-7">
            <IconCameraPhoto className="min-w-4 text-white" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function OpenPositions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">Open (GMT)</TableHead>
          <TableHead className="w-32">Symbol</TableHead>
          <TableHead className="w-32">Position</TableHead>
          <TableHead className="w-32">Entry</TableHead>
          <TableHead className="w-32">Size</TableHead>
          <TableHead className="w-32">TP</TableHead>
          <TableHead className="w-32">SL</TableHead>
          <TableHead className="w-32">Fees</TableHead>
          <TableHead className="w-32">Roi</TableHead>
          <TableHead className="w-32">P/L</TableHead>
          <TableHead className="w-32" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <Suspense
          fallback={[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              {[...Array(11)].map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-8" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        >
          <OpenPositionsRows />
        </Suspense>
      </TableBody>
    </Table>
  );
}
