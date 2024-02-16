"use client";

import { Avatar } from "@mui/material";
import { MemberStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import styles from "@/styles/Group.module.scss";

import { formatTime } from "@/utils/lib/helpers/formatTime";
import { stringAvatar } from "@/utils/lib/helpers/stringAvatar";

import { Modal } from "@/components";
import { Group, WrapSuccessType } from "@/utils/lib/@types";

type GroupSectionsProp = {
  group: WrapSuccessType<Group>;
};

export const GroupSections: React.FC<GroupSectionsProp> = ({ group }: GroupSectionsProp) => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(false);

  return (
    <>
      <section className={styles.left}>
        {group.result.sections.length === 0 && (
          <div className={styles.left__no__data}>No data yet</div>
        )}
        {group.result.sections.map((section, index) => (
          <div className={styles.left__section} key={index}>
            <div className={styles.left__section__title}>{section.name}</div>
            <div className={styles.left__section__body}>
              {section.quizzes.map((quiz, index) => (
                <React.Fragment key={index}>
                  <div className={styles.left__section__test} onClick={() => setActiveModal(true)}>
                    <div className={styles.left__section__test__title}>{quiz.name}</div>
                    {/* <Image src={Complete.src} alt="Icon" width={35} height={35} /> */}
                  </div>
                  <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
                    <div className={styles.modal__head}>
                      <h2 className={styles.modal__title}>Pass the quiz?</h2>
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
                    </div>
                    <div className={styles.modal__buttons}>
                      <button
                        className={styles.modal__button__cancel}
                        onClick={() => setActiveModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles.modal__button__activate}
                        onClick={() => router.push(`/QuizPass/${quiz.id}`)}
                      >
                        Quiz
                      </button>
                    </div>
                  </Modal>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.right}>
        <div className={styles.right__item}>
          <div className={styles.right__title}>Summary</div>
          <div className={styles.right__block__text}>
            <div className={styles.right__text}>{group.result.sections.length} sections</div>
            <div className={styles.right__text}>
              {group.result.sections.reduce((acc, section) => {
                return acc + section.quizzes.length;
              }, 0)}{" "}
              quizzes
            </div>
            <div className={styles.right__text}>
              {
                group?.result.members.filter(member => member.status === MemberStatus.Manager)
                  ?.length
              }{" "}
              managers
            </div>
            <div className={styles.right__text}>
              {
                group?.result.members.filter(member => member.status === MemberStatus.Participant)
                  ?.length
              }{" "}
              participants
            </div>
          </div>
        </div>
        <div className={styles.right__item}>
          <div className={styles.right__title}>Participants</div>
          <div className={styles.right__manager}>Managers</div>
          <div className={styles.right__block}>
            {group?.result.members
              .filter(member => member.status === MemberStatus.Manager)
              .slice(0, 24)
              ?.map((manager, index) => (
                <Link href={`/Profile/${manager.user.id}`} key={manager.user.id}>
                  <Avatar {...stringAvatar(manager.user.fullName)} />
                </Link>
              ))}
          </div>
          <div className={styles.right__participants}>Participants</div>
          <div className={styles.right__block}>
            {group?.result.members
              .filter(member => member.status === MemberStatus.Participant)
              .slice(0, 24)
              ?.map((participants, index) => (
                <Link href={`/Profile/${participants.user.id}`} key={participants.user.id}>
                  <Avatar {...stringAvatar(participants.user.fullName)} />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
