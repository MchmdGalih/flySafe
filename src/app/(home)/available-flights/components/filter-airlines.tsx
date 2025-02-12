import React from "react";
import { getFliterAirlines } from "../../libs/data";

export default async function FilterAirlines() {
  const airplanes = await getFliterAirlines();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airplanes.map((val, idx) => (
        <label
          htmlFor={val.name}
          key={`${val.name + idx}`}
          className="font-semibold flex items-center gap-[10px] text-white"
        >
          <input
            type="checkbox"
            name="airlines"
            value={val.id}
            id={val.name}
            className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {val.name}
        </label>
      ))}
    </div>
  );
}
