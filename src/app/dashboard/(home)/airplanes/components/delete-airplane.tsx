"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import deleteAirplane from "../libs/actions";

interface DeleteAirplaneProps {
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

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const onDeleteAirplane = deleteAirplane.bind(null, id);

  return (
    <form action={onDeleteAirplane}>
      <SubmitButton />
    </form>
  );
};

export default DeleteAirplane;
