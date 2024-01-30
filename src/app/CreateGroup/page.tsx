"use client";
import BasicSettings from "@/components/CreateQuizOrGroup/BasicSettings";
import GroupAccess from "@/components/CreateQuizOrGroup/GroupAccess";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/CreateQuiz.module.scss";
import { ICONS } from "@/utils/config/icons";
import { createNewGroup } from "@/utils/lib/actions/groupActions";
import { AccessCodeScheme } from "@/utils/lib/validators/access-code-validator";
import {
  CreateGroupFormScheme,
  CreateGroupType,
} from "@/utils/lib/validators/create-group-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccessTypeForGroup } from "@prisma/client";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateGroup() {
  const { data: session } = useSession();

  const [active, setActive] = useState<number>(0);
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [accessType, setAccessType] = useState<AccessTypeForGroup>(
    AccessTypeForGroup.Public_access_code,
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupType>({ resolver: zodResolver(CreateGroupFormScheme), mode: "onSubmit" });

  const groupSave: SubmitHandler<CreateGroupType> = async data => {
    if (accessType === AccessTypeForGroup.Public_access_code) {
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
    if (session === null) {
      toast.error("You have to register to create the group!");
      return;
    }
    try {
      const error = await createNewGroup({ ...data, accessType, creatorId: session!.user.id });

      error ? toast.error(error) : toast.success("Group created successfully.");
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
      <form onSubmit={handleSubmit(groupSave)} className={styles.create__container}>
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
              Group configuration
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
                {ICONS.GroupAccess()}
                <div className={styles.create__text}>Group access</div>
              </button>
            </div>
            <button type="submit" className={styles.create__button}>
              {isSubmitting ? "Activate group..." : "Activate group"}
            </button>
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
              {active === 0 ? "Basic settings" : "Group access"}
            </div>
          </div>
          {active === 0 ? (
            <BasicSettings label="Insert group name" errors={errors} register={register} />
          ) : (
            <GroupAccess
              errors={errors}
              register={register}
              accessType={accessType}
              setAccessType={setAccessType}
            />
          )}
        </section>
      </form>
    </ThemeWrapper>
  );
}
