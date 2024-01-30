"use client";
import styles from "@/styles/Profile.module.scss";
import { GroupsService } from "@/utils/services/group.service";
import { Button, ButtonGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MyQuizOrGroup from "../QuizOrGroup/MyQuizOrGroup";

const MyQuizzes: React.FC = () => {
  const [age, setAge] = useState("");
  const [activeQuiz, setActiveQuiz] = useState(true);
  const { data: session } = useSession();

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const {
    isPending,
    isError,
    data: groups,
    error,
  } = useQuery({
    queryKey: ["myGroups"],
    queryFn: () => GroupsService.getMyGroups(session?.user.id),
  });

  return (
    <section className={styles.main}>
      <div className={`${styles.my_quizzes__form}`}>
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
          {/* <QuizOrGroup status="Active" buttonText="Activate" type="quiz" />
          <QuizOrGroup status="In progress" buttonText="Activate" type="quiz" />
          <QuizOrGroup status="Ended" buttonText="Activate" type="quiz" /> */}
        </>
      ) : (
        <>
          {groups?.success &&
            session?.user.id !== undefined &&
            groups.result.map((group, index) => (
              <MyQuizOrGroup key={index} group={group} id={session?.user.id} />
            ))}
        </>
      )}
    </section>
  );
};
export default MyQuizzes;
