"use client";

import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDeferredValue, useMemo, useState } from "react";

import styles from "@/styles/Quizzes.module.scss";

import { filterAndSortItems } from "@/utils/lib/helpers/filterAndSortItems";

import { QuizOrGroup, SearchForm, ThemeWrapper } from "@/components";
import { AllGroups, MyQuiz } from "@/utils/lib/@types";
import { GroupsService } from "@/utils/services/group.service";
import { QuizService } from "@/utils/services/quiz.servise";

export default function Trends() {
  const [activeQuiz, setActiveQuiz] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState<string>("");

  const { data: session } = useSession();

  const { data: groups } = useQuery({
    queryKey: ["allGroups"],
    queryFn: () => GroupsService.getAllGroups(),
  });

  const { data: quizzes } = useQuery({
    queryKey: ["allQuizzes"],
    queryFn: () => QuizService.getAllQuizzes(),
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
    <ThemeWrapper>
      <div className={`${styles.quizzes__container}`}>
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
              deferredFinalQuizzes.length > 0 ? (
                deferredFinalQuizzes.map((quiz, index) => (
                  <QuizOrGroup key={index} quiz={quiz} userId={session?.user.id} />
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
            deferredFinalGroups.length > 0 ? (
              deferredFinalGroups.map((group, index) => (
                <QuizOrGroup key={index} group={group} userId={session?.user.id} />
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
      </div>
    </ThemeWrapper>
  );
}
