import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./components/column-table";
import getAllPlanes from "./libs/data";

export default async function Airplanes() {
  const planes = await getAllPlanes();

  return (
    <>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Airplanes</div>
        <Button asChild>
          <Link href={"/dashboard/airplanes/create"}>
            <Plus className=" mr-2 w-4 h-4" />
            Create Airplane
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={planes} />
    </>
  );
}
