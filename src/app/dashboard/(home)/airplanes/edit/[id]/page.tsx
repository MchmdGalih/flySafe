import React, { type FC } from "react";
import FormAirplane from "../../components/form-airplane";
import { getAirplaneById } from "../../libs/actions";

type Params = {
  id: string;
};

interface EditAirplanePageProps {
  params: Params;
}

const EditAirplanePage: FC<EditAirplanePageProps> = async ({ params }) => {
  const data = await getAirplaneById(params.id);
  console.log("-->", data);

  return (
    <div>
      <div className="flex flex-row item-center justify-between">
        <div className="my-5 text-2xl font-extrabold">Edit Airplanes</div>
      </div>
      <FormAirplane type="EDIT" defaultValues={data} />
    </div>
  );
};

export default EditAirplanePage;
