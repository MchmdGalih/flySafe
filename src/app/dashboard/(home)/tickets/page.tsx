import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";
import { columns } from "./components/columns-tickets";
import { getAllTickets } from "./libs/data";

export const metadata: Metadata = {
  title: "Dashboard | Tickets",
};

export default async function TicketsPage() {
  const tickets = await getAllTickets();
  return (
    <>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Tickets</div>
      </div>
      <DataTable columns={columns} data={tickets} />
    </>
  );
}
