import React from "react";
import { AnimatePresence } from "framer-motion";
import {
  ButtonGroupStyled,
  ModalButtonStyled,
  ModalContentStyled,
  ModalTextStyled,
  ModalTitleStyled,
  OverlayStyled
} from "../../../styles/modal.styled";

const ConfirmDeletionModal = ({ show, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {show && (
        <OverlayStyled>
          <ModalContentStyled
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ModalTitleStyled>Confirm Deletion</ModalTitleStyled>
            <ModalTextStyled>
              Are you sure you want to delete this questionnaire?
            </ModalTextStyled>
            <ButtonGroupStyled>
              <ModalButtonStyled onClick={onConfirm}>Yes, delete</ModalButtonStyled>
              <ModalButtonStyled cancel onClick={onCancel}>
                Cancel
              </ModalButtonStyled>
            </ButtonGroupStyled>
          </ModalContentStyled>
        </OverlayStyled>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeletionModal;
