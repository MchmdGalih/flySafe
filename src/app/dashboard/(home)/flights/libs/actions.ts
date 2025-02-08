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

export async function getFlightById(id: string) {
  try {
    const data = await prisma.flight.findFirst({ where: { id: id } });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateFlight(
  prevState: unknown,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const depature_date = new Date(formData.get("depature_date") as string);

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

  try {
    await prisma.flight.update({
      where: {
        id: id,
      },
      data: {
        ...values.data,
        price: Number.parseInt(values.data.price),
      },
    });
  } catch (error) {
    console.log("Error", error);
  }

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function deleteFlight(id: string) {
  try {
    await prisma.flightSeat.deleteMany({
      where: { flightId: id },
    });
    await prisma.flight.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/flights");
}
