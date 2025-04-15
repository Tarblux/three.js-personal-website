import React, { useEffect, useRef, useState } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import LegendLite from 'cal-heatmap/plugins/LegendLite';
import 'cal-heatmap/cal-heatmap.css';
import dayjs from 'dayjs';

const ProjectsGit = () => {
    const chartRef = useRef(null);
    const legendRef = useRef(null);
    const cal = useRef(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const years = [2025, 2024, 2023];

    const initializeCalendar = (year) => {
        if (!chartRef.current) return;

        if (!cal.current) {
            cal.current = new CalHeatmap();
        }
        
        // Mock data - replace this with actual GitHub API data
        const mockData = {};
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            mockData[d.toISOString().split('T')[0]] = Math.floor(Math.random() * 5);
        }

        cal.current.paint(
            {
                data: {
                    source: mockData,
                    type: 'json',
                    x: 'date',
                    y: 'value',
                },
                date: { 
                    start: new Date(year, 0, 1),
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
                    gutter: 2,
                    label: { text: 'MMM', textAlign: 'start', position: 'top' },
                },
                subDomain: { 
                    type: 'ghDay',
                    radius: 1,
                    width: 7.3,
                    height: 7,
                    gutter: 2
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
                ],
                [
                    CalendarLabel,
                    {
                        width: 15,
                        textAlign: 'start',
                        text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 === 0 ? '' : d)),
                        padding: [15, 0, 0, 0],
                    },
                ],
            ]
        );
    };

    useEffect(() => {
        initializeCalendar(selectedYear);
        
        return () => {
            if (cal.current) {
                cal.current.destroy();
                cal.current = null;
            }
        };
    }, [selectedYear]);

    const handleYearChange = (e) => {
        const year = parseInt(e.target.value);
        setSelectedYear(year);
        if (cal.current) {
            cal.current.destroy();
            cal.current = null;
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">Git Contributions</h3>
                <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="text-sm bg-gray-100 text-gray-600 rounded px-2 py-1 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="relative flex flex-col">
                <div 
                    ref={chartRef}
                    className="flex-1 origin-top-left -mb-10"
                    style={{ width: '100%', height: '100%', overflow: 'hidden', paddingRight: '20px' }}
                ></div>
                
                <div className="flex items-center justify-end -mt-4">
                    <div className="flex items-center text-xs mr-1">
                        <span className="text-gray-500">Less</span>
                        <div
                            ref={legendRef}
                            className="inline-block mx-2"
                        ></div>
                        <span className="text-gray-500">More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsGit;