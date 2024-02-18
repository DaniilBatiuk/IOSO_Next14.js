import { Metadata } from "next";

import { ProfilePage } from "./ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile({ params }: { params: { id: string } }) {
  return <ProfilePage id={params.id} />;
}
