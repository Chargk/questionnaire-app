import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  FormContainer,
  Title,
  Label,
  Input,
  SaveButton,
  QuestionSection,
  QuestionItem,
  SmallInput,
  AddOptionButton,
  RemoveButton,
  QuestionList,
  QuestionTypeSelect,
  QuestionTypeWrapper,
} from "../styles/QuestionnaireBuilder.styles";

function QuestionnaireBuilder() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addQuestion = () => {
    if (!questionText.trim()) return;

    const newQuestion = {
      id: Date.now(),
      text: questionText,
      type: questionType,
      options: questionType !== "text" ? options.filter((o) => o.trim()) : [],
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setQuestionType("text");
    setOptions([]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const questionnaire = {
      name,
      description,
      questions,
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

        <QuestionSection>
          <Title>Add Question</Title>
          <Label>Question Text:</Label>
          <Input
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <Label>Question Type:</Label>
          <QuestionTypeWrapper>
            <QuestionTypeSelect
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="text">Text Answer</option>
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choice</option>
            </QuestionTypeSelect>
          </QuestionTypeWrapper>

          {(questionType === "single" || questionType === "multiple") && (
            <>
              <Label>Options:</Label>
              {options.map((opt, idx) => (
                <SmallInput
                  key={idx}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                />
              ))}
              <AddOptionButton type="button" onClick={addOption}>
                + Add Option
              </AddOptionButton>
            </>
          )}

          <SaveButton type="button" onClick={addQuestion}>
            Add Question
          </SaveButton>
        </QuestionSection>

        <QuestionList>
          {questions.map((q) => (
            <QuestionItem key={q.id}>
              {q.text} ({q.type})
              <RemoveButton type="button" onClick={() => removeQuestion(q.id)}>
                Remove
              </RemoveButton>
            </QuestionItem>
          ))}
        </QuestionList>

        <SaveButton type="submit">
          {loading ? (
            <ClipLoader color="#fff" size={18} />
          ) : (
            "Save Questionnaire"
          )}
        </SaveButton>
      </form>
    </FormContainer>
  );
}

export default QuestionnaireBuilder;
