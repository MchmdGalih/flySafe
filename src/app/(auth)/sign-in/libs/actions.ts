"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { signupFormSchema } from "../../sign-up/libs/validation";

import bycrpt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";
export async function signinUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const signinSchema = signupFormSchema.pick({ email: true, password: true });

  const values = signinSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "ErrorValidation",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "Error validation",
      errorDesc: ["Email / password invalid"],
    };
  }

  const validPassword = await bycrpt.compare(
    values.data.password,
    existingUser.password
  );

  if (!validPassword) {
    return {
      errorTitle: "Error validation",
      errorDesc: ["Email / password invalid"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}
