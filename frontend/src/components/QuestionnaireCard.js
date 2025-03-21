import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Play } from "lucide-react";
import {
  Card,
  CardTitle,
  CardText,
  CardButtonGroup,
  Button,
} from "../styles/QuestionnaireCard.styles";

const QuestionnaireCard = ({ questionnaire, onRequestDelete }) => {
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
        <Button onClick={() => navigate(`/edit/${questionnaire.id}`)}>
          <Edit size={18} /> Edit
        </Button>
        <Button onClick={() => onRequestDelete(questionnaire.id)}>
          <Trash2 size={18} /> Delete
        </Button>
        <Button onClick={() => navigate(`/run/${questionnaire.id}`)}>
          <Play size={18} /> Run
        </Button>
      </CardButtonGroup>
    </Card>
  );
};

export default QuestionnaireCard;
