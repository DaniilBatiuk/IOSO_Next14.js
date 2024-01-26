"use client";
import styles from "@/styles/Quizzes.module.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import clsx from "clsx";
import QuizOrGroup from "@/components/QuizOrGroup/QuizOrGroup";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
export default function Trends() {
  const [age, setAge] = useState("");
  const [activeQuiz, setActiveQuiz] = useState(true);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <ThemeWrapper>
      <div className={`${styles.quizzes__container}`}>
        <section className={styles.main}>
          <div className={`${styles.quizzes__form}`}>
            <ButtonGroup size="medium" aria-label="medium button group">
              <Button
                className={clsx({ [styles.button__active]: activeQuiz === true })}
                onClick={() => setActiveQuiz(true)}
              >
                Quizzes
              </Button>
              <Button
                className={clsx({ [styles.button__active]: activeQuiz === false })}
                onClick={() => setActiveQuiz(false)}
              >
                Groups
              </Button>
            </ButtonGroup>

            <form className={`${styles.form}`}>
              <TextField id="standard-basic" label="Find by name" variant="standard" />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Difficulty</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Difficulty"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">Filter by name</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Filter by name"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          {activeQuiz === true ? (
            <>
              <QuizOrGroup status="Available" buttonText="Quiz" type="quiz" />
              <QuizOrGroup status="Access key" buttonText="Quiz" type="quiz" />
            </>
          ) : (
            <>
              <QuizOrGroup status="Available" buttonText="Join" type="group" />
              <QuizOrGroup status="Access key" buttonText="Join" type="group" />
              <QuizOrGroup status="Access key" buttonText="Join" type="group" />
            </>
          )}
        </section>
      </div>
    </ThemeWrapper>
  );
}
