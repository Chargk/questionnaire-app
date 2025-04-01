import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ChartContainer } from "../../../styles/StatisticsPage.styles";
import { ChartHeader, PeriodSelect } from "../../../styles/TimeBasedStats.styles";

const TIME_PERIODS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
};

const TimeBasedStats = ({ answers }) => {
  const [timePeriod, setTimePeriod] = useState(TIME_PERIODS.DAY);

  const getTimeBasedData = (period) => {
    if (!answers.length) return [];

    const timeData = {};
    
    answers.forEach(answer => {
      const date = new Date(answer.createdAt._seconds * 1000);
      let key;

      switch(period) {
        case TIME_PERIODS.MONTH:
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case TIME_PERIODS.WEEK:
          const weekNumber = Math.ceil((date.getDate() + date.getDay()) / 7);
          key = `Week ${weekNumber}, ${date.getFullYear()}`;
          break;
        default: // day
          key = date.toISOString().split('T')[0];
      }

      timeData[key] = (timeData[key] || 0) + 1;
    });

    return Object.entries(timeData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getTotalCompletitionCountForSelectedPeriod = (data) => {
    return data.reduce((total, day) => total + day.count, 0)
  }

  return (
    <ChartContainer>
      <ChartHeader>
        <PeriodSelect 
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value={TIME_PERIODS.DAY}>Daily</option>
          <option value={TIME_PERIODS.WEEK}>Weekly</option>
          <option value={TIME_PERIODS.MONTH}>Monthly</option>
        </PeriodSelect>

        <div>
          <h3>Total Completions Over Time</h3>
          <p style={{ 
            margin: '5px 0 0 0', 
            fontSize: '1.2rem', 
            color: '#666' 
          }}>
            Total: {getTotalCompletitionCountForSelectedPeriod(getTimeBasedData(timePeriod))}
          </p>
        </div>
      </ChartHeader>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getTimeBasedData(timePeriod)}>
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            name="Total Completions"
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TimeBasedStats; 