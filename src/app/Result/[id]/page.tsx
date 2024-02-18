import { Metadata } from "next";

import ResultPage from "./ResultPage";

export const metadata: Metadata = {
  title: "Result",
};

export default function Result({ params }: { params: { id: string } }) {
  return <ResultPage id={params.id} />;
}
