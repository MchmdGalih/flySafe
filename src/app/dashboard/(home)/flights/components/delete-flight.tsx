"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteFlight } from "../libs/actions";
import { on } from "node:stream";

interface DeleteFlightProps {
  id: string;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" disabled={pending} type="submit" variant={"destructive"}>
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
};

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
  const onDeleteFlight = deleteFlight.bind(null, id);

  return (
    <form action={onDeleteFlight}>
      <SubmitButton />
    </form>
  );
};

export default DeleteFlight;
