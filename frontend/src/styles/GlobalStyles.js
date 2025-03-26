import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

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

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
export const StatsButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #6f42c1;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a34a3;
  }
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b52d3a;
  }
`;

export const PrimaryButton = styled.button`
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

export const SortSelect = styled.select`
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.3);
  }
`;

export const SearchInput = styled.input`
  padding: 12px 16px 12px 42px;
  border: 1px solid #ccc;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 30px auto;
  display: block;
  background: url("/search-icon.svg") no-repeat 12px center;
  background-size: 20px 20px;
  transition: all 0.3s;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
  }

  &::placeholder {
    color: #aaa;
  }
`;
