import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { addUser } from '../../src/components/reducer/usersSlice';
import { addTitle } from '../../src/components/reducer/headerSlice';

import * as service from '../../src/components/middleware';
import withAuth from '../../src/components/container/auth/withAuth';
import BackButton from '../../src/components/container/button/backButton';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Add = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    avatar: yup.string(),
    email: yup.string().email().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data) => {
    try {
      service
        .makePostReq({
          url: '/api/users',
          data: {
            avatar: data.avatar,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
          },
        })
        .then((res) => {
          dispatch(
            addUser({
              id: res.data.id,
              avatar: res.data.avatar,
              email: res.data.email,
              firstName: res.data.first_name,
              lastName: res.data.last_name,
            }),
          );
          Router.push('/');
        });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(addTitle({ title: 'Add new user' }));
  }, []);

  return (
    <Grid container mt={5} mb={5}>
      <Grid item md={2} />
      <Grid item xs={12} md={8}>
        <BackButton />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Avatar URL"
                {...register('avatar')}
                name="avatar"
                id="avatar"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register('email')}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {errors.email?.message ? (
                <Alert severity="error">{errors.email?.message}</Alert>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register('first_name')}
                name="first_name"
                label="First name"
                id="first_name"
                autoComplete="first_name"
              />
              {errors.first_name?.message ? (
                <Alert severity="error">{errors.first_name?.message}</Alert>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register('last_name')}
                name="last_name"
                label="Last name"
                id="last_name"
                autoComplete="last_name"
              />
              {errors.last_name?.message ? (
                <Alert severity="error">{errors.last_name?.message}</Alert>
              ) : null}
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add user
          </Button>
        </Box>
      </Grid>
      <Grid item md={2} />
    </Grid>
  );
};

export default withAuth(Add);
