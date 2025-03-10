"use client";

import { useContext } from "react";
import ListItemFlights from "./list-item-flight";
import { type FContext, FlightContext } from "../provider/flihght-provider";

export default function ListFlights() {
  const { flights, isLoading } = useContext(FlightContext) as FContext;
  console.log(flights);

  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      <ListItemFlights />
      <ListItemFlights />
      <ListItemFlights />
      <ListItemFlights />
      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
}
