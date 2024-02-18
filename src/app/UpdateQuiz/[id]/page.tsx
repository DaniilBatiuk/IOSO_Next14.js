"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AccessTypeForQuiz } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/CreateQuiz.module.scss";

import { CreateQuizFormSchema, CreateQuizType } from "@/utils/lib/validators/create-quiz-validator";

import {
  Aside,
  BasicSettings,
  QuestionsManager,
  QuizAccess,
  RestrictionsSettings,
  ThemeWrapper,
} from "@/components";
import { updateQuizSave } from "@/utils/lib/actions";
import { validateQuiz } from "@/utils/lib/helpers";
import { QuizService } from "@/utils/services/quiz.servise";

export default function UpdateQuiz({ params }: { params: { id: string } }) {
  const [active, setActive] = useState<number>(0);
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [ready, setReady] = useState<boolean>(false);
  const [accessType, setAccessType] = useState<AccessTypeForQuiz>(AccessTypeForQuiz.Private);
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: quiz,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["QuizUpdate", params.id],
    queryFn: () => QuizService.getQuizForUpdate(params.id, session?.user.id),
    enabled: !!session?.user.id,
  });
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    setError,
    reset,
    getValues,
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
        // @ts-ignore
        questions: quiz.result.questions,
      });
      setAccessType(quiz.result.accessType);
      setReady(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      router.push(`/Profile/${session!.user.id}`);
      toast.error("Something went wrong!");
    }
  }, [isError]);

  const quizSave: SubmitHandler<CreateQuizType> = async data => {
    try {
      if (validateQuiz(accessType, data, setError, session?.user.id || null) || !quiz) {
        return;
      }

      const deadline = data?.deadline?.toDate() || null;
      data.deadline = null;

      const error = await updateQuizSave(accessType, data, session!.user.id, quiz!, deadline);
      if (error) {
        toast.error("Something went wrong!");
        return;
      }
      await queryClient.refetchQueries({
        queryKey: ["QuizUpdate", params.id],
        type: "active",
        exact: true,
      });

      router.push(`/Profile/${session!.user.id}`);
      toast.success("Quiz update successfully.");
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
          <Aside
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            active={active}
            setActive={setActive}
            isSubmitting={isSubmitting}
          />
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
                getValues={getValues}
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
