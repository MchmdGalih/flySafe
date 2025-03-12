"use client";

import { useContext } from "react";
import ListItemFlights from "./list-item-flight";
import { type FContext, FlightContext } from "../provider/flihght-provider";
import LoadingListFlight from "./loading-list-fligth";

export default function ListFlights() {
  const { flights, isLoading } = useContext(FlightContext) as FContext;

  if (isLoading) {
    return <LoadingListFlight />;
  }

  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      {flights?.map((flight) => (
        <ListItemFlights data={flight} key={flight.id} />
      ))}
      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
}
