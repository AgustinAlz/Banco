import { z } from "zod";

export const accountSchema = z.object({

  number: z.string()
    .min(10, {
      message: "Account number must be at least 10 characters",
    })
    .max(10, {
      message: "Account number must be up to  10 characters",
    }),

});
