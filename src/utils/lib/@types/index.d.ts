import {
  AccessTypeForGroup,
  AccessTypeForQuiz,
  MemberStatus,
  QuizResultStatus,
  QuizStatus,
} from "@prisma/client";

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

export type QuizPassQuestionType = {
  id: string;
  question: string;
  answers: {
    id: string;
    answer: string;
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
