import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  removeUser,
  getCurrentUserId,
  setCurrentUserId,
} from '../reducer/usersSlice';
import { setDisplayModal, selectModal } from '../reducer/modalSlice';
import * as service from '../middleware';

const DeleteModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);
  const user = useSelector(getCurrentUserId);
  const [open, setOpen] = React.useState(modal);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setDisplayModal({ display: false }));
    dispatch(setCurrentUserId({ id: -1 }));
  };

  const handleDelete = () => {
    try {
      service.makeDeleteReq('/api/users/' + user).then((res) => {
        dispatch(removeUser({ id: user }));
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    dispatch(setDisplayModal({ display: false }));
    dispatch(setCurrentUserId({ id: -1 }));
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'User suppression'}</DialogTitle>
      <DialogContent>Do you want to delete this user ?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
