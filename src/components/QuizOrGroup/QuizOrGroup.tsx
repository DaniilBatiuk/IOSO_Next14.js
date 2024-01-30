"use client";
import styles from "@/styles/Quiz.module.scss";
import { addNewMember } from "@/utils/lib/actions/membersActions";
import { AllGroups } from "@/utils/lib/types/index";
import { AccessTypeForGroup, Quiz } from "@prisma/client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal";

type QuizOrGroupProp = {
  group?: AllGroups;
  quiz?: Quiz;
  userId: string | undefined;
};

const QuizOrGroup: React.FC<QuizOrGroupProp> = ({ group, quiz, userId }: QuizOrGroupProp) => {
  const [activeModal, setActiveModal] = useState(false);
  const { data: session } = useSession();
  const CheckCanIView =
    (group && group.creator.id === userId) ||
    (group && userId && group.members.some(member => member.userId === userId));

  const joinGroup = async () => {
    if (session === null) {
      toast.error("You have to register to join the group");
      return;
    }

    if (group?.id !== undefined && session !== null) {
      const error = await addNewMember(group?.id, session?.user.id);
      error ? toast.error(error) : toast.success("You have successfully joined the group.");
    }
  };

  return (
    <div
      className={clsx(styles.quiz__item, {
        [styles.quiz__item__active]: group?.accessType === AccessTypeForGroup.Public,
        [styles.quiz__item__key]: group?.accessType === AccessTypeForGroup.Public_access_code,
      })}
    >
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>Quiz</h2>
          <div className={styles.modal__text}>Attempts left: 2</div>
        </div>
        <div className={styles.modal__buttons}>
          <button className={styles.modal__button__cancel} onClick={() => setActiveModal(false)}>
            Cancel
          </button>
          <button className={styles.modal__button__activate}>{group ? "Join" : "Quiz"}</button>
        </div>
      </Modal>
      <div className={styles.quiz__item_head}>
        <div className={styles.quiz__item_head_left}>
          <div
            className={clsx(styles.quiz__item_status, {
              [styles.quiz__item_status_active]: group?.accessType === AccessTypeForGroup.Public,
              [styles.quiz__item_status_key]:
                group?.accessType === AccessTypeForGroup.Public_access_code,
            })}
          >
            {group?.accessType === AccessTypeForGroup.Public ? "Available" : "Access key"}
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

        <button
          className={styles.quiz__item_button}
          onClick={e => {
            if (quiz) {
              e.stopPropagation();
              setActiveModal(true);
            } else {
              if (!CheckCanIView) {
                joinGroup();
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
