"use client";

import {
  BasicSettings,
  QuestionsManager,
  QuizAccess,
  RestrictionsSettings,
  ThemeWrapper,
} from "@/components";
import styles from "@/styles/CreateQuiz.module.scss";
import { ICONS } from "@/utils/config/icons";
import { createAnswer, createQuestion, createQuiz } from "@/utils/lib/actions";
import { AccessCodeScheme } from "@/utils/lib/validators/access-code-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccessTypeForQuiz } from "@prisma/client";
import { clsx } from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const DayjsDateSchema = z.custom<Dayjs>(value => {
  if (dayjs.isDayjs(value)) {
    return value;
  } else {
    throw new Error("Expected Dayjs object");
  }
});

const CreateQuizFormSchema = z.object({
  name: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(120, "Full name must be less than 120 characters"),
  accessCode: z.string().nullable(),
  attempts: z.number().nullable(),
  groupId: z.string().optional().nullable(),
  sectionId: z.string().nullable(),
  deadline: DayjsDateSchema.nullable(),
  duration: z
    .object({
      hours: z.number(),
      minutes: z.number(),
    })
    .optional()
    .nullable(),
  percentagePass: z.number(),
  questions: z.array(
    z.discriminatedUnion("type", [
      z.object({
        text: z
          .string()
          .min(3, "Question must be at least 3 characters")
          .max(120, "Question must be less than 120 characters"),
        type: z.literal("Single_choice"),
        answers: z
          .array(
            z.object({
              text: z
                .string()
                .min(1, "Question must be at least 1 characters")
                .max(120, "Question must be less than 120 characters"),
              isCorrect: z.boolean(),
            }),
          )
          .min(2),
      }),
      z.object({
        text: z
          .string()
          .min(3, "Question must be at least 3 characters")
          .max(120, "Question must be less than 120 characters"),
        type: z.literal("Multiple_choice"),
        answers: z
          .array(
            z.object({
              text: z
                .string()
                .min(1, "Question must be at least 1 characters")
                .max(120, "Question must be less than 120 characters"),
              isCorrect: z.boolean(),
            }),
          )
          .min(3),
      }),
      z.object({
        text: z
          .string()
          .min(3, "Question must be at least 3 characters")
          .max(120, "Question must be less than 120 characters"),
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

export default function CreateQuiz() {
  const [active, setActive] = useState<number>(0);
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [accessType, setAccessType] = useState<AccessTypeForQuiz>(AccessTypeForQuiz.Private);
  const { data: session } = useSession();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuizType>({
    defaultValues: {
      attempts: 1,
      deadline: null,
      sectionId: null,
      accessCode: null,
      percentagePass: 0,
      duration: null,
      questions: [
        {
          text: "",
          type: "Single_choice",
          answers: [
            {
              text: "",
              isCorrect: true,
            },
            {
              text: "",
              isCorrect: false,
            },
          ],
        },
      ],
    },
    resolver: zodResolver(CreateQuizFormSchema),
    mode: "onSubmit",
  });

  const quizSave: SubmitHandler<CreateQuizType> = async data => {
    //CreateQuizFormSchema.parse(data);

    try {
      if (accessType === AccessTypeForQuiz.Public_access_code) {
        if (!AccessCodeScheme.safeParse(data.accessCode).success) {
          setError("accessCode", {
            type: "custom",
            message: "Password must be within 6 - 50 characters",
          });
          return;
        }
      } else {
        data.accessCode = null;
      }
      if (data.attempts === 555) data.attempts = null;
      if (accessType !== AccessTypeForQuiz.Group) data.groupId = null;
      if (accessType === AccessTypeForQuiz.Group && data.sectionId === "") {
        setError("sectionId", {
          type: "custom",
          message: "Section can not be empty.",
        });
        return;
      } else if (accessType !== AccessTypeForQuiz.Group) {
        data.sectionId = null;
      }

      if (session === null) {
        toast.error("You have to register to create the group!");
        return;
      }

      const currentDateTime = new Date();
      let deadline = null;
      if (data.deadline) {
        deadline = new Date(
          data.deadline.year(),
          data.deadline.month(),
          data.deadline.day(),
          currentDateTime.getHours(),
          currentDateTime.getMinutes(),
        );
      }

      let duration = null;
      if (data.duration) {
        duration = new Date(
          currentDateTime.getFullYear(),
          currentDateTime.getMonth(),
          currentDateTime.getDate(),
          data.duration.hours,
          data.duration.minutes,
        );
      }

      const { error, newQuizId } = await createQuiz({
        name: data.name,
        attempts: data.attempts,
        accessCode: data.accessCode,
        percentagePass: data.percentagePass,
        groupId: data.groupId || null,
        sectionId: data.sectionId,
        duration: duration,
        deadline: deadline,
        accessType: accessType,
        creatorId: session?.user.id,
      });

      if (error) {
        toast.error(error);
      } else if (newQuizId) {
        for (const questions of data.questions) {
          const { questionId } = await createQuestion({
            quizId: newQuizId,
            text: questions.text,
            type: questions.type,
          });

          if (questionId) {
            for (const answer of questions.answers) {
              const { answerId } = await createAnswer({
                questionId: questionId,
                text: answer.text,
                isCorrect: answer.isCorrect,
              });
            }
          }
        }

        toast.success("Quiz created successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <ThemeWrapper>
      {!menuActive && (
        <div className={styles.create__dark} onClick={() => setMenuActive(prev => !prev)}></div>
      )}

      <form onSubmit={handleSubmit(quizSave)} noValidate className={styles.create__container}>
        {!menuActive && (
          <style>{`
          body {
            overflow: hidden;
          }
        `}</style>
        )}
        <aside className={!menuActive ? styles.create__body__active : styles.create__body}>
          <div className={styles.create__body__inside}>
            <div className={styles.create__title}>
              Quiz configuration
              {!menuActive && ICONS.close2({ onClick: () => setMenuActive(prev => !prev) })}
            </div>
            <div className={styles.create__list}>
              <button
                type="button"
                onClick={() => {
                  setActive(0);
                  if (!menuActive) setMenuActive(prev => !prev);
                }}
                className={clsx(styles.create__item, {
                  [styles.create__item_active]: active === 0,
                })}
              >
                {ICONS.basicSettings()}
                <div className={styles.create__text}>Basic settings</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActive(1);
                  if (!menuActive) setMenuActive(prev => !prev);
                }}
                className={clsx(styles.create__item, {
                  [styles.create__item_active]: active === 1,
                })}
              >
                {ICONS.QuestionsManager()}
                <div className={styles.create__text}>Questions manager</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActive(2);
                  if (!menuActive) setMenuActive(prev => !prev);
                }}
                className={clsx(styles.create__item, {
                  [styles.create__item_active]: active === 2,
                })}
              >
                {ICONS.GroupAccess()}
                <div className={styles.create__text}>Quiz access</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActive(3);
                  if (!menuActive) setMenuActive(prev => !prev);
                }}
                className={clsx(styles.create__item, {
                  [styles.create__item_active]: active === 3,
                })}
              >
                {ICONS.TimeSettings()}
                <div className={styles.create__text}>Restriction settings</div>
              </button>
            </div>
            <div className={styles.create__buttons}>
              <button type="submit" className={styles.create__button__save}>
                {isSubmitting ? "Save changes..." : "Save changes"}
              </button>
              <button type="button" className={styles.create__button}>
                Activate quiz
              </button>
            </div>
          </div>
        </aside>
        <section className={styles.create__right}>
          <div className={styles.right__top}>
            <button
              className={styles.icon_menu}
              type="button"
              onClick={() => setMenuActive(prev => !prev)}
            >
              {ICONS.MenuOpen()}
            </button>
            <div className={styles.right__title}>
              {active === 0
                ? "Basic settings"
                : active === 1
                ? "Questions manager"
                : active === 2
                ? "Test access"
                : "Restriction settings"}
            </div>
          </div>
          {active === 0 ? (
            <BasicSettings label="Insert quiz name" errors={errors} register={register} />
          ) : active === 1 ? (
            <QuestionsManager
              control={control}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          ) : active === 2 ? (
            <QuizAccess
              accessType={accessType}
              setAccessType={setAccessType}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />
          ) : (
            <RestrictionsSettings control={control} setValue={setValue} />
          )}
        </section>
      </form>
    </ThemeWrapper>
  );
}
