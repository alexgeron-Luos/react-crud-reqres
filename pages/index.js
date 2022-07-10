import React from 'react';
import HomePage from './home';
import withAuth from '../src/components/container/auth/withAuth';

const Home = () => {
  return <HomePage />;
};

export default withAuth(Home);
