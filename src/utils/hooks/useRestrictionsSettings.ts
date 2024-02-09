import { useEffect, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { CreateQuizType } from "../lib/validators/create-quiz-validator";

export const useRestrictionsSettings = (
  control: Control<CreateQuizType>,
  setValue: UseFormSetValue<CreateQuizType>,
) => {
  const [checkDuration, setCheckDuration] = useState<string>("Lack");
  const [checkDeadline, setCheckDeadline] = useState<string>("Lack");

  const deadlineWatch = useWatch({
    control,
    name: `deadline`,
  });

  // const percentagePassWatch = useWatch({
  //   control,
  //   name: `percentagePass`,
  // });

  // const durationWatch = useWatch({
  //   control,
  //   name: `duration`,
  // });

  useEffect(() => {
    if (deadlineWatch !== null) {
      setCheckDeadline("Select");
    }
    // if (durationWatch !== null) {
    //   setCheckDuration("Select");
    // }
  }, []);

  // const formatTime = (value: number) => {
  //   return value.toString().padStart(2, "0");
  // };

  const handlerSelectDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckDuration(event.target.value);
    if (event.target.value === "Lack") {
      setValue("duration", null);
    }
  };

  const handlerSelectDeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckDeadline(event.target.value);
    if (event.target.value === "Lack") {
      setValue("deadline", null);
    }
  };

  return {
    // formatTime,
    handlerSelectDuration,
    handlerSelectDeadline,
    checkDuration,
    checkDeadline,
    // percentagePassWatch,
    // durationWatch,
  };
};
