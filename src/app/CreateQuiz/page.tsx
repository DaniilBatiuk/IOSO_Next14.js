import { Metadata } from "next";

import { CreateQuizPage } from "./CreateQuizPage";

export const metadata: Metadata = {
  title: "Create quiz",
};

export default function CreateQuiz() {
  return <CreateQuizPage />;
}
