import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 80px auto 40px;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
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
