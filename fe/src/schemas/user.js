import { z } from "zod";

export const userSchema = z.object({
  givenName: z.string({
    required_error: "Title is required",
  }),
  lastName: z.string({
    required_error: "Description is required",
  }),
  email: z.string({
    required_error: "Description is required",
  }),
});
