import { z } from "zod";

export const accountSchema = z.object({
  number: z.string({
    required_error: "Por favor ingrese un número de cuenta.",
  })
    .min(10, {
      message: "La cuenta debe tener 10 digitos.",
    })
    .max(10, {
      message: "La cuenta debe tener 10 digitos.",
    }),
  owners: z.object({
    required_error: "Por favor ingrese un titular de la cuenta.",
  }),
  accountTep: z.object({
    required_error: "Por favor ingres un tipo de cuenta.",
  }),
});
