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
  text-align: center;
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
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.3);
  }
`;

export const SubmitButton = styled.button`
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
    background-color: #218838;
    box-shadow: 0px 4px 12px rgba(40, 167, 69, 0.3);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ThankYouScreen = styled.div`
  text-align: center;
  padding: 60px 20px;
  background-color: #f8f9fa;
  border-radius: 20px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.03);
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
