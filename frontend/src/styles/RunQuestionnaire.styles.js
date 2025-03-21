import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
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

export const QuestionBlock = styled.div`
  margin-bottom: 30px;
`;

export const QuestionText = styled.h4`
  margin-bottom: 10px;
  color: #444;
`;

export const Input = styled.input`
  margin: 5px 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.3);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
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
    background-color: #0056b3;
    box-shadow: 0px 4px 12px rgba(0, 123, 255, 0.3);
  }
`;
