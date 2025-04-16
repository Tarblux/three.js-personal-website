import React, { useEffect, useRef, useState } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import LegendLite from 'cal-heatmap/plugins/LegendLite';
import 'cal-heatmap/cal-heatmap.css';

const ProjectsGit = () => {
    const chartRef = useRef(null);
    const legendRef = useRef(null);
    const cal = useRef(null);
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [totalContributions, setTotalContributions] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const years = [2025, 2024, 2023];

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                let jsonData;

                if (selectedYear === 2025) {
                    try {
                        response = await fetch('https://google.com');
                        jsonData = await response.json();
                        console.log(jsonData);
                    } catch (error) {
                        console.log('2025 data not available, falling back to 2024...');
                        setSelectedYear(2024);
                        return;
                    }
                } else {
                    response = await fetch(`/data/git-contributions-${selectedYear}.json`);
                    jsonData = await response.json();
                }

                const contributions = jsonData[0].contributions;
                setTotalContributions(jsonData[0].totalContributions);
                
                // Transform the data into the required format
                const formattedData = Object.entries(contributions).map(([date, value]) => ({
                    date,
                    value
                }));
                
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching contribution data:', error);
                if (selectedYear === 2025) {
                    console.log('Falling back to 2024 data...');
                    setSelectedYear(2024);
                }
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

        cal.current.paint(
            {
                data: {
                    source: data,
                    type: 'json',
                    x: 'date',
                    y: 'value',
                },
                date: { 
                    start: new Date(`${selectedYear}-01-01`),
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
                    gutter: 4,
                    label: { text: 'MMM', textAlign: 'start', position: 'top' },
                },
                subDomain: { 
                    type: 'ghDay', 
                    radius: 1, 
                    width: 7.3, 
                    height: 7, 
                    gutter: 2,
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
                        width: 7,
                        height: 7,
                        gutter: 2,
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
    }, [data, selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-black">
                    <span className="text-[#40c463]">{totalContributions}</span> contributions in {selectedYear === new Date().getFullYear() ? 'the last year' : selectedYear}
                </h3>
                <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="px-2 py-1 text-sm bg-[#000000] text-white rounded-md border border-gray-300 hover:bg-[#2f3640] cursor-pointer"
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div id="git-contribution-chart" ref={chartRef} className="mb-4"></div>
            <div className="float-right text-xs mb-4">
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