"use client";

import TextField from "@mui/material/TextField";
import { AccessTypeForGroup } from "@prisma/client";
import { clsx } from "clsx";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/CreateQuiz.module.scss";

type GroupAccessProp = {
  errors: any;
  register: any;
  accessType: AccessTypeForGroup;
  setAccessType: (value: AccessTypeForGroup) => void;
};

export const GroupAccess: React.FC<GroupAccessProp> = ({
  errors,
  register,
  accessType,
  setAccessType,
}: GroupAccessProp) => {
  return (
    <div className={styles.right}>
      <div className={styles.right__subtitle_mar}>Access type</div>

      <div className={styles.right__list}>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForGroup.Public_access_code,
          })}
          onClick={() => setAccessType(AccessTypeForGroup.Public_access_code)}
        >
          {ICONS.Private()}
          <div>Public access code</div>
        </button>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForGroup.Public,
          })}
          onClick={() => setAccessType(AccessTypeForGroup.Public)}
        >
          {ICONS.Planet()}
          <div>Public</div>
        </button>
      </div>

      <div
        className={clsx(styles.right__info, {
          [styles.marginButtonZero]: accessType === AccessTypeForGroup.Public,
        })}
      >
        {ICONS.Information()}
        <div>
          {accessType === AccessTypeForGroup.Public_access_code
            ? "Anyone who has access code will be able to join the group"
            : "Anyone will be able to join the group"}
        </div>
      </div>
      <div className={`${styles.form}`}>
        {accessType === AccessTypeForGroup.Public_access_code && (
          <>
            <div className={styles.right__subtitle}>Access code</div>
            <TextField
              error={Boolean(errors.accessCode?.message)}
              label={errors.accessCode?.message || "Insert group access code"}
              {...register("accessCode")}
              fullWidth
              type="password"
              variant="standard"
            />
          </>
        )}
      </div>
    </div>
  );
};
