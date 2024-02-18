import { ResponsiveLine } from "@nivo/line";
import React from "react";

import "@/styles/Modal.scss";

import { TQuizResultSelect } from "@/utils/lib/@types";

const customTheme = {
  axis: {
    domain: {
      line: {
        stroke: "white",
      },
    },
    legend: {
      text: {
        fontSize: 14,
        fill: "white",
      },
    },
    ticks: {
      line: {
        stroke: "white",
        strokeWidth: 1,
      },
      text: {
        fontSize: 14,
        fill: "white",
      },
    },
  },
  legends: {
    text: {
      fontSize: 14,
      fill: "white",
    },
  },
  tooltip: {
    container: {
      color: "#000000",
    },
  },
};

export type LineProps = {
  quizResult: TQuizResultSelect[];
};

const convertToLineChartData = (quizResults: TQuizResultSelect[]): any[] => {
  return quizResults[0].quiz.questions.map((question, index) => {
    const totalScore = quizResults.reduce((accumulator, quizResult) => {
      const questionResult = quizResult.questionResult.find(
        questionResult => questionResult.text === question.text,
      );
      return accumulator + (questionResult ? questionResult.score : 0);
    }, 0);

    const totalScoreCount = quizResults.reduce((accumulator, quizResult) => {
      const questionResultCount = quizResult.questionResult.find(
        questionResult => questionResult.text === question.text,
      );
      return accumulator + (questionResultCount ? 1 : 0);
    }, 0);

    const averageScore = totalScore / totalScoreCount || 0;
    return { x: index + 1, y: averageScore };
  });
};

export const Line: React.FC<LineProps> = ({ quizResult }: LineProps) => {
  const newDataArray = convertToLineChartData(quizResult);

  const data = [
    {
      id: "percent",
      color: "rgb(0, 238, 238)",
      data: newDataArray,
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      theme={customTheme}
      margin={{ top: 20, right: 20, bottom: 55, left: 70 }}
      colors={{ datum: "color" }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "questions",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "average score",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
    />
  );
};
