"use client";
import styles from "@/styles/Profile.module.scss";
import { Button, ButtonGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import clsx from "clsx";

type SearchFormProp = {
  activeQuiz: boolean;
  setActiveQuiz: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
};

export const SearchForm: React.FC<SearchFormProp> = ({
  activeQuiz,
  setActiveQuiz,
  search,
  setSearch,
  sortOrder,
  setSortOrder,
}: SearchFormProp) => {
  const handlerSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={`${styles.my_quizzes__form}`}>
      <ButtonGroup size="medium" aria-label="medium button group">
        <Button
          className={clsx({ [styles.button__active]: activeQuiz === true })}
          onClick={() => {
            setActiveQuiz(true);
            setSearch("");
            setSortOrder("asc");
          }}
        >
          Quizzes
        </Button>
        <Button
          className={clsx({ [styles.button__active]: activeQuiz === false })}
          onClick={() => {
            setActiveQuiz(false);
            setSearch("");
            setSortOrder("asc");
          }}
        >
          Groups
        </Button>
      </ButtonGroup>

      <div className={`${styles.form}`}>
        <TextField
          label="Find by name"
          variant="standard"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Filter by name</InputLabel>
          <Select value={sortOrder} onChange={handlerSortOrderChange} label="Filter by name">
            <MenuItem value={"asc"}>asc</MenuItem>
            <MenuItem value={"desc"}>desc</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
