import { AllGroups, MyQuiz } from "../@types";

export const filterAndSortItems = (
  search: string,
  sortOrder: "asc" | "desc",
  items: AllGroups[] | MyQuiz[] | undefined,
) => {
  if (!items || items === undefined) return;
  return [...items]
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
};
