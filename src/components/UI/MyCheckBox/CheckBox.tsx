import { Checkbox, FormControlLabel } from "@mui/material";

import { removeItemFromArray } from "@/utils/lib/helpers/removeItemFromArray";

type MyCheckBoxData = {
  answer: {
    id: string;
    text: string;
    isCorrect: boolean;
  };
  selected: string | string[];
  showResults: boolean;
};

type MyCheckBoxProp = MyCheckBoxData & {
  updateFields?: (fields: Partial<MyCheckBoxData>) => void;
};

export const MyCheckBox: React.FC<MyCheckBoxProp> = ({
  answer,
  updateFields,
  selected,
  showResults,
}: MyCheckBoxProp) => {
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (updateFields !== undefined) {
      if (!selected.includes(answer.id) && Array.isArray(selected)) {
        selected.push(answer.id);
        const data: string[] = selected;
        updateFields({ selected: data });
      } else {
        if (Array.isArray(selected)) {
          const data: string[] = removeItemFromArray(selected, answer.id);
          updateFields({ selected: data });
        }
      }
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={selected.includes(answer.id)}
          onChange={handlerChange}
          sx={{
            color: "#ffffff",

            "&.Mui-checked": {
              color: !showResults
                ? "#ffffff"
                : (selected.includes(answer.id) && answer.isCorrect) ||
                    (!selected.includes(answer.id) && answer.isCorrect)
                  ? "#24d800"
                  : selected.includes(answer.id) && !answer.isCorrect
                    ? "#a80101"
                    : "#ffffff",
            },
          }}
        />
      }
      label={
        <span
          style={{
            color: !showResults
              ? "#ffffff"
              : (selected.includes(answer.id) && answer.isCorrect) ||
                  (!selected.includes(answer.id) && answer.isCorrect)
                ? "#24d800"
                : selected.includes(answer.id) && !answer.isCorrect
                  ? "#a80101"
                  : "#ffffff",
          }}
        >
          {answer.text}
        </span>
      }
    />
  );
};
