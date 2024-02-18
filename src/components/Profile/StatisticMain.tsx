"use client";

import { QuizResultStatus } from "@prisma/client";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/Profile.module.scss";

import { TQuizResultSelect } from "@/utils/lib/@types";

export type StatisticMainProps = {
  quizResult: TQuizResultSelect[];
};

export const StatisticMain: React.FC<StatisticMainProps> = ({ quizResult }: StatisticMainProps) => {
  const averageScore = (
    quizResult.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0) /
    quizResult.length
  ).toFixed(2);

  const passed = (
    quizResult.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.status === QuizResultStatus.Passed ? 1 : 0),
      0,
    ) / quizResult.length
  ).toFixed(2);

  const averageTime =
    quizResult.reduce(
      (accumulator, currentValue) =>
        accumulator + new Date(currentValue.durationOfAttempt).getTime(),
      0,
    ) / quizResult.length;

  return (
    <div className={styles.statistic__blocks}>
      <div className={styles.statistic__block}>
        <div className={styles.statistic__block__top}>
          <div className={styles.statistic__block__top__text}>Popularity</div>
          {ICONS.Popularity()}
        </div>
        <div className={styles.statistic__block__main}>{quizResult.length}</div>
        <div className={styles.statistic__block__bottom}>Since creation</div>
      </div>
      <div className={styles.statistic__block}>
        <div className={styles.statistic__block__top}>
          <div className={styles.statistic__block__top__text}>Passed</div>
          {ICONS.Passed()}
        </div>
        <div className={styles.statistic__block__main}>{passed}%</div>
        <div className={styles.statistic__block__bottom}>Since creation</div>
      </div>
      <div className={styles.statistic__block}>
        <div className={styles.statistic__block__top}>
          <div className={styles.statistic__block__top__text}>Average score</div>
          {ICONS.Score()}
        </div>
        <div className={styles.statistic__block__main}>{averageScore}%</div>
        <div className={styles.statistic__block__bottom}>Since creation</div>
      </div>
      <div className={styles.statistic__block}>
        <div className={styles.statistic__block__top}>
          <div className={styles.statistic__block__top__text}>Average time</div>
          {ICONS.Time()}
        </div>
        <div className={styles.statistic__block__main}>
          {new Date(averageTime).toLocaleTimeString()}
        </div>
        <div className={styles.statistic__block__bottom}>Since creation</div>
      </div>
    </div>
  );
};
