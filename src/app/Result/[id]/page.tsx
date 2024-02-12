"use client";
import { ThemeWrapper } from "@/components";
import styles from "@/styles/Result.module.scss";
import { QuizResult } from "@/utils/lib/@types";
import { QuizResultService } from "@/utils/services/quizResult.servise";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
  question: string;
  answers: { answer: string }[];
  selected: string | string[];
  rightAnswers: string | string[];
}[];

const INITIAL_DATA: FormData = [
  {
    question: "Where are you now?",
    answers: [{ answer: "Home" }, { answer: "Hospital" }, { answer: "Cinema" }],
    selected: "Hospital",
    rightAnswers: "Cinema",
  },
  {
    question: "How old are you?",
    answers: [{ answer: "16" }, { answer: "84" }, { answer: "25" }, { answer: "42" }],
    selected: "25",
    rightAnswers: "84",
  },
  {
    question: "How many cats do you have?",
    answers: [{ answer: "14" }, { answer: "63" }, { answer: "888" }],
    selected: "63",
    rightAnswers: "63",
  },
  {
    question: "How many dogs do you have?",
    answers: [{ answer: "14" }, { answer: "63" }, { answer: "888" }, { answer: "777" }],
    selected: ["14", "777"],
    rightAnswers: ["14", "888"],
  },
];

export default function Result({ params }: { params: { id: string } }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [age, setAge] = useState("");
  const [quizResultsSelect, setQuizResultsSelect] = useState<QuizResult>();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const quizName = searchParams.get("quizName");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const { data: quizResults } = useQuery({
    queryKey: ["QuizResults", quizName],
    queryFn: () => QuizResultService.getQuizResults(session?.user.id, quizName),
  });

  console.log(quizResultsSelect);

  useEffect(() => {
    if (quizResults) {
      setQuizResultsSelect(quizResults.result.filter(quizResult => quizResult.id === params.id)[0]);
    }
  }, [quizResults]);

  return (
    <ThemeWrapper>
      <div className={styles.result__container}>
        <div className={styles.result__title}>Quiz for english level</div>
        <div className={styles.result__main}>
          {/* <section className={styles.left}>
            {quizResultsSelect?.questionResult.map((questionResult, index) =>
            questionResult.question.map((question,index) => question.type  === QuestionType.Multiple_choice ?(
            <div className={styles.left__wrapper} key={index}>
              <div className={styles.left__title}>Question {index + 1}</div>
              <CheckboxQuizPass question={question.text} answers={question.answers}  selected={quizResultsSelect.answerSelected}/>
            </div>) :
            (<div className={styles.left__wrapper} key={index}>
                  <div className={styles.left__title}>Question {index + 1}</div>
                  <RadioQuizPass question={question.text} answers={question.answers} />
                </div>))

            )}
          </section> */}
          <aside className={styles.right}>
            <div className={styles.right__title}>Attempt</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Attempt select</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                value={age}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </aside>
        </div>
      </div>
    </ThemeWrapper>
  );
}
