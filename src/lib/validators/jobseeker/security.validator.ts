import { z } from 'zod';

export const ChangeCurrentPasswordSchema = z
.object({
  currentPassword:z.string().min(1, "current password is required"),
  newPassword: z.string().min(1, "new password is required"),
  confirmPassword: z.string().min(1, "confirm password is required"),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords doesn't match",
  path: ["confirmPassword"],
});

export type ChangeCurrentPasswordSchemaType = z.infer<
  typeof ChangeCurrentPasswordSchema
>;
