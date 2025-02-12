"use server";

import prisma from "../../../../lib/prisma";

//! mencari/mengembalikan data penerbangan ke kota tujuan dan keberangkatan yg akan datang.
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

//! mencari/mengembalikan data penerbangan yg sedang tidak aktif atau ada.
export async function getFliterAirlines() {
  try {
    const data = await prisma.airplane.findMany({
      where: {
        flight: {
          every: {
            id: undefined,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
