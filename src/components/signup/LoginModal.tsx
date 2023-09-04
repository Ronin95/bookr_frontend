import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'baseui/modal';
import LoginForm from './LoginForm';

interface LoginModalProps {
    isOpenLogin: boolean;
    onCloseLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpenLogin, onCloseLogin }) => {
    const handleLogin = (data: { email: string; password: string }) => {
        console.log("User login data:", data);
        onCloseLogin();  // Close the modal after logging in (you might want to add some logic here to handle actual authentication)
    };

    return (
        <Modal onClose={onCloseLogin} isOpen={isOpenLogin}>
            <ModalHeader>Already have an account?</ModalHeader>
            <ModalBody>
                <LoginForm onClose={onCloseLogin} onSubmit={handleLogin} />
            </ModalBody>
        </Modal>
    );
};


export default LoginModal;