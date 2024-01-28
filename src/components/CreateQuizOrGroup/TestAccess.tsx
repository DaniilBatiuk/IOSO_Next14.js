"use client";
import Create from "@/../public/Create.svg";
import Exist from "@/../public/Exist.svg";
import Group from "@/../public/Group.svg";
import Information from "@/../public/Information.svg";
import Person from "@/../public/Person.svg";
import Planet from "@/../public/Planet.svg";
import Private from "@/../public/Private.svg";
import styles from "@/styles/CreateQuiz.module.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { clsx } from "clsx";
import Image from "next/image";
import { useState } from "react";

type TestAccessProp = {
  type: string;
};

const TestAccess: React.FC<TestAccessProp> = ({ type }: TestAccessProp) => {
  const [accessActive, setAccessActive] = useState<number>(0);
  const [groupSectionActive, setGroupSectionActive] = useState<number>(0);
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className={styles.right}>
      <div className={styles.right__subtitle_mar}>Access type</div>
      <div className={styles.right__list}>
        <button
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessActive === 0,
          })}
          onClick={() => setAccessActive(0)}
        >
          <Image src={Person.src} alt="Icon" width={30} height={30} />
          <div>Private</div>
        </button>
        <button
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessActive === 1,
          })}
          onClick={() => setAccessActive(1)}
        >
          <Image src={Private.src} alt="Icon" width={30} height={30} />
          <div>Public access code</div>
        </button>
        <button
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessActive === 2,
          })}
          onClick={() => setAccessActive(2)}
        >
          <Image src={Planet.src} alt="Icon" width={30} height={30} />
          <div>Public</div>
        </button>
        <button
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessActive === 3,
          })}
          onClick={() => setAccessActive(3)}
        >
          <Image src={Group.src} alt="Icon" width={30} height={30} />
          <div>Group</div>
        </button>
      </div>

      <div className={clsx(styles.right__info, { [styles.marginButtonZero]: accessActive === 2 })}>
        <Image src={Information.src} alt="Icon" width={25} height={25} />

        <div>
          {accessActive === 0
            ? "Only you will be able to take the quiz"
            : accessActive === 1
            ? "Quiz access will be possible only with an individual access code"
            : accessActive === 2
            ? "Anyone will be able to take the quiz"
            : "The quiz will only be available only to members of your group"}
        </div>
      </div>
      <div className={`${styles.form}`}>
        {accessActive === 1 && (
          <>
            <div className={styles.right__subtitle}>Access code</div>
            <TextField
              fullWidth
              id="standard-basic"
              type="password"
              label="Insert quiz access code"
              variant="standard"
            />
          </>
        )}
        {accessActive === 3 && (
          <>
            <div className={styles.right__subtitle}>Group</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel id="demo-simple-select-standard-label">Select group</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>3</MenuItem>
                <MenuItem value={10}>3</MenuItem>
                <MenuItem value={"Infinity"}>Infinity</MenuItem>
              </Select>
            </FormControl>
            <div className={`${styles.right__subtitle_mar} ${styles.marginTopMid}`}>
              Group section
            </div>
            <div className={`${styles.right__list} ${styles.marginBot}`}>
              <button
                type="button"
                className={clsx(styles.right__item, {
                  [styles.right__item__active]: groupSectionActive === 0,
                })}
                onClick={() => setGroupSectionActive(0)}
              >
                <Image src={Exist.src} alt="Icon" width={30} height={30} />
                <div>Exist</div>
              </button>
              <button
                type="button"
                className={clsx(styles.right__item, {
                  [styles.right__item__active]: groupSectionActive === 1,
                })}
                onClick={() => setGroupSectionActive(1)}
              >
                <Image src={Create.src} alt="Icon" width={30} height={30} />
                <div>Create</div>
              </button>
            </div>
            {groupSectionActive === 0 ? (
              <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
                <InputLabel id="demo-simple-select-standard-label">Select group section</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>3</MenuItem>
                  <MenuItem value={10}>3</MenuItem>
                  <MenuItem value={"Infinity"}>Infinity</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Insert group section name"
                  variant="standard"
                />

                <button className={styles.button__create}>Create</button>
              </>
            )}
          </>
        )}

        {type === "quiz" && (
          <>
            <div className={`${styles.right__subtitle} ${styles.marginTop}`}>
              Attempts per respondent
            </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel id="demo-simple-select-standard-label">Select attempts count</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>3</MenuItem>
                <MenuItem value={10}>3</MenuItem>
                <MenuItem value={"Infinity"}>Infinity</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        {/* <button type="submit" className={styles.button__save}>
          Save
        </button> */}
      </div>
    </div>
  );
};
export default TestAccess;
