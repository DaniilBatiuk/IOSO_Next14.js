"use client";
import styles from "@/styles/Profile.module.scss";
import { QuizHistoryService } from "@/utils/services/quizHistory.servise";
import { QuizResultStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const QuizHistory: React.FC = () => {
  const { data: session } = useSession();

  const { data: quizHistory } = useQuery({
    queryKey: ["quizHistory"],
    queryFn: () => QuizHistoryService.getQuizHistory(session?.user.id),
  });

  return (
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
          {quizHistory &&
          quizHistory.success &&
          session?.user.id !== undefined &&
          quizHistory.result.length > 0 ? (
            quizHistory.result.map((quiz, index) => (
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
                    <Link href={`/Result/${quiz.id}`}>View result</Link>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No data yet</td>
              <td>No data yet</td>
              <td>No data yet</td>
              <td>No data yet</td>
              <td>No data yet</td>
              <td>No data yet</td>
              <td>No data yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
