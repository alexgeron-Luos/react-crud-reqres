import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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

import Router from 'next/router';

//yup
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { yupResolver } from '@hookform/resolvers/yup';
import * as service from '../../src/components/middleware';

import { useDispatch } from 'react-redux';
import { addTitle } from '../../src/components/reducer/headerSlice';

export default function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addTitle({ title: 'Login' }));
  }, []);

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
          url: '/api/login',
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            {...register('email')}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {errors.email?.message ? (
            <Alert severity="error">{errors.email?.message}</Alert>
          ) : null}
          <TextField
            margin="normal"
            required
            fullWidth
            {...register('password')}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {errors.password?.message ? (
            <Alert severity="error">{errors.password?.message}</Alert>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
