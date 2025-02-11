"use server";

import prisma from "../../../../lib/prisma";

export async function getCityFilter() {
  try {
    const data = await prisma.flight.groupBy({
      by: ["depature_city", "destination_city"],
      where: {
        depature_date: {
          gt: new Date(),
        },
      },
      _count: {
        depature_city: true,
        destination_city: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
