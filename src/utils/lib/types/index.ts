import { AccessTypeForGroup } from "@prisma/client";

export type AllGroups = {
  id: string;
  name: string;
  accessType: AccessTypeForGroup;
  creator: {
    id: string;
    fullName: string;
  };
  members: {
    userId: string;
  }[];
};

export type WrapSuccessType<T> = {
  success: boolean;
  result: T;
};

export type Group = {
  id: string;
  name: string;
  accessType: AccessTypeForGroup;
  sections: {
    id: string;
    name: string;
    quizzes: {
      id: string;
      name: string;
      attempts?: number;
    }[];
  }[];
  members: {
    id: string;
    status: string;
    user: {
      id: string;
      fullName: string;
    };
  }[];
};
