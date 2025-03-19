import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled.div`
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

const ModalContent = styled(motion.div)`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButton = styled.button`
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

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {show && (
        <Overlay>
          <ModalContent
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ModalTitle>Confirm Deletion</ModalTitle>
            <ModalText>
              Are you sure you want to delete this questionnaire?
            </ModalText>
            <ButtonGroup>
              <ModalButton onClick={onConfirm}>Yes, delete</ModalButton>
              <ModalButton cancel onClick={onCancel}>
                Cancel
              </ModalButton>
            </ButtonGroup>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
