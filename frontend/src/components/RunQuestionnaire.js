import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  QuestionBlock,
  QuestionText,
  Input,
  SubmitButton,
} from "../styles/RunQuestionnaire.styles";
import SubmissionNotification from "../styles/SubmissionNotification";

const RunQuestionnaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/questionnaires/${id}`);
      const data = await res.json();

      if (typeof data.questions === "string") {
        data.questions = JSON.parse(data.questions);
      }

      setQuestionnaire(data);
    };

    fetchData();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionnaireId: id, answers }),
    });

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      navigate("/");
    }, 2500);
  };

  if (!questionnaire) return <p>Loading...</p>;

  return (
    <Container>
      <Title>{questionnaire.name}</Title>
      <p>{questionnaire.description}</p>
      <form onSubmit={handleSubmit}>
        {questionnaire.questions &&
          questionnaire.questions.map((q, index) => (
            <QuestionBlock key={index}>
              <QuestionText>{q.text}</QuestionText>
              {q.type === "text" && (
                <Input
                  type="text"
                  placeholder="Your answer"
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
              )}
              {q.type === "single" &&
                q.options.map((opt, idx) => (
                  <div key={idx}>
                    <label>
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={opt}
                        onChange={() => handleAnswerChange(q.id, opt)}
                      />{" "}
                      {opt}
                    </label>
                  </div>
                ))}
              {q.type === "multiple" &&
                q.options.map((opt, idx) => (
                  <div key={idx}>
                    <label>
                      <input
                        type="checkbox"
                        name={`q${index}`}
                        value={opt}
                        onChange={(e) => {
                          const currentValues = answers[q.id] || [];
                          if (e.target.checked) {
                            handleAnswerChange(q.id, [...currentValues, opt]);
                          } else {
                            handleAnswerChange(
                              q.id,
                              currentValues.filter((val) => val !== opt)
                            );
                          }
                        }}
                      />{" "}
                      {opt}
                    </label>
                  </div>
                ))}
            </QuestionBlock>
          ))}
        <SubmitButton type="submit">Submit Answers</SubmitButton>
      </form>

      <SubmissionNotification
        show={showNotification}
        message="Answers submitted successfully!"
      />
    </Container>
  );
};

export default RunQuestionnaire;
