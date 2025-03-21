import styled from "styled-components";

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.5rem;
`;

export const CardText = styled.p`
  margin: 4px 0;
  color: #555;
`;

export const CardButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;
