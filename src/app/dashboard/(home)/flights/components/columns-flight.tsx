"use client";

import { Button } from "@/components/ui/button";
import { Airplane, Flight, FlightSeat } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";

export type FlightColumn = Flight & {
  airplane: Airplane;
  seats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    accessorKey: "airplaneId",
    header: "Airplane",
    cell: ({ row }) => {
      const flight = row.original;

      return "Airplanes";
    },
  },

  {
    accessorKey: "depature_city",
    header: "Route",
    cell: ({ row }) => {
      const flight = row.original;

      return "Route";
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const flight = row.original;

      return "Price";
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const flight = row.original;
      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/dashboard/flights/edit/${flight.id}`}>
              <Pencil className="mr-2 w-4 h-4" />
              Edit
            </Link>
          </Button>
          {/* <DeleteAirplane id={plane.id} /> */}
        </div>
      );
    },
  },
];
