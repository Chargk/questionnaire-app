import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  QuestionBlock,
  QuestionText,
  Input,
  SubmitButton,
} from "../styles/RunQuestionnaire.styles";

const RunQuestionnaire = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Answers submitted! (Mock)");
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
                <Input type="text" placeholder="Your answer" />
              )}
              {q.type === "single" &&
                q.options.map((opt, idx) => (
                  <div key={idx}>
                    <label>
                      <input type="radio" name={`q${index}`} value={opt} />{" "}
                      {opt}
                    </label>
                  </div>
                ))}
              {q.type === "multiple" &&
                q.options.map((opt, idx) => (
                  <div key={idx}>
                    <label>
                      <input type="checkbox" name={`q${index}`} value={opt} />{" "}
                      {opt}
                    </label>
                  </div>
                ))}
            </QuestionBlock>
          ))}
        <SubmitButton type="submit">Submit Answers</SubmitButton>
      </form>
    </Container>
  );
};

export default RunQuestionnaire;
