import React, { useEffect, useRef } from 'react';

import Tooltip from 'cal-heatmap/plugins/Tooltip';
import Legend from 'cal-heatmap/plugins/Legend';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

const LeetCodeSubmissionChart = ({ data }) => {
  const chartRef = useRef(null);
  const legendRef = useRef(null);
  const cal = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !legendRef.current || !data) return;

    // Initialize CalHeatmap
    cal.current = new CalHeatmap();
    cal.current.paint(
      {
        data: {
          source: data, // Use parsed JSON data directly
          type: 'json', // Format type
          x: 'date', // The date field in your JSON data
          y: 'value', // The value field in your JSON data
        },
        date: { start: new Date('2024-01-01') }, // Adjusts the start date as needed
        range: 12, // Number of months to display
        scale: {
          color: {
            type: 'quantize',
            scheme: 'Greens', // Color scheme
            domain: [0, 1, 2, 3, 4, 5], // Adjusts according to submission data
          },
        },
        domain: {
          type: 'month', // Group data by month
        },
        subDomain: { type: 'day', radius: 2 }, // Represents each day
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
            tickSize: 0,
            width: 100,
            itemSelector: legendRef.current,
            label: 'Submissions per day',
          },
        ],
      ]
    );
  }, [data]);

  return (
    <div style={{ display: 'inline-block' }}>
      <div id="leetcode-submission-chart" ref={chartRef}></div>
      <a
        className="button button--sm button--secondary margin-top--sm"
        href="#"
        onClick={e => {
          e.preventDefault();
          cal.current.previous();
        }}
      >
        ← Previous
      </a>
      <a
        className="button button--sm button--secondary margin-left--xs margin-top--sm"
        href="#"
        onClick={e => {
          e.preventDefault();
          cal.current.next();
        }}
      >
        Next →
      </a>
      <div id="leetcode-submission-legend" ref={legendRef} style={{ float: 'right' }}></div>
    </div>
  );
};

export default LeetCodeSubmissionChart;

