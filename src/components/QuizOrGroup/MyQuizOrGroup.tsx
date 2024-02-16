"use client";

import { Modal } from "..";
import { MemberStatus, QuizStatus } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import styles from "@/styles/Quiz.module.scss";

import { AllGroups, MyQuiz } from "@/utils/lib/@types";
import { removeGroup, removeMember, updateQuizStatus } from "@/utils/lib/actions";
import { formatTime } from "@/utils/lib/helpers";

type MyQuizOrGroupProp = {
  group?: AllGroups;
  quiz?: MyQuiz;
  id: string;
};

export const MyQuizOrGroup: React.FC<MyQuizOrGroupProp> = ({
  group,
  quiz,
  id,
}: MyQuizOrGroupProp) => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(false);
  const [activeModal2, setActiveModal2] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const handleRedirect = () => {
    if (quiz?.status === QuizStatus.In_progress) {
      router.push(`/UpdateQuiz/${quiz?.id}`);
    }
  };

  const deactivateHandler = async () => {
    if (quiz) {
      const error = await updateQuizStatus(quiz.id, QuizStatus.In_progress);
      if (error) {
        toast.error(error);
      } else {
        toast.success("You successfully deactivated the quiz.");

        await queryClient.refetchQueries({
          queryKey: ["myQuizzes"],
          type: "active",
          exact: true,
        });
      }
    }
  };

  const confirmHandler = async () => {
    let error = null;

    if (quiz) {
      error = await updateQuizStatus(quiz.id, QuizStatus.Active);
      if (error) {
        toast.error(error);
      } else {
        setActiveModal(false);
        toast.success("You successfully activated the quiz.");

        await queryClient.refetchQueries({
          queryKey: ["myQuizzes"],
          type: "active",
          exact: true,
        });
      }
    } else {
      if (
        (group?.members?.filter(member => member.status === MemberStatus.Manager)?.length ?? 0) <=
          1 &&
        group?.creator.id === session?.user.id
      ) {
        error = await removeGroup(group!.id);
      } else {
        error = await removeMember(group!.id, session?.user.id);
      }

      if (error) {
        toast.error(error);
      } else {
        setActiveModal(false);
        toast.success("You successfully leaved the group.");

        await queryClient.refetchQueries({
          queryKey: ["myGroups"],
          type: "active",
          exact: true,
        });
      }
    }
  };

  const handleQuiz = () => {
    if (quiz && quiz?.attempts && quiz?.QuizResult.length >= quiz?.attempts) {
      toast.error("You've used up all your attempts.");
    } else {
      router.push(`/QuizPass/${quiz?.id}`);
    }
  };

  return (
    <div
      onClick={handleRedirect}
      className={clsx(styles.quiz__item, {
        [styles.quiz__item__active]:
          (group && id !== group?.creator.id) || (quiz && quiz.status === QuizStatus.Active),
        [styles.quiz__item__ended]: quiz && quiz.status === QuizStatus.Ended,
        [styles.quiz__item__progress]: group?.creator.id === id,
        [styles.quiz__item__progress_quiz]: quiz && quiz.status === QuizStatus.In_progress,
      })}
    >
      <Modal active={activeModal2} setActive={setActiveModal2} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>Quiz</h2>
          <div className={styles.modal__text}>
            Attempts left: {quiz?.attempts ? quiz.attempts - quiz.QuizResult.length : "Infinity"}
          </div>
          <div className={styles.modal__text}>
            Quiz duration:{" "}
            {quiz?.duration
              ? formatTime(new Date(quiz?.duration).getHours()) +
                ":" +
                formatTime(new Date(quiz?.duration).getMinutes())
              : "Infinity"}
          </div>
        </div>
        <div className={styles.modal__buttons}>
          <button className={styles.modal__button__cancel} onClick={() => setActiveModal2(false)}>
            Cancel
          </button>
          <button className={styles.modal__button__activate} onClick={handleQuiz}>
            Quiz
          </button>
        </div>
      </Modal>

      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>
            {quiz ? "Activate the quiz?" : "Leave the group?"}
          </h2>
          <div className={styles.modal__text}>
            {quiz
              ? "You will be able to pass the quiz after activation"
              : (group?.members?.filter(member => member.status === MemberStatus.Manager)?.length ??
                    0) <= 1 && group?.creator.id === session?.user.id
                ? "Group will be removed"
                : "You will be removed from the group"}
          </div>
        </div>
        <div className={styles.modal__buttons}>
          <button className={styles.modal__button__cancel} onClick={() => setActiveModal(false)}>
            Cancel
          </button>
          <button
            onClick={confirmHandler}
            className={group ? styles.modal__button__leave : styles.modal__button__activate}
          >
            {quiz ? "Activate" : "Leave"}
          </button>
        </div>
      </Modal>
      <div className={styles.quiz__item_head}>
        <div className={styles.quiz__item_head_left}>
          <div
            className={clsx(styles.quiz__item_status, {
              [styles.quiz__item_status_active]:
                (group && id !== group?.creator.id) || (quiz && quiz.status === QuizStatus.Active),
              [styles.quiz__item_status_ended]: quiz && quiz.status === QuizStatus.Ended,
              [styles.quiz__item_status_progress]:
                group?.creator.id === id || (quiz && quiz.status === QuizStatus.In_progress),
            })}
          >
            {group
              ? group.creator.id === id
                ? "Manager"
                : "Participant"
              : quiz?.status === QuizStatus.In_progress
                ? "In progress"
                : quiz?.status === QuizStatus.Active
                  ? "Active"
                  : "Ended"}
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
        {quiz ? (
          quiz.status === QuizStatus.In_progress ? (
            <button
              className={styles.quiz__item_button}
              onClick={e => {
                e.stopPropagation();
                setActiveModal(true);
              }}
            >
              Activate
            </button>
          ) : quiz.status === QuizStatus.Active ? (
            <div className={styles.quiz__item_group_button}>
              <button className={styles.quiz__item_button} onClick={() => setActiveModal2(true)}>
                Quiz
              </button>
              <button className={styles.quiz__item_button_right} onClick={deactivateHandler}>
                Deactivate
              </button>
            </div>
          ) : (
            <>
              <div className={styles.quiz__item_group_button}>
                <button className={styles.quiz__item_button} style={{ visibility: "hidden" }}>
                  Quiz
                </button>
              </div>
            </>
          )
        ) : (
          <div className={styles.quiz__item_group_button}>
            <button className={styles.quiz__item_button}>
              <Link href={`/Group/${group?.id}`}>View</Link>
            </button>
            <button className={styles.quiz__item_button_right} onClick={() => setActiveModal(true)}>
              Leave
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
