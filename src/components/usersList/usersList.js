import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DeleteModal from '../modal/deleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getUsers,
  setCurrentUserId,
  setCurrentUser,
} from '../reducer/usersSlice';
import {
  setDisplayDeleteModal,
  getDeleteModal,
} from '../reducer/modalSlice';


const UsersList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(getUsers);
  const displayDeleteModal = useSelector(getDeleteModal);
  useEffect(() => {}, [usersList]);

  const emailStyle = {
    fontSize: '14px',
  };

  const handleDelete = (id) => {
    dispatch(setCurrentUserId({ id: id }));
    dispatch(setDisplayDeleteModal({ display: true }));
  };

  const handleDetails = (data) => {
    dispatch(setCurrentUser({ user: data }));
    Router.push('/details');
  };
  return (
    <div>
      {displayDeleteModal ? <DeleteModal /> : null}
      {usersList.length > 1 ? (
        <List>
          {usersList.map((user, index) => {
            return (
              <div key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{ style: emailStyle }}
                    primary={user.email}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="comments"
                      onClick={() => handleDetails(user)}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UsersList;
