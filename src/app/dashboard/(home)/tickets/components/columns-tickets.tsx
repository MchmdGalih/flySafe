"use client";

import type { Flight, FlightSeat, Tickets, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnRouteFlight from "../../flights/components/columns-route-flight";
import { Badge } from "lucide-react";

export type TicketsTypes = Tickets & {
  flight: Flight;
  customer: User;
  seats: FlightSeat;
};

export const columns: ColumnDef<TicketsTypes>[] = [
  {
    accessorKey: "customerId",
    header: "Customer Name",
    cell: ({ row }) => {
      const tickets = row.original;

      return `${tickets.customer.name}`;
    },
  },
  {
    accessorKey: "flightId",
    header: "Detail Flight",
    cell: ({ row }) => {
      const tickets = row.original;

      return <ColumnRouteFlight flight={tickets.flight} />;
    },
  },

  {
    accessorKey: "seatId",
    header: "Number Seat",
    cell: ({ row }) => {
      const tickets = row.original;

      return <Badge>{tickets.seats.seat_number}</Badge>;
    },
  },
  {
    accessorKey: "status_transaction",
    header: "Detail Transaction",
    cell: ({ row }) => {
      const tickets = row.original;

      return (
        <div className="space-y-2">
          <Badge
            className={
              tickets.status === "SUCCESS"
                ? "bg-green-500"
                : tickets.status === "PENDING"
                ? "bg-yellow-500"
                : "bg-red-500"
            }
          >
            {tickets.status}
          </Badge>
        </div>
      );
    },
  },
];
