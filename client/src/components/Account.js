import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../actions/user';

const Account = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (props.auth.user) {
      const { name, email } = props.auth.user;
      setFormData({ ...formData, name, email });
    }
  }, [props.auth.user]);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.updateUser({
      name,
      email,
      password,
    });
    setFormData({ ...formData, password: '' });
  };

  const onDeleteUser = () => {
    props.deleteUser({ password });
  };

  return (
    <div className='page' id='lists-page'>
      <div className='page-header'>
        <h1 className='page-title'>Account</h1>
      </div>
      <div className='page-content'>
        <p>Here, you can edit your account details.</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <label htmlFor='name'>Change Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='row'>
            <label htmlFor='email'>Change Email:</label>
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
            <input type='submit' value='Save Changes' />
          </div>
        </form>
        <p className='delete-account' onClick={() => onDeleteUser()}>
          Delete Account
        </p>
      </div>
    </div>
  );
};

Account.propTypes = {
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser, deleteUser })(Account);
