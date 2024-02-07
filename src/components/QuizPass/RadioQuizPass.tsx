import styles from "@/styles/QuizPass.module.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

type RadioQuizPassData = {
  question: string;
  variants: { variant: string }[];
  selected: string | string[];
};

type RadioQuizPassProps = RadioQuizPassData & {
  updateFields?: (fields: Partial<RadioQuizPassData>) => void;
  rightAnswers?: string | string[];
};

export const RadioQuizPass: React.FC<RadioQuizPassProps> = ({
  question,
  variants,
  selected,
  updateFields,
  rightAnswers,
}: RadioQuizPassProps) => {
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (updateFields !== undefined) {
      const selectedVariant = event.target.value;
      updateFields({ selected: selectedVariant });
    }
  };

  return (
    <>
      <div className={styles.left__text}>{question}</div>
      <RadioGroup
        onChange={handlerChange}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {variants.map((variant, index) => (
          <FormControlLabel
            key={index}
            checked={selected === variant.variant}
            value={variant.variant}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color:
                      rightAnswers === variant.variant
                        ? "#24d800"
                        : rightAnswers !== variant.variant &&
                          selected === variant.variant &&
                          rightAnswers !== undefined
                        ? "#a80101"
                        : "#ffffff",
                  },
                }}
              />
            }
            label={
              <span
                style={{
                  color:
                    rightAnswers === variant.variant
                      ? "#24d800"
                      : rightAnswers !== variant.variant &&
                        selected === variant.variant &&
                        rightAnswers !== undefined
                      ? "#a80101"
                      : "#ffffff",
                }}
              >
                {variant.variant}
              </span>
            }
          />
        ))}
      </RadioGroup>
    </>
  );
};
