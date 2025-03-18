import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Description,
  Info,
  Button,
} from "../styles/GlobalStyles";

function RunQuestionnaire() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/questionnaires/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched questionnaire:", data);
        setQuestionnaire(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questionnaire:", error));
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    alert("Your responses have been submitted!");
  };

  if (loading) return <p>Loading...</p>;
  if (!questionnaire) return <p>Questionnaire not found.</p>;

  return (
    <Container>
      <Title>{questionnaire.name}</Title>
      <Description>{questionnaire.description}</Description>
      <Info>Number of questions: {questionnaire.questions?.length || 0}</Info>

      <form onSubmit={(e) => e.preventDefault()}>
        {questionnaire.questions && questionnaire.questions.length > 0 ? (
          questionnaire.questions.map((q) => (
            <div key={q.id}>
              <p>{q.text}</p>

              {q.type === "text" && (
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              )}

              {q.type === "single" &&
                q.options?.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleChange(q.id, option)}
                    />
                    {option}
                  </label>
                ))}

              {q.type === "multiple" &&
                q.options?.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={answers[q.id]?.includes(option) || false}
                      onChange={(e) => {
                        const newAnswers = answers[q.id] || [];
                        if (e.target.checked) {
                          newAnswers.push(option);
                        } else {
                          newAnswers.splice(newAnswers.indexOf(option), 1);
                        }
                        handleChange(q.id, [...newAnswers]);
                      }}
                    />
                    {option}
                  </label>
                ))}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default RunQuestionnaire;
