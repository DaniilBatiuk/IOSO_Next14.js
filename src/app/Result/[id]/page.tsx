"use client";
import CheckboxQuizPass from "@/components/QuizPass/CheckboxQuizPass";
import RadioQuizPass from "@/components/QuizPass/RadioQuizPass";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/Result.module.scss";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type FormData = {
  question: string;
  variants: { variant: string }[];
  selected: string | string[];
  rightAnswers: string | string[];
}[];

const INITIAL_DATA: FormData = [
  {
    question: "Where are you now?",
    variants: [{ variant: "Home" }, { variant: "Hospital" }, { variant: "Cinema" }],
    selected: "Hospital",
    rightAnswers: "Cinema",
  },
  {
    question: "How old are you?",
    variants: [{ variant: "16" }, { variant: "84" }, { variant: "25" }, { variant: "42" }],
    selected: "25",
    rightAnswers: "84",
  },
  {
    question: "How many cats do you have?",
    variants: [{ variant: "14" }, { variant: "63" }, { variant: "888" }],
    selected: "63",
    rightAnswers: "63",
  },
  {
    question: "How many dogs do you have?",
    variants: [{ variant: "14" }, { variant: "63" }, { variant: "888" }, { variant: "777" }],
    selected: ["14", "777"],
    rightAnswers: ["14", "888"],
  },
];

export default function Result() {
  const [data, setData] = useState(INITIAL_DATA);
  const [age, setAge] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <ThemeWrapper>
      <div className={styles.result__container}>
        <div className={styles.result__title}>Quiz for english level</div>
        <div className={styles.result__main}>
          <section className={styles.left}>
            {data.map((item, index) =>
              Array.isArray(item.selected) ? (
                <div className={styles.left__wrapper} key={index}>
                  <div className={styles.left__title}>Question {index + 1}</div>
                  <CheckboxQuizPass {...item} />
                </div>
              ) : (
                <div className={styles.left__wrapper} key={index}>
                  <div className={styles.left__title}>Question {index + 1}</div>
                  <RadioQuizPass {...item} />
                </div>
              ),
            )}
          </section>
          <aside className={styles.right}>
            <div className={styles.right__title}>Attempt</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Attempt select</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
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
