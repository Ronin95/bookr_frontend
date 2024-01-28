import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo-v1.png';
import login from '../../assets/img/login.png';
import './Header.css';
import LoginModal from '../signup/LoginModal';
import RegisterModal from '../signup/RegisterModal';
import { ModalButton } from 'baseui/modal';
import MainNavigation from '../services/MainNavigation';
import BookrCoverImg from '../../assets/img/BookrCoverImg.png';


/**
 * The `function Header() {` is defining a functional component called `Header`. This component is responsible for
 * rendering the header section of a web page.
 * 
 * @function
 * @name Header
 * @kind function
 * @returns {JSX.Element}
 */
function Header() {
  const [isOpenLogin, openLogin] = useState(false);
  const [isOpenRegister, openRegister] = useState(false);
  const [username, setUsername] = useState(''); // State to store logged-in user's name
  const [isCoverImgVisible, setCoverImgVisible] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details if a token exists
      fetch('http://127.0.0.1:8000/accounts/details/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUsername(data.username);
        }
      });
    }
  }, []); // This effect runs once, when the component mounts

  /**
   * The `const handleLogout` is a function that is called when the user clicks on the "Log out" button. It is responsible
   * for removing the token from the local storage and clearing the username state, effectively logging the user out.
   * 
   * @function
   * @name handleLogout
   * @kind variable
   * @memberof Header
   * @returns {void}
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(''); // Clear username on logout
  };

  return (
    <div>
      <div className='header-style'>
      <img src={logo} alt="logo" className='logo-img-style' />
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
      {username && <MainNavigation onHideCoverImg={() => setCoverImgVisible(false)} />}
      <div className='coverimg-style'>
        {isCoverImgVisible && <img src={BookrCoverImg} alt="cover-img" className="bookr-cover-img"/>}
      </div>
    </div>
  );
}

export default Header;
