import { z } from "zod";

export const CreateGroupFormScheme = z.object({
  name: z
    .string()
    .min(3, "Group name must be at least 3 characters")
    .max(120, "Group name must be less than 120 characters"),
  accessCode: z.string().nullable(),
  // sections: z.array(
  //   z.object({
  //     name: z
  //       .string()
  //       .min(3, "Group name must be at least 3 characters")
  //       .max(120, "Group name must be less than 120 characters"),
  //   }),
  // ),
});

export type CreateGroupType = z.infer<typeof CreateGroupFormScheme>;
