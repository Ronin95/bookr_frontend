import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton
} from 'baseui/modal';
import RegisterForm from './RegisterForm';

interface RegisterModalProps {
    isOpenRegister: boolean;
    onCloseRegister: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpenRegister, onCloseRegister }) => {
    const formRef = React.createRef<HTMLFormElement>();

    const handleRegisterClick = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };
            
    
    return (
        <Modal onClose={onCloseRegister} isOpen={isOpenRegister}>
          <ModalHeader>New to Bookr? Join us.</ModalHeader>
          <ModalBody>
            <RegisterForm formRef={formRef} onSubmit={handleRegisterClick} />
          </ModalBody>
          <ModalFooter>
            <ModalButton kind="tertiary" onClick={onCloseRegister}>
                Cancel
            </ModalButton>
            <ModalButton type='button' onClick={handleRegisterClick}>
                Register
            </ModalButton>
          </ModalFooter>
        </Modal>
    );
}

export default RegisterModal;
