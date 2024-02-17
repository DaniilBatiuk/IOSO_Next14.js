"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import styles from "@/styles/Profile.module.scss";

import { Line } from "../UI/Line/Line";

import { TGroupStatisticSelect, TQuizStatisticSelect } from "@/utils/lib/@types";
import { UserService } from "@/utils/services/user.service";

const defaultGroup: TGroupStatisticSelect = {
  id: "0",
  name: "No group",
};

export const Statistic = () => {
  const { data: session } = useSession();
  const [groupSelected, setGroupSelected] = useState<TGroupStatisticSelect>(defaultGroup);
  const [quizzes, setQuizzes] = useState<TQuizStatisticSelect[] | null>(null);
  const [quizSelected, setQuizSelected] = useState<TQuizStatisticSelect | null>(null);

  const { data: user } = useQuery({
    queryKey: ["user", session?.user.id],
    queryFn: () => UserService.getUser(session?.user.id),
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    if (!user?.result) return;
    setQuizzes(user.result.quiz.filter(quiz => quiz.QuizResult.length > 0));
    setQuizSelected(user.result.quiz.find(quiz => quiz.QuizResult.length > 0) || null);
  }, [user]);

  const handleChangeGroupSelect = (event: SelectChangeEvent) => {
    if (!user) return;

    if (+event.target.value === 0) {
      setGroupSelected(defaultGroup);
      setQuizzes(user.result.quiz.filter(quiz => quiz.QuizResult.length > 0 && !quiz.groupId));
      setQuizSelected(user.result.quiz.find(quiz => quiz.QuizResult.length > 0) || null);
    } else {
      setGroupSelected(user.result.groups.find(group => group.id === event.target.value)!);
      setQuizzes(user.result.quiz.filter(quiz => quiz.groupId === event.target.value));
      setQuizSelected(user.result.quiz.find(quiz => quiz.groupId === event.target.value) || null);
    }
  };

  const handleChangeQuizSelect = (event: SelectChangeEvent) => {
    if (!quizzes) return;
    setQuizSelected(quizzes.find(quiz => quiz.id === event.target.value)!);
  };

  if (!user?.result) {
    return (
      <div className={styles.profile__main_3}>
        <Skeleton variant="rectangular" height={450} />
      </div>
    );
  }

  return (
    <div className={styles.profile__main_3}>
      <div className={styles.statistic__form}>
        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
          <InputLabel>Group select</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={groupSelected.id}
            onChange={handleChangeGroupSelect}
            label="Group select"
          >
            <MenuItem value={0} key={0}>
              No group
            </MenuItem>

            {user.result.groups.map(group => (
              <MenuItem value={group.id} key={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
          <InputLabel>Quiz select</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={quizSelected ? quizSelected.id : ""}
            onChange={handleChangeQuizSelect}
            label="Quiz select"
          >
            {quizzes?.map(quiz => (
              <MenuItem value={quiz.id} key={quiz.id}>
                {quiz.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.statistic__line}>
        {quizSelected?.QuizResult && <Line quizResult={quizSelected?.QuizResult} />}
      </div>
      {!quizzes && <div className="blur">No data yet</div>}
    </div>
  );
};
