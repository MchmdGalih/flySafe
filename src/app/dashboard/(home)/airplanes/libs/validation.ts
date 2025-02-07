import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_IMAGE = 2000000;

export const airplaneFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" }),
  code: z
    .string({ required_error: "Code is required" })
    .regex(/^[A-Z]{3}-[0-9]{3}$/, "Code is invalid must [XXX-111]"),
  image: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "File must be an jpg, jpeg, png"
    )
    .refine(
      (file: File) => file.size <= MAX_SIZE_IMAGE,
      "File must be less than 2mb"
    ),
});
