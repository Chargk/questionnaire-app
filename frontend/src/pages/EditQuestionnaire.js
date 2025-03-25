import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FormContainer,
  Title,
  Label,
  Input,
  SaveButton,
  QuestionList,
  QuestionItem,
  OptionInput,
  RemoveButton,
  AddQuestionButton,
} from "../styles/EditQuestionnaire.styles";

const EditQuestionnaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const res = await fetch(`http://localhost:5000/api/questionnaires/${id}`);
      const data = await res.json();
      setName(data.name);
      setDescription(data.description);
      setQuestions(data.questions || []);
    };

    fetchQuestionnaire();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/questionnaires/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, questions }),
    });

    navigate("/", { state: { success: true } });
  };

  return (
    <FormContainer>
      <Title>Edit Questionnaire</Title>
      <form onSubmit={handleSave}>
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

        <QuestionList>
          {questions.map((q, qIndex) => (
            <QuestionItem key={qIndex}>
              <Label>Question text:</Label>
              <Input
                value={q.text}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "text", e.target.value)
                }
                required
              />

              {q.type !== "text" && (
                <>
                  <Label>Options:</Label>
                  {q.options.map((opt, optIndex) => (
                    <OptionInput
                      key={optIndex}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, optIndex, e.target.value)
                      }
                      placeholder={`Option ${optIndex + 1}`}
                    />
                  ))}
                  <AddQuestionButton
                    type="button"
                    onClick={() => addOption(qIndex)}
                  >
                    Add Option
                  </AddQuestionButton>
                </>
              )}

              <RemoveButton
                type="button"
                onClick={() =>
                  setQuestions((prev) => prev.filter((_, i) => i !== qIndex))
                }
              >
                Remove question
              </RemoveButton>
            </QuestionItem>
          ))}
        </QuestionList>

        <AddQuestionButton
          type="button"
          onClick={() =>
            setQuestions((prev) => [
              ...prev,
              { text: "", type: "text", options: [] },
            ])
          }
        >
          Add New Question
        </AddQuestionButton>

        <SaveButton type="submit">Save Changes</SaveButton>
      </form>
    </FormContainer>
  );
};

export default EditQuestionnaire;
