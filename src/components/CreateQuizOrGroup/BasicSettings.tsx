"use client";
import styles from "@/styles/CreateQuiz.module.scss";
import TextField from "@mui/material/TextField";

type BasicSettingsProp = {
  label: string;
  errors: any;
  register: any;
};

export const BasicSettings: React.FC<BasicSettingsProp> = ({
  label,
  errors,
  register,
}: BasicSettingsProp) => {
  return (
    <div className={styles.right}>
      <div className={styles.right__subtitle}>Initial settings</div>
      <div className={`${styles.form}`}>
        <TextField
          error={Boolean(errors.name?.message)}
          label={errors.name?.message || label}
          {...register("name")}
          fullWidth
          id="standard-basic"
          variant="standard"
        />
      </div>
    </div>
  );
};
