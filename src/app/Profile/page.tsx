"use client";
import styles from "@/styles/Profile.module.scss";
import ProfileSvg from "@/../public/Profile.svg";
import Image from "next/image";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import QuizHistory from "@/components/Profile/QuizHistory";
import MyQuizzes from "@/components/Profile/MyQuizzes";
import Link from "next/link";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";

const DATA = [
  { value: 70, label: "create group" },
  { value: 20, label: "create test" },
  { value: 10, label: "pass test" },
];

const COLORS = {
  colors: ["rgb(27, 200, 231)", "rgba(255, 251, 9, 0.966)", "rgba(245, 22, 226, 0.842)"],
};

export default function Profile() {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);

  return (
    <ThemeWrapper>
      <div className={styles.profile__container}>
        <section className={styles.profile__info}>
          <div className={styles.info__left}>
            <Image src={ProfileSvg.src} alt="Icon" width={200} height={200} priority={true} />
            <div className={styles.info__left__text}>
              <div className={styles.info__text}>
                <div className={styles.info__name}>Daniil Batiuk</div>
                <div className={styles.info__email}>sportak50@gmail.com</div>
              </div>
              <div className={styles.info__result}>
                <button className={styles.button__save}>
                  <Link href="/CreateQuiz">New quiz</Link>
                </button>
                <button className={styles.button__save}>
                  <Link href="/CreateGroup">New group</Link>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.info__right}>
            <div className={styles.info__right__item}>
              <div className={styles.info__title}>Activity</div>
              <PieChart
                series={[
                  {
                    innerRadius: 58,
                    outerRadius: 70,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    data: DATA,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  },
                ]}
                width={340}
                height={174}
                margin={{ right: 180 }}
                {...COLORS}
              />
            </div>
          </div>
        </section>
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
        {activeMenuItem === 0 && <QuizHistory />}
        {activeMenuItem === 1 && <MyQuizzes />}
      </div>
    </ThemeWrapper>
  );
}
