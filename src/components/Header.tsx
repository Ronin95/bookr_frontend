import React from 'react';
import logo from '../assets/img/logo-v1.png';
import login from '../assets/img/login.png';
import './Header.css';

function Header() {
  return (
    <div className='header-style'>
        <img src={logo} alt="logo" className='logo-img-style'/>
        <div className='sign-up-style'>
            <div className='login-style'>
                <img src={login} alt='login' className='login-img-style'/>
                <h3>Log In</h3>
            </div>
            <div className='register-style'>
                <h3 className='register-h3-tag'>Register</h3>
            </div>
        </div>
    </div>
  );
}

export default Header;
