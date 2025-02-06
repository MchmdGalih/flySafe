"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { aiplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";

export async function saveAirplane(
  prevState: any,
  form: FormData
): Promise<ActionResult> {
  const values = aiplaneFormSchema.safeParse({
    name: form.get("name") as string,
    code: form.get("code") as string,
    image: form.get("image") as File,
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validations",
      errorDesc,
    };
  }

  return redirect("/dashboard/aiplanes");
}
