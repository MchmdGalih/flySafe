import type { TypeSeat } from "@prisma/client";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  //! mengambil value dari query tersebut
  const params = {
    depature: searchParams.get("depature"),
    arrival: searchParams.get("arrival"),
    date: searchParams.get("date"),
    airplaneId: searchParams.get("airplaneId"),
    seat: searchParams.get("seat"),
  };

  let depatureDate: Date | null = null;

  if (params.date) {
    depatureDate = new Date(params.date); // Mengubah string menjadi objek Date
    depatureDate.setHours(1); // Set jam ke 1 untuk menghindari masalah zona waktu
  }

  try {
    const data = await prisma.flight.findMany({
      where: {
        depature_city: params.depature !== null ? params.depature : {}, // Filter berdasarkan kota keberangkatan
        destination_city: params.arrival !== null ? params.arrival : {}, // Filter berdasarkan kota tujuan
        seats:
          params.seat !== null
            ? {
                some: {
                  type: params.seat as TypeSeat, // Filter berdasarkan jenis kursi (misalnya Economy, Business)
                  isBooked: false, // Hanya kursi yang belum dipesan
                },
              }
            : {}, // Jika tidak ada parameter kursi, lewati filter ini
        depature_date:
          depatureDate !== null
            ? {
                gte: depatureDate, // Mencari penerbangan yang berangkat setelah atau sama dengan tanggal yang dipilih
              }
            : {},
        airplaneId:
          params.airplaneId !== null
            ? params.airplaneId.split(",").length > 0
              ? {
                  in: [...params.airplaneId.split(",")], // Jika ada beberapa ID pesawat, cari yang termasuk dalam daftar ini
                }
              : {}
            : {},
      },
      include: {
        airplane: true, // Ambil juga data pesawat dari relasi tabel
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
