import { AccessTypeForGroup, MemberStatus } from "@prisma/client";

export type AllGroups = {
  id: string;
  name: string;
  accessType: AccessTypeForGroup;
  accessCode: string;
  creator: {
    id: string;
    fullName: string;
  };
  members: {
    userId: string;
    status: MemberStatus;
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
    status: MemberStatus;
    user: {
      id: string;
      fullName: string;
    };
  }[];
};
