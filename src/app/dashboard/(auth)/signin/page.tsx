import { Metadata } from "next";
import React from "react";
import FormSignIn from "./form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Sign In",
};

const SignIn = async () => {
  const { session, user } = await getUser();

  if (session && user.role === "ADMIN") {
    return redirect("/dashboard");
  }

  return <FormSignIn />;
};

export default SignIn;
