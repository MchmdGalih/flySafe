import { Metadata } from "next";
import React, { type FC } from "react";
import getAllPlanes from "../../../airplanes/libs/data";
import FormFlight from "../../components/form-flights";
import { getFlightById } from "../../libs/actions";

interface Params {
  id: string;
}

interface EditFlightPageProps {
  params: Params;
}

export const metadata: Metadata = {
  title: "Dashboard | Edit Flights",
};
const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {
  const airplanes = await getAllPlanes();
  const flightById = await getFlightById(params.id);
  return (
    <div>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Edit Flights</div>
      </div>
      <FormFlight
        airplanes={airplanes}
        type="EDIT"
        defaultValues={flightById}
      />
    </div>
  );
};

export default EditFlightPage;
