import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Title, Description, Info } from "./styles/GlobalStyles";

function RunQuestionnaire() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
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

  if (loading) return <p>Loading...</p>;
  if (!questionnaire) return <p>Questionnaire not found.</p>;

  return (
    <Container>
      <Title>{questionnaire.name}</Title>
      <Description>{questionnaire.description}</Description>
      <Info>Number of questions: {questionnaire.questionsCount}</Info>
    </Container>
  );
}

export default RunQuestionnaire;
