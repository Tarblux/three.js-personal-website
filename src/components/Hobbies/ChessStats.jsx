import React, { useState, useEffect, useCallback } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { format, parseISO } from 'date-fns';
import CustomSelect from '../UI/CustomSelect';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const timeControls = [
  { label: 'Blitz', value: 'blitz', icon: '/images/Hobbies/hobbies-blitz.svg' },
  { label: 'Bullet', value: 'bullet', icon: '/images/Hobbies/hobbies-bullet.svg' },
  { label: 'Rapid', value: 'rapid', icon: '/images/Hobbies/hobbies-rapid.svg' },
];
const periods = [
  { label: 'Last 90 Days', value: '90d' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'All', value: 'all' },
];

function filterData(allData, period) {
  if (!Array.isArray(allData)) return [];
  const now = new Date();
  let filterDate;
  if (period === '90d') {
    filterDate = new Date(now);
    filterDate.setDate(filterDate.getDate() - 90);
  } else if (period === 'month') {
    filterDate = new Date(now);
    filterDate.setMonth(filterDate.getMonth() - 1);
  } else if (period === 'week') {
    filterDate = new Date(now);
    filterDate.setDate(filterDate.getDate() - 7);
  } else if (period === 'year') {
    filterDate = new Date(now);
    filterDate.setFullYear(filterDate.getFullYear() - 1);
  } else {
    return allData;
  }
  return allData.filter(entry => new Date(entry.date) >= filterDate);
}

const ChessStats = ({ isMobile }) => {
  const [selectedControl, setSelectedControl] = useState(timeControls[0]); // Default to Blitz
  const [selectedPeriod, setSelectedPeriod] = useState(periods[2]); // Default to Month
  const [ratings, setRatings] = useState({
    blitz: { year: null, all: null },
    rapid: { year: null, all: null },
    bullet: { year: null, all: null },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New state for rank/percentile
  const [rankData, setRankData] = useState([]);
  const [rankLoading, setRankLoading] = useState(true);
  const [rankError, setRankError] = useState(null);

  // Fetch global rank/percentile on mount
  useEffect(() => {
    async function fetchRank() {
      setRankLoading(true);
      setRankError(null);
      try {
        const endpoint = `${API_BASE_URL}/chess-rank`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch rank data');
        const data = await res.json();
        setRankData(data);
      } catch (err) {
        setRankError('Failed to load rank data.');
      } finally {
        setRankLoading(false);
      }
    }
    fetchRank();
  }, []);

  // Helper to get endpoint
  const getEndpoint = useCallback((control, period) => {
    let endpoint = `${API_BASE_URL}/ratings-${control}`;
    if (period === 'all') {
      endpoint += '?period=all';
    }
    return endpoint;
  }, []);

  // Fetch data for a control/period
  const fetchRatings = useCallback(async (control, period) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = getEndpoint(control, period);
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch ratings');
      const data = await res.json();
      setRatings(prev => ({
        ...prev,
        [control]: {
          ...prev[control],
          [period]: data,
        },
      }));
    } catch (err) {
      setError('Failed to load ratings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [getEndpoint]);

  // Initial fetch: Blitz, Year
  useEffect(() => {
    if (!ratings.blitz.year) {
      fetchRatings('blitz', 'year');
    }
  }, []);

  // Handle time control change
  useEffect(() => {
    const control = selectedControl.value;
    const period = selectedPeriod.value;
    if (period === 'all') {
      if (!ratings[control].all) {
        fetchRatings(control, 'all');
      }
    } else {
      if (!ratings[control].year) {
        fetchRatings(control, 'year');
      }
    }
  }, [selectedControl, selectedPeriod]);

  // Get data to display
  let chartData = [];
  const control = selectedControl.value;
  const period = selectedPeriod.value;
  if (period === 'all') {
    chartData = ratings[control].all || [];
  } else {
    // Always filter from 'year' or 'all' if available
    const baseData = ratings[control].all || ratings[control].year || [];
    chartData = filterData(baseData, period);
  }

  // Prepare chart x/y
  const xAxisData = chartData.map(d => d.date ? d.date.slice(0, 10) : '');
  const yAxisData = chartData.map(d => d.my_rating);

  // Dynamically set y-axis minimum
  const minRating = Math.min(...yAxisData.filter(v => typeof v === 'number'));
  const yAxisMin = Math.max(500, minRating - 200);

  // Get rank/percentile for selected control
  let globalRank = '-';
  let percentile = '-';
  if (rankLoading) {
    globalRank = percentile = '...';
  } else if (rankError) {
    globalRank = percentile = 'Err';
  } else if (rankData && rankData.length > 0) {
    const found = rankData.find(r => r.time_control === control);
    if (found) {
      globalRank = found.global_rank?.toLocaleString() ?? '-';
      if (found.percentile) {
        const perc = found.percentile;
        percentile = perc.endsWith('.00') ? `${parseInt(perc, 10)}%` : `${perc}%`;
      } else {
        percentile = '-';
      }
    }
  }

  // Calculate current rating and rating change for the selected period
  let currentRating = '-';
  let ratingChange = 0;
  let ratingChangeColor = '';
  let ratingArrow = null;
  if (yAxisData.length > 0) {
    const first = yAxisData[0];
    const last = yAxisData[yAxisData.length - 1];
    if (typeof last === 'number' && typeof first === 'number') {
      currentRating = last;
      ratingChange = last - first;
      if (ratingChange > 0) {
        ratingChangeColor = 'text-green-600';
        ratingArrow = <img src="/images/Hobbies/arrow-up.svg" alt="Up" className="inline w-5 h-5 ml-1" />;
      } else if (ratingChange < 0) {
        ratingChangeColor = 'text-red-600';
        ratingArrow = <img src="/images/Hobbies/arrow-down.svg" alt="Down" className="inline w-5 h-5 ml-1" />;
      } else {
        ratingChangeColor = 'text-gray-400';
        ratingArrow = null;
      }
    }
  }

  // Determine tick modulo based on period
  let tickModulo = 1;
  if (period === '90d') tickModulo = 4;
  else if (period === 'all') tickModulo = 12;
  else if (period === 'year') tickModulo = 6;
  else if (period === 'month') tickModulo = 2;
  else if (period === 'week') tickModulo = 1;

  return (
    <div className="sm:col-span-4 sm:row-span-4 flex flex-col relative">
      {/* Top Row: Dropdowns and Stats*/}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-3 sm:mb-2 gap-3 sm:gap-0">
        {/* Dropdowns */}
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          {/* Time Control Dropdown */}
          <div className="relative">
            <CustomSelect
              value={selectedControl.value}
              onChange={val => {
                const control = timeControls.find(tc => tc.value === val);
                setSelectedControl(control);
              }}
              options={timeControls}
            />
          </div>
          {/* Period Dropdown */}
          <div className="relative">
            <CustomSelect
              value={selectedPeriod.value}
              onChange={val => {
                const period = periods.find(p => p.value === val);
                setSelectedPeriod(period);
              }}
              options={periods}
            />
          </div>  
        </div>
        {/* Stats */}
        <div className="flex items-center justify-center sm:justify-end">
          <div className="flex flex-col justify-start">
            <div className="flex flex-row gap-6 sm:gap-4">
              {/* Label Row */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-0.5">
                  <img src="/images/Hobbies/hobbies-ranking.svg" alt="Global Rank" className="w-4 h-4" />
                  <span className="font-semibold text-gray-400 text-sm sm:text-md">Global Rank</span>
                </div>
                <span className="font-bold text-[#0A0E14] text-sm sm:text-[13px] sm:ml-5">{globalRank}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-0.5">
                  <img src="/images/Hobbies/hobbies-percentile.svg" alt="Percentile" className="w-4 h-4" />
                  <span className="font-semibold text-gray-400 text-sm sm:text-md">Percentile</span>
                </div>
                <span className="font-bold text-[#0A0E14] text-sm sm:text-[13px] sm:ml-5">{percentile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Container: White background for rating and chart */}
      <div className="flex flex-col flex-1 bg-white rounded-2xl shadow min-h-[300px] max-h-[400px] sm:min-h-[380px] sm:max-h-[480px] transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl cursor-pointer">
        {/* Rating + Change*/}
        <div className="flex flex-row items-end justify-center sm:justify-start min-w-[120px] px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
          {loading ? (
            <>
              <div className="w-16 h-10 sm:w-20 sm:h-12 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div className="flex flex-col items-center sm:items-start justify-end mb-1">
                <div className="w-16 sm:w-20 h-3 bg-gray-200 rounded animate-pulse mb-1 sm:mb-2 sm:ml-1"></div>
                <div className="w-10 sm:w-12 h-4 sm:h-5 bg-gray-200 rounded animate-pulse sm:ml-1"></div>
              </div>
            </>
          ) : (
            <>
              <span className="text-4xl sm:text-5xl font-extrabold text-[#2b4eff] leading-none mr-2" style={{lineHeight: '1.05'}}>{currentRating}</span>
              <div className="flex flex-col items-center sm:items-start justify-end mb-1">
                <span className="text-xs text-gray-400 font-semibold mb-1 sm:ml-1">Rating Change</span>
                <span
                  className={`text-lg font-bold flex items-center ${ratingChangeColor} sm:ml-1`}
                  style={{marginTop: '-2px'}}
                >
                  {ratingArrow}
                  <span className="ml-1">{ratingChange > 0 ? '+' : ''}{ratingChange}</span>
                </span>
              </div>
            </>
          )}
        </div>
        
        {/* Line Chart Section */}
        <div className="flex-1 flex items-center justify-center mt-1 sm:mt-2 min-h-[240px] sm:min-h-[340px] px-1 sm:px-2 pb-3 sm:pb-4">
          {loading ? (
            <div className="w-full h-full flex flex-col">
              {/* Chart skeleton with gradient background */}
              <div className="flex-1 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg animate-pulse relative overflow-hidden">
                {/* Simulated chart lines */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-100 to-transparent opacity-50"></div>
                <div className="absolute inset-4">
                  <div className="w-full h-px bg-gray-200 mt-6 sm:mt-8"></div>
                  <div className="w-full h-px bg-gray-200 mt-8 sm:mt-12"></div>
                  <div className="w-full h-px bg-gray-200 mt-8 sm:mt-12"></div>
                  <div className="w-full h-px bg-gray-200 mt-8 sm:mt-12"></div>
                </div>
                {/* Simulated data points */}
                <div className="absolute bottom-16 sm:bottom-20 left-6 sm:left-8 w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="absolute bottom-18 sm:bottom-24 left-16 sm:left-20 w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="absolute bottom-20 sm:bottom-28 left-26 sm:left-32 w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="absolute bottom-16 sm:bottom-20 left-36 sm:left-44 w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="hidden sm:block absolute bottom-32 left-56 w-2 h-2 bg-blue-300 rounded-full"></div>
              </div>
              {/* X-axis labels skeleton */}
              <div className="flex justify-between px-3 sm:px-4 mt-1 sm:mt-2">
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="hidden sm:block w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : error ? (
            <span className="text-red-500 text-lg">{error}</span>
          ) : (
            <>
              <LineChart
                xAxis={[{
                  data: xAxisData,
                  scaleType: 'point',
                  valueFormatter: (date) => {
                    try {
                      return format(parseISO(date), 'MMM d, yyyy');
                    } catch {
                      return date;
                    }
                  },
                  tickInterval: (value, index) => index % tickModulo === 0,
                  tickLabelInterval: (value, index) => index % tickModulo === 0,
                  tickSize: 1,
                  tickLabelStyle: {
                    fontSize: isMobile ? 8 : 10,
                    fill: '#000000',
                  },
                  disableTicks: false,
                }]}
                yAxis={[{
                  min: yAxisMin,
                  valueFormatter: (v) => v?.toString() ?? ''
                }]}
                series={[
                  { 
                    data: yAxisData,
                    area: true,
                    showMark: false,
                    curve: 'monotoneX',
                  },
                ]}
                height={isMobile ? 240 : 340}
                margin={{ left: isMobile ? 15 : 20, right: isMobile ? 15 : 20, top: isMobile ? 8 : 10, bottom: isMobile ? 8 : 10 }}
                grid={{horizontal: true }}
                sx={{
                  '& .MuiAreaElement-root': {
                    fill: "url(#chessBlueWhiteGradient)",
                  },
                }}
              >
                <defs>
                  <linearGradient id="chessBlueWhiteGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </LineChart>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessStats; 