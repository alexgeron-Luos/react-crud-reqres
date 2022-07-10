import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import UsersList from './usersList/usersList';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Styles from './home.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addTitle } from '../../src/components/reducer/headerSlice';
import {
  addUser,
  removeUser,
  selectUsers,
  nextPage,
  getCurrentPage,
} from '../../src/components/reducer/usersSlice';
import * as service from '../../src/components/middleware';


const HomePage = () => {
  const reduxCurrentPage = useSelector(getCurrentPage);
  const [currentPage, setCurrentPage] = useState(reduxCurrentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addTitle({ title: 'Users List' }));
    service.makeGetReq('/api/users?page=' + currentPage).then((res) => {
      // const data = JSON.parse(res.data.data);
      res.data.data.forEach((user) => {
        dispatch(
          addUser({
            id: user.id,
            avatar: user.avatar,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
          }),
        );
      });
    });
  }, [currentPage]);

  const handleLoadMore = () => {
    dispatch(nextPage({ page: 2 }));
    setCurrentPage(2);
  };

  const handleAddUser = () => {
    Router.push('/add');
  };
  return (
    <Grid container mt={5} mb={5}>
      <Grid item md={2} />
      <Grid item xs={12} md={8} className={Styles.userList}>
        <Button
          variant="outlined"
          className={`${Styles.userList__btn} ${Styles.userList__addUser}`}
          onClick={handleAddUser}
          id="add-user"
        >
          Add User
        </Button>
        <UsersList />
        {currentPage != 2 ? (
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            className={Styles.userList__btn}
          >
            Load more
          </Button>
        ) : null}
      </Grid>
      <Grid item md={2} />
    </Grid>
  );
};

export default HomePage;
