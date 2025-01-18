import React, { useEffect, useState } from 'react';

import LeetCodeLineChart from './charts/LeetCodeLineChart.jsx';
import LeetCodePieChart from './charts/LeetCodePieChart.jsx';
import LeetCodeBarChart from './charts/LeetCodeBarChart.jsx';
import LeetCodeSubmissionChart from './charts/LeetCodeSubmissionChart.jsx'; 

export default function LeetCodeDashboard() {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]); 

  useEffect(() => {
    fetch('/data/leetcode_stats.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Data for Line Chart
        const chartData = jsonData.map((item) => ({
          date: item.date,
          easySolved: item.easySolved,
          mediumSolved: item.mediumSolved,
          hardSolved: item.hardSolved,
        }));
        setData(chartData);

        // Data for Pie Chart
        const mostRecent = jsonData[jsonData.length - 1];
        const pieData = [
          { name: 'Easy', value: mostRecent.easySolved },
          { name: 'Medium', value: mostRecent.mediumSolved },
          { name: 'Hard', value: mostRecent.hardSolved },
        ];
        setPieData(pieData);

        // Data for Bar Chart
        const dataByMonth = {};
        let lastCumulative = { easySolved: 0, mediumSolved: 0, hardSolved: 0 };

        jsonData.sort((a, b) => new Date(a.date) - new Date(b.date));

        jsonData.forEach((item) => {
          const date = new Date(item.date);
          const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

          if (!dataByMonth[monthKey]) {
            dataByMonth[monthKey] = {
              month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
              easySolved: 0,
              mediumSolved: 0,
              hardSolved: 0,
            };
          }

          const easyDelta = item.easySolved - lastCumulative.easySolved;
          const mediumDelta = item.mediumSolved - lastCumulative.mediumSolved;
          const hardDelta = item.hardSolved - lastCumulative.hardSolved;

          dataByMonth[monthKey].easySolved += easyDelta;
          dataByMonth[monthKey].mediumSolved += mediumDelta;
          dataByMonth[monthKey].hardSolved += hardDelta;

          lastCumulative = {
            easySolved: item.easySolved,
            mediumSolved: item.mediumSolved,
            hardSolved: item.hardSolved,
          };
        });

        const barData = Object.values(dataByMonth);
        setBarChartData(barData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetch('/data/submissionCalData.json') // Fetch submission data
      .then((response) => response.json())
      .then((jsonData) => {
        setSubmissionData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching submission data:', error);
      });
  }, []);

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  };

  return (
    <div className="w-9/10 h-5/6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-30 p-6 flex flex-col gap-6">
      <h1 className="text-white text-2xl">Leetcode Dashboard</h1>
      <div className="flex-1 grid grid-rows-2 grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="bg-white bg-opacity-50 rounded-lg col-span-2 p-4 flex flex-col h-full">
          <h2 className="text-black text-xl mb-2">Questions Solved Over Time</h2>
          <div className="flex-1">
            <LeetCodeLineChart data={data} formatMonth={formatMonth} />
          </div>
        </div>
        {/* Pie Chart */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col h-full">
          <h2 className="text-black text-xl mb-2">Difficulty Distribution</h2>
          <div className="flex-1">
            <LeetCodePieChart pieData={pieData} />
          </div>
        </div>
        {/* Bar Chart */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col h-full">
          <h2 className="text-black text-xl mb-2">Monthly Problems Solved by Difficulty</h2>
          <div className="flex-1">
            <LeetCodeBarChart data={barChartData} />
          </div>
        </div>
        {/* Submission Chart */}
        <div className="bg-white bg-opacity-80 rounded-lg p-4 col-span-2 flex flex-col h-full">
          <h2 className="text-black text-xl mb-2">Submissions Calendar</h2>
          <div className="flex-1" >
            <LeetCodeSubmissionChart data={submissionData} />
          </div>
        </div>
        {/* Additional Charts */}
        {/* <div className="bg-white bg-opacity-50 rounded-lg"></div> */}
      </div>
    </div>
  );
}
