import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import Styles from './styles.module.scss';
import * as service from '../../middleware';
import { selectTitle } from '../../reducer/headerSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const title = useSelector(selectTitle);

  const handleLogout = () => {
    service.logOut();
    Router.push('/login');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={Styles.headerBox}
    >
      <Grid item md={4} lg={4} />
      <Grid item xs={10} md={4} lg={4} className={Styles.titleContainer}>
        <h1>{title}</h1>
      </Grid>
      <Grid item xs={1} md={4} lg={4} className={Styles.btnContainer}>
        <IconButton aria-label="delete" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default Header;
