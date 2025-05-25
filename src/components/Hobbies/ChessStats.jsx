import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const timeControls = [
  { label: 'Rapid', icon: '/images/Hobbies/hobbies-rapid.svg' },
  { label: 'Bullet', icon: '/images/Hobbies/hobbies-bullet.svg' },
  { label: 'Blitz', icon: '/images/Hobbies/hobbies-blitz.svg' },
];
const periods = [
  { label: 'Last 90 Days', value: '90d' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'All', value: 'all' },
];

const mockStats = {
  globalRank: '198,345',
  percentile: '98%',
};

const ChessStats = () => {
  const [selectedControl, setSelectedControl] = useState(timeControls[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

  return (
    <div className="col-span-4 row-span-4 flex flex-col relative">
      {/* Top Row: Dropdowns and Stats */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {/* Time Control Dropdown */}
          <div className="relative">
            <button className="flex items-center bg-white px-3 py-1.5 rounded-md shadow border border-gray-200 font-semibold text-gray-700 text-base gap-2 min-w-[90px]" type="button">
              <img src={selectedControl.icon} alt={selectedControl.label} className="w-5 h-5" />
              {selectedControl.label}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {/* Dropdown menu (not functional for now) */}
          </div>
          {/* Period Dropdown */}
          <div className="relative">
            <button className="flex items-center bg-white px-3 py-1.5 rounded-md shadow border border-gray-200 font-semibold text-gray-700 text-base gap-2 min-w-[120px]" type="button">
              {selectedPeriod.label}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {/* Dropdown menu (not functional for now) */}
          </div>  
        </div>
        {/* Stats */}
        <div className="flex items-center">
          <div className="flex flex-col justify-start">
            <div className="flex flex-row gap-4">
              {/* Label Row */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0.5">
                  <img src="/images/Hobbies/hobbies-ranking.svg" alt="Global Rank" className="w-4 h-4" />
                  <span className="font-semibold text-gray-400 text-md">Global Rank</span>
                </div>
                <span className="font-bold text-[#0A0E14] text-[13px] ml-5">{mockStats.globalRank}</span>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0.5">
                  <img src="/images/Hobbies/hobbies-percentile.svg" alt="Percentile" className="w-4 h-4" />
                  <span className="font-semibold text-gray-400 text-md">Percentile</span>
                </div>
                <span className="font-bold text-[#0A0E14] text-[13px] ml-5">{mockStats.percentile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Line Chart Section */}
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow mt-2">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], scaleType: 'point' }]}
          series={[
            { data: [1200, 1250, 1230, 1280, 1300, 1290, 1320]},
          ]}
          height={340}
          margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>
    </div>
  );
};

export default ChessStats; 