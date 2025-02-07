"use server";

import prisma from "../../../../../../lib/prisma";

export async function getAllFlights() {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        airplane: true,
        seats: true,
      },
    });

    return flights;
  } catch (error) {
    console.log(error);
    return [];
  }
}
