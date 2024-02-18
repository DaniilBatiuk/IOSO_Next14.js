import { Metadata } from "next";

import { GroupPage } from "./GroupPage";

export const metadata: Metadata = {
  title: "Group",
};

export default function Group({ params }: { params: { id: string } }) {
  return <GroupPage id={params.id} />;
}
