"use client";

import { MyQuizzes, QuizHistory, Statistic } from "..";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import styles from "@/styles/Profile.module.scss";

type ProfileListProp = {
  id: string;
};

export const ProfileList: React.FC<ProfileListProp> = ({ id }: ProfileListProp) => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);
  const { data: session } = useSession();

  return (
    <>
      <div className={styles.profile__list}>
        <div
          className={activeMenuItem === 0 ? styles.profile__item__active : styles.profile__item}
          onClick={() => setActiveMenuItem(0)}
        >
          Quiz history
        </div>
        <div
          className={activeMenuItem === 1 ? styles.profile__item__active : styles.profile__item}
          onClick={() => setActiveMenuItem(1)}
        >
          My quizzes & Groups
        </div>
        <div
          className={activeMenuItem === 2 ? styles.profile__item__active : styles.profile__item}
          onClick={() => setActiveMenuItem(2)}
        >
          Statistic
        </div>
      </div>

      {session?.user.id !== id ? (
        <div className={styles.profile__blur}>
          {session === undefined ? "Loading..." : "No access to data"}
        </div>
      ) : (
        <>
          {activeMenuItem === 0 && <QuizHistory />}
          {activeMenuItem === 1 && <MyQuizzes />}
          {activeMenuItem === 2 && <Statistic />}
        </>
      )}
    </>
  );
};
