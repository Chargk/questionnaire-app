import styled from 'styled-components';

export const ChartHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const PeriodSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  
  &:hover {
    border-color: #aaa;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`; 