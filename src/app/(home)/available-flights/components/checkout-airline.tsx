"use client";

import { Airplane } from "@prisma/client";
import React, { type ChangeEvent, useContext, type FC } from "react";
import {
  type FContext,
  FilterActionKind,
  FlightContext,
} from "../provider/flihght-provider";

interface CheckoutAirlineProps {
  val: Airplane;
}

const CheckoutAirline: FC<CheckoutAirlineProps> = ({ val }) => {
  const { dispatch } = useContext(FlightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    dispatch({
      type: isChecked
        ? FilterActionKind.ADD_PLANE
        : FilterActionKind.REMOVE_PLANE,
      payload: {
        airplaneId: value,
      },
    });
  };

  return (
    <label
      htmlFor={val.name}
      className="font-semibold flex items-center gap-[10px] text-white"
    >
      <input
        type="checkbox"
        name="airlines"
        value={val.id}
        onChange={handleChange}
        id={val.name}
        className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
      />
      {val.name}
    </label>
  );
};

export default CheckoutAirline;
