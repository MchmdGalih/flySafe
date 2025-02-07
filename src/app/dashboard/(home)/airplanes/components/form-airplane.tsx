"use client";

import React, { type FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { useFormState } from "react-dom";
import { saveAirplane, editAirplanes } from "../libs/actions";
import type { Airplane } from "@prisma/client";
import SubmitButtonForm from "../../components/submit-button-form";

interface FormAirplaneProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Airplane | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormAirplane: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
  const updateAirplaneById = (_state: ActionResult, formData: FormData) =>
    editAirplanes(null, defaultValues?.id!!, formData);

  const [state, formAction] = useFormState(
    type === "ADD" ? saveAirplane : updateAirplaneById,
    initialFormState
  );
  return (
    <form className="w-1/2" action={formAction}>
      {state.errorTitle !== null && (
        <div className=" my-7 bg-red-500  p-4 rounded-lg text-white">
          <div className="font-bold mb-4">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2 ">
        <Label htmlFor="code">Code Airplane</Label>
        <Input
          name="code"
          id="code"
          placeholder="ABC-123..."
          defaultValue={defaultValues?.code}
          required
        />
      </div>
      <div className="space-y-2 ">
        <Label htmlFor="name">Name Airplane</Label>
        <Input
          name="name"
          id="name"
          placeholder="Garuda"
          defaultValue={defaultValues?.name}
          required
        />
      </div>
      <div className="space-y-2 ">
        <Label htmlFor="image">Upload Image </Label>
        <Input type="file" name="image" id="image" placeholder="url..." />
      </div>

      <SubmitButtonForm />
    </form>
  );
};

export default FormAirplane;
