"use client";
import MyQuizzes from "@/components/Profile/MyQuizzes";
import styles from "@/styles/Profile.module.scss";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import QuizHistory from "./QuizHistory";

type ProfileListProp = {
  id: string;
};

const ProfileList: React.FC<ProfileListProp> = ({ id }: ProfileListProp) => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);
  const { data: session } = useSession();

  console.log(session);
  return (
    <>
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
        </div>
        {session?.user.id !== id ? (
          <div className={styles.profile__blur}>
            {session === undefined ? "Loading..." : "No access to data"}
          </div>
        ) : (
          <>
            {activeMenuItem === 0 && <QuizHistory />}
            {activeMenuItem === 1 && <MyQuizzes />}
          </>
        )}
      </>
    </>
  );
};
export default ProfileList;
