import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton
} from 'baseui/modal';
import LoginForm from './LoginForm';

interface LoginModalProps {
    isOpenLogin: boolean;
    onCloseLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpenLogin, onCloseLogin }) => (
    <Modal onClose={onCloseLogin} isOpen={isOpenLogin}>
        <ModalHeader>Already have an account?</ModalHeader>
            <ModalBody>
                <LoginForm />
            </ModalBody>
        <ModalFooter>
            <ModalButton kind="tertiary" onClick={onCloseLogin}>Cancel</ModalButton>
            <ModalButton onClick={onCloseLogin}>Log in</ModalButton>
        </ModalFooter>
    </Modal>
);

export default LoginModal;