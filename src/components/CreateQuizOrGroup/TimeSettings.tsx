import styles from "@/styles/CreateQuiz.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const TimeSettings: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [check, setCheck] = useState<string>("Lack");
  const [check2, setCheck2] = useState<string>("Lack");
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleHoursChange = (event: Event, value: number | number[], activeThumb: number) => {
    setHours(value as number);
  };

  const handleMinutesChange = (event: Event, value: number | number[], activeThumb: number) => {
    setMinutes(value as number);
  };

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  function valuetext2(value: number) {
    return `${value}`;
  }

  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handlerChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(event.target.value);
  };

  const handlerChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck2(event.target.value);
  };

  return (
    <div className={styles.right}>
      <div className={styles.right__subtitle_mar}>Quiz duration</div>
      <form action="#" className={`${styles.form}`} onSubmit={handleSubmit}>
        <RadioGroup value={check} onChange={handlerChange2} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
          <FormControlLabel value="Lack" control={<Radio />} label="Lack" />
          <FormControlLabel value="Select" control={<Radio />} label="Select" />
        </RadioGroup>

        {check === "Select" && (
          <>
            <div className={`${styles.form__ranges}`}>
              <div className={`${styles.form__range}`}>
                <label htmlFor="Hours">Hours</label>
                <div>
                  <Slider aria-label="Temperature" id="Hours" name="Hours" getAriaValueText={valuetext} valueLabelDisplay="auto" defaultValue={0} min={0} max={23} onChange={handleHoursChange} />
                </div>
              </div>
              <div className={`${styles.form__range}`}>
                <label htmlFor="Minutes">Minutes</label>
                <div>
                  <Slider
                    aria-label="Temperature"
                    id="Minutes"
                    name="Minutes"
                    getAriaValueText={valuetext2}
                    valueLabelDisplay="auto"
                    defaultValue={0}
                    min={0}
                    max={59}
                    onChange={handleMinutesChange}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.form__range__view}`}>
              {formatTime(hours)}:{formatTime(minutes)}
            </div>
          </>
        )}

        <div className={`${styles.right__subtitle_mar} ${styles.marginTop}`}>Quiz deadline</div>
        <RadioGroup value={check2} onChange={handlerChange3} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
          <FormControlLabel value="Lack" control={<Radio />} label="Lack" />
          <FormControlLabel value="Select" control={<Radio />} label="Select" />
        </RadioGroup>
        {check2 === "Select" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={styles.marginTopLit}
              sx={{
                svg: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    borderBottomColor: "rgba(54, 169, 184, 1)",
                    borderBottomWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(0, 225, 255)",
                    borderBottomWidth: "3px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(0, 225, 255)",
                    borderBottomWidth: "3px",
                  },
                },
              }}
              label="Select deadline date"
              value={value}
              onChange={newValue => setValue(newValue)}
            />
          </LocalizationProvider>
        )}
        <br />
        <button type="submit" className={styles.button__save}>
          Save
        </button>
      </form>
    </div>
  );
};
export default TimeSettings;
