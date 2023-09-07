import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'baseui/modal';
import RegisterForm from './RegisterForm';

interface RegisterModalProps {
    isOpenRegister: boolean;
    onCloseRegister: () => void;
}

const RegisterModal: React.FC<RegisterModalProps & { onSuccessfulRegister: (username: string) => void }> = ({ isOpenRegister, onCloseRegister, onSuccessfulRegister }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleFormSubmit = (formData: { username: string; email: string; password: string }) => {
        console.log("Registered user data:", formData);
        onSuccessfulRegister(formData.username);
        onCloseRegister();
    };
    
    return (
        <Modal onClose={onCloseRegister} isOpen={isOpenRegister}>
          <ModalHeader>New to Bookr? Join us.</ModalHeader>
          <ModalBody>
            <RegisterForm 
                onClose={onCloseRegister} 
                onSubmit={handleFormSubmit}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
            />
          </ModalBody>
        </Modal>
    );
}

export default RegisterModal;
