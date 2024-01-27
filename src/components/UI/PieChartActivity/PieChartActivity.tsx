"use client";
import { PieChart } from "@mui/x-charts";

const DATA = [
  { value: 70, label: "create group" },
  { value: 20, label: "create test" },
  { value: 10, label: "pass test" },
];

const COLORS = {
  colors: ["rgb(27, 200, 231)", "rgba(255, 251, 9, 0.966)", "rgba(245, 22, 226, 0.842)"],
};

const PieChartActivity: React.FC = () => {
  return (
    <PieChart
      series={[
        {
          innerRadius: 58,
          outerRadius: 70,
          paddingAngle: 2,
          cornerRadius: 5,
          data: DATA,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={340}
      height={174}
      margin={{ right: 180 }}
      {...COLORS}
    />
  );
};
export default PieChartActivity;
