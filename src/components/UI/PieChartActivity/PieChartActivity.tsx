"use client";

import { ResponsivePie } from "@nivo/pie";

type PieChartActivityProp = {
  quizPassed: number;
  quizCreated: number;
  groupCreated: number;
};

export const PieChartActivity: React.FC<PieChartActivityProp> = ({
  quizPassed,
  quizCreated,
  groupCreated,
}: PieChartActivityProp) => {
  const customTheme = {
    labels: {
      text: {
        fontSize: 14,
        fill: "black",
      },
    },
    legends: {
      text: {
        fontSize: 14,
      },
    },
    tooltip: {
      container: {
        color: "black",
      },
    },
  };

  const data = [
    {
      id: "quiz passed",
      label: "quiz passed",
      value: quizPassed,
      color: "rgb(49, 184, 184)",
    },
    {
      id: "quiz created",
      label: "quiz created",
      value: quizCreated,
      color: "rgb(161, 250, 250)",
    },
    {
      id: "group created",
      label: "group created",
      value: groupCreated,
      color: "rgb(0, 238, 238)",
    },
  ];

  return (
    <ResponsivePie
      data={data}
      theme={customTheme}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      startAngle={-180}
      innerRadius={0.7}
      padAngle={2}
      cornerRadius={6}
      activeOuterRadiusOffset={5}
      colors={{ datum: "data.color" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.1]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsOffset={-1}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      motionConfig="gentle"
      transitionMode="startAngle"
      legends={[]}
    />
  );
};
