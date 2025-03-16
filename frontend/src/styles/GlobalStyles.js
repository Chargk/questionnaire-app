import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #555;
`;

export const Info = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:last-child {
    background: #28a745;
    &:hover {
      background: #218838;
    }
  }
`;
