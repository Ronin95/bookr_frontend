// Header.tsx

import React, { useState } from 'react';
import logo from '../../assets/img/logo-v1.png';
import login from '../../assets/img/login.png';
import './Header.css';
import LoginModal from '../signup/LoginModal';
import RegisterModal from '../signup/RegisterModal';
import { ModalButton } from 'baseui/modal';

function Header() {
  const [isOpenLogin, openLogin] = useState(false);
  const [isOpenRegister, openRegister] = useState(false);
  const [username, setUsername] = useState(''); // State to store logged-in user's name

  const handleLogout = () => {
    setUsername(''); // Clear username on logout
  };

  return (
    <div className='header-style'>
      <img src={logo} alt="logo" className='logo-img-style'/>
      {username ? (
        // If user is logged in
        <>
          <h2>Welcome to Bookr, {username}</h2>
          <ModalButton onClick={handleLogout}>Log out</ModalButton>
        </>
      ) : (
        // If no user is logged in
        <div className='sign-up-style'>
          <div className='login-style' onClick={() => openLogin(true)}>
            <img src={login} alt='login' className='login-img-style'/>
            <h3>Log In</h3>
          </div>
          <div className='register-style' onClick={() => openRegister(true)}>
            <h3 className='register-h3-tag'>Register</h3>
          </div>
          <LoginModal isOpenLogin={isOpenLogin} onCloseLogin={() => openLogin(false)} onSuccessfulLogin={setUsername} />
          <RegisterModal isOpenRegister={isOpenRegister} onCloseRegister={() => openRegister(false)} onSuccessfulRegister={setUsername} />
        </div>
      )}
    </div>
  );
}

export default Header;
