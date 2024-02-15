import { AccessTypeForQuiz } from "@prisma/client";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

import { AccessCodeScheme } from "../validators/access-code-validator";
import { CreateQuizType } from "../validators/create-quiz-validator";

export const validateQuiz = (
  accessType: AccessTypeForQuiz,
  data: CreateQuizType,
  setError: UseFormSetError<CreateQuizType>,
  id: string | null,
) => {
  let isErrorExist = false;
  if (accessType === AccessTypeForQuiz.Public_access_code) {
    if (!AccessCodeScheme.safeParse(data.accessCode).success) {
      setError("accessCode", {
        type: "custom",
        message: "Password must be within 6 - 50 characters",
      });
      isErrorExist = true;
    }
  } else {
    data.accessCode = null;
  }

  if (data.attempts === 555) data.attempts = null;

  if (accessType !== AccessTypeForQuiz.Group) data.groupId = null;

  if (accessType === AccessTypeForQuiz.Group && data.sectionId === "") {
    setError("sectionId", {
      type: "custom",
      message: "Section can not be empty.",
    });
    isErrorExist = true;
  } else if (accessType !== AccessTypeForQuiz.Group) {
    data.sectionId = null;
  }

  if (id === null) {
    toast.error("You have to register to create the group!");
    isErrorExist = true;
  }

  return isErrorExist;
};
