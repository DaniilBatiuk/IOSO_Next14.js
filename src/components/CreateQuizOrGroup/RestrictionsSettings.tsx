"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import styles from "@/styles/CreateQuiz.module.scss";

import { CreateQuizType } from "@/utils/lib/validators/create-quiz-validator";

import { useRestrictionsSettings } from "@/utils/hooks";

type RestrictionsSettings = {
  control: Control<CreateQuizType>;
  setValue: UseFormSetValue<CreateQuizType>;
};

const TOMORROW = dayjs().add(1, "day");

export const RestrictionsSettings: React.FC<RestrictionsSettings> = ({
  control,
  setValue,
}: RestrictionsSettings) => {
  const {
    // formatTime,
    handlerSelectDuration,
    handlerSelectDeadline,
    checkDuration,
    checkDeadline,
    // percentagePassWatch,
    // durationWatch,
  } = useRestrictionsSettings(control, setValue);

  return (
    <div className={styles.right}>
      <div className={styles.right__subtitle_mar}>Quiz duration</div>
      <div className={`${styles.form}`}>
        <RadioGroup
          value={checkDuration}
          onChange={handlerSelectDuration}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="Lack" control={<Radio />} label="Lack" />
          <FormControlLabel value="Select" control={<Radio />} label="Select" />
        </RadioGroup>

        {checkDuration === "Select" && (
          <>
            <div className={`${styles.form__ranges}`}>
              <div className={`${styles.form__range}`}>
                <label htmlFor="Hours">Hours</label>
                <div>
                  <Controller
                    name="duration.hours"
                    control={control}
                    defaultValue={0}
                    render={({ field: { onChange, value } }) => (
                      <Slider
                        onChange={(_, value) => {
                          onChange(value);
                        }}
                        value={value}
                        valueLabelDisplay="auto"
                        min={0}
                        max={23}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={`${styles.form__range}`}>
                <label htmlFor="Minutes">Minutes</label>
                <div>
                  <Controller
                    name="duration.minutes"
                    control={control}
                    defaultValue={0}
                    render={({ field: { onChange, value } }) => (
                      <Slider
                        onChange={(_, value) => {
                          onChange(value);
                        }}
                        value={value}
                        valueLabelDisplay="auto"
                        min={0}
                        max={59}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {/* <div className={`${styles.form__range__view}`}>
              {formatTime(durationWatch?.hours || 0)}:{formatTime(durationWatch?.minutes || 0)}
            </div> */}
          </>
        )}

        <div className={`${styles.right__subtitle_mar} ${styles.marginTop}`}>Quiz deadline</div>
        <RadioGroup
          value={checkDeadline}
          onChange={handlerSelectDeadline}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="Lack" control={<Radio />} label="Lack" />
          <FormControlLabel value="Select" control={<Radio />} label="Select" />
        </RadioGroup>
        {checkDeadline === "Select" && (
          <Controller
            name={"deadline"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={styles.marginTopLit}
                  value={value ? dayjs(value) : null}
                  onChange={date => onChange(date)}
                  minDate={TOMORROW}
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
                />
              </LocalizationProvider>
            )}
          />
        )}
      </div>

      <div className={`${styles.right__subtitle_mar} ${styles.marginTop}`}>Percentage of pass</div>
      <div className={`${styles.form__range__long}`}>
        <div>
          <Controller
            name="percentagePass"
            control={control}
            defaultValue={0}
            render={({ field: { onChange, value } }) => (
              <Slider
                onChange={(_, value) => {
                  onChange(value);
                }}
                value={value}
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
            )}
          />
        </div>
      </div>
      {/* <div className={`${styles.form__range__view} ${styles.marginTopLit}`}>
        {percentagePassWatch}%
      </div> */}
    </div>
  );
};
