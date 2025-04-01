import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
`;

export const InfoText = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

export const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin-top: 50px;
`;

export const ChartWrapper = styled.div`
  margin-bottom: 40px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
`;

export const QuestionBlock = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background-color: #fafafa;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const GeneralStatsContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

export const StatsCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
`;
