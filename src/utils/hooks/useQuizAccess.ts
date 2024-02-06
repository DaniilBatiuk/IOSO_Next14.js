import { CreateQuizType } from "@/app/CreateQuiz/page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { createSection } from "../lib/actions/sectionActions";
import { GroupsService } from "../services/group.service";

export const useQuizAccess = (
  control: Control<CreateQuizType>,
  setValue: UseFormSetValue<CreateQuizType>,
) => {
  const [selectGroupId, setSelectGroupId] = useState("");
  const [createGroupSectionModalActive, setCreateGroupSectionModalActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const { data: groups } = useQuery({
    queryKey: ["myManagerGroups"],
    queryFn: () => GroupsService.getMyManagerGroups(session?.user.id),
  });

  const changeGroupId = useWatch({
    control,
    name: `groupId`,
  });

  useEffect(() => {
    setValue("sectionId", "");
  }, [changeGroupId]);

  useEffect(() => {
    if (
      (groups !== undefined && changeGroupId !== selectGroupId && changeGroupId) ||
      (groups !== undefined && selectGroupId === "")
    ) {
      if (selectGroupId === "") {
        setSelectGroupId(groups?.result[0].id);
      } else if (changeGroupId) {
        setSelectGroupId(changeGroupId);
      }
    }
  }, [groups, changeGroupId, selectGroupId]);

  const createSectionName = async () => {
    if (inputRef && inputRef.current) {
      const hasDuplicates = groups?.result?.[+selectGroupId]?.sections?.some(
        (section, index, array) =>
          array.findIndex(item => item.name === inputRef?.current?.value) !== index,
      );
      if (hasDuplicates) {
        toast.error("Section with this name is already exist!");
        return;
      }

      const error = await createSection({ name: inputRef.current.value, groupId: selectGroupId });
      if (error) {
        toast.error(error);
      } else {
        toast.success("Section created successfully.");
        setCreateGroupSectionModalActive(false);
        await queryClient.refetchQueries({
          queryKey: ["myManagerGroups"],
          type: "active",
          exact: true,
        });
      }
    }
  };

  return {
    selectGroupId,
    createGroupSectionModalActive,
    setCreateGroupSectionModalActive,
    inputRef,
    groups,
    createSectionName,
  };
};
