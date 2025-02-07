import { Metadata } from "next";
import React, { type FC } from "react";
import FormFlight from "../components/form-flights";
import getAllPlanes from "../../airplanes/libs/data";

export const metadata: Metadata = {
  title: "Dashboard | Create Flights",
};
const CreateFlightPage: FC = async () => {
  const airplanes = await getAllPlanes();
  return (
    <div>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Create Flights</div>
      </div>
      <FormFlight airplanes={airplanes} />
    </div>
  );
};

export default CreateFlightPage;
