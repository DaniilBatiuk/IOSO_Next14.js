"use client";
import styles from "@/styles/CreateQuiz.module.scss";
import { CreateGroupType } from "@/utils/lib/validators/create-group-validator";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type SectionSettingsProp = {
  control: Control<CreateGroupType>;
  errors: FieldErrors<CreateGroupType>;
  register: UseFormRegister<CreateGroupType>;
};

const SectionSettings: React.FC<SectionSettingsProp> = ({
  control,
  register,
  errors,
}: SectionSettingsProp) => {
  // const {
  //   fields: sectionFields,
  //   append: sectionAppend,
  //   remove: sectionRemove,
  // } = useFieldArray({ control, name: `sections` as const });

  return (
    <div className={styles.right}>
      {/* <div className={`${styles.right__subtitle} ${styles.marginBot15}`}>Sections</div>
      {sectionFields.length > 0 &&
        sectionFields.map((field, index) => (
          <div key={field.id} className={`${styles.form__answers__div}`}>
            <TextField
              fullWidth
              error={Boolean(errors?.sections?.[index]?.name?.message)}
              label={errors?.sections?.[index]?.name?.message || `Insert section name`}
              {...register(`sections.${index}.name` as const)}
              variant="standard"
            />
            {ICONS.close({ onClick: () => sectionRemove(index) })}
          </div>
        ))}

      <button
        className={styles.button__create}
        type="button"
        onClick={() =>
          sectionAppend({
            name: "",
          })
        }
      >
        Add question
      </button> */}
    </div>
  );
};
export default SectionSettings;
