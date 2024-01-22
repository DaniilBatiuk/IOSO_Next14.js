"use client";
import styles from "@/styles/Quiz.module.scss";
import clsx from "clsx";
import { useState } from "react";
import Modal from "../UI/Modal/Modal";
import { useRouter } from "next/navigation";

type QuizOrGroupProp = {
  status: string;
  buttonText: string;
  type: string;
};

const QuizOrGroup: React.FC<QuizOrGroupProp> = ({ status, buttonText, type }: QuizOrGroupProp) => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(false);

  const handleRedirect = () => {
    if (buttonText === "Activate") {
      router.push("/UpdateQuiz/1");
    }
  };

  return (
    <div
      onClick={handleRedirect}
      className={clsx(styles.quiz__item, {
        [styles.quiz__item__active]:
          status === "Active" || status === "Available" || status === "Participant",
        [styles.quiz__item__ended]: status === "Ended",
        [styles.quiz__item__progress]: status === "In progress" || status === "Manager",
        [styles.quiz__item__key]: status === "Access key",
        [styles.quiz__item__link]: buttonText === "Activate",
      })}
    >
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>
            {buttonText === "Activate"
              ? "Activate the quiz?"
              : buttonText === "Quiz"
              ? "Pass the quiz?"
              : "Leave the group?"}
          </h2>
          <div className={styles.modal__text}>
            {buttonText === "Activate"
              ? "You will be able to pass the quiz after activation"
              : buttonText === "Quiz"
              ? "Attempts left: 2"
              : "You will be removed from the group"}
          </div>
        </div>
        <div className={styles.modal__buttons}>
          <button className={styles.modal__button__cancel} onClick={() => setActiveModal(false)}>
            Cancel
          </button>
          <button
            className={
              buttonText === "View" ? styles.modal__button__leave : styles.modal__button__activate
            }
          >
            {buttonText === "View" ? "Leave" : buttonText}
          </button>
        </div>
      </Modal>
      <div className={styles.quiz__item_head}>
        <div className={styles.quiz__item_head_left}>
          <div
            className={clsx(styles.quiz__item_status, {
              [styles.quiz__item_status_active]:
                status === "Active" || status === "Available" || status === "Participant",
              [styles.quiz__item_status_ended]: status === "Ended",
              [styles.quiz__item_status_progress]: status === "In progress" || status === "Manager",
              [styles.quiz__item_status_key]: status === "Access key",
            })}
          >
            {status}
          </div>
        </div>
        <div className={styles.quiz__item_deadline}>
          {type === "quiz" ? "Deadline: 2024-1-03" : "Daniil Batiuk"}
        </div>
      </div>
      <div className={styles.quiz__item_title}>Add Two Numbers Add Two Numbers</div>
      <div className={styles.quiz__item_bottom}>
        <div className={styles.quiz__item_question}>
          {type === "quiz" ? "10 Questions" : "10 Participants"}
        </div>
        {buttonText !== "View" ? (
          <button
            className={styles.quiz__item_button}
            onClick={e => {
              if (buttonText !== "Join") {
                e.stopPropagation();
                setActiveModal(true);
              }
            }}
          >
            {buttonText}
          </button>
        ) : (
          <div className={styles.quiz__item_group_button}>
            <button className={styles.quiz__item_button}>{buttonText}</button>
            <button className={styles.quiz__item_button_right} onClick={() => setActiveModal(true)}>
              Leave
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default QuizOrGroup;
