"use client";

import { Button } from "@/components/ui/button";
import { getFileUrl } from "@/lib/supabase";
import { Airplane, Flight, FlightSeat } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ColumnRouteFlight from "./columns-route-flight";
import ColumnSeatPrice from "./columns-seat-price";
import DeleteFlight from "./delete-flight";

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

      const urlImage = getFileUrl(flight.airplane.image);
      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={urlImage}
            alt="Airplane"
            width={120}
            height={120}
            className="rounded-xl"
          />
          <div className="font-bold ">{flight.airplane.name}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "depature_city",
    header: "Route",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnRouteFlight flight={flight} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price / Seats",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnSeatPrice flight={flight} />;
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
          {<DeleteFlight id={flight.id} />}
        </div>
      );
    },
  },
];
