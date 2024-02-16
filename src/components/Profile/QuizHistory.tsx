"use client";

import { Skeleton } from "@mui/material";
import { QuizResultStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

import styles from "@/styles/Profile.module.scss";

import { QuizResultService } from "@/utils/services/quizResult.servise";

export const QuizHistory: React.FC = () => {
  const { data: session } = useSession();

  const { data: quizHistory } = useQuery({
    queryKey: ["quizHistory"],
    queryFn: () => QuizResultService.getQuizHistory(session?.user.id),
    enabled: !!session?.user.id,
  });

  if (!quizHistory || !session?.user.id) {
    return (
      <div className={styles.profile__main_2}>
        <div className={styles.skeleton}>
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
          <Skeleton variant="rectangular" height={67} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile__main_2}>
      {quizHistory.success && quizHistory.result.length > 0 ? (
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
            {quizHistory.result.map((quiz, index) => (
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
                    <Link href={`/Result/${quiz.id}?quizName=${quiz.quiz.name}`}>View result</Link>
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
