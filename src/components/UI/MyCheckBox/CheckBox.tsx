import { removeItemFromArray } from "@/utils/lib/helpers/removeItemFromArray";
import { Checkbox, FormControlLabel } from "@mui/material";

type MyCheckBoxData = {
  answer: { id: string; text: string };
  selected: string | string[];
};

type MyCheckBoxProp = MyCheckBoxData & {
  updateFields?: (fields: Partial<MyCheckBoxData>) => void;
  rightAnswers?: string | string[];
};

export const MyCheckBox: React.FC<MyCheckBoxProp> = ({
  answer,
  updateFields,
  selected,
  rightAnswers,
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
              color: rightAnswers?.includes(answer.id)
                ? "#24d800"
                : rightAnswers !== undefined &&
                  !rightAnswers.includes(answer.id) &&
                  selected.includes(answer.id)
                ? "#a80101"
                : "#ffffff",
            },
          }}
        />
      }
      label={
        <span
          style={{
            color: rightAnswers?.includes(answer.id)
              ? "#24d800"
              : rightAnswers !== undefined &&
                !rightAnswers.includes(answer.id) &&
                selected.includes(answer.id)
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
