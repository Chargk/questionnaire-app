import styled from "styled-components";

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
  width: 100%;
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
