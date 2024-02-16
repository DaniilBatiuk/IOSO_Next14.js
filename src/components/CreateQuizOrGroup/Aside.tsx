"use client";

import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/CreateQuiz.module.scss";

type AsideProp = {
  menuActive: boolean;
  setMenuActive: Dispatch<SetStateAction<boolean>>;
  active: number;
  setActive: (value: number) => void;
  isSubmitting: boolean;
  canUpdateQuestionsManager: boolean;
};

export const Aside: React.FC<AsideProp> = ({
  menuActive,
  setMenuActive,
  active,
  setActive,
  isSubmitting,
  canUpdateQuestionsManager,
}: AsideProp) => {
  return (
    <aside className={!menuActive ? styles.create__body__active : styles.create__body}>
      <div className={styles.create__body__inside}>
        <div className={styles.create__title}>
          Quiz configuration
          {!menuActive && ICONS.close2({ onClick: () => setMenuActive(prev => !prev) })}
        </div>
        <div className={styles.create__list}>
          <button
            type="button"
            onClick={() => {
              setActive(0);
              if (!menuActive) setMenuActive(prev => !prev);
            }}
            className={clsx(styles.create__item, {
              [styles.create__item_active]: active === 0,
            })}
          >
            {ICONS.basicSettings()}
            <div className={styles.create__text}>Basic settings</div>
          </button>
          {canUpdateQuestionsManager && (
            <button
              type="button"
              onClick={() => {
                setActive(1);
                if (!menuActive) setMenuActive(prev => !prev);
              }}
              className={clsx(styles.create__item, {
                [styles.create__item_active]: active === 1,
              })}
            >
              {ICONS.QuestionsManager()}
              <div className={styles.create__text}>Questions manager</div>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setActive(2);
              if (!menuActive) setMenuActive(prev => !prev);
            }}
            className={clsx(styles.create__item, {
              [styles.create__item_active]: active === 2,
            })}
          >
            {ICONS.GroupAccess()}
            <div className={styles.create__text}>Quiz access</div>
          </button>
          <button
            type="button"
            onClick={() => {
              setActive(3);
              if (!menuActive) setMenuActive(prev => !prev);
            }}
            className={clsx(styles.create__item, {
              [styles.create__item_active]: active === 3,
            })}
          >
            {ICONS.TimeSettings()}
            <div className={styles.create__text}>Restriction settings</div>
          </button>
        </div>
        <div className={styles.create__buttons}>
          <button type="submit" className={styles.create__button__save}>
            {isSubmitting ? "Save changes..." : "Save changes"}
          </button>
        </div>
      </div>
    </aside>
  );
};
