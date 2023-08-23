import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton
} from 'baseui/modal';
import RegisterForm from './RegisterForm';

interface LoginModalProps {
    isOpenRegister: boolean;
    onCloseRegister: () => void;
}

const RegisterModal: React.FC<LoginModalProps> = ({ isOpenRegister, onCloseRegister }) => (
    <Modal onClose={onCloseRegister} isOpen={isOpenRegister}>
      <ModalHeader>New to Bookr? Join us.</ModalHeader>
      <ModalBody>
          <RegisterForm />
      </ModalBody>
      <ModalFooter>
          <ModalButton kind="tertiary" onClick={onCloseRegister}>
              Cancel
          </ModalButton>
          <ModalButton onClick={onCloseRegister}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );

export default RegisterModal;