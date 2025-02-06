"use client";

import React, { type FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { useFormState, useFormStatus } from "react-dom";
import { saveAirplane } from "../libs/actions";

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" type="submit">
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
};

const FormAirplane: FC = () => {
  const [state, formAction] = useFormState(saveAirplane, initialFormState);
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
        <Input name="code" id="code" placeholder="ABC-123..." required />
      </div>
      <div className="space-y-2 ">
        <Label htmlFor="name">Name Airplane</Label>
        <Input name="name" id="name" placeholder="Garuda" required />
      </div>
      <div className="space-y-2 ">
        <Label htmlFor="image">Upload Image </Label>
        <Input
          type="file"
          name="image"
          id="image"
          placeholder="url..."
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
};

export default FormAirplane;
