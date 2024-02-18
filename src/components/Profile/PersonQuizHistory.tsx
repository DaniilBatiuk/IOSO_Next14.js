"use client";

import { QuizResultStatus } from "@prisma/client";
import Link from "next/link";

import styles from "@/styles/Profile.module.scss";

import { TQuizResultSelect } from "@/utils/lib/@types";

type PersonQuizHistoryType = {
  personSelected: TQuizResultSelect[] | null;
};

export const PersonQuizHistory: React.FC<PersonQuizHistoryType> = ({
  personSelected,
}: PersonQuizHistoryType) => {
  if (!personSelected) {
    return <></>;
  }

  return (
    <div className={styles.profile__main_2}>
      {personSelected.length > 0 ? (
        <table className={styles.profile__table}>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Status</th>
              <th>Score</th>
              <th>Passed date</th>
              <th>Duration</th>
              <th>Avenger score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {personSelected.map((quiz, index) => (
              <tr className={styles.item} key={index}>
                <td className={styles.item__title}>{quiz.user.fullName}</td>
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
                <td className={styles.item__score}>{quiz.score}%</td>
                <td>
                  <button className={styles.item__button}>
                    <Link
                      href={`/Result/${quiz.id}?quizName=${quiz.quiz.name}&userId=${quiz.user.id}`}
                    >
                      View result
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="blur">No data yet</div>
      )}
    </div>
  );
};
