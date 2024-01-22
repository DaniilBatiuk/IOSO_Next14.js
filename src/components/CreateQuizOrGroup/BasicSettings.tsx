import styles from "@/styles/CreateQuiz.module.scss";
import TextField from "@mui/material/TextField";

type BasicSettingsProp = {
  label: string;
};

const BasicSettings: React.FC<BasicSettingsProp> = ({ label }: BasicSettingsProp) => {
  return (
    <div className={styles.right}>
      <div className={styles.right__subtitle}>Initial settings</div>
      <form action="#" className={`${styles.form}`}>
        <TextField fullWidth id="standard-basic" label={label} variant="standard" />
        <button type="submit" className={styles.button__save}>
          Save
        </button>
      </form>
    </div>
  );
};
export default BasicSettings;
