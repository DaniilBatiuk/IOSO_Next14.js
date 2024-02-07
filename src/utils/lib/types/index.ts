import { AccessTypeForGroup, AccessTypeForQuiz, MemberStatus, QuizStatus } from "@prisma/client";

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

export type Answer = {
  text: string;
  isCorrect: boolean;
};

export type Answers = Answer[];

export type MyManagerGroups = {
  id: string;
  name: string;
  sections: {
    id: string;
    name: string;
  }[];
};

export type MyQuiz = {
  id: string;
  name: string;
  attempts?: number;
  deadline?: Date;
  duration?: Date;
  accessType: AccessTypeForQuiz;
  accessCode?: string;
  status: QuizStatus;
  creator: {
    id: string;
    fullName: string;
  };
  questions: {
    id: string;
  }[];
};
