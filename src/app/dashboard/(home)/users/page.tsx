import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";
import { columns } from "./components/columns-user";
import { getAllCustomer } from "./libs/data";

export const metadata: Metadata = {
  title: "Dashboard | Users",
};

export default async function UserPage() {
  const user = await getAllCustomer();
  return (
    <>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Users</div>
      </div>
      <DataTable columns={columns} data={user} />
    </>
  );
}
