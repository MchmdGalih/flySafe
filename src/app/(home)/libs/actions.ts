"use server";

import { getUser, lucia } from "@/lib/auth";
import { objectToParams } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<{ error: string } | null> {
  const { session } = await getUser();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = await lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  revalidatePath("/");
  return redirect("/");
}

export async function searchFlight(formData: FormData) {
  const searchParams = {
    departure: formData.get("departure"),
    arrival: formData.get("arrival"),
    date: formData.get("date"),
  };

  const queryParams = objectToParams(searchParams);

  return redirect(`/available-flights?${queryParams}`);
}
