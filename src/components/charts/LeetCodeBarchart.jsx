import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const CustomBarShape = ({ x, y, width, height, isTop, fill }) => {
  // Apply top-radius only, keeping the bottom flat
  const radius = isTop ? [5, 5, 0, 0] : [0, 0, 0, 0]; // Top-left, top-right, bottom-right, bottom-left
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius[0]} // Top-left and top-right
      ry={radius[1]} // Corresponding to the top radius
      fill={fill}
    />
  );
};

export default function LeetCodeBarChart({ data }) {
  const getCustomShape = (dataKey, data) => {
    return (props) => {
      const { index } = props;

      // Determine if this is the topmost bar for the current month
      const isTop =
        (dataKey === "hardSolved" && data[index].hardSolved > 0) ||
        (dataKey === "mediumSolved" && data[index].hardSolved === 0 && data[index].mediumSolved > 0) ||
        (dataKey === "easySolved" && data[index].hardSolved === 0 && data[index].mediumSolved === 0);

      return <CustomBarShape {...props} isTop={isTop} fill={props.fill} />;
    };
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#000' }} 
          tickFormatter={(tick) => tick}
        />
        <YAxis tick={{ fill: '#000' }} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="easySolved"
          stackId="a"
          fill="#1BBBBA"
          name="Easy"
          shape={getCustomShape("easySolved", data)}
        />
        <Bar
          dataKey="mediumSolved"
          stackId="a"
          fill="#FFB700"
          name="Medium"
          shape={getCustomShape("mediumSolved", data)}
        />
        <Bar
          dataKey="hardSolved"
          stackId="a"
          fill="#F53836"
          name="Hard"
          shape={getCustomShape("hardSolved", data)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
