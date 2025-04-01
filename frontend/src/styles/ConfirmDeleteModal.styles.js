import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const ConfirmButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #b52a38;
  }
`;

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #565e64;
  }
`;
