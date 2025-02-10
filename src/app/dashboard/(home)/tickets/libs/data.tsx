"use server";

import prisma from "../../../../../../lib/prisma";

export async function getAllTickets() {
  try {
    const data = await prisma.tickets.findMany({
      include: {
        flight: true,
        customer: true,
        seat: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);

    return [];
  }
}
