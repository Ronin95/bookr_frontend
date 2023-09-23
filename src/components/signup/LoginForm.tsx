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
  // Login state
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if the username is filled and password meets the validation criteria
    if (username && isPasswordValid) {
        fetch('http://127.0.0.1:8000/accounts/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                // Convert the response to JSON, expecting the server to send an error message
                return res.json().then(data => {
                    throw new Error(data.message || 'Failed to log in');
                });
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            if(data.success) {
                localStorage.setItem('token', data.access_token);
                onSubmit({
                  username,
                  password: ''
                });
                setErrorMessage(null);
            } else {
                // handle specific error messages sent by the server
                throw new Error(data.message || 'Login failed');
            }
        })
        .catch(error => {
          setErrorMessage('Username or password is wrong. Please check again.');
        });
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

      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

      <ModalFooter>
        <ModalButton kind="tertiary" onClick={onClose}>Cancel</ModalButton>
        <ModalButton type='submit'>Log in</ModalButton>
      </ModalFooter>
    </form>
  );
}
