import React, { useEffect, useState } from 'react';

import LeetCodeLineChart from './charts/LeetCodeLineChart.jsx';
import LeetCodePieChart from './charts/LeetCodePieChart.jsx';


export default function LeetCodeDashboard() {
  
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data/leetcode_stats.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Process the data to fit the chart format
        const chartData = jsonData.map((item) => ({
          date: item.date,
          easySolved: item.easySolved,
          mediumSolved: item.mediumSolved,
          hardSolved: item.hardSolved,
        }));
        setData(chartData);

        // Get Most Recent entry (for the pie chart)
        const mostRecent = jsonData[jsonData.length - 1];

        //Prepare data for the pie chart
        const pieData = [
          { name: 'Easy', value: mostRecent.easySolved },
          { name: 'Medium', value: mostRecent.mediumSolved },
          { name: 'Hard', value: mostRecent.hardSolved },
        ];
        setPieData(pieData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to format the date to display only the month (e.g., "Sep")
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  };

  return (
    <div className="w-3/4 h-3/4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-30 p-6 flex flex-col gap-6">
      <h1 className="text-white text-2xl">Leetcode Dashboard</h1>

      {/* Grid layout for the charts */}
      <div className="flex-1 grid grid-rows-2 grid-cols-3 gap-4">
        {/* Question progression Line Chart */}
        <div className="bg-white bg-opacity-50 rounded-lg col-span-2 p-4 flex flex-col h-full">
          <h2 className="text-black text-xl mb-2">Questions Solved Over Time</h2>
          <div className="flex-1">
            <LeetCodeLineChart data={data} formatMonth={formatMonth} />
          </div>
        </div>

        {/* Question Difficulty Pie */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col h-full">
          <h2 className="text-black text-xl mb-2">Difficulty Distribution</h2>
          <div className="flex-1">
            <LeetCodePieChart pieData={pieData} />
          </div>
        </div>

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
