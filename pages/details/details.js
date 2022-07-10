import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Styles from './details.module.scss';
import {
  getCurrentUser,
  editCurrentUser,
} from '../../src/components/reducer/usersSlice';
import { addTitle } from '../../src/components/reducer/headerSlice';
import { useSelector, useDispatch } from 'react-redux';
import * as service from '../../src/components/middleware';
import withAuth from '../../src/components/container/auth/withAuth';
import BackButton from '../../src/components/container/button/backButton';

const Details = () => {
  const [edit, setEdit] = useState(true);
  const currentUser = useSelector(getCurrentUser);
  const [formValues, setFormValues] = useState(currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTitle({ title: 'User details' }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEdit(false);
  };

  const handleSave = () => {
    try {
      service
        .makePatchReq({
          url: '/api/users/' + currentUser.id,
          data: {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
          },
        })
        .then((res) => {
          dispatch(
            editCurrentUser({
              id: currentUser.id,
              first_name: formValues.firstName,
              last_name: formValues.lastName,
            }),
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container mt={5} mb={5}>
      <Grid item md={2}></Grid>
      <Grid item xs={12} md={8} className={Styles.flexGridItem}>
        <Grid item xs={12} md={12}>
          <BackButton />
          <Button
            variant="outlined"
            className={Styles.editEuser}
            onClick={handleEdit}
          >
            Edit User
          </Button>
        </Grid>

        <Avatar src={currentUser.avatar} className={Styles.avatar} />
        <List sx={{ width: '80%' }}>
          <ListItem>
            <ListItemText primary="Id" secondary={currentUser.id} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={currentUser.email} />
          </ListItem>
          <ListItem>
            <TextField
              id="firstName"
              name="firstName"
              label="First name"
              variant="outlined"
              defaultValue={currentUser.firstName}
              disabled={edit}
              onChange={handleInputChange}
            />
          </ListItem>

          <ListItem>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              variant="outlined"
              defaultValue={currentUser.lastName}
              disabled={edit}
              onChange={handleInputChange}
            />
          </ListItem>
        </List>
        {edit == false ? (
          <Button
            variant="outlined"
            color="success"
            className={Styles.saveBtn}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : null}
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
};

export default withAuth(Details);
