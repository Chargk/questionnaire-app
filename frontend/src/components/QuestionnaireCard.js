import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.5rem;
`;

const CardText = styled.p`
  margin: 4px 0;
  color: #555;
`;

const CardButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

const QuestionnaireCard = ({ questionnaire, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <div>
        <CardTitle>{questionnaire.name}</CardTitle>
        <CardText>{questionnaire.description}</CardText>
        <CardText>
          Questions:{" "}
          {questionnaire.questionsCount || questionnaire.questions?.length || 0}
        </CardText>
        <CardText>Completions: {questionnaire.completions || 0}</CardText>
      </div>
      <CardButtonGroup>
        <Button onClick={() => alert("Edit feature coming soon!")}>Edit</Button>
        <Button onClick={() => onDelete(questionnaire.id)}>Delete</Button>
        <Button onClick={() => navigate(`/run/${questionnaire.id}`)}>
          Run
        </Button>
      </CardButtonGroup>
    </Card>
  );
};

export default QuestionnaireCard;
