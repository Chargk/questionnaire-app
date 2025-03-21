import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  FormContainer,
  Title,
  Label,
  Input,
  SaveButton,
} from "../styles/QuestionnaireBuilder.styles";

function QuestionnaireBuilder() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const questionnaire = {
      name,
      description,
      questions: [],
      completions: 0,
    };

    await fetch("http://localhost:5000/api/questionnaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionnaire),
    });

    setLoading(false);
    navigate("/", { state: { success: true } });
  };

  return (
    <FormContainer>
      <Title>Create New Questionnaire</Title>
      <form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label>Description:</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <SaveButton type="submit">
          {loading ? <ClipLoader color="#fff" size={18} /> : "Save"}
        </SaveButton>
      </form>
    </FormContainer>
  );
}

export default QuestionnaireBuilder;
