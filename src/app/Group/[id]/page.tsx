"use client";

import { GroupQuizHistory, GroupSections, ThemeWrapper } from "@/components";
import styles from "@/styles/Group.module.scss";
import { GroupsService } from "@/utils/services/group.service";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Group = ({ params }: { params: { id: string } }) => {
  const [activeMenu, setActiveMenu] = useState<string>("Group");
  const { data: session } = useSession();

  const { data: group } = useQuery({
    queryKey: ["group", params.id],
    queryFn: () => GroupsService.getGroup(params.id),
  });

  const { data: groupQuizHistory } = useQuery({
    queryKey: ["groupQuizHistory", params.id],
    queryFn: () => GroupsService.getGroupQuizHistory(session?.user.id, params.id),
    enabled: !!session?.user.id,
  });

  return (
    <ThemeWrapper>
      <div className={styles.group__container}>
        <div className={styles.group__title}>
          {group?.result ? group.result.name : <Skeleton variant="text" sx={{ height: "44px" }} />}
        </div>
        {group?.result ? (
          <div className={styles.left__buttons}>
            <button
              className={activeMenu === "Group" ? styles.left__button__active : styles.left__button}
              onClick={() => setActiveMenu("Group")}
            >
              Group
            </button>
            <button
              className={
                activeMenu === "Statistic" ? styles.left__button__active : styles.left__button
              }
              onClick={() => setActiveMenu("Statistic")}
            >
              Statistic
            </button>
          </div>
        ) : (
          <Skeleton variant="text" sx={{ height: "44px", width: "250px" }} />
        )}
        <div className={styles.group__main}>
          {activeMenu === "Group" ? (
            <GroupSections group={group} />
          ) : (
            <GroupQuizHistory groupQuizHistory={groupQuizHistory} />
          )}
        </div>
      </div>
    </ThemeWrapper>
  );
};
export default Group;
