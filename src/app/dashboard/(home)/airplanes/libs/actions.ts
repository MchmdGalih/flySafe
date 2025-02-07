"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAirplaneById(id: string) {
  try {
    const data = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function saveAirplane(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name") as string,
    code: formData.get("code") as string,
    image: formData.get("image") as File,
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validations",
      errorDesc,
    };
  }

  const uploadImage = await uploadFile(values.data.image);

  if (uploadImage instanceof Error) {
    return {
      errorTitle: "Error Validations",
      errorDesc: ["A connection error occurred, please try again."],
    };
  }

  try {
    const data = await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadImage as string,
      },
    });

    console.log("-->", data);
  } catch (error) {
    console.log(error);
    return {
      errorTitle: "Error Validations",
      errorDesc: ["A connection error occurred, please try again."],
    };
  }

  revalidatePath("dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function editAirplanes(
  prevState: unknown,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const image = formData.get("image") as File;
  let airplaneFormSchemaUpdate;

  if (!image || image.size === 0) {
    airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true });
  } else {
    airplaneFormSchemaUpdate = airplaneFormSchema;
  }

  const values = airplaneFormSchemaUpdate.safeParse({
    name: formData.get("name") as string,
    code: formData.get("code") as string,
    image: formData.get("image") as File,
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validations",
      errorDesc,
    };
  }

  let fileName: unknown;

  if (image.size > 0) {
    const uploadImage = await uploadFile(image);
    if (uploadImage instanceof Error) {
      return {
        errorTitle: "Error Validations",
        errorDesc: ["A connection error occurred, please try again."],
      };
    }

    fileName = uploadImage as string;
  } else {
    const airPlane = await prisma.airplane.findFirst({
      where: { id: id },
      select: {
        image: true,
      },
    });

    fileName = airPlane?.image;
  }

  try {
    await prisma.airplane.update({
      where: { id: id },
      data: {
        name: values.data.name,
        code: values.data.code,
        image: fileName as string,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Error Validations",
      errorDesc: ["A connection error occurred, please try again."],
    };
  }

  revalidatePath("dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export default async function deleteAirplane(
  id: string
): Promise<ActionResult | undefined> {
  const data = await prisma.airplane.findFirst({ where: { id: id } });
  if (!data) {
    return {
      errorTitle: "Data not found",
      errorDesc: [],
    };
  }

  const deleteImage = await deleteFile(data?.image as string);

  if (deleteImage instanceof Error) {
    return {
      errorTitle: "Error Validations",
      errorDesc: ["A connection error occurred, please try again."],
    };
  }

  try {
    await prisma.airplane.delete({ where: { id: id } });
  } catch (error) {
    console.log(error);
    return {
      errorTitle: "Error Validations",
      errorDesc: ["A connection error occurred, please try again."],
    };
  }
  revalidatePath("dashboard/airplanes");
}
