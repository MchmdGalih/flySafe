"use server";

import prisma from "../../../../../../lib/prisma";

export default async function getAllPlanes() {
  try {
    const planes = await prisma.airplane.findMany({});
    return planes;
  } catch (error) {
    console.log("Database error:", error);
    return [];
  }
}
