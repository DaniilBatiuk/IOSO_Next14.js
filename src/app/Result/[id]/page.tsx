"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { QuestionType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "@/styles/Result.module.scss";

import { CheckboxQuizPass, RadioQuizPass, ThemeWrapper } from "@/components";
import { QuizResult } from "@/utils/lib/@types";
import { QuizResultService } from "@/utils/services/quizResult.servise";

export default function Result({ params }: { params: { id: string } }) {
  const [quizResultsSelect, setQuizResultsSelect] = useState<QuizResult>();
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const quizName = searchParams.get("quizName");

  const handleChange = (event: SelectChangeEvent) => {
    setQuizResultsSelect(
      quizResults?.result.filter(quizResult => quizResult.id === event.target.value)[0],
    );
  };

  const { data: quizResults } = useQuery({
    queryKey: ["QuizResults", quizName],
    queryFn: () => QuizResultService.getQuizResults(session?.user.id, quizName),
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    if (quizResults) {
      setQuizResultsSelect(quizResults.result.filter(quizResult => quizResult.id === params.id)[0]);
    }
  }, [quizResults]);

  if (!quizResultsSelect || !quizResults) {
    return (
      <div className={styles.result__container}>
        <Skeleton variant="text" sx={{ height: "44px" }} />{" "}
        <div className={styles.result__main}>
          <Skeleton variant="rectangular" height={500} width={1000} />
          <aside className={styles.right}>
            <Skeleton variant="rectangular" height={500} />
          </aside>
        </div>
      </div>
    );
  }

  return (
    <ThemeWrapper>
      <div className={styles.result__container}>
        <div className={styles.result__title}>{quizName}</div>

        <div className={styles.result__main}>
          <section className={styles.left}>
            <div className={styles.left__statistic}>
              <div className={styles.left__statistic__item}>
                <div className={styles.left__statistic__item__text}>Status</div>
                <div className={styles.left__statistic__item__result}>
                  {quizResultsSelect.status}
                </div>
              </div>
              <div className={styles.left__statistic__item}>
                <div className={styles.left__statistic__item__text}>Score</div>
                <div className={styles.left__statistic__item__result}>
                  {quizResultsSelect.score}%
                </div>
              </div>
              <div className={styles.left__statistic__item}>
                <div className={styles.left__statistic__item__text}>Question count</div>
                <div className={styles.left__statistic__item__result}>
                  {quizResultsSelect.questionCount}
                </div>
              </div>
              <div className={styles.left__statistic__item}>
                <div className={styles.left__statistic__item__text}>Right answer count</div>
                <div className={styles.left__statistic__item__result}>
                  {quizResultsSelect.rightAnswerCount}
                </div>
              </div>
              <div className={styles.left__statistic__item}>
                <div className={styles.left__statistic__item__text}>Attempt duration</div>
                <div className={styles.left__statistic__item__result}>
                  {new Date(quizResultsSelect.durationOfAttempt).toLocaleTimeString()}
                </div>
              </div>
              <div className={styles.left__statistic__item}>
                <div className={styles.left__statistic__item__text}>Date of attempt</div>
                <div className={styles.left__statistic__item__result}>
                  {new Date(quizResultsSelect.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            {quizResultsSelect.questionResult.map((questionResult, index) =>
              questionResult.question.type === QuestionType.Multiple_choice ? (
                <div className={styles.left__wrapper} key={index}>
                  <div className={styles.left__top}>
                    <div className={styles.left__title}>Question {index + 1}</div>
                    <div className={styles.left__score}> {questionResult.score}/1</div>
                  </div>
                  <CheckboxQuizPass
                    question={questionResult.question.text}
                    answers={questionResult.question.answers}
                    selected={questionResult.answerSelected.map(answer => answer.answer.id)}
                    showResults={true}
                  />
                </div>
              ) : (
                <div className={styles.left__wrapper} key={index}>
                  <div className={styles.left__top}>
                    <div className={styles.left__title}>Question {index + 1}</div>
                    <div className={styles.left__score}> {questionResult.score}/1</div>
                  </div>
                  <RadioQuizPass
                    question={questionResult.question.text}
                    answers={questionResult.question.answers}
                    selected={questionResult.answerSelected.map(answer => answer.answer.id)}
                    showResults={true}
                  />
                </div>
              ),
            )}
          </section>

          <aside className={styles.right}>
            <div className={styles.right__title}>Attempt</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Attempt select</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                value={quizResultsSelect.id}
                onChange={handleChange}
                label="Attempt"
              >
                {quizResults.result.map((quizResult, index) => (
                  <MenuItem value={quizResult.id} key={quizResult.id}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </aside>
        </div>
      </div>
    </ThemeWrapper>
  );
}
