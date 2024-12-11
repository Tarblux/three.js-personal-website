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

export default function LeetCodeBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fill: '#000' }} />
        <YAxis tick={{ fill: '#000' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="easySolved" stackId="a" fill="#1BBBBA" name="Easy" />
        <Bar dataKey="mediumSolved" stackId="a" fill="#FFB700" name="Medium" />
        <Bar dataKey="hardSolved" stackId="a" fill="#F53836" name="Hard" />
      </BarChart>
    </ResponsiveContainer>
  );
}