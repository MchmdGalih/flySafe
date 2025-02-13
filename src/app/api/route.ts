import type { TypeSeat } from "@prisma/client";
import type { NextRequest } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = {
    depature: searchParams.get("depature"),
    arrival: searchParams.get("arrival"),
    date: searchParams.get("date"),
    airplaneId: searchParams.get("airplaneId"),
    seat: searchParams.get("seat"),
  };

  let depatureDate: Date | null = null;

  if (params.date) {
    depatureDate = new Date(params.date);
    depatureDate.setHours(1);
  }

  try {
    const data = await prisma.flight.findMany({
      where: {
        depature_city: params.depature !== null ? params.depature : {},
        destination_city: params.arrival !== null ? params.arrival : {},
        seats:
          params.seat !== null
            ? {
                some: {
                  type: params.seat as TypeSeat,
                  isBooked: false,
                },
              }
            : {},
        depature_date:
          depatureDate !== null
            ? {
                gte: { depatureDate },
              }
            : {},
        airplaneId:
          params.airplaneId !== null
            ? params.airplaneId.split(",").length > 0
              ? {
                  in: [...params.airplaneId.split(",")],
                }
              : {}
            : {},
      },
      include: {
        airplane: true,
      },
    });

    return Response.json({ data });
  } catch (error) {
    return Response.json(
      {
        error: true,
        error_message: "Failed to get data",
      },
      { status: 500 }
    );
  }
}
