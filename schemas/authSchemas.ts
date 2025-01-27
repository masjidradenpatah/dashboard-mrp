import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const resetPasswordSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: " Minimun of 8 characters required",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
