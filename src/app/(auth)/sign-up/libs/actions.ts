"use server";
import bcrypt from "bcrypt";
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { signupFormSchema } from "./validation";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";

export default async function signupUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const values = signupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passport: formData.get("passport"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const hashPassword = await bcrypt.hashSync(values.data.password, 10);

  try {
    await prisma.user.create({
      data: {
        name: values.data.name,
        email: values.data.email,
        password: hashPassword,
        passport: values.data.passport,
        role: "CUSTOMER",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return redirect("/sign-in");
}
