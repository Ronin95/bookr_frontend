import React from 'react';
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

const LoginModal: React.FC<LoginModalProps & { onSuccessfulLogin: (username: string) => void }> = ({ isOpenLogin, onCloseLogin, onSuccessfulLogin }) => {
    const handleLogin = (data: { username: string; password: string }) => {
      console.log("User login data:", data);
      onSuccessfulLogin(data.username);
      onCloseLogin();
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
