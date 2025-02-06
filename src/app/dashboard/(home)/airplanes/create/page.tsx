import React, { type FC } from "react";
import FormAirplane from "../components/form-airplane";

const CreateAirplanePage: FC = () => {
  return (
    <div>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Create Airplanes</div>
      </div>
      <FormAirplane />
    </div>
  );
};

export default CreateAirplanePage;
