import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ChartWrapper = styled.div`
  margin-bottom: 50px;
`;

const Statistics = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(
        `http://localhost:5000/api/statistics/${id}`
      );
      const data = await response.json();
      setStats(data);
    };

    fetchStats();
  }, [id]);

  if (!stats) return <p>Loading statistics...</p>;

  return (
    <Container>
      <BackLink to="/">← Back to catalog</BackLink>
      <Title>Statistics for Questionnaire</Title>
      {Object.keys(stats).map((key) => {
        const question = stats[key];
        const chartData = Object.entries(question.results).map(
          ([option, count]) => ({ name: option, count })
        );

        return (
          <ChartWrapper key={key}>
            <h3>{question.text}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        );
      })}
    </Container>
  );
};

export default Statistics;
