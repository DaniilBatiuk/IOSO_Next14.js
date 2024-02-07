"use client";

import QuizOrGroup from "@/components/QuizOrGroup/QuizOrGroup";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/Quizzes.module.scss";
import { GroupsService } from "@/utils/services/group.service";
import { QuizService } from "@/utils/services/quiz.servise";
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Trends() {
  const [age, setAge] = useState("");
  const [activeQuiz, setActiveQuiz] = useState(true);
  const { data: session } = useSession();

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const { data: groups } = useQuery({
    queryKey: ["allGroups"],
    queryFn: () => GroupsService.getAllGroups(),
  });

  const { data: quizzes } = useQuery({
    queryKey: ["allQuizzes"],
    queryFn: () => QuizService.getAllQuizzes(),
  });

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
              <TextField label="Find by name" variant="standard" />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select value={age} onChange={handleChange} label="Status">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select value={age} onChange={handleChange} label="Difficulty">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel>Filter by name</InputLabel>
                <Select value={age} onChange={handleChange} label="Filter by name">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          {activeQuiz === true ? (
            quizzes?.success ? (
              quizzes.result.length > 0 ? (
                quizzes.result.map((quiz, index) => (
                  <QuizOrGroup key={index} quiz={quiz} userId={session?.user.id} />
                ))
              ) : (
                <div className="blur">No data yet</div>
              )
            ) : (
              <div className={styles.skeleton}>
                <Skeleton variant="rectangular" height={137} />
                <Skeleton variant="rectangular" height={137} />
                <Skeleton variant="rectangular" height={137} />
                <Skeleton variant="rectangular" height={137} />
                <Skeleton variant="rectangular" height={137} />
                <Skeleton variant="rectangular" height={137} />
              </div>
            )
          ) : groups?.success ? (
            groups.result.length > 0 ? (
              groups.result.map((group, index) => (
                <QuizOrGroup key={index} group={group} userId={session?.user.id} />
              ))
            ) : (
              <div className="blur">No data yet</div>
            )
          ) : (
            <div className={styles.skeleton}>
              <Skeleton variant="rectangular" height={137} />
              <Skeleton variant="rectangular" height={137} />
              <Skeleton variant="rectangular" height={137} />
              <Skeleton variant="rectangular" height={137} />
              <Skeleton variant="rectangular" height={137} />
              <Skeleton variant="rectangular" height={137} />
            </div>
          )}
        </section>
      </div>
    </ThemeWrapper>
  );
}
