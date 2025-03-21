import React from "react";
import styled from "styled-components";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #007bff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 999;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  gap: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 70px;
`;

export const ContentContainer = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Logo onClick={() => navigate("/")}>
        <Home size={24} />
        Questionnaire App
      </Logo>
    </HeaderWrapper>
  );
};

export default Header;
