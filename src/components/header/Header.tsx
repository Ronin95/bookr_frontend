import React, { useState } from 'react';
import logo from '../../assets/img/logo-v1.png';
import login from '../../assets/img/login.png';
import './Header.css';
import LoginModal from '../signup/LoginModal';
import RegisterModal from '../signup/RegisterModal';

function Header() {
  const [isOpenLogin, openLogin] = useState(false);
  const [isOpenRegister, openRegister] = useState(false);

  return (
    <div className='header-style'>
        <img src={logo} alt="logo" className='logo-img-style'/>
        <div className='sign-up-style'>
            <div className='login-style' onClick={() => openLogin(true)}>
                <img src={login} alt='login' className='login-img-style'/>
                <h3>Log In</h3>
            </div>
            <div className='register-style' onClick={() => openRegister(true)}>
                <h3 className='register-h3-tag'>Register</h3>
            </div>
        </div>
        <LoginModal isOpenLogin={isOpenLogin} onCloseLogin={() => openLogin(false)} />
        <RegisterModal isOpenRegister={isOpenRegister} onCloseRegister={() => openRegister(false)} />
    </div>
  );
}

export default Header;
