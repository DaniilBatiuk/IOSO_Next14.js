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
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
};
