import React from 'react'
import { LineChart , Line , XAxis , YAxis , CartesianGrid , Tooltip , ResponsiveContainer, Legend } from 'recharts'

export default function LeetCodeLineChart({ data, formatMonth }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => formatMonth(tick)}
              tick={{ fill: '#000' }}
            />
            <YAxis tick={{ fill: '#000' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="easySolved" name="Easy" stroke="#82ca9d" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="mediumSolved" name="Medium" stroke="#ffc658" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="hardSolved" name="Hard" stroke="#ff7300" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      );
    };