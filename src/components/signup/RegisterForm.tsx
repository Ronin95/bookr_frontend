import * as React from 'react';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { Alert } from 'baseui/icon';
import { validate as validateEmail } from 'email-validator';
import { ModalFooter, ModalButton } from 'baseui/modal';

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

interface RegisterFormProps {
  formRef?: React.RefObject<HTMLFormElement>;
  onSubmit?: (formData: { username: string; email: string; password: string }) => void;
  onClose: () => void;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}


export default function RegisterForm({ formRef, onSubmit }: RegisterFormProps) {
  // Username state
  const [username, setUsername] = React.useState('');
  const [usernameVisited, setUsernameVisited] = React.useState(false);

  // Email state
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setEmailValidity] = React.useState(false);
  const [emailVisited, setEmailVisited] = React.useState(false);

  // Password state
  const [password, setPassword] = React.useState('');
  const [isPasswordValid, setPasswordValidity] = React.useState(false);
  const [passwordVisited, setPasswordVisited] = React.useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const user = event.currentTarget.value;
    setUsername(user);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const userMail = event.currentTarget.value;
    setEmail(userMail);
    setEmailValidity(validateEmail(userMail));
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const userPassword = event.currentTarget.value;
    setPassword(userPassword);
    setPasswordValidity(userPassword.length >= 8);
  };

  const registerUser = (event: any) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({
        username,
        email,
        password
      });
    }
  }

  return (
    <form ref={formRef} onSubmit={(e) => registerUser(e)}>
      {/* Username Input */}
      <FormControl label="Your username" error={!username && usernameVisited ? 'Please input a valid username' : null}>
        <Input
          id="username-id"
          value={username}
          onChange={onUsernameChange}
          onBlur={() => setUsernameVisited(true)}
          error={!username && usernameVisited}
          overrides={!username && usernameVisited ? { After: Negative } : {}}
        />
      </FormControl>

      {/* Email Input */}
      <FormControl label="Your email" error={!isEmailValid && emailVisited ? 'Please input a valid email address' : null} >
        <Input
          id="email-id"
          value={email}
          onChange={onEmailChange}
          onBlur={() => setEmailVisited(true)}
          error={!isEmailValid && emailVisited}
          overrides={!isEmailValid && emailVisited ? { After: Negative } : {}}
        />
      </FormControl>

      {/* Password Input */}
      <FormControl label="Your password" error={!isPasswordValid && passwordVisited ? 'Password should be at least 8 characters' : null} >
        <Input
          id="password-id"
          type="password"
          value={password}
          onChange={onPasswordChange}
          onBlur={() => setPasswordVisited(true)}
          error={!isPasswordValid && passwordVisited}
          overrides={!isPasswordValid && passwordVisited ? { After: Negative } : {}}
        />
      </FormControl>
      <ModalFooter>
        <ModalButton kind="tertiary" onClick={onclose}>
            Cancel
        </ModalButton>
        <ModalButton type='submit'>
            Register
        </ModalButton>
      </ModalFooter>
    </form>
  );
}
