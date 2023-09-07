import * as React from 'react';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { Alert } from 'baseui/icon';
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
  onSubmit: (data: { username: string; password: string }) => void;
}

export default function LoginForm({ onClose, onSubmit }: LoginFormProps) {
  // Username state
  const [username, setUsername] = React.useState('');
  const [usernameVisited, setUsernameVisited] = React.useState(false);

  // Password state
  const [password, setPassword] = React.useState('');
  const [isPasswordValid, setPasswordValidity] = React.useState(false);
  const [passwordVisited, setPasswordVisited] = React.useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const user = event.currentTarget.value;
    setUsername(user);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setPasswordValidity(value.length >= 8);
    setPassword(value);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && isPasswordValid) {
        onSubmit({ username, password });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Username Input */}
      <FormControl 
        label="Your username" 
        error={!username && usernameVisited ? 'Please input a valid username' : null}
      >
        <Input
          id="username-id"
          value={username}
          onChange={onUsernameChange}
          onBlur={() => setUsernameVisited(true)}
          error={!username && usernameVisited}
          overrides={!username && usernameVisited ? { After: Negative } : {}}
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
