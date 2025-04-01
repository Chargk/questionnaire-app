import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
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
import { QuestionariesService } from "../services/questionaries.service";
import { AddQuestionButton, OptionInput } from "../styles/EditQuestionnaire.styles";

function QuestionnaireBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
      if(id) {
        const fetchQuestionnaire = async () => {
          const data = await QuestionariesService.getQuestionnaire(id)

          setName(data.name);
          setDescription(data.description);
          setQuestions(data.questions || []);
        }

        fetchQuestionnaire();
      }
  }, [id]);


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

  const handleQuestionnaireCreate = async () => {
    setLoading(true);

    const questionnaire = {
      name,
      description,
      questions,
      completions: 0,
    };

    await QuestionariesService.createQuestionnaire(questionnaire)

    setLoading(false);
    navigate("/", { state: { success: true } });
  };

  const handleQuestionnaireUpdate = async () => {
    await QuestionariesService.updateQuestionnaire(id, { name, description, questions })

    navigate("/", { state: { success: true } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      return handleQuestionnaireUpdate()
    }

    return handleQuestionnaireCreate()
  }

  const handleEditQuestion = (qIndex) => {
    const question = questions[qIndex]
    setQuestions(prev => prev.filter((_, index) => index !== qIndex))
    setQuestionText(question.text);
    setQuestionType(question.type);
    setOptions(question.options);
  }

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };


  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedQuestions = [...questions];
    const [movedItem] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedItem);
    setQuestions(reorderedQuestions);
  };
  
  return (
    <FormContainer>
      <Title>{ id ? "Edit Questionnaire" : "Create New Questionnaire"}</Title>
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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <QuestionList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {questions.map((q, qIndex) => (
                  <Draggable
                    key={qIndex}
                    draggableId={qIndex.toString()}
                    index={qIndex}
                  >
                    {(provided) => (
                      <QuestionItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                                  handleOptionChange(
                                    qIndex,
                                    optIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optIndex + 1}`}
                              />
                            ))}

                          </>
                        )}
                        <AddQuestionButton
                          type="button"
                          onClick={() => handleEditQuestion(qIndex)}
                        >
                          Edit question
                        </AddQuestionButton>
                        <RemoveButton
                          type="button"
                          onClick={() => removeQuestion(q.id)}
                        >
                          Remove question
                        </RemoveButton>
                      </QuestionItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </QuestionList>
            )}
          </Droppable>
        </DragDropContext>

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
