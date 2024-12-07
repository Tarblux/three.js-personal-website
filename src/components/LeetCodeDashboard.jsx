import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function LeetCodeDashboard() {
  return (
    <div className="w-3/4 h-3/4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-30 p-6 flex flex-col gap-6">
      <h1 className="text-white text-2xl">Leetcode Dashboard</h1>

      {/* Grid layout for the charts */}
      <div className="flex-1 grid grid-rows-2 grid-cols-3 gap-4">
        {/* Question progression Line Chart */}
        <div className="bg-white bg-opacity-50 rounded-lg col-span-2"></div>

        {/* Question Difficulty Pie */}
        <div className="bg-white bg-opacity-50 rounded-lg"></div>

        {/* Chart 3 */}
        <div className="bg-white bg-opacity-50 rounded-lg"></div>

        {/* Chart 4 */}
        <div className="bg-white bg-opacity-50 rounded-lg"></div>

        {/* Chart 5 */}
        <div className="bg-white bg-opacity-50 rounded-lg"></div>

      </div>
    </div>
  );
}
