import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='page' id='lists-page'>
      <div className='page-header'>
        <h1 className='page-title'>Register</h1>
      </div>
      <div className='page-content'>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
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
            <label htmlFor='password2'>Confirm Password:</label>
            <input
              type='password'
              name='password2'
              id='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='row'>
            <input type='submit' value='Sign Up' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
