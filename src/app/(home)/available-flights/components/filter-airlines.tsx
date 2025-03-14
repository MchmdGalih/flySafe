import React from "react";
import { getFliterAirlines } from "../../libs/data";
import CheckoutAirline from "./checkout-airline";

export default async function FilterAirlines() {
  const airplanes = await getFliterAirlines();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airplanes.map((val, idx) => (
        <CheckoutAirline key={`${val.id}` + idx} val={val} />
      ))}
    </div>
  );
}
