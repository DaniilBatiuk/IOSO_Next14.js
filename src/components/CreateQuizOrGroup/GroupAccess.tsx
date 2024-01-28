"use client";
import Information from "@/../public/Information.svg";
import Planet from "@/../public/Planet.svg";
import Private from "@/../public/Private.svg";
import styles from "@/styles/CreateQuiz.module.scss";
import TextField from "@mui/material/TextField";
import { AccessTypeForGroup } from "@prisma/client";
import { clsx } from "clsx";
import Image from "next/image";

type GroupAccessProp = {
  errors: any;
  register: any;
  accessType: AccessTypeForGroup;
  setAccessType: any;
};

const GroupAccess: React.FC<GroupAccessProp> = ({
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
          <Image src={Private.src} alt="Icon" width={30} height={30} />
          <div>Public access code</div>
        </button>
        <button
          type="button"
          className={clsx(styles.right__item, {
            [styles.right__item__active]: accessType === AccessTypeForGroup.Public,
          })}
          onClick={() => setAccessType(AccessTypeForGroup.Public)}
        >
          <Image src={Planet.src} alt="Icon" width={30} height={30} />
          <div>Public</div>
        </button>
      </div>

      <div
        className={clsx(styles.right__info, {
          [styles.marginButtonZero]: accessType === AccessTypeForGroup.Public,
        })}
      >
        <Image src={Information.src} alt="Icon" width={25} height={25} />
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
              label={errors.accessCode?.message || "Insert quiz access code"}
              {...register("accessCode")}
              fullWidth
              id="standard-basic"
              type="password"
              variant="standard"
            />
          </>
        )}
      </div>
    </div>
  );
};
export default GroupAccess;
