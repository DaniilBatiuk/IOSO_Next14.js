import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

const DayjsDateSchema = z.custom<Dayjs>(value => {
  if (dayjs.isDayjs(value)) {
    return value;
  } else {
    throw new Error("Expected Dayjs object");
  }
});

export const CreateQuizFormSchema = z.object({
  name: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(300, "Full name must be less than 300 characters"),
  accessCode: z.string().nullable(),
  attempts: z.number().nullable(),
  groupId: z.string().optional().nullable(),
  sectionId: z.string().nullable(),
  deadline: DayjsDateSchema.nullable(),
  duration: z.object({
    hours: z.number(),
    minutes: z.number(),
  }),
  percentagePass: z.number(),
  questions: z.array(
    z.discriminatedUnion("type", [
      z.object({
        text: z
          .string()
          .min(3, "Question must be at least 3 characters")
          .max(300, "Question must be less than 300 characters"),
        type: z.literal("Single_choice"),
        answers: z
          .array(
            z.object({
              text: z
                .string()
                .min(1, "Question must be at least 1 characters")
                .max(300, "Question must be less than 300 characters"),
              isCorrect: z.boolean(),
            }),
          )
          .min(2),
      }),
      z.object({
        text: z
          .string()
          .min(3, "Question must be at least 3 characters")
          .max(300, "Question must be less than 300 characters"),
        type: z.literal("Multiple_choice"),
        answers: z
          .array(
            z.object({
              text: z
                .string()
                .min(1, "Question must be at least 1 characters")
                .max(300, "Question must be less than 300 characters"),
              isCorrect: z.boolean(),
            }),
          )
          .min(3),
      }),
      z.object({
        text: z
          .string()
          .min(3, "Question must be at least 3 characters")
          .max(300, "Question must be less than 300 characters"),
        type: z.literal("True_or_false"),
        answers: z
          .array(
            z.object({
              text: z.enum(["true", "false"]),
              isCorrect: z.boolean(),
            }),
          )
          .length(2),
      }),
    ]),
  ),
});

export type CreateQuizType = z.infer<typeof CreateQuizFormSchema>;
