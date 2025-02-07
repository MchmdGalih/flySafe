import { z } from "zod";

export const flightFormSchema = z.object({
  airplaneId: z.string({ required_error: "Airplane is required" }),
  price: z.string({ required_error: "Price is required" }),
  depature_city: z.string({ required_error: "Depature city is required" }),
  depature_date: z.date(),
  depature_city_code: z
    .string({ required_error: "Depature city code is required" })
    .min(3, { message: "Depature city code must be at least 3 characters" })
    .max(3, { message: "Depature city code must be at most 3 characters" }),
  destination_city: z.string({
    required_error: "Destination city is required",
  }),
  arrival_date: z.string({required_error: 'Arrival date is required'}),
  destination_city_code: z
    .string({ required_error: "Destination city code is required" })
    .min(3, { message: "Destination city code must be at least 3 characters" })
    .max(3, { message: "Destination city code must be at most 3 characters" }),
});
