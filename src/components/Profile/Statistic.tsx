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

import { PersonQuizHistory } from "./PersonQuizHistory";
import { StatisticMain } from "./StatisticMain";
import { TGroupStatisticSelect, TQuizResultSelect, TQuizStatisticSelect } from "@/utils/lib/@types";
import { groupBy } from "@/utils/lib/helpers";
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
  const [people, setPeople] = useState<Partial<Record<string, TQuizResultSelect[]>> | null>(null);
  const [personSelected, setPersonSelected] = useState<TQuizResultSelect[] | null>(null);

  const { data: user } = useQuery({
    queryKey: ["user", session?.user.id],
    queryFn: () => UserService.getUser(session?.user.id),
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    if (!user?.result) return;
    setQuizzes(user.result.quiz.filter(quiz => quiz.quizResult.length > 0 && !quiz.groupId));
    setQuizSelected(
      user.result.quiz.find(quiz => quiz.quizResult.length > 0 && !quiz.groupId) || null,
    );
    setPeople(null);
    setPersonSelected(null);
  }, [user]);

  const handleChangeGroupSelect = (event: SelectChangeEvent) => {
    if (!user) return;

    if (+event.target.value === 0) {
      setGroupSelected(defaultGroup);
      setQuizzes(user.result.quiz.filter(quiz => quiz.quizResult.length > 0 && !quiz.groupId));
      setQuizSelected(
        user.result.quiz.find(quiz => quiz.quizResult.length > 0 && !quiz.groupId) || null,
      );
      setPeople(null);
      setPersonSelected(null);
    } else {
      setGroupSelected(user.result.groups.find(group => group.id === event.target.value)!);
      setQuizzes(user.result.quiz.filter(quiz => quiz.groupId === event.target.value));
      setQuizSelected(user.result.quiz.find(quiz => quiz.groupId === event.target.value) || null);
      setPeople(null);
      setPersonSelected(null);
    }
  };

  const handleChangeQuizSelect = (event: SelectChangeEvent) => {
    if (!quizzes) return;
    setQuizSelected(quizzes.find(quiz => quiz.id === event.target.value)!);
  };

  useEffect(() => {
    if (!quizSelected) return;
    const users = groupBy(quizSelected.quizResult, ({ user }) => user.fullName);
    if (!users) return;
    setPeople(users);
  }, [quizSelected]);

  const handleChangePersonSelect = (event: SelectChangeEvent) => {
    if (!people) return;
    if (+event.target.value === 0) {
      setPersonSelected(null);
    } else {
      const person = people[event.target.value];

      setPersonSelected(person ? person : null);
    }
  };

  if (!user?.result) {
    return (
      <div className={styles.profile__main_3}>
        <Skeleton variant="rectangular" height={132} style={{ marginBottom: "20px" }} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  return (
    <div className={styles.profile__main_3}>
      <div className={styles.statistic__form}>
        <FormControl variant="standard" sx={{ m: 1 }}>
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

        <FormControl variant="standard" sx={{ m: 1 }}>
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

        <FormControl variant="standard" sx={{ m: 1 }}>
          <InputLabel>Person select</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={personSelected ? personSelected[0].user.fullName : ""}
            onChange={handleChangePersonSelect}
            label="Person select"
          >
            <MenuItem value={0} key={0}>
              All users
            </MenuItem>

            {people &&
              Object.keys(people)?.map(person => (
                <MenuItem value={person} key={person}>
                  {person}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {quizSelected && quizSelected.quizResult.length > 0 ? (
        <>
          <div className={styles.statistic__main}>
            <StatisticMain quizResult={personSelected ? personSelected : quizSelected.quizResult} />
            <div className={styles.statistic__lines}>
              {quizSelected?.quizResult && (
                <Line quizResult={personSelected ? personSelected : quizSelected.quizResult} />
              )}
            </div>
          </div>
          <PersonQuizHistory
            personSelected={
              personSelected
                ? personSelected
                : people
                  ? (Object.values(people).flat() as TQuizResultSelect[])
                  : null
            }
          />
        </>
      ) : (
        <div className="blur" style={{ borderRadius: "10px" }}>
          No data yet
        </div>
      )}
    </div>
  );
};
