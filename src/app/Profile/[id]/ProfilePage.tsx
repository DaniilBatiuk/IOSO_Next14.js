"use client";

import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/Profile.module.scss";

import { ButtonsNew, PieChartActivity, ProfileList, ThemeWrapper } from "@/components";
import { UserService } from "@/utils/services/user.service";

export const ProfilePage = ({ id }: { id: string }) => {
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUser(id),
  });

  if (!user?.result) {
    return (
      <div className={styles.profile__container}>
        <Skeleton variant="rectangular" height={220} />
        <Skeleton variant="rectangular" height={560} style={{ marginTop: "62px" }} />
      </div>
    );
  }

  return (
    <ThemeWrapper>
      <div className={styles.profile__container}>
        <section className={styles.profile__info}>
          <div className={styles.info__left}>
            {ICONS.Profile()}
            <div className={styles.info__left__text}>
              <div className={styles.info__text}>
                <div className={styles.info__name}>{user?.result?.fullName}</div>
                <div className={styles.info__email}>{user?.result?.email}</div>
              </div>
              <ButtonsNew id={id} />
            </div>
          </div>
          <div className={styles.info__right}>
            <div className={styles.info__right__item}>
              <div className={styles.info__right__pie}>
                {user &&
                (user.result.quizResult.length > 0 ||
                  user.result.quiz.length > 0 ||
                  user.result.groups.length > 0) ? (
                  <PieChartActivity
                    quizPassed={user.result.quizResult.length}
                    quizCreated={user.result.quiz.length}
                    groupCreated={user.result.groups.length}
                  />
                ) : (
                  <div className={styles.info__right__pie}>
                    <div
                      className="blur"
                      style={{ height: "200px", border: "1px rgb(55, 255, 255) solid" }}
                    >
                      No data yet
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <ProfileList id={id} />
      </div>
    </ThemeWrapper>
  );
};
