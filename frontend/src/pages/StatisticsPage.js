import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  ChartContainer,
  QuestionBlock,
} from "../styles/StatisticsPage.styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

const StatisticsPage = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const questionnaireRes = await fetch(
        `http://localhost:5000/api/questionnaires/${id}`
      );
      const questionnaireData = await questionnaireRes.json();

      if (typeof questionnaireData.questions === "string") {
        questionnaireData.questions = JSON.parse(questionnaireData.questions);
      }

      setQuestionnaire(questionnaireData);

      const answersRes = await fetch(`http://localhost:5000/api/answers/${id}`);
      const answersData = await answersRes.json();
      setAnswers(answersData);
    };

    fetchStats();
  }, [id]);

  const getChartData = (question) => {
    const dataMap = {};

    answers.forEach((entry) => {
      const userAnswer = entry.answers[question.id];
      if (question.type === "multiple" && Array.isArray(userAnswer)) {
        userAnswer.forEach((option) => {
          dataMap[option] = (dataMap[option] || 0) + 1;
        });
      } else if (userAnswer) {
        dataMap[userAnswer] = (dataMap[userAnswer] || 0) + 1;
      }
    });

    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  };

  if (!questionnaire) return <p>Loading statistics...</p>;

  return (
    <Container>
      <Title>Statistics for: {questionnaire.name}</Title>

      {questionnaire.questions.map((q) => (
        <QuestionBlock key={q.id}>
          <h3>{q.text}</h3>

          {q.type === "text" ? (
            <ul>
              {answers.map((a, index) => (
                <li key={index}>{a.answers[q.id] || "-"}</li>
              ))}
            </ul>
          ) : (
            <ChartContainer>
              {getChartData(q).length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  {q.type === "single" ? (
                    <PieChart>
                      <Pie
                        data={getChartData(q)}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                      >
                        {getChartData(q).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  ) : (
                    <BarChart data={getChartData(q)}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value">
                        {getChartData(q).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                      <Legend />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <p>No data available yet.</p>
              )}
            </ChartContainer>
          )}
        </QuestionBlock>
      ))}
    </Container>
  );
};

export default StatisticsPage;
