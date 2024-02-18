import { Metadata } from "next";

import { TrendsPage } from "./TrendsPage";

export const metadata: Metadata = {
  title: "Trends",
};

export default function Trends() {
  return <TrendsPage />;
}
