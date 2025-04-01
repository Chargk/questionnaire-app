import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #555;
`;

export const CardInfo = styled.p`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #777;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const CardButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const StatsButton = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 10px 0;
  background-color: #6f42c1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #5a34a3;
  }
`;
