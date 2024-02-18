import { Metadata } from "next";

import { UpdateQuizPage } from "./UpdateQuizPage";

export const metadata: Metadata = {
  title: "Update quiz",
};

export default function UpdateQuiz({ params }: { params: { id: string } }) {
  return <UpdateQuizPage id={params.id} />;
}
