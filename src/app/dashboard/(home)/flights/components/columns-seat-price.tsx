import React, { useMemo, type FC } from "react";
import type { FlightColumn } from "./columns-flight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatRupiah, mappingSeats } from "@/lib/utils";

interface ColumnSeatPriceProps {
  flight: FlightColumn;
}

const ColumnSeatPrice: FC<ColumnSeatPriceProps> = ({ flight }) => {
  const {
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
    economy,
    business,
    first,
  } = useMemo(() => mappingSeats(flight.seats), [flight]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger>ECONOMY</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Ticket Price:</span>{" "}
              {formatRupiah(flight.price)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Remaining Seat:</span> {economy}/
              {totalSeatEconomy}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="w-full">
        <AccordionTrigger>BUSINESS</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Ticket Price:</span>{" "}
              {formatRupiah(flight.price + 500000)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Remaining Seat:</span> {business}/
              {totalSeatBusiness}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="w-full">
        <AccordionTrigger>FIRST</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Ticket Price:</span>{" "}
              {formatRupiah(flight.price + 750000)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Remaining Seat:</span> {first}/
              {totalSeatFirst}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColumnSeatPrice;
