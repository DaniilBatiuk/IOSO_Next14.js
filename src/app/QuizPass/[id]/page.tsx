import { Metadata } from "next";

import { QuizPassPage } from "./QuizPassPage";

export const metadata: Metadata = {
  title: "Quiz pass",
};

export default function QuizPass({ params }: { params: { id: string } }) {
  return <QuizPassPage id={params.id} />;
}
