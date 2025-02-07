"use server";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { redirect } from "next/navigation";
import { flightFormSchema } from "./validation";
import prisma from "../../../../../../lib/prisma";
import { generateSeatPerClass } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function saveFlight(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log(formData.get("airplaneId"));

  const depature_date = new Date(formData.get("depature_date") as string);
  formData.get("arrival_date");

  const values = flightFormSchema.safeParse({
    airplaneId: formData.get("airplaneId"),
    price: formData.get("price"),
    depature_city: formData.get("depature_city"),
    depature_date,
    depature_city_code: formData.get("depature_city_code"),
    destination_city: formData.get("destination_city"),
    arrival_date: formData.get("arrival_date"),
    destination_city_code: formData.get("destination_city_code"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const data = await prisma.flight.create({
    data: {
      ...values.data,
      price: Number.parseInt(values.data.price),
    },
  });

  const seats = await generateSeatPerClass(data.id);
  await prisma.flightSeat.createMany({
    data: seats,
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}
