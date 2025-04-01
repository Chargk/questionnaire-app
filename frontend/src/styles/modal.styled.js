import styled from "styled-components";
import { motion } from "framer-motion";

export const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContentStyled = styled(motion.div)`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

export const ModalTitleStyled = styled.h3`
  margin-bottom: 10px;
`;

export const ModalTextStyled = styled.p`
  margin-bottom: 20px;
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const ModalButtonStyled = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? "#6c757d" : "#dc3545")};
  color: white;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) => (props.cancel ? "#5a6268" : "#c82333")};
  }
`;
