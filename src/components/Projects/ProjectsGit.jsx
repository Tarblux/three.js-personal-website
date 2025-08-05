import React, { useEffect, useRef, useState } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import LegendLite from 'cal-heatmap/plugins/LegendLite';
import 'cal-heatmap/cal-heatmap.css';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const ProjectsGit = () => {
    const chartRef = useRef(null);
    const legendRef = useRef(null);
    const cal = useRef(null);
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [totalContributions, setTotalContributions] = useState(0);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [isLoading, setIsLoading] = useState(true);

    const years = [2025, 2024, 2023];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let jsonData;
                if (selectedYear === 2025) {
                    const response = await fetch(`${API_BASE_URL}/git-contributions`);
                    jsonData = await response.json();
                    let startDate = new Date(jsonData.date_range_start);
                    startDate.setMonth(startDate.getMonth() + 1);
                    setTotalContributions(jsonData.total_contributions);
                    setDateRange({
                        start: startDate.toISOString(),
                        end: jsonData.date_range_end
                    });
                    const contributions = jsonData.contributions;
                    const formattedData = Object.entries(contributions).map(([date, value]) => ({
                        date,
                        value
                    }));
                    setData(formattedData);
                } else {
                    const response = await fetch(`/data/git-contributions-${selectedYear}.json`);
                    jsonData = await response.json();
                    const contributions = jsonData[0].contributions;
                    setTotalContributions(jsonData[0].totalContributions);
                    setDateRange({
                        start: `${selectedYear}-01-01`,
                        end: `${selectedYear}-12-31`
                    });
                    const formattedData = Object.entries(contributions).map(([date, value]) => ({
                        date,
                        value
                    }));
                    setData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching contribution data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        if (!chartRef.current || data.length === 0) return;

        if (!cal.current) {
            cal.current = new CalHeatmap();
        }

        // Check if mobile screen
        const isMobile = window.innerWidth < 640;

        cal.current.paint(
            {
                data: {
                    source: data,
                    type: 'json',
                    x: 'date',
                    y: 'value',
                },
                date: { 
                    start: dateRange.start ? new Date(dateRange.start) : undefined,
                    highlight: new Date()
                },
                range: 12,
                scale: {
                    color: {
                        type: 'threshold',
                        range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        domain: [1, 2, 3, 4],
                    },
                },
                domain: {
                    type: 'month',
                    gutter: isMobile ? 2 : 4,
                    label: { text: 'MMM', textAlign: 'start', position: 'top' },
                },
                subDomain: { 
                    type: 'ghDay', 
                    radius: 1, 
                    width: isMobile ? 5 : 7.3, 
                    height: isMobile ? 5 : 7, 
                    gutter: isMobile ? 1 : 2,
                    highlight: 'now'
                },
                itemSelector: chartRef.current,
            },
            [
                [
                    Tooltip,
                    {
                        text: function (date, value, dayjsDate) {
                            return (
                                (value ? value : 'No') +
                                ' contributions on ' +
                                dayjsDate.format('dddd, MMMM D, YYYY')
                            );
                        },
                    },
                ],
                [
                    LegendLite,
                    {
                        includeBlank: true,
                        itemSelector: legendRef.current,
                        radius: 1,
                        width: isMobile ? 5 : 7,
                        height: isMobile ? 5 : 7,
                        gutter: isMobile ? 1 : 2,
                    },
                ]
            ]
        );

        return () => {
            if (cal.current) {
                cal.current.destroy();
                cal.current = null;
            }
        };
    }, [data, dateRange]);

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    return (
        <div className="p-1 sm:p-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 gap-1 sm:gap-0">
                <h3 className="text-xs sm:text-base font-semibold text-black">
                    <span className="text-[#40c463]">{totalContributions}</span> contributions in {selectedYear === new Date().getFullYear() ? 'the last year' : selectedYear}
                </h3>
                <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="px-1 py-0.5 text-xs bg-[#000000] text-white rounded-md border border-gray-300 hover:bg-[#2f3640] cursor-pointer"
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div id="git-contribution-chart" ref={chartRef} className="mb-1 sm:mb-2 overflow-x-auto"></div>
            <div className="flex justify-end items-center text-xs mb-1 sm:mb-2 gap-1">
                <span className="text-gray-500">Less</span>
                <div
                    id="git-contribution-legend"
                    ref={legendRef}
                    className="inline-block mx-1"
                ></div>
                <span className="text-gray-500">More</span>
            </div>
        </div>
    );
};

export default ProjectsGit;