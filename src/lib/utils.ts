import { FlightSeat, TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSeatPerClass(flightId: string) {
  const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSSINES", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seat_number: string; type: TypeSeat; flightId: string }[] = [];

  for (const className of SEAT_CLASS) {
    for (const seat of SEAT_CODE) {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seat_number: seat + i,
          type: className as TypeSeat,
          flightId,
        });
      }
    }
  }
  return seats;
}

export const formatDaysJs = (
  date: Date | string,
  format = "DD MMM YYYY HH:mm"
) => {
  if (!date) return "";
  const dateFormat = dayjs(date).format(format);
  return dateFormat;
};
export const showFormattedDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
  });

  const formattedTime = dateObj
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(".", ":");

  return `${formattedDate} ${formattedTime}`;
};

export const formatRupiah = (value: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const objectToParams = (obj: { [key: string]: unknown }) => {
  const queryParams = Object.keys(obj)
    .map((key) => {
      if (obj[key] !== null) {
        return `${key}=${obj[key]}`;
      }

      return "";
    })
    .filter((key) => key !== "")
    .join("&");

  return queryParams;
};

export const mappingSeats = (seats: FlightSeat[]) => {
  const totalSeatEconomy = seats.filter(
    (item) => item.type === "ECONOMY"
  ).length;
  const totalSeatBusiness = seats.filter(
    (item) => item.type === "BUSSINES"
  ).length;
  const totalSeatFirst = seats.filter((item) => item.type === "FIRST").length;

  const economy = seats.filter(
    (item) => item.type === "ECONOMY" && item.isBooked
  ).length;
  const business = seats.filter(
    (item) => item.type === "BUSSINES" && item.isBooked
  ).length;
  const first = seats.filter(
    (item) => item.type === "FIRST" && item.isBooked
  ).length;

  return {
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
    economy,
    business,
    first,
  };
};
