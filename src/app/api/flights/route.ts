import type { TypeSeat } from "@prisma/client";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json(); // Mengambil data dari request body

  let depatureDate: Date | null = null;

  if (body.date) {
    depatureDate = new Date(body.date); // Mengubah string menjadi objek Date
    depatureDate.setHours(1); // Set jam ke 1 untuk menghindari masalah zona waktu
  }

  try {
    const data = await prisma.flight.findMany({
      where: {
        depature_city: body.depature !== null ? body.depature : {}, // Filter berdasarkan kota keberangkatan
        destination_city: body.arrival !== null ? body.arrival : {}, // Filter berdasarkan kota tujuan
        seats:
          body.seat !== null
            ? {
                some: {
                  type: body.seat as TypeSeat, // Filter berdasarkan jenis kursi (misalnya Economy, Business)
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
        airplaneId: body.airplaneIds.length > 0 ? { in: body.airplaneIds } : {},
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
