import type { TypeSeat } from "@prisma/client";
import React from "react";

const SEATS_OPTION: TypeSeat[] = ["ECONOMY", "BUSSINES", "FIRST"];
export default function FilterSeats() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Seat Class</p>
      {SEATS_OPTION.map((val, idx) => (
        <label
          htmlFor={val}
          className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
          key={`${val + idx}`}
        >
          <input
            type="radio"
            name="seat"
            id={val}
            className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {val}
        </label>
      ))}
    </div>
  );
}
