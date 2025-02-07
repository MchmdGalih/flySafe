import { TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const showFormattedDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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
