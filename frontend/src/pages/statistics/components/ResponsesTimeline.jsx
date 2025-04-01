import React from 'react';
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

const ResponsesTimeline = ({ timelineData }) => {
  return (
    <ChartContainer>
      <h3>Responses Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timelineData}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#8884d8" 
            name="Responses"
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ResponsesTimeline; 