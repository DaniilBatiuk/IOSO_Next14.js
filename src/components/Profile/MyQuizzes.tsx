"use client";
import styles from "@/styles/Profile.module.scss";
import { AllGroups, MyQuiz } from "@/utils/lib/@types";
import { filterAndSortItems } from "@/utils/lib/helpers/filterAndSortItems";
import { GroupsService } from "@/utils/services/group.service";
import { QuizService } from "@/utils/services/quiz.servise";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDeferredValue, useMemo, useState } from "react";
import { MyQuizOrGroup, SearchForm } from "..";

export const MyQuizzes: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState<string>("");
  const { data: session } = useSession();

  const { data: groups } = useQuery({
    queryKey: ["myGroups"],
    queryFn: () => GroupsService.getMyGroups(session?.user.id),
  });

  const { data: quizzes } = useQuery({
    queryKey: ["myQuizzes"],
    queryFn: () => QuizService.getMyQuizzes(session?.user.id),
  });

  const sortedGroups = useMemo(
    () => filterAndSortItems(search, sortOrder, groups?.result),
    [groups, search, sortOrder],
  );
  const sortedQuizzes = useMemo(
    () => filterAndSortItems(search, sortOrder, quizzes?.result),
    [quizzes, search, sortOrder],
  );

  const deferredFinalGroups = useDeferredValue(sortedGroups) as AllGroups[] | undefined;
  const deferredFinalQuizzes = useDeferredValue(sortedQuizzes) as MyQuiz[] | undefined;

  return (
    <section className={styles.main}>
      <SearchForm
        activeQuiz={activeQuiz}
        setActiveQuiz={setActiveQuiz}
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      {activeQuiz === true ? (
        deferredFinalQuizzes ? (
          session?.user.id !== undefined && deferredFinalQuizzes.length > 0 ? (
            deferredFinalQuizzes.map((quiz, index) => (
              <MyQuizOrGroup key={index} quiz={quiz} id={session?.user?.id} />
            ))
          ) : (
            <div className="blur">No data yet</div>
          )
        ) : (
          <div className={styles.skeleton}>
            <Skeleton variant="rectangular" height={137} />
            <Skeleton variant="rectangular" height={137} />
            <Skeleton variant="rectangular" height={137} />
            <Skeleton variant="rectangular" height={137} />
            <Skeleton variant="rectangular" height={137} />
            <Skeleton variant="rectangular" height={137} />
          </div>
        )
      ) : deferredFinalGroups ? (
        session?.user.id !== undefined && deferredFinalGroups.length > 0 ? (
          deferredFinalGroups.map((group, index) => (
            <MyQuizOrGroup key={index} group={group} id={session?.user.id} />
          ))
        ) : (
          <div className="blur">No data yet</div>
        )
      ) : (
        <div className={styles.skeleton}>
          <Skeleton variant="rectangular" height={137} />
          <Skeleton variant="rectangular" height={137} />
          <Skeleton variant="rectangular" height={137} />
          <Skeleton variant="rectangular" height={137} />
          <Skeleton variant="rectangular" height={137} />
          <Skeleton variant="rectangular" height={137} />
        </div>
      )}
    </section>
  );
};
