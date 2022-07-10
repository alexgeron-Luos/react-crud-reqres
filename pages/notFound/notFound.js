import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { addTitle } from '../../src/components/reducer/headerSlice';

const NotFound = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addTitle({ title: 'Not Found' }));
  }, []);
  return (
    <div>
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  );
};

export default NotFound;
