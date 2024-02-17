import { ResponsiveLine } from "@nivo/line";
import React from "react";

import "@/styles/Modal.scss";

import { TQuizResult } from "@/utils/lib/@types";

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
  quizResult: TQuizResult[];
};

const convertToLineChartData = (quizResults: TQuizResult[]): any[] => {
  const data: any[] = [];

  quizResults[0].questionResult.forEach((question, index) => {
    const totalScore = quizResults.reduce((accumulator, quizResult) => {
      const questionResult = quizResult.questionResult[index];
      return accumulator + questionResult.score;
    }, 0);

    const averageScore = totalScore / quizResults.length;

    data.push({ x: index + 1, y: averageScore });
  });

  return data;
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
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(255, 255, 255, 1)",
        },
      ]}
    />
  );
};
