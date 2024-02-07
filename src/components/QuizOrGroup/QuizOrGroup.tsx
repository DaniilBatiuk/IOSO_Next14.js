"use client";
import styles from "@/styles/Quiz.module.scss";
import { addNewMember } from "@/utils/lib/actions/membersActions";
import { AllGroups, MyQuiz } from "@/utils/lib/types/index";
import { TextField } from "@mui/material";
import { AccessTypeForGroup, AccessTypeForQuiz } from "@prisma/client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal";
import { ThemeWrapper } from "../Wrappers/ThemeWrapper";

type QuizOrGroupProp = {
  group?: AllGroups;
  quiz?: MyQuiz;
  userId: string | undefined;
};

const QuizOrGroup: React.FC<QuizOrGroupProp> = ({ group, quiz, userId }: QuizOrGroupProp) => {
  const [activeModal, setActiveModal] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const inputRef = useRef<HTMLInputElement>();
  const { data: session } = useSession();
  const router = useRouter();

  const CheckCanIView =
    (group && group.creator.id === userId) ||
    (group && userId && group.members.some(member => member.userId === userId));

  const joinGroup = async () => {
    if (session === null) {
      toast.error("You have to register to join the group");
      return;
    }

    if (group?.id && session) {
      const error = await addNewMember(group?.id, session?.user.id);

      if (error) {
        toast.error(error);
      } else {
        toast.success("You have successfully joined the group.");
        router.push(`/Group/${group.id}`);
      }
    }
  };

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const checkPassword = () => {
    if (group) {
      inputRef?.current?.value === group.accessCode ? joinGroup() : setPasswordCorrect(false);
    } else if (quiz) {
      inputRef?.current?.value === quiz.accessCode
        ? toast.success("Password correct.")
        : setPasswordCorrect(false);
    }
  };

  return (
    <div
      className={clsx(styles.quiz__item, {
        [styles.quiz__item__active]:
          group?.accessType === AccessTypeForGroup.Public ||
          quiz?.accessType === AccessTypeForQuiz.Public,
        [styles.quiz__item__key]:
          group?.accessType === AccessTypeForGroup.Public_access_code ||
          quiz?.accessType === AccessTypeForQuiz.Public_access_code,
      })}
    >
      <ThemeWrapper>
        <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
          <div className={styles.modal__head}>
            <h2 className={styles.modal__title}>{quiz ? "Quiz" : "Group"}</h2>
            {quiz && quiz.accessType === AccessTypeForQuiz.Public ? (
              <>
                <div className={styles.modal__text}>
                  Attempts left: {quiz?.attempts || "Infinity"}
                </div>
                <div className={styles.modal__text}>
                  Quiz duration:{" "}
                  {quiz.duration
                    ? formatTime(new Date(quiz?.duration).getHours()) +
                      ":" +
                      formatTime(new Date(quiz?.duration).getMinutes())
                    : "Infinity"}
                </div>
              </>
            ) : (
              <TextField
                inputRef={inputRef}
                error={!passwordCorrect}
                label={passwordCorrect ? "Insert password" : "Incorrect password"}
                fullWidth
                variant="standard"
                type="password"
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
            )}
          </div>
          <div className={styles.modal__buttons}>
            <button className={styles.modal__button__cancel} onClick={() => setActiveModal(false)}>
              Cancel
            </button>
            <button className={styles.modal__button__activate} onClick={checkPassword}>
              {group ? "Join" : "Quiz"}
            </button>
          </div>
        </Modal>
      </ThemeWrapper>
      <div className={styles.quiz__item_head}>
        <div className={styles.quiz__item_head_left}>
          <div
            className={clsx(styles.quiz__item_status, {
              [styles.quiz__item_status_active]:
                group?.accessType === AccessTypeForGroup.Public ||
                quiz?.accessType === AccessTypeForGroup.Public,
              [styles.quiz__item_status_key]:
                group?.accessType === AccessTypeForGroup.Public_access_code ||
                quiz?.accessType === AccessTypeForGroup.Public_access_code,
            })}
          >
            {group
              ? group?.accessType === AccessTypeForGroup.Public
                ? "Available"
                : "Access key"
              : quiz?.accessType === AccessTypeForQuiz.Public
              ? "Available"
              : "Access key"}
          </div>
        </div>
        <div className={styles.quiz__item_deadline}>
          {quiz && quiz.deadline
            ? new Date(quiz?.deadline)?.toLocaleDateString()
            : group?.creator.fullName}
        </div>
      </div>
      <div className={styles.quiz__item_title}>{group ? group.name : quiz?.name}</div>
      <div className={styles.quiz__item_bottom}>
        <div className={styles.quiz__item_question}>
          {quiz ? `${quiz.questions?.length} Questions` : `${group?.members.length} Participants`}
        </div>

        <button
          className={styles.quiz__item_button}
          onClick={e => {
            if (quiz) {
              e.stopPropagation();
              setActiveModal(true);
            } else {
              if (!CheckCanIView) {
                group?.accessType === AccessTypeForGroup.Public
                  ? joinGroup()
                  : setActiveModal(true);
              }
            }
          }}
        >
          {CheckCanIView ? <Link href={`/Group/${group?.id}`}>View</Link> : group ? "Join" : "Quiz"}
        </button>
      </div>
    </div>
  );
};
export default QuizOrGroup;
