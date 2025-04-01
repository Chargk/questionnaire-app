import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  GeneralStatsContainer,
  StatsCard,
  StatsGrid,
} from "../../styles/StatisticsPage.styles.js";
import { QuestionariesService } from "../../services/questionaries.service";
import { AnswersService } from "../../services/answers.service";
import { formatDuration } from "../../utils/time";
import TimeBasedStats from "./components/TimeBasedStats";
import ResponsesTimeline from "./components/ResponsesTimeline";
import QuestionStats from "./components/QuestionStats";

const StatisticsPage = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [questionnaireData, answersData] = await Promise.all([
          QuestionariesService.getQuestionnaire(id),
          AnswersService.getAnswers(id),
        ]);

        setQuestionnaire(questionnaireData);
        setAnswers(answersData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, [id]);

  const getChartData = (question, qIndex) => {
    const dataMap = {};

    answers.forEach((entry) => {
      const userAnswer = entry.answers[qIndex];
      if (question.type === "multiple" && typeof userAnswer === "string") {
        userAnswer.split(",").forEach((option) => {
          dataMap[option] = (dataMap[option] || 0) + 1;
        });
      } else if (userAnswer) {
        dataMap[userAnswer] = (dataMap[userAnswer] || 0) + 1;
      }
    });

    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  };

  const calculateGeneralStats = () => {
    if (!answers.length) return null;

    // Calculate average completion time
    const answersWithTimes = answers.filter((a) => a.finishTime && a.startTime);
    const completionTimes = answersWithTimes.map(
      (a) => a.finishTime - a.startTime
    );
    const averageTime =
      completionTimes.reduce((a, b) => a + b, 0) / answersWithTimes.length;

    // Group completions by date
    const timelineData = answersWithTimes.reduce((acc, answer) => {
      const date = new Date(answer.finishTime).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const timeSeriesData = Object.entries(timelineData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      totalResponses: answersWithTimes.length,
      averageCompletionTime: formatDuration(averageTime),
      timelineData: timeSeriesData,
    };
  };

  if (!questionnaire) return <p>Loading statistics...</p>;

  const generalStats = calculateGeneralStats();

  return (
    <Container>
      <Title>Statistics for: {questionnaire.name}</Title>

      {generalStats && (
        <GeneralStatsContainer>
          <h2>General Statistics</h2>
          <StatsGrid>
            <StatsCard>
              <h3>Total Responses</h3>
              <p>{generalStats.totalResponses}</p>
            </StatsCard>
            <StatsCard>
              <h3>Average Completion Time</h3>
              <p>{generalStats.averageCompletionTime}</p>
            </StatsCard>
          </StatsGrid>

          <TimeBasedStats
            answers={answers}
            totalResponses={generalStats.totalResponses}
          />

          <ResponsesTimeline timelineData={generalStats.timelineData} />
        </GeneralStatsContainer>
      )}

      {questionnaire.questions.map((q, qIndex) => (
        <QuestionStats
          key={q.id}
          question={q}
          answers={answers}
          qIndex={qIndex}
          getChartData={getChartData}
        />
      ))}
    </Container>
  );
};

export default StatisticsPage;
