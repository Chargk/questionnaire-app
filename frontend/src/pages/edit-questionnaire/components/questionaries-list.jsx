import {
  AddQuestionButton,
  Input,
  Label,
  OptionInput,
  QuestionItem,
  RemoveButton, StyledQuestionList
} from "../../../styles/EditQuestionnaire.styles";
import React from "react";

export const QuestionariesList = ({ questions, handleQuestionChange, handleOptionChange, handleQuestionRemoving, addOption }) => {

  return (
    <StyledQuestionList>
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

              <Options options={q.options} qIndex={q.index} handleOptionChange={handleOptionChange} />

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
            onClick={() => handleQuestionRemoving(qIndex)}
          >
            Remove question
          </RemoveButton>
        </QuestionItem>
      ))}
    </StyledQuestionList>
  )
}

const Options = ({ options, qIndex, handleOptionChange }) => {
  return options.map((opt, optIndex) => (
    <OptionInput
      key={optIndex}
      value={opt}
      onChange={(e) =>
        handleOptionChange(qIndex, optIndex, e.target.value)
      }
      placeholder={`Option ${optIndex + 1}`}
    />
  ))
}
