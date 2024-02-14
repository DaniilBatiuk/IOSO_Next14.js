"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AccessTypeForQuiz } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/CreateQuiz.module.scss";

import { AccessCodeScheme } from "@/utils/lib/validators/access-code-validator";
import { CreateQuizFormSchema, CreateQuizType } from "@/utils/lib/validators/create-quiz-validator";

import {
  BasicSettings,
  QuestionsManager,
  QuizAccess,
  RestrictionsSettings,
  ThemeWrapper,
} from "@/components";
import {
  createAnswer,
  createQuestion,
  deleteAnswers,
  deleteQuestions,
  updateQuiz,
} from "@/utils/lib/actions";
import { QuizService } from "@/utils/services/quiz.servise";

export default function UpdateQuiz({ params }: { params: { id: string } }) {
  const [active, setActive] = useState<number>(0);
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [ready, setReady] = useState<boolean>(false);
  const [accessType, setAccessType] = useState<AccessTypeForQuiz>(AccessTypeForQuiz.Private);
  const { data: session } = useSession();
  const router = useRouter();

  const { data: quiz, isSuccess } = useQuery({
    queryKey: ["QuizUpdate", params.id],
    queryFn: () => QuizService.getQuizForUpdate(params.id),
  });
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuizType>({
    resolver: zodResolver(CreateQuizFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isSuccess && quiz) {
      reset({
        name: quiz.result.name,
        attempts: quiz.result.attempts ? quiz.result.attempts : 555,
        percentagePass: quiz.result.percentagePass,
        duration: {
          hours: quiz.result.duration ? new Date(quiz.result.duration).getHours() : 0,
          minutes: quiz.result.duration ? new Date(quiz.result.duration).getMinutes() : 0,
        },
        deadline: quiz.result.deadline ? dayjs(quiz.result.deadline) : null,
        accessCode: quiz.result.accessCode,
        groupId: quiz.result.groupId ? quiz.result.groupId : "",
        sectionId: quiz.result.sectionId,
        questions: quiz.result.questions,
      });
      setAccessType(quiz.result.accessType);
      setReady(true);
    }
  }, [isSuccess]);

  const quizSave: SubmitHandler<CreateQuizType> = async data => {
    // console.log(CreateQuizFormSchema.parse(data));
    // return;
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

      let duration = null;
      if (data.duration?.hours !== 0 || data.duration?.minutes !== 0) {
        duration = new Date(
          currentDateTime.getFullYear(),
          currentDateTime.getMonth(),
          currentDateTime.getDate(),
          data.duration.hours,
          data.duration.minutes,
        );
      }

      if (!quiz?.result) return;
      const error = await updateQuiz({
        id: quiz?.result.id,
        name: data.name,
        attempts: data.attempts,
        accessCode: data.accessCode,
        percentagePass: data.percentagePass,
        groupId: data.groupId || null,
        sectionId: data.sectionId,
        duration: duration,
        deadline: data?.deadline?.toDate() || null,
        accessType: accessType,
        creatorId: session?.user.id,
      });

      if (error) {
        toast.error(error);
      } else {
        for (const question of quiz.result.questions) {
          await deleteAnswers(question.id);
        }
        await deleteQuestions(quiz.result.id);
        for (const question of data.questions) {
          const { questionId } = await createQuestion({
            quizId: quiz.result.id,
            text: question.text,
            type: question.type,
          });

          if (questionId) {
            for (const answer of question.answers) {
              await createAnswer({
                questionId: questionId,
                text: answer.text,
                isCorrect: answer.isCorrect,
              });
            }
          }
        }

        router.push(`/Profile/${session.user.id}`);
        toast.success("Quiz update successfully.");
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
      {ready && (
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
      )}
    </ThemeWrapper>
  );
}
