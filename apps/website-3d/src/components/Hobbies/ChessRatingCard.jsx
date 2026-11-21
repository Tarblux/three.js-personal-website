import React from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const ChessRatingCard = ({
  iconSrc,
  alt,
  label,
  rating,
  sparklineData,
  change,
  getChangeColor,
  getChangeTextColor,
  formatChange,
}) => (
  <div className="bg-white rounded-2xl shadow-md h-28 flex flex-row px-1 py-4 justify-start transition-transform duration-200 hover:scale-105">
    {/* Left: Icon and Info */}
    <div className="flex flex-col justify-end">
      <div className="flex flex-row items-center">
        <img src={iconSrc} alt={alt} className="w-10 h-10" />
        <div className="flex flex-col justify-center ml-1">
          <span className="text-gray-500 font-semibold text-md">{label}</span>
          <span className="text-2xl font-bold text-black leading-tight">{rating}</span>
        </div>
      </div>
    </div>
    {/* Right: Sparkline and Change */}
    <div className="flex flex-col items-center justify-center ml-10">
      <SparkLineChart
        data={sparklineData}
        width={150}
        height={50}
        showTooltip={true}
        curve="monotoneX"
        color={getChangeColor(change)}
        sx={{ marginBottom: '-12px', '& .MuiLineElement-root': { strokeWidth: 4, strokeLinecap: 'round' } }}
      />
      <span className={`${getChangeTextColor(change)} font-bold text-lg mt-1`}>
        {formatChange(change)}
      </span>
    </div>
  </div>
);

export default ChessRatingCard; 