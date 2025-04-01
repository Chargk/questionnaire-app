import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FormContainer,
  Title,
  Label,
  Input,
  SaveButton,
  AddQuestionButton,
} from "../../styles/EditQuestionnaire.styles";
import { QuestionariesService } from "../../services/questionaries.service";
import { QuestionariesList } from "./components/questionaries-list";

const EditQuestionnaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect( () => {
    const fetchQuestionnaire = async () => {
      const data = await QuestionariesService.getQuestionnaire(id)

      setName(data.name);
      setDescription(data.description);
      setQuestions(data.questions || []);
    }

    fetchQuestionnaire();
  }, [id]);

  const handleQuestionRemoving = (qIndex) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex))
  }

  const handleAddingNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { text: "", type: "text", options: [] },
    ])

  }

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

    await QuestionariesService.updateQuestionnaire(id, { name, description, questions })

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

        <QuestionariesList
          addOption={addOption}
          questions={questions}
          handleQuestionChange={handleQuestionChange}
          handleOptionChange={handleOptionChange}
          handleQuestionRemoving={handleQuestionRemoving}
        />

        <AddQuestionButton
          type="button"
          onClick={handleAddingNewQuestion}
        >
          Add New Question
        </AddQuestionButton>

        <SaveButton type="submit">Save Changes</SaveButton>
      </form>
    </FormContainer>
  );
};

export default EditQuestionnaire;
