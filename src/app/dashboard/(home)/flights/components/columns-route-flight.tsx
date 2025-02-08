import { formatDaysJs, showFormattedDate } from "@/lib/utils";
import { Flight } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import React, { type FC } from "react";

interface ColumnRouteFlightProps {
  flight: Flight;
}

const ColumnRouteFlight: FC<ColumnRouteFlightProps> = ({ flight }) => {
  return (
    <div className="flex flex-row gap-5 items-center">
      <div className="text-center">
        <div className="font-bold">{flight.depature_city_code}</div>
        <div className="font-medium">{flight.depature_city}</div>
        <div className="text-xs text-gray-500">
          {formatDaysJs(flight.depature_date)}
        </div>
      </div>
      <ArrowRight className="h-5 w-5" />
      <div className="text-center">
        <div className="font-bold">{flight.destination_city_code}</div>
        <div className="font-medium">{flight.destination_city}</div>
        <div className="text-xs text-gray-500">
          {showFormattedDate(flight.arrival_date)}
        </div>
      </div>
    </div>
  );
};

export default ColumnRouteFlight;
