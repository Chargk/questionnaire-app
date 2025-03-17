import React, { useState } from "react";
import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const QuestionnaireBuilder = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [] }]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    if (field === "type" && value !== "multiple" && value !== "single") {
      newQuestions[index].options = [];
    }
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const saveQuestionnaire = async () => {
    if (!title || questions.length === 0) {
      alert("Please enter a title and at least one question.");
      return;
    }
    await addDoc(collection(db, "questionnaires"), {
      name: title,
      questions,
    });
    alert("Questionnaire saved!");
    setTitle("");
    setQuestions([]);
  };

  return (
    <Container>
      <h2>Create Questionnaire</h2>
      <Input
        type="text"
        placeholder="Enter questionnaire title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, qIndex) => (
        <div key={qIndex}>
          <Input
            type="text"
            placeholder="Enter question text"
            value={q.text}
            onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
          />
          <Select
            value={q.type}
            onChange={(e) => updateQuestion(qIndex, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
          </Select>
          {(q.type === "single" || q.type === "multiple") && (
            <>
              {q.options.map((opt, oIndex) => (
                <Input
                  key={oIndex}
                  type="text"
                  placeholder="Option"
                  value={opt}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                />
              ))}
              <Button onClick={() => addOption(qIndex)}>Add Option</Button>
            </>
          )}
        </div>
      ))}
      <Button onClick={addQuestion}>Add Question</Button>
      <Button onClick={saveQuestionnaire} style={{ marginTop: "10px" }}>
        Save Questionnaire
      </Button>
    </Container>
  );
};

export default QuestionnaireBuilder;
