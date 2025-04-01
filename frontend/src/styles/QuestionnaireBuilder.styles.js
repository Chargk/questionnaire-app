import styled from "styled-components";
import {Button} from "./EditQuestionnaire.styles";

export const FormContainer = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: calc(100% - 20px);
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.3);
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: #1f923a;
    box-shadow: 0px 4px 12px rgba(40, 167, 69, 0.3);
  }
`;

export const AddQuestionButton = styled.button`
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const QuestionBlock = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

export const QuestionTypeWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &::after {
    content: "▼";
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    color: #555;
    pointer-events: none;
    font-size: 0.9rem;
  }
`;

export const QuestionTypeSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  background-color: #f9f9f9;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 6px rgba(0, 123, 255, 0.4);
    background-color: #fff;
  }
`;

export const OptionInput = styled.input`
  padding: 6px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: calc(100% - 20px);
`;

export const AddOptionButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
	margin-bottom: 8px;
  &:hover {
    background-color: #5a6268;
  }
`;

export const QuestionSection = styled.div`
  margin-bottom: 20px;
`;

export const SmallInput = styled.input`
  width: calc(100% - 20px);
  margin-bottom: 8px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const QuestionItem = styled.li`
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f1f1f1;
  border-radius: 8px;
`;

export const RemoveButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  margin-left: 10px;
  &:hover {
    background-color: #bd2130;
  }
`;
