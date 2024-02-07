import { AccessTypeForGroup, AccessTypeForQuiz, MemberStatus, QuizStatus } from "@prisma/client";

type AllGroups = {
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

type WrapSuccessType<T> = {
  success: boolean;
  result: T;
};

type Group = {
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

type Answer = {
  text: string;
  isCorrect: boolean;
};

type Answers = Answer[];

type MyManagerGroups = {
  id: string;
  name: string;
  sections: {
    id: string;
    name: string;
  }[];
};

type MyQuiz = {
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
