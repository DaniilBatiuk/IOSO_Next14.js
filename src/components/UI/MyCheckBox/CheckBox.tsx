import { removeItemFromArray } from "@/utils/lib/helpers/removeItemFromArray";
import { FormControlLabel, Checkbox } from "@mui/material";

type MyCheckBoxData = {
  variant: string;
  selected: string | string[];
  variants: { variant: string }[];
};

type MyCheckBoxProp = MyCheckBoxData & {
  updateFields?: (fields: Partial<MyCheckBoxData>) => void;
  rightAnswers?: string | string[];
};

const MyCheckBox: React.FC<MyCheckBoxProp> = ({ variants, variant, updateFields, selected, rightAnswers }: MyCheckBoxProp) => {
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (updateFields !== undefined) {
      if (!selected.includes(variant) && Array.isArray(selected)) {
        selected.push(variant);
        const data: string[] = selected;
        updateFields({ selected: data });
      } else {
        if (Array.isArray(selected)) {
          const data: string[] = removeItemFromArray(selected, variant);
          updateFields({ selected: data });
        }
      }
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={selected.includes(variant)}
          onChange={handlerChange}
          sx={{
            color: "#ffffff",

            "&.Mui-checked": {
              color: rightAnswers?.includes(variant) ? "#24d800" : rightAnswers !== undefined && !rightAnswers.includes(variant) && selected.includes(variant) ? "#a80101" : "#ffffff",
            },
          }}
        />
      }
      label={
        <span style={{ color: rightAnswers?.includes(variant) ? "#24d800" : rightAnswers !== undefined && !rightAnswers.includes(variant) && selected.includes(variant) ? "#a80101" : "#ffffff" }}>
          {variant}
        </span>
      }
    />
  );
};
export default MyCheckBox;
