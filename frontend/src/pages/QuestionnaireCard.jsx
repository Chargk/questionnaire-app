import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardInfo,
  ButtonGroup,
  CardButton,
  StatsButton,
} from "../styles/QuestionnaireCard.styles";

const QuestionnaireCard = ({
  id,
  title,
  description,
  questions = [],
  completionCount = 0,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardInfo>Questions: {questions.length}</CardInfo>
      <CardInfo>Completions: {completionCount}</CardInfo>

      <ButtonGroup>
        <CardButton onClick={() => navigate(`/edit/${id}`)}>Edit</CardButton>
        <CardButton onClick={() => onDelete(id)}>Delete</CardButton>
        <CardButton onClick={() => navigate(`/run/${id}`)}>Run</CardButton>
      </ButtonGroup>

      {completionCount > 0 && (
        <StatsButton onClick={() => navigate(`/statistics/${id}`)}>
          📊 View Statistics
        </StatsButton>
      )}
    </CardContainer>
  );
};

export default QuestionnaireCard;
