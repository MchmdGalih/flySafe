"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleSignIn, ActionResult } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

interface FormSignInProps {}

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

const FormSignIn: FC<FormSignInProps> = ({}) => {
  const [state, formAction] = useFormState(handleSignIn, initialFormState);

  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-max">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {state.errorTitle !== null && (
          <div className="mx-auto my-7 bg-red-500  w-[300px] p-4 rounded-lg text-white">
            <div className="font-bold mb-4">{state.errorTitle}</div>
            <ul className="list-disc list-inside">
              {state.errorDesc?.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input type="email" placeholder="Email..." name="email" />
            <Input type="password" placeholder="Password..." name="password" />

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
