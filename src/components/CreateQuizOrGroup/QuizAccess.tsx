"use client";
import Create from "@/../public/Create.svg";
import Exist from "@/../public/Exist.svg";
import Group from "@/../public/Group.svg";
import Information from "@/../public/Information.svg";
import Person from "@/../public/Person.svg";
import Planet from "@/../public/Planet.svg";
import Private from "@/../public/Private.svg";
import { CreateQuizType } from "@/app/CreateQuiz/page";
import styles from "@/styles/CreateQuiz.module.scss";
import { useQuizAccess } from "@/utils/hooks/useQuizAccess";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AccessTypeForQuiz } from "@prisma/client";
import { clsx } from "clsx";
import Image from "next/image";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import Modal from "../UI/Modal/Modal";

type QuizAccessProp = {
  accessType: AccessTypeForQuiz;
  setAccessType: (value: AccessTypeForQuiz) => void;
  register: UseFormRegister<CreateQuizType>;
  errors: FieldErrors<CreateQuizType>;
  control: Control<CreateQuizType>;
  setValue: UseFormSetValue<CreateQuizType>;
};

const QuizAccess: React.FC<QuizAccessProp> = ({
  accessType,
  setAccessType,
  register,
  errors,
  control,
  setValue,
}: QuizAccessProp) => {
  const {
    selectGroupId,
    createGroupSectionModalActive,
    setCreateGroupSectionModalActive,
    inputRef,
    groups,
    createSectionName,
  } = useQuizAccess(control, setValue);

  return (
    <div className={styles.right}>
      <Modal
        active={createGroupSectionModalActive}
        setActive={setCreateGroupSectionModalActive}
        maxDivWidth="600px"
      >
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>Section</h2>

          <TextField
            inputRef={inputRef}
            label="Insert section name"
            fullWidth
            variant="standard"
            sx={{
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
              "& .MuiInput-root:before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-root:after": {
                borderBottomColor: "white",
              },
              ".MuiInput-root:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
            }}
          />
        </div>
        <div className={styles.modal__buttons}>
          <button
            type="button"
            className={styles.modal__button__cancel}
            onClick={() => setCreateGroupSectionModalActive(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.modal__button__activate}
            onClick={createSectionName}
          >
            Create
          </button>
        </div>
      </Modal>

      <div className={styles.right__subtitle_mar}>Access type</div>
      <div className={styles.right__list}>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForQuiz.Private,
          })}
          onClick={() => setAccessType(AccessTypeForQuiz.Private)}
        >
          <Image src={Person.src} alt="Icon" width={30} height={30} />
          <div>Private</div>
        </button>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForQuiz.Public_access_code,
          })}
          onClick={() => setAccessType(AccessTypeForQuiz.Public_access_code)}
        >
          <Image src={Private.src} alt="Icon" width={30} height={30} />
          <div>Public access code</div>
        </button>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForQuiz.Public,
          })}
          onClick={() => setAccessType(AccessTypeForQuiz.Public)}
        >
          <Image src={Planet.src} alt="Icon" width={30} height={30} />
          <div>Public</div>
        </button>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForQuiz.Group,
          })}
          onClick={() => setAccessType(AccessTypeForQuiz.Group)}
        >
          <Image src={Group.src} alt="Icon" width={30} height={30} />
          <div>Group</div>
        </button>
      </div>

      <div
        className={clsx(styles.right__info, {
          [styles.marginButtonZero]: accessType === AccessTypeForQuiz.Public,
        })}
      >
        <Image src={Information.src} alt="Icon" width={25} height={25} />

        <div>
          {accessType === AccessTypeForQuiz.Private
            ? "Only you will be able to take the quiz"
            : accessType === AccessTypeForQuiz.Public_access_code
            ? "Quiz access will be possible only with an individual access code"
            : accessType === AccessTypeForQuiz.Public
            ? "Anyone will be able to take the quiz"
            : "The quiz will only be available only to members of your group"}
        </div>
      </div>
      <div className={`${styles.form}`}>
        {accessType === AccessTypeForQuiz.Public_access_code && (
          <>
            <div className={styles.right__subtitle}>Access code</div>
            <TextField
              fullWidth
              error={Boolean(errors.accessCode?.message)}
              label={errors.accessCode?.message || "Insert quiz access code"}
              {...register("accessCode")}
              type="password"
              variant="standard"
            />
          </>
        )}
        {accessType === AccessTypeForQuiz.Group && (
          <>
            <div className={styles.right__subtitle}>Group</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel>Select group</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field}>
                    {groups?.result?.map(group => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name="groupId"
                control={control}
                defaultValue={groups?.result?.[0]?.id || ""}
              />
            </FormControl>
            <div className={`${styles.right__subtitle_mar} ${styles.marginTopMid}`}>
              Group section
            </div>
            <div className={`${styles.right__list} ${styles.marginBot}`}>
              <button
                type="button"
                className={clsx(styles.right__item, styles.right__item__active)}
              >
                <Image src={Exist.src} alt="Icon" width={30} height={30} />
                <div>Exist</div>
              </button>

              <button
                type="button"
                className={styles.right__item}
                onClick={() => setCreateGroupSectionModalActive(true)}
              >
                <Image src={Create.src} alt="Icon" width={30} height={30} />
                <div>Create</div>
              </button>
            </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel>{errors?.sectionId?.message || "Select group section "}</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} error={!!errors?.sectionId?.message}>
                    {groups?.result
                      ?.find(data => data.id === selectGroupId)
                      ?.sections?.map(section => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
                name="sectionId"
                control={control}
                defaultValue={""}
              />
            </FormControl>
          </>
        )}

        <div className={`${styles.right__subtitle} ${styles.marginTop}`}>
          Attempts per respondent
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
          <InputLabel>Select attempts count</InputLabel>
          <Controller
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={555}>Infinity</MenuItem>
              </Select>
            )}
            name={"attempts"}
            control={control}
            defaultValue={1}
          />
        </FormControl>
      </div>
    </div>
  );
};
export default QuizAccess;
