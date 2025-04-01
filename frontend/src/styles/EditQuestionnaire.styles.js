import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
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

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 5px 5px 5px 0;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
`;

export const AddButton = styled(Button)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0069d9;
  }
`;

export const RemoveButton = styled(Button)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #b02a37;
  }
`;

export const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  padding: 12px 28px;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 24px;
  }
`;

export const AddQuestionButton = styled(AddButton)`
  margin-top: 20px;
`;

export const StyledQuestionList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const QuestionItem = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const OptionInput = styled(Input)`
  margin-bottom: 10px;
`;
