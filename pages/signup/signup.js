import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import Router from 'next/router';

//yup
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { yupResolver } from '@hookform/resolvers/yup';

//mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import * as service from '../../src/components/middleware';

export default function SignUp() {
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .password()
      .required()
      .min(
        8,
        'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
      )
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
          url: '/api/register',
          data: { email: data.email, password: data.password },
        })
        .then((res) => {
          localStorage.setItem('authToken', res.data.token);
          Router.push('/');
        });
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
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
                {...register('password')}
                label="Password"
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
              />
              {errors.password?.message ? (
                <Alert severity="error">{errors.password?.message}</Alert>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register('passwordConfirmation')}
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                autoComplete="new-password"
              />
              {errors.passwordConfirmation?.message ? (
                <Alert severity="error">
                  {errors.passwordConfirmation?.message}
                </Alert>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
