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

interface LoginFormProps {
  onClose: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
}


export default function LoginForm({ onClose, onSubmit }: LoginFormProps) {
  // Email state
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setEmailValidity] = React.useState(false);
  const [emailVisited, setEmailVisited] = React.useState(false);
  
  // Password state
  const [password, setPassword] = React.useState('');
  const [isPasswordValid, setPasswordValidity] = React.useState(false);
  const [passwordVisited, setPasswordVisited] = React.useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setEmailValidity(validateEmail(value));
    setEmail(value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setPasswordValidity(value.length >= 8);
    setPassword(value);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
        onSubmit({ email, password });
    }
};

  return (
    <form onSubmit={handleLogin}>
      {/* Email Input */}
      <FormControl
        label="Your email"
        error={!isEmailValid && emailVisited ? 'Please input a valid email address' : null}
      >
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
      <FormControl
        label="Your password"
        error={!isPasswordValid && passwordVisited ? 'Password should be at least 8 characters' : null}
      >
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
        <ModalButton kind="tertiary" onClick={onClose}>Cancel</ModalButton>
        <ModalButton type='submit'>Log in</ModalButton>
      </ModalFooter>
    </form>
  );
}
