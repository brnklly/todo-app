import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to TodoApp</h1>
      <p>
        Please <Link to='/login'>login</Link> or{' '}
        <Link to='/register'>register</Link> to start keeping track of your
        tasks today!
      </p>
    </div>
  );
};

export default Home;
