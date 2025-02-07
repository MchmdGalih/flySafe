import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { columns } from "./components/columns-flight";
import { getAllFlights } from "./libs/data";

export const metadata: Metadata = {
  title: "Dashboard | Flights",
};

export default async function FlightPage() {
  const flights = await getAllFlights();
  return (
    <>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Flights</div>
        <Button asChild>
          <Link href={"/dashboard/flights/create"}>
            <Plus className=" mr-2 w-4 h-4" />
            Create Flight
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={flights} />
    </>
  );
}
