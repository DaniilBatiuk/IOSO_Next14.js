"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { LINKS } from "@/utils/config/links";

import styles from "@/styles/Profile.module.scss";

type ButtonsNewProp = {
  id: string;
};
export const ButtonsNew: React.FC<ButtonsNewProp> = ({ id }: ButtonsNewProp) => {
  const { data: session } = useSession();

  return (
    <div className={styles.info__result}>
      {session?.user.id === id && (
        <>
          <button className={styles.button__save}>
            <Link href={LINKS.CreateQuiz}>New quiz</Link>
          </button>
          <button className={styles.button__save}>
            <Link href={LINKS.CreateGroup}>New group</Link>
          </button>
        </>
      )}
    </div>
  );
};
