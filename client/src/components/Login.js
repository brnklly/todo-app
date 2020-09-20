import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import redux actions
import { setAlerts } from '../actions/alert';
import { login } from '../actions/auth';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const { isAuthenticated, loading } = props.auth;
    isAuthenticated && !loading && props.history.push('/my-lists');
  }, [props.auth]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // call login action
    props.login({ email, password });
  };

  return (
    <div className='page' id='lists-page'>
      <div className='page-header'>
        <h1 className='page-title'>Login</h1>
      </div>
      <div className='page-content'>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='row'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='row'>
            <input type='submit' value='Log In' />
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAlerts: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlerts, login })(Login);
