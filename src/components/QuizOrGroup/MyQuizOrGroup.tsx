"use client";
import styles from "@/styles/Quiz.module.scss";
import { removeGroup } from "@/utils/lib/actions/groupActions";
import { AllGroups } from "@/utils/lib/types/index";
import { Quiz } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal";

type MyQuizOrGroupProp = {
  group?: AllGroups;
  quiz?: Quiz;
  id: string;
};

const MyQuizOrGroup: React.FC<MyQuizOrGroupProp> = ({ group, quiz, id }: MyQuizOrGroupProp) => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(false);
  const queryClient = useQueryClient();

  const handleRedirect = () => {
    // if (buttonText === "Activate") {
    //   router.push("/UpdateQuiz/1");
    // }
  };

  const confirmHandler = async () => {
    if (group?.members.length === 1) {
      console.log("ok");
      const error = await removeGroup(group.id);
      setActiveModal(false);
      if (error) {
        toast.error(error);
      } else {
        toast.success("You successfully removed the group.");

        await queryClient.refetchQueries({
          queryKey: ["myGroups"],
          type: "active",
          exact: true,
        });
      }
    }
  };

  return (
    <div
      onClick={handleRedirect}
      className={clsx(styles.quiz__item, {
        // [styles.quiz__item__active]:
        //   status === "Active"  || status === "Participant",
        [styles.quiz__item__active]: group && id !== group?.creator.id,
        // [styles.quiz__item__ended]: status === "Ended",
        // [styles.quiz__item__progress]: status === "In progress" || group?.creator.id === id,
        [styles.quiz__item__progress]: group?.creator.id === id,
        // [styles.quiz__item__link]: buttonText === "Activate",
      })}
    >
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>
            {quiz ? "Activate the quiz?" : "Leave the group?"}
          </h2>
          <div className={styles.modal__text}>
            {quiz
              ? "You will be able to pass the quiz after activation"
              : group?.members.length === 1
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
              // [styles.quiz__item_status_active]:
              //   status === "Active" || status === "Participant",
              [styles.quiz__item_status_active]: group && id !== group?.creator.id,
              // [styles.quiz__item_status_ended]: status === "Ended",
              // [styles.quiz__item_status_progress]: status === "In progress" || status === "Manager",
              // [styles.quiz__item_status_key]: status === "Access key",
              [styles.quiz__item_status_progress]: group?.creator.id === id,
            })}
          >
            {group?.creator.id === id ? "Manager" : "Participant"}
          </div>
        </div>
        <div className={styles.quiz__item_deadline}>
          {quiz ? quiz.deadline?.toDateString() : group?.creator.fullName}
        </div>
      </div>
      <div className={styles.quiz__item_title}>{group ? group.name : quiz?.name}</div>
      <div className={styles.quiz__item_bottom}>
        <div className={styles.quiz__item_question}>
          {quiz ? "10 Questions" : `${group?.members.length} Participants`}
        </div>
        {quiz ? (
          <button
            className={styles.quiz__item_button}
            onClick={e => {
              e.stopPropagation();
              setActiveModal(true);
            }}
          >
            Activate
          </button>
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
export default MyQuizOrGroup;
