import { z } from "zod";

export const CreateGroupFormScheme = z.object({
  name: z
    .string()
    .min(4, "Group name must be at least 4 characters")
    .max(60, "Group name must be less than 45 characters"),
  accessCode: z.string().optional().nullable(),
});

export type CreateGroupType = z.infer<typeof CreateGroupFormScheme>;
