import React, { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import Legend from 'cal-heatmap/plugins/Legend';
import 'cal-heatmap/cal-heatmap.css';

const LeetCodeSubmissionChart = ({ data }) => {
  const chartRef = useRef(null);
  const legendRef = useRef(null);
  const cal = useRef(null); // To store the CalHeatmap instance

  useEffect(() => {
    if (!chartRef.current) return;

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
        date: { start: new Date('2024-01-01') }, 
        range: 12, 
        scale: {
          color: {
            type: 'quantize',
            scheme: 'Greens',
            domain: [0, 5], // Adjust domain as needed
          },
        },
        domain: { type: 'month' },
        subDomain: { type: 'day', radius: 2 },
        itemSelector: chartRef.current,
      },
      [
        [
          Tooltip,
          {
            text: (date, value, dayjsDate) =>
              `${value ? `${value} submissions` : 'No submissions'} on ${dayjsDate.format(
                'LL'
              )}`,
          },
        ],
        [
          Legend,
          {
            tickSize: 1,
            width: 100,
            itemSelector: legendRef.current, // Ensured itemSelector is set to legendRef.current
            label: 'Submissions per day',
          },
        ],
      ]
    );
  }, [data]); // Reinitialize only if `data` changes

  return (
    <div style={{ position: 'relative' }}>
      <div id="leetcode-submission-chart" ref={chartRef}></div>
      <div
        id="leetcode-submission-legend"
        ref={legendRef}
        style={{ float: 'right', paddingRight: '200px' }}
      ></div>
    </div>
  );
};

export default LeetCodeSubmissionChart;


