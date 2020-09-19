import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Header = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul id='nav'>
      <li className='nav-item'>
        <Link to='/' onClick={logout}>
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
  );

  const guestLinks = (
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
    </ul>
  );

  return (
    <header>
      <h1 id='logo'>
        <Link to='/'>TodoApp</Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}

      <p id='author'>
        by Brian Kelly | icons by
        <a target='_blank' rel='noopener noreferrer' href='https://icons8.com'>
          Icons8
        </a>
      </p>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
