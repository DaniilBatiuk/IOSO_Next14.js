"use client";
import BasicSettings from "@/components/CreateQuizOrGroup/BasicSettings";
import GroupAccess from "@/components/CreateQuizOrGroup/GroupAccess";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/CreateQuiz.module.scss";
import { createNewGroup } from "@/utils/lib/actions/groupActions";
import { AccessCodeScheme, CreateGroupFormScheme } from "@/utils/lib/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccessTypeForGroup } from "@prisma/client";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type CreateGroupType = z.infer<typeof CreateGroupFormScheme>;

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
    }
    if (session === null) {
      toast.error("You have to register to create group!");
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
              {!menuActive && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  onClick={() => setMenuActive(prev => !prev)}
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
                  />
                </svg>
              )}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="36"
                  viewBox="0 0 35 36"
                  fill="none"
                >
                  <path
                    d="M29.5314 18.8313V17.1578L31.6314 15.3203C32.0185 14.9791 32.2725 14.5121 32.3486 14.0017C32.4246 13.4913 32.3178 12.9705 32.047 12.5313L29.4657 8.15625C29.2739 7.82404 28.9982 7.54811 28.666 7.35613C28.3339 7.16416 27.9572 7.0629 27.5736 7.0625C27.3358 7.06068 27.0994 7.09762 26.8736 7.17188L24.2157 8.06875C23.7569 7.76382 23.2782 7.48978 22.7829 7.24844L22.2251 4.49219C22.1251 3.98863 21.8512 3.5363 21.4512 3.21436C21.0513 2.89243 20.5509 2.72142 20.0376 2.73125H14.9189C14.4056 2.72142 13.9052 2.89243 13.5053 3.21436C13.1053 3.5363 12.8314 3.98863 12.7314 4.49219L12.1736 7.24844C11.6747 7.48972 11.1924 7.76376 10.7298 8.06875L8.12669 7.12813C7.89842 7.06865 7.66203 7.04649 7.42669 7.0625C7.04308 7.0629 6.66632 7.16416 6.33421 7.35613C6.00209 7.54811 5.7263 7.82404 5.5345 8.15625L2.95325 12.5313C2.69795 12.9698 2.60309 13.4835 2.6849 13.9844C2.76671 14.4852 3.0201 14.942 3.40169 15.2766L5.46887 17.1688V18.8422L3.40169 20.6797C3.00932 21.0166 2.749 21.4815 2.6669 21.9921C2.58481 22.5027 2.68626 23.0259 2.95325 23.4688L5.5345 27.8438C5.7263 28.176 6.00209 28.4519 6.33421 28.6439C6.66632 28.8358 7.04308 28.9371 7.42669 28.9375C7.66441 28.9393 7.90085 28.9024 8.12669 28.8281L10.7845 27.9313C11.2434 28.2362 11.722 28.5102 12.2173 28.7516L12.7751 31.5078C12.8751 32.0114 13.1491 32.4637 13.549 32.7856C13.9489 33.1076 14.4493 33.2786 14.9626 33.2688H20.1251C20.6384 33.2786 21.1388 33.1076 21.5387 32.7856C21.9387 32.4637 22.2126 32.0114 22.3126 31.5078L22.8704 28.7516C23.3693 28.5103 23.8516 28.2362 24.3142 27.9313L26.9611 28.8281C27.1869 28.9024 27.4233 28.9393 27.6611 28.9375C28.0447 28.9371 28.4214 28.8358 28.7535 28.6439C29.0857 28.4519 29.3614 28.176 29.5532 27.8438L32.047 23.4688C32.3023 23.0302 32.3972 22.5165 32.3153 22.0156C32.2335 21.5148 31.9801 21.058 31.5986 20.7234L29.5314 18.8313ZM27.5736 26.75L23.822 25.4813C22.9438 26.2251 21.9401 26.8066 20.8579 27.1984L20.0814 31.125H14.9189L14.1423 27.2422C13.0687 26.8392 12.0704 26.2588 11.1892 25.525L7.42669 26.75L4.84544 22.375L7.82044 19.75C7.6182 18.6178 7.6182 17.4588 7.82044 16.3266L4.84544 13.625L7.42669 9.25L11.1782 10.5188C12.0565 9.77488 13.0602 9.19341 14.1423 8.80157L14.9189 4.875H20.0814L20.8579 8.75782C21.9315 9.16078 22.9298 9.74125 23.8111 10.475L27.5736 9.25L30.1548 13.625L27.1798 16.25C27.382 17.3822 27.382 18.5413 27.1798 19.6734L30.1548 22.375L27.5736 26.75Z"
                    fill="white"
                  />
                  <path
                    d="M17.5 24.5625C16.2021 24.5625 14.9333 24.1776 13.8541 23.4565C12.7749 22.7354 11.9337 21.7105 11.437 20.5114C10.9403 19.3122 10.8104 17.9927 11.0636 16.7197C11.3168 15.4467 11.9418 14.2774 12.8596 13.3596C13.7774 12.4418 14.9467 11.8168 16.2197 11.5636C17.4927 11.3104 18.8122 11.4403 20.0114 11.937C21.2105 12.4337 22.2354 13.2749 22.9565 14.3541C23.6776 15.4333 24.0625 16.7021 24.0625 18C24.0713 18.8642 23.9075 19.7215 23.5808 20.5217C23.2541 21.3219 22.7711 22.0488 22.1599 22.6599C21.5488 23.2711 20.8219 23.7541 20.0217 24.0808C19.2215 24.4075 18.3642 24.5713 17.5 24.5625ZM17.5 13.625C16.9218 13.6115 16.3468 13.7155 15.81 13.9306C15.2731 14.1457 14.7854 14.4674 14.3764 14.8764C13.9674 15.2854 13.6457 15.7731 13.4306 16.31C13.2155 16.8468 13.1115 17.4218 13.125 18C13.1115 18.5782 13.2155 19.1532 13.4306 19.69C13.6457 20.2269 13.9674 20.7146 14.3764 21.1236C14.7854 21.5326 15.2731 21.8543 15.81 22.0694C16.3468 22.2845 16.9218 22.3885 17.5 22.375C18.0782 22.3885 18.6532 22.2845 19.19 22.0694C19.7269 21.8543 20.2146 21.5326 20.6236 21.1236C21.0326 20.7146 21.3543 20.2269 21.5694 19.69C21.7845 19.1532 21.8885 18.5782 21.875 18C21.8885 17.4218 21.7845 16.8468 21.5694 16.31C21.3543 15.7731 21.0326 15.2854 20.6236 14.8764C20.2146 14.4674 19.7269 14.1457 19.19 13.9306C18.6532 13.7155 18.0782 13.6115 17.5 13.625Z"
                    fill="white"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="36"
                  viewBox="0 0 35 36"
                  fill="none"
                >
                  <path
                    d="M28.4375 10.8906H24.6094V8.15625C24.6094 6.27073 23.8604 4.46243 22.5271 3.12916C21.1938 1.7959 19.3855 1.04688 17.5 1.04688C15.6145 1.04688 13.8062 1.7959 12.4729 3.12916C11.1396 4.46243 10.3906 6.27073 10.3906 8.15625V10.8906H6.5625C5.8373 10.8906 5.1418 11.1787 4.629 11.6915C4.11621 12.2043 3.82813 12.8998 3.82812 13.625V28.9375C3.82813 29.6627 4.11621 30.3582 4.629 30.871C5.1418 31.3838 5.8373 31.6719 6.5625 31.6719H28.4375C29.1627 31.6719 29.8582 31.3838 30.371 30.871C30.8838 30.3582 31.1719 29.6627 31.1719 28.9375V13.625C31.1719 12.8998 30.8838 12.2043 30.371 11.6915C29.8582 11.1787 29.1627 10.8906 28.4375 10.8906ZM13.6719 8.15625C13.6719 7.14097 14.0752 6.16727 14.7931 5.44936C15.511 4.73144 16.4847 4.32812 17.5 4.32812C18.5153 4.32812 19.489 4.73144 20.2069 5.44936C20.9248 6.16727 21.3281 7.14097 21.3281 8.15625V10.8906H13.6719V8.15625ZM27.8906 28.3906H7.10938V14.1719H27.8906V28.3906ZM19.6875 21.2812C19.6875 21.7139 19.5592 22.1368 19.3188 22.4966C19.0785 22.8563 18.7368 23.1367 18.3371 23.3022C17.9374 23.4678 17.4976 23.5111 17.0732 23.4267C16.6489 23.3423 16.2591 23.134 15.9532 22.828C15.6473 22.5221 15.4389 22.1323 15.3545 21.708C15.2701 21.2837 15.3134 20.8438 15.479 20.4441C15.6446 20.0444 15.925 19.7028 16.2847 19.4624C16.6444 19.222 17.0674 19.0938 17.5 19.0938C18.0802 19.0938 18.6366 19.3242 19.0468 19.7345C19.457 20.1447 19.6875 20.7011 19.6875 21.2812Z"
                    fill="white"
                  />
                </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="svg1"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 6.001h18m-18 6h18m-18 6h18"
                />
              </svg>
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
