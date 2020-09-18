import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 id='logo'>
        <Link to='/'>TodoApp</Link>
      </h1>
      <ul id='nav'>
        <li className='nav-item'>
          <Link to='/register'>
            <img alt='' src='./img/icons8-add-user-male-48.png' />
            Register
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/login'>
            <img alt='' src='./img/icons8-login-48.png' />
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/'>
            <img alt='' src='./img/icons8-sign-out-48.png' />
            Logout
          </Link>
        </li>
        <li className='nav-item category active'>
          <Link to='/lists'>My Lists</Link>
        </li>
        <li className='nav-item category'>
          <Link to='/account'>Account Settings</Link>
        </li>
      </ul>

      <p id='author'>
        by Brian Kelly | icons by
        <a target='_blank' rel='noopener noreferrer' href='https://icons8.com'>
          Icons8
        </a>
      </p>
    </header>
  );
};

export default Header;
