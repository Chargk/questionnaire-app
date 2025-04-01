import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, QuestionBlock } from "../../../styles/StatisticsPage.styles";

const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

const QuestionStats = ({ question, answers, qIndex, getChartData }) => {
  const chartData = getChartData(question, qIndex) || [];

  return (
    <QuestionBlock key={question.id}>
      <h3>{question.text}</h3>
      <ul>
        {answers.map((a, index) => {
          const answer = a.answers[qIndex];
          let displayAnswer = answer;
          
          if (question.type === 'multiple') {
            displayAnswer = answer?.split(',')?.join(', ');
          }
          
          return <li key={index}>{displayAnswer || "-"}</li>
        })}
      </ul>

      <ChartContainer>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value, percent }) => 
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {chartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available yet.</p>
        )}
      </ChartContainer>
    </QuestionBlock>
  );
};

export default QuestionStats; 