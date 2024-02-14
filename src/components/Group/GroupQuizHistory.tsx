"use client";

import { QuizResultStatus } from "@prisma/client";
import Link from "next/link";

import styles from "@/styles/Profile.module.scss";

import { QuizHistory, WrapSuccessType } from "@/utils/lib/@types";

type GroupQuizHistoryProp = {
  groupQuizHistory: WrapSuccessType<QuizHistory[]> | undefined;
};

export const GroupQuizHistory: React.FC<GroupQuizHistoryProp> = ({
  groupQuizHistory,
}: GroupQuizHistoryProp) => {
  return (
    <div className={styles.main_2}>
      {groupQuizHistory && groupQuizHistory.success && groupQuizHistory.result.length > 0 ? (
        <div className={styles.profile__main_2}>
          <table className={styles.profile__table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Score</th>
                <th>Passed date</th>
                <th>Duration</th>
                <th>Questions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groupQuizHistory.result.map((quiz, index) => (
                <tr className={styles.item} key={index}>
                  <td className={styles.item__title}>{quiz.quiz.name}</td>
                  <td>
                    <div
                      className={
                        quiz.status === QuizResultStatus.Denied
                          ? styles.item__status_close
                          : styles.item__status_open
                      }
                    >
                      {quiz.status}
                    </div>
                  </td>
                  <td className={styles.item__data}>{quiz.score.toFixed(2)}%</td>
                  <td className={styles.item__deadline}>
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </td>
                  <td className={styles.item__deadline}>
                    {new Date(quiz.durationOfAttempt).toLocaleTimeString()}
                  </td>
                  <td className={styles.item__score}>{quiz.questionCount}</td>
                  <td>
                    <button className={styles.item__button}>
                      <Link href={`/Result/${quiz.id}?quizName=${quiz.quiz.name}`}>
                        View result
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.left__no__data}>No data yet</div>
      )}
    </div>
  );
};
