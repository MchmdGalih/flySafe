"use client";

import { Airplane, Flight } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  Dispatch,
  useReducer,
  type FC,
  type ReactNode,
} from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
interface FlightProviderProps {
  children: ReactNode;
}

export enum FilterActionKind {
  ADD_PLANE = "ADD_PLANE",
  REMOVE_PLANE = "REMOVE_PLANE",
}

type FilterState = {
  departure?: string | null;
  arrival?: string | null;
  date?: string | null;
  airplaneId: string;
  airplaneIds: string[];
  seats?: string | null;
};

type FilterAction = {
  type: FilterActionKind;
  payload: Omit<FilterState, "airplaneIds">;
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  const { payload, type } = action;

  switch (type) {
    case FilterActionKind.ADD_PLANE:
      return {
        ...state,
        airplaneIds: [...state.airplaneIds, payload.airplaneId],
      };

    case FilterActionKind.REMOVE_PLANE:
      return {
        ...state,
        airplaneIds: state.airplaneIds.filter(
          (item) => item !== payload.airplaneId
        ),
      };
    default:
      return state;
  }
}

export type FlightWithPlane = Flight & {
  airplane: Airplane;
};

export type FContext = {
  flights: FlightWithPlane[] | undefined;
  isLoading: boolean;
  dispatch: Dispatch<FilterAction>;
};

export const FlightContext = createContext<FContext | null>(null);
const FlightProvider: FC<FlightProviderProps> = ({ children }) => {
  const search = useSearchParams();

  const params = {
    departure: search.get("departure"),
    arrival: search.get("arrival"),
    date: search.get("date"),
  };

  const [state, dispatch] = useReducer(filterReducer, {
    departure: params.departure,
    arrival: params.arrival,
    date: params.date,
    airplaneId: "",
    airplaneIds: [],
    seats: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["flights-list", state],
    queryFn: () =>
      axios.post("/api/flights", state).then((res) => res.data.data),
  });

  return (
    <FlightContext.Provider value={{ flights: data, isLoading, dispatch }}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightProvider;
