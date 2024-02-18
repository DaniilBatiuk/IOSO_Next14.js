import { Metadata } from "next";

import { CreateGroupPage } from "./CreateGroupPage";

export const metadata: Metadata = {
  title: "Create group",
};

export default function CreateGroup() {
  return <CreateGroupPage />;
}
