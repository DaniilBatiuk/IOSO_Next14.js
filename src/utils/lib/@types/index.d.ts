import {
  AccessTypeForGroup,
  AccessTypeForQuiz,
  MemberStatus,
  QuizResultStatus,
  QuizStatus,
  User,
} from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}

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
  createdAt: Date;
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
      duration?: Date;
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
  QuizResult: {
    id: string;
  }[];
  createdAt: Date;
};

type PassQuiz = {
  id: string;
  name: string;
  percentagePass: number;
  duration?: string;
  questions: {
    id: string;
    text: string;
    type: QuestionType;
    answers: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
};

export type Result = {
  durationOfAttempt: Date;
  score: number;
  questionCount: number;
  rightAnswerCount: number;
};

export type QuizPassQuestionType = {
  id: string;
  question: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  selected: string | string[];
};

export type QuizPassType = QuizPassQuestionType[];

export type QuizHistory = {
  id: string;
  status: QuizResultStatus;
  score: number;
  createdAt: string;
  durationOfAttempt: string;
  questionCount: number;
  quiz: {
    name: string;
  };
};

export type QuizResult = {
  id: string;
  durationOfAttempt: string;
  status: QuizResultStatus;
  score: number;
  questionCount: number;
  rightAnswerCount: number;
  createdAt: string;
  questionResult: {
    id: string;
    score: number;
    question: {
      id: string;
      text: string;
      type: QuestionType;
      answers: {
        id: string;
        text: string;
        isCorrect: boolean;
      }[];
    };
    answerSelected: {
      id: string;
      answer: {
        id: string;
      };
    }[];
  }[];
};

type UpdateQuiz = {
  id: string;
  name: string;
  attempts?: number;
  percentagePass: number;
  duration?: Date;
  deadline?: Date;
  accessType: AccessTypeForQuiz;
  accessCode?: string;
  groupId?: string;
  sectionId?: string;
  questions: {
    id: string;
    text: string;
    type: QuestionType;
    answers: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
  section?: {
    id: string;
    name: string;
  };
  QuizResult: {
    id: string;
  }[];
};

type TGroupStatisticSelect = {
  id: string;
  name: string;
};

type TUserSelect = {
  id: string;
  user: {
    id: string;
    fullName: string;
  };
  questionResult: TQuestionResult[];
};

type TQuizStatisticSelect = {
  id: string;
  name: string;
  groupId: string;
  QuizResult: TUserSelect[];
};

type TQuestionResult = {
  id: string;
  score: number;
};

type TQuizResult = {
  id: string;
  questionResult: TQuestionResult[];
};

type TUser = {
  id: string;
  email: string;
  fullName: string;
  groups: TGroupStatisticSelect[];
  quiz: TQuizStatisticSelect[];
  QuizResult: {
    id: string;
  }[];
};
