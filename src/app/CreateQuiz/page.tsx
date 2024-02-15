"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AccessTypeForQuiz } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { createQuizSave } from "@/utils/lib/actions";
import { validateQuiz } from "@/utils/lib/helpers";

export default function CreateQuiz() {
  const [active, setActive] = useState<number>(0);
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [accessType, setAccessType] = useState<AccessTypeForQuiz>(AccessTypeForQuiz.Private);
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuizType>({
    defaultValues: {
      attempts: 1,
      deadline: null,
      sectionId: null,
      accessCode: null,
      percentagePass: 0,
      duration: {
        hours: 0,
        minutes: 0,
      },
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
    try {
      if (validateQuiz(accessType, data, setError, session?.user.id || null)) {
        return;
      }

      const deadline = data?.deadline?.toDate() || null;
      data.deadline = null;

      const error = await createQuizSave(accessType, data, session!.user.id, deadline);
      if (error) {
        toast.error("Something went wrong!");
        return;
      }

      router.push(`/Profile/${session!.user.id}`);
      toast.success("Quiz created successfully.");
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
    </ThemeWrapper>
  );
}
