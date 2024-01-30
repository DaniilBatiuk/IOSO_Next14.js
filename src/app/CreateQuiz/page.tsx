"use client";
import BasicSettings from "@/components/CreateQuizOrGroup/BasicSettings";
import QuestionsManager from "@/components/CreateQuizOrGroup/QuestionsManager";
import TestAccess from "@/components/CreateQuizOrGroup/TestAccess";
import TimeSettings from "@/components/CreateQuizOrGroup/TimeSettings";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/CreateQuiz.module.scss";
import { ICONS } from "@/utils/config/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .min(4, "Full name must be at least 4 characters")
    .max(60, "Full name must be less than 45 characters"),
});

type InputType = z.infer<typeof FormSchema>;

export default function CreateQuiz() {
  const [active, setActive] = useState<number>(0);
  const [menuActive, setMenuActive] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema), mode: "onSubmit" });

  const groupSave: SubmitHandler<InputType> = async data => {
    try {
      // const error = await createGroup(data);
      console.log(data);
      // if (error) {
      //   toast.error(error);
      // } else {
      //   toast.success("Group created successfully.");
      // }
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
      <div className={styles.create__container}>
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
                onClick={() => {
                  setActive(3);
                  if (!menuActive) setMenuActive(prev => !prev);
                }}
                className={clsx(styles.create__item, {
                  [styles.create__item_active]: active === 3,
                })}
              >
                {ICONS.TimeSettings()}
                <div className={styles.create__text}>Time settings</div>
              </button>
            </div>
            <button className={styles.create__button}>Activate quiz</button>
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
                : "Time settings"}
            </div>
          </div>
          {active === 0 ? (
            <BasicSettings label="Insert quiz name" errors={errors} register={register} />
          ) : active === 1 ? (
            <QuestionsManager />
          ) : active === 2 ? (
            <TestAccess type="quiz" />
          ) : (
            <TimeSettings />
          )}
        </section>
      </div>
    </ThemeWrapper>
  );
}
